import React, { PureComponent } from "react";
import {
  Alert,
  Text,
  View,
  Platform,
  ActivityIndicator,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import * as tf from "@tensorflow/tfjs";
// import { Camera } from "expo-camera";
// import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { pathOr } from "ramda";

import * as blazeface from "@tensorflow-models/blazeface";
import * as Permissions from "expo-permissions";
import styles from "./styles";
import { extractData } from "./hrvMeasurements";
import Svg, { Rect, Line, G, Path } from "react-native-svg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import screens from "./configs/screens";
import actions from "./configs/actions";
import { safeMetaLabelFinder } from "../../utils/meta-utils";
import { initialiseTensorCamera } from "./utils";
import * as Progress from "react-native-progress";
import OpenSettings from "react-native-open-settings";
import { registerEvent } from "../../utils/registerEvents/actions";
import { eventNames } from "./events";

import {
  metaHelpers,
  CoreServices,
  CoreConstants,
  CoreConfig,
} from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;
const { SCREEN_KEY_MANAGE_PROFILE } = CoreConstants;
const { KEY_CAMERA_PERMISSION } = CoreConfig;

const { width, height } = Dimensions.get("window");

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const AnimatedLine = Animated.createAnimatedComponent(Line);

// const TensorCamera = cameraWithTensors(Camera);

export class HeartRateVariability extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      elapsedFrames: 0,
      isReady: false,
    };

    this.capturedSamples = {
      time: [],
      yellowAv: [],
      cbAv: [],
      crAv: [],
    };

    this.requestCount = 0;
    this.prevFrameCount = 0;
    this.registerErrorMsg = false;
  }

  closeCamera = () => {
    this.props.registerEvent(eventNames.cameraGoBackHRV);
    NavigationService.goBack();
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      this.props.registerEvent(eventNames.cameraPermissionDeniedHRV);
      const cameraPermission = metaHelpers.findElement(
        SCREEN_KEY_MANAGE_PROFILE,
        KEY_CAMERA_PERMISSION
      ).label;
      Alert.alert("", cameraPermission, [
        {
          text: "OK",
          onPress: () => {
            OpenSettings.openSettings();
            this.closeCamera();
          },
        },
        {
          text: "cancel",
          style: "cancel",
          onPress: () => {
            this.closeCamera();
          },
        },
      ]);
    }

    this.props.initHrv();
    if (!this.props.isTensorReady) {
      initialiseTensorCamera();
      this.props.setTensorReady();
    }
    this.setState({
      isLoading: false,
    });
    this.props.registerEvent(eventNames.onCameraLoadHRV);
  }

  cancelAnimation = () => {
    if (this.rafID) {
      cancelAnimationFrame(this.rafID);
      this.rafID = null;
    }
  };

  componentWillUnmount() {
    this.cancelAnimation();
  }

  shouldSkipLoop = () => {
    return this.props.hrvSuccess || this.props.showErrorMessage;
  };

  captureDataSample = async imageTensor => {
    try {
      const extractedData = await extractData(imageTensor);

      if (extractedData) {
        this.capturedSamples.time.push(extractedData.time);
        this.capturedSamples.yellowAv.push(extractedData.yellowAv);
        this.capturedSamples.cbAv.push(extractedData.cbAv);
        this.capturedSamples.crAv.push(extractedData.crAv);
      }
    } catch (error) {
      console.log("error: tf logs extracteddata", error);
    }
  };

  initiateHRVAPIRequest = frameCount => {
    //dispatch redux action to invoke API, passing the four arrays as payload
    this.cancelAnimation();
    this.props.setFinalCall({
      isFinalApiCall:
        this.didReachMaximumFrame(frameCount) || this.didReachMaxVariantCheck(),
      isMaxFrame: this.didReachMaximumFrame(frameCount),
    });
    this.setState({
      isReady: false,
    });
    this.props.registerEvent(eventNames.saveImageDataApiHRV);
    this.props.triggerComputeHRV(this.capturedSamples);
  };

  resetValues = () => {
    this.props.initHrv();
    this.requestCount = 0;
    this.capturedSamples = {
      time: [],
      yellowAv: [],
      cbAv: [],
      crAv: [],
    };
    this.prevFrameCount = 0;
  };

  displayErrorMessage = () => {
    if (this.registerErrorMsg === false) {
      this.registerErrorMsg = true;
      this.props.registerEvent(eventNames.errorOccuredHRV);
    }
    const errorText = safeMetaLabelFinder("heartRateVariability", "failureMsg");
    const tryAgain = safeMetaLabelFinder("heartRateVariability", "tryAgain");
    const cancelMsg = safeMetaLabelFinder("heartRateVariability", "cancelMsg");

    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>{errorText} </Text>
        <View style={styles.errorOptions}>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => {
              this.resetValues();
              this.props.removeAlert();
            }}
          >
            <Text style={styles.errorText}>{tryAgain}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.errorButton}
            onPress={() => {
              this.resetValues();
              this.props.removeAlert();
              this.closeCamera();
            }}
          >
            <Text style={styles.errorText}>{cancelMsg}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  didReachMinimumFrame = frameCount => {
    const count = frameCount >= this.props.minFrame && this.requestCount === 0;
    return count;
  };

  didReachMaximumFrame = frameCount => {
    const count = frameCount >= this.props.maxFrames;
    return count;
  };

  didReachNextFrameInterval = frameCount => {
    const count = frameCount - this.prevFrameCount >= this.props.frameInterval;
    return count;
  };

  didReachMaxVariantCheck = () =>
    !(this.requestCount < this.props.variantCheckCount);

  isResultNotStabilized = frameCount => {
    return (
      this.props.isStabilized &&
      this.didReachNextFrameInterval(frameCount) &&
      this.requestCount > 0 &&
      !this.didReachMaxVariantCheck()
    );
  };

  shouldMakeApiRequest = frameCount => {
    return (
      this.didReachMinimumFrame(frameCount) ||
      this.didReachMaximumFrame(frameCount) ||
      this.isResultNotStabilized(frameCount)
    );
  };

  getTextureDims = () => {
    if (Platform.OS === "ios") {
      return {
        height: this.props.textureDims.ios.height,
        width: this.props.textureDims.ios.width,
      };
    }
    return {
      height: this.props.textureDims.android.height,
      width: this.props.textureDims.android.width,
    };
  };

  handleImageTensorReady = images => {
    if (this.rafID) {
      return;
    }
    this.setState({
      isReady: true,
    });
    let frameCount = 0;
    const { maxFrames, faceRefreshInterval } = this.props;

    const loop = async () => {
      if (this.shouldSkipLoop()) {
        return;
      }

      const imageTensor = images.next().value;
      await this.captureDataSample(imageTensor);

      tf.dispose(imageTensor);
      frameCount++;
      this.setState({
        elapsedFrames: frameCount > maxFrames ? maxFrames : frameCount,
      });
      if (this.shouldMakeApiRequest(frameCount)) {
        this.requestCount++;
        this.prevFrameCount = frameCount;
        this.initiateHRVAPIRequest(frameCount);
      }
      if (!this.didReachMaximumFrame(frameCount)) {
        this.rafID = requestAnimationFrame(loop);
      }
    };
    loop();
  };

  getCamView = () => {
    const textureDims = this.getTextureDims();
    const { maxFrames, enableFlash } = this.props;
    return (
      <View style={styles.cameraContainer}>
        {!this.state.isReady && this.renderLoadScreen()}
        {/* <TensorCamera
          // Standard Camera props
          style={styles.camera}
          type={Camera.Constants.Type.back}
          zoom={Platform.OS === "ios" ? 0 : 0}
          flashMode={
            enableFlash && this.state.isReady
              ? Camera.Constants.FlashMode.torch
              : Camera.Constants.FlashMode.off
          }
          // tensor related props
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={this.props.inputTensorDims.height}
          resizeWidth={this.props.inputTensorDims.width}
          resizeDepth={3}
          onReady={this.handleImageTensorReady}
          autorender={true}
        ></TensorCamera> */}
        <View style={styles.absoluteFill}>
          <View style={styles.progressBarContainer}>
            <Progress.Bar
              progress={this.state.elapsedFrames / maxFrames}
              width={null}
              height={12}
              borderRadius={12}
              color={"rgba(233,27,45,1)"}
              unfilledColor={"rgba(255,255,255,1)"}
              borderColor={"rgba(0,0,0,0)"}
            />
          </View>
          <View style={styles.closeOuter}></View>
          <View style={styles.closeInner}></View>
          <TouchableOpacity
            style={styles.close}
            onPress={() => {
              this.closeCamera();
            }}
          >
            <Text></Text>
          </TouchableOpacity>
        </View>
        <View></View>
      </View>
    );
  };

  renderActivityIndicator = () => {
    return (
      <View style={styles.loadingIndicator}>
        <ActivityIndicator size="large" color="#FF0266" />
      </View>
    );
  };

  renderLoadScreen = () => {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color="#FF0266" />
      </View>
    );
  };

  render() {
    if (this.props.showErrorMessage) {
      return (
        <View style={styles.alertContainer}>{this.displayErrorMessage()}</View>
      );
    }
    const { isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading && this.renderActivityIndicator()}
        {!isLoading && this.getCamView()}
      </View>
    );
  }
}

HeartRateVariability.propTypes = {
  triggerComputeHRV: PropTypes.func,
  showErrorMessage: PropTypes.bool,
  hrvSuccess: PropTypes.bool,
  faceRefreshInterval: PropTypes.number,
  maxFrames: PropTypes.number,
  removeAlert: PropTypes.func,
  initHrv: PropTypes.func,
  minFrame: PropTypes.number,
  variantCheckCount: PropTypes.number,
  frameInterval: PropTypes.number,
  isStabilized: PropTypes.bool,
  inputTensorDims: PropTypes.object,
  textureDims: PropTypes.object,
  setTensorReady: PropTypes.func,
  isTensorReady: PropTypes.bool,
  registerEvent: PropTypes.func,
  setFinalCall: PropTypes.func,
  enableFlash: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    hrvResults: state.heartRateVariability.hrvResults,
    hrvSuccess: state.heartRateVariability.hrvSuccess,
    showErrorMessage: state.heartRateVariability.showErrorMessage,
    isStabilized: state.heartRateVariability.isStabilized,
    maxFrames: pathOr(
      300,
      ["meta", "countryCommonMeta", "heartRateVariability", "maxFrames"],
      state
    ),
    faceRefreshInterval: pathOr(
      30,
      [
        "meta",
        "countryCommonMeta",
        "heartRateVariability",
        "faceRefreshInterval",
      ],
      state
    ),
    minFrame: pathOr(
      300,
      ["meta", "countryCommonMeta", "heartRateVariability", "minFrame"],
      state
    ),
    frameInterval: pathOr(
      50,
      ["meta", "countryCommonMeta", "heartRateVariability", "frameInterval"],
      state
    ),
    variantCheckCount: pathOr(
      0,
      [
        "meta",
        "countryCommonMeta",
        "heartRateVariability",
        "variantCheckCount",
      ],
      state
    ),
    textureDims: pathOr(
      {
        ios: {
          height: 1920,
          width: 1080,
        },
        android: {
          height: 1200,
          width: 1600,
        },
      },
      ["meta", "countryCommonMeta", "heartRateVariability", "textureDims"],
      state
    ),
    inputTensorDims: pathOr(
      {
        height: 640,
        width: 480,
      },
      ["meta", "countryCommonMeta", "heartRateVariability", "inputTensorDims"],
      state
    ),
    enableFlash: pathOr(
      true,
      ["meta", "countryCommonMeta", "heartRateVariability", "enableFlash"],
      state
    ),
    isTensorReady: state.heartRateVariability.isTensorReady,
  };
};

export default connect(mapStateToProps, {
  initHrv: () => ({
    type: actions.initHrv,
  }),
  setFinalCall: payload => ({
    context: screens.heartRateVariability,
    type: actions.setFinalApiCall,
    payload,
  }),
  triggerComputeHRV: payload => ({
    context: screens.heartRateVariability,
    type: actions.getHrv,
    payload,
    disableTimeout: true,
  }),
  removeAlert: () => ({
    context: screens.heartRateVariability,
    type: actions.resetErrorMessage,
  }),
  setTensorReady: () => ({
    context: screens.heartRateVariability,
    type: actions.setTensorReady,
  }),
  registerEvent,
})(HeartRateVariability);

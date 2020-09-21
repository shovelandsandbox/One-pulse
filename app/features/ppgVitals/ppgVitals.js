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
import { extractFace } from "./ppgMeasurements";
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

export class PPGVitals extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      elapsedFrames: 0,
      isReady: false,
    };

    this.capturedSamples = {
      time: [],
      redAv: [],
      greenAv: [],
      blueAv: [],
    };
    this.rectAnim = new Animated.Value(0);
    this.lineAnim = new Animated.Value(0);

    this.requestCount = 0;
    this.prevFrameCount = 0;
    this.registerErrorMsg = false;
  }

  closeCamera = () => {
    this.props.registerEvent(eventNames.cameraGoBack);
    NavigationService.goBack();
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== "granted") {
      this.props.registerEvent(eventNames.cameraPermissionDenied);
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

    this.props.initPpgVitals();
    if (!this.props.isTensorReady) {
      initialiseTensorCamera();
      this.props.setTensorReady();
    }
    this.faceDetector = await this.loadFaceDetectionModel(blazeface);

    this.setState({
      isLoading: false,
    });
    this.props.registerEvent(eventNames.onCameraLoad);
  }

  loadFaceDetectionModel = async modelToLoad => {
    try {
      return await modelToLoad.load({ maxFaces: 1 });
    } catch (e) {
      console.log("failed to load model " + this.props.faceDetectionModel, e);
    }
  };

  cancelAnimation = () => {
    if (this.rafID) {
      cancelAnimationFrame(this.rafID);
      this.rafID = null;
    }
  };

  componentWillUnmount() {
    this.cancelAnimation();
  }

  getRectangleCoordinatePoints = face => {
    const { topLeft, bottomRight } = face;
    // const { width, height } = this.getTextureDims();
    // const { inputTensorDims } = this.props;
    // const widthRatio = width / inputTensorDims.width;
    // const heightRatio = height / inputTensorDims.height;

    const offsetLeft = 0;
    const offsetRight = 0;
    const offsetTop = 0;
    const offsetBottom = 0;

    const output = {
      topLeft: {
        x: topLeft[0] + offsetLeft,
        y: topLeft[1] + offsetTop,
      },
      topRight: {
        x: bottomRight[0] + offsetRight,
        y: topLeft[1] + offsetTop,
      },
      bottomRight: {
        x: bottomRight[0] + offsetRight,
        y: bottomRight[1] + offsetBottom,
      },
      bottomLeft: {
        x: topLeft[0] + offsetLeft,
        y: bottomRight[1] + offsetBottom,
      },
    };
    console.log("face: ", face);
    console.log("output: ", output);
    return output;
  };

  drawFace = (f, c) => {
    const { rectAnim, lineAnim } = this;
    const { scannerLineHeight } = this.props;

    const w = Math.abs(c.bottomLeft.x - c.bottomRight.x);
    const h = Math.abs(c.topLeft.y - c.bottomLeft.y - scannerLineHeight);

    const inputRange = [0, this.props.maxFrames / 10];
    const outputRange = [0, h];

    const lineInputRange = [0, this.props.maxFrames / 10];
    const lineOutputRange = [c.topLeft.y, c.topLeft.y + h];
    const lineOutputRange2 = [c.topLeft.y, c.topLeft.y + h];
    // [...Array(this.props.maxFrames / 10)].forEach((_, i) => {
    //   inputRange.push(i);
    //   outputRange.push(i % 2 == 0 ? 0 : h);
    //   lineInputRange.push(i);
    //   lineOutputRange.push(i % 2 == 0 ? c.topLeft.y + 1 : c.topLeft.y + h + 1);
    //   lineOutputRange2.push(i % 2 == 0 ? c.topLeft.y + 1 : c.topLeft.y + h + 1);
    // });

    const animateHeight = rectAnim.interpolate({
      inputRange,
      outputRange,
    });
    const animateY1 = lineAnim.interpolate({
      inputRange: lineInputRange,
      outputRange: lineOutputRange,
    });
    const animateY2 = lineAnim.interpolate({
      inputRange: lineInputRange,
      outputRange: lineOutputRange2,
    });
    // const { inputTensorDims } = this.props;
    return (
      <G>
        {/* <Rect
          y={2}
          x={2}
          height={inputTensorDims.height - 4}
          width={inputTensorDims.width - 4}
          fill={"#fff"}
          fillOpacity={"0.6"}
          strokeWidth="1"
          stroke="red"
        /> */}
        {this.props.showAnimatedRect && (
          <AnimatedRect
            y={c.topLeft.y}
            x={c.topLeft.x}
            height={animateHeight}
            width={w}
            fill={"#fff"}
            fillOpacity={"0.6"}
          />
        )}

        {this.props.showAnimatedLine && (
          <AnimatedLine
            x1={c.topLeft.x}
            y1={animateY1}
            x2={c.topRight.x}
            y2={animateY2}
            stroke={"rgba(0, 174, 17, 0.4)"}
            strokeWidth="2"
          />
        )}

        <Path
          d={`M ${c.topLeft.x} ${c.topLeft.y} H ${c.topLeft.x + 10} 
            M ${c.topLeft.x} ${c.topLeft.y} V ${c.topLeft.y + 10} 
            M ${c.topRight.x} ${c.topRight.y} H ${c.topRight.x - 10} 
            M ${c.topRight.x} ${c.topRight.y} V ${c.topRight.y + 10} 
            M ${c.bottomRight.x} ${c.bottomRight.y} H ${c.bottomRight.x - 10} 
            M ${c.bottomRight.x} ${c.bottomRight.y} V ${c.bottomRight.y - 10} 
            M ${c.bottomLeft.x} ${c.bottomLeft.y} H ${c.bottomLeft.x + 10} 
            M ${c.bottomLeft.x} ${c.bottomLeft.y} V ${c.bottomLeft.y - 10} 
          `}
          strokeWidth="1"
          stroke="white"
        />
      </G>
    );
  };

  renderFaces() {
    const { faces } = this;

    if (faces != null && faces.length > 0) {
      const f = faces[0];
      const c = this.getRectangleCoordinatePoints(f);
      const faceBox = this.drawFace(f, c);
      const flipHorizontal = Platform.OS === "ios" ? 1 : -1;
      const { inputTensorDims } = this.props;
      console.log("face dimensions --->>>>  ", c);
      console.log("RN dimensions ---> ", width, height);

      return (
        <Svg
          height="100%"
          width="100%"
          // viewBox={`0 0 ${inputTensorDims.width} ${inputTensorDims.height}`}
          viewBox={`0 0 ${inputTensorDims.width} ${inputTensorDims.height}`}
          scaleX={flipHorizontal}
        >
          {faceBox}
        </Svg>
      );
    }
    return null;
  }

  shouldSkipLoop = () => {
    return this.props.ppgVitalsSuccess || this.props.showErrorMessage;
  };

  fetchFaces = async (imageTensor, faceDetector) => {
    try {
      return await faceDetector.estimateFaces(imageTensor, false, true, true);
    } catch (error) {
      console.log("error: tf logs ", error);
    }
  };

  captureFaceSample = async (imageTensor, faces) => {
    try {
      const extractedData = await extractFace(imageTensor, faces);

      if (extractedData) {
        this.capturedSamples.time.push(extractedData.time);
        this.capturedSamples.redAv.push(extractedData.redAvg);
        this.capturedSamples.greenAv.push(extractedData.greenAvg);
        this.capturedSamples.blueAv.push(extractedData.blueAvg);
      }
    } catch (error) {
      console.log("error: tf logs extracteddata", error);
    }
  };

  initiatePPGVitalsAPIRequest = frameCount => {
    //dispatch redux action to invoke API, passing the four arrays as payload
    this.cancelAnimation();
    this.props.setFinalCall({
      isFinalApiCall:
        this.didReachMaximumFrame(frameCount) || this.didReachMaxVariantCheck(),
      isMaxFrame: this.didReachMaximumFrame(frameCount),
    });
    this.props.registerEvent(eventNames.saveImageDataApi);
    this.props.triggerComputePPGVitals(this.capturedSamples);
  };

  resetValues = () => {
    this.props.initPpgVitals();
    this.requestCount = 0;
    this.capturedSamples = {
      time: [],
      redAv: [],
      greenAv: [],
      blueAv: [],
    };
    this.prevFrameCount = 0;
    this.rectAnimationStarted = false;
    this.lineAnimationStarted = false;
  };

  displayErrorMessage = () => {
    if (this.registerErrorMsg === false) {
      this.registerErrorMsg = true;
      this.props.registerEvent(eventNames.errorOccured);
    }
    const errorText = safeMetaLabelFinder("ppgVitals", "failureMsg");
    const tryAgain = safeMetaLabelFinder("ppgVitals", "tryAgain");
    const cancelMsg = safeMetaLabelFinder("ppgVitals", "cancelMsg");

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

      if (this.faceDetector != null) {
        const imageTensor = images.next().value;
        if (frameCount % faceRefreshInterval == 0) {
          this.faces = await this.fetchFaces(imageTensor, this.faceDetector);
        }
        await this.captureFaceSample(imageTensor, this.faces);

        tf.dispose(imageTensor);
      }
      frameCount++;
      this.setState({
        elapsedFrames: frameCount > maxFrames ? maxFrames : frameCount,
      });
      if (this.shouldMakeApiRequest(frameCount)) {
        this.requestCount++;
        this.prevFrameCount = frameCount;
        this.initiatePPGVitalsAPIRequest(frameCount);
      }
      if (!this.didReachMaximumFrame(frameCount)) {
        this.rafID = requestAnimationFrame(loop);
        this.startAnimation();
      }
    };
    loop();
  };

  startAnimation = () => {
    if (this.props.showAnimatedRect && !this.rectAnimationStarted) {
      this.startRectAnimation();
      this.rectAnimationStarted = true;
    }
    if (this.props.showAnimatedLine && !this.lineAnimationStarted) {
      this.startLineAnimation();
      this.lineAnimationStarted = true;
    }
  };

  startRectAnimation = () => {
    this.rectAnim.setValue(0);
    const { animationDurationMs, maxFrames } = this.props;

    Animated.timing(this.rectAnim, {
      toValue: maxFrames / 10,
      duration: animationDurationMs,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(this.startRectAnimation);
  };

  startLineAnimation = () => {
    this.lineAnim.setValue(0);
    const { animationDurationMs, maxFrames } = this.props;

    Animated.timing(this.lineAnim, {
      toValue: maxFrames / 10,
      duration: animationDurationMs,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(this.startLineAnimation);
  };

  getCamView = () => {
    const textureDims = this.getTextureDims();
    const { maxFrames } = this.props;
    return (
      <View style={styles.cameraContainer}>
        {!this.state.isReady && this.renderLoadScreen()}
        {/* <TensorCamera
          // Standard Camera props
          style={styles.camera}
          type={Camera.Constants.Type.front}
          zoom={Platform.OS === "ios" ? 0 : 0}
          //flashMode={Camera.Constants.FlashMode.on}
          // tensor related props
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={this.props.inputTensorDims.height}
          resizeWidth={this.props.inputTensorDims.width}
          resizeDepth={3}
          onReady={this.handleImageTensorReady}
          autorender={true}
        ></TensorCamera> */}
        <View style={styles.modelResults}>{this.renderFaces()}</View>
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

PPGVitals.propTypes = {
  triggerComputePPGVitals: PropTypes.func,
  showErrorMessage: PropTypes.bool,
  ppgVitalsSuccess: PropTypes.bool,
  faceRefreshInterval: PropTypes.number,
  maxFrames: PropTypes.number,
  removeAlert: PropTypes.func,
  initPpgVitals: PropTypes.func,
  minFrame: PropTypes.number,
  variantCheckCount: PropTypes.number,
  frameInterval: PropTypes.number,
  isStabilized: PropTypes.bool,
  inputTensorDims: PropTypes.object,
  textureDims: PropTypes.object,
  showAnimatedLine: PropTypes.bool,
  showAnimatedRect: PropTypes.bool,
  faceDetectionModel: PropTypes.string,
  scannerLineHeight: PropTypes.number,
  animationDurationMs: PropTypes.number,
  setTensorReady: PropTypes.func,
  isTensorReady: PropTypes.bool,
  registerEvent: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    ppgVitalsResults: state.ppgVitals.ppgVitalsResults,
    ppgVitalsSuccess: state.ppgVitals.ppgVitalsSuccess,
    showErrorMessage: state.ppgVitals.showErrorMessage,
    isStabilized: state.ppgVitals.isStabilized,
    maxFrames: pathOr(
      300,
      ["meta", "countryCommonMeta", "ppgVitals", "maxFrames"],
      state
    ),
    faceRefreshInterval: pathOr(
      30,
      ["meta", "countryCommonMeta", "ppgVitals", "faceRefreshInterval"],
      state
    ),
    minFrame: pathOr(
      300,
      ["meta", "countryCommonMeta", "ppgVitals", "minFrame"],
      state
    ),
    frameInterval: pathOr(
      50,
      ["meta", "countryCommonMeta", "ppgVitals", "frameInterval"],
      state
    ),
    variantCheckCount: pathOr(
      0,
      ["meta", "countryCommonMeta", "ppgVitals", "variantCheckCount"],
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
      ["meta", "countryCommonMeta", "ppgVitals", "textureDims"],
      state
    ),
    inputTensorDims: pathOr(
      {
        height: 640,
        width: 480,
      },
      ["meta", "countryCommonMeta", "ppgVitals", "inputTensorDims"],
      state
    ),
    showAnimatedRect: pathOr(
      false,
      ["meta", "countryCommonMeta", "ppgVitals", "showAnimatedRect"],
      state
    ),
    showAnimatedLine: pathOr(
      false,
      ["meta", "countryCommonMeta", "ppgVitals", "showAnimatedLine"],
      state
    ),
    scannerLineHeight: pathOr(
      2,
      ["meta", "countryCommonMeta", "ppgVitals", "scannerLineHeight"],
      state
    ),
    animationDurationMs: pathOr(
      3 * 1000,
      ["meta", "countryCommonMeta", "ppgVitals", "animationDurationMs"],
      state
    ),
    isTensorReady: state.ppgVitals.isTensorReady,
  };
};

export default connect(mapStateToProps, {
  initPpgVitals: () => ({
    type: actions.initPpgVitals,
  }),
  setFinalCall: payload => ({
    context: screens.PPGVitals,
    type: actions.setFinalApiCall,
    payload,
  }),
  triggerComputePPGVitals: payload => ({
    context: screens.ppgVitals,
    type: actions.getPPGVitals,
    payload,
    disableTimeout: true,
  }),
  removeAlert: () => ({
    context: screens.ppgVitals,
    type: actions.resetErrorMessage,
  }),
  setTensorReady: () => ({
    context: screens.ppgVitals,
    type: actions.setTensorReady,
  }),
  registerEvent,
})(PPGVitals);

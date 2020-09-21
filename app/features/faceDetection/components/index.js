/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import { PropTypes } from "mobx-react";
// import PruCameraComponent from "../../../components/PruExpoCamera";
import actions from "../configs/actions";
import screenNames from "../configs/screen-names";
import { safeMetaLabelFinder } from "../../../utils/meta-utils";
import { CustomAlert } from "../../../components";
import { CoreServices } from "@pru-rt-internal/pulse-common";
import { EYE_MONITORING_BACK_ARROW } from "../../../config/images";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { eventNames } from "../events";
import { styles } from "./style";
const { NavigationService } = CoreServices;

class FaceDetectorComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.captureCount = 0;
  }

  componentDidMount() {
    this.props.initFaceDetection();
    this.props.sendEvent(eventNames.onCameraLoad);
  }

  closeCamera = () => {
    this.props.sendEvent(eventNames.cameraGoBack);
    NavigationService.navigate("MainTab");
  };

  cameraMounted = () => {
    this.props.sendEvent(eventNames.onCameraLoad);
  };

  onTakePicture = type => {
    this.props.sendEvent(eventNames.takePicture, {
      type,
    });
  };

  uploadPicture = data => {
    this.captureCount++;
    const sourceType = pathOr(
      "camera",
      ["navigation", "state", "params", "sourceType"],
      this.props
    );
    this.props.sendEvent(eventNames.savePictureApi);
    this.props.savePicture(data, this.props.enableButtonClick, sourceType);
  };

  showErrorMessage = () => {
    CustomAlert.show(
      "",
      safeMetaLabelFinder("healthAI", "eyeMonitoringErrorMsg"),
      {
        positiveText: safeMetaLabelFinder("healthAI", "okay"),
        onPositivePress: () => {
          this.props.hideErrorMessage();
        },
      }
    );
  };

  shouldTakePicture = () => {
    const { maximumCaptures, enableButtonClick } = this.props;
    return this.captureCount <= maximumCaptures && !enableButtonClick;
  };

  takePictureCheck = () => {
    return this.captureCount < this.props.maximumCaptures;
  };

  renderErrorModal = () => {
    const { enableButtonClick, showErrorMessage, maximumCaptures } = this.props;
    if (showErrorMessage) {
      if (enableButtonClick || this.captureCount >= maximumCaptures) {
        this.props.sendEvent(eventNames.errorModal);
        this.showErrorMessage();
      }
    }
  };

  renderHeader = () => {
    return (
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => this.closeCamera()}
        hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
      >
        <Image
          source={EYE_MONITORING_BACK_ARROW}
          style={styles.backButtonImage}
        />
      </TouchableOpacity>
    );
  };

  render() {
    this.renderErrorModal();
    return (
      <View style={styles.wrapper}>
        {/* <PruCameraComponent
          enableButtonClick={this.props.enableButtonClick}
          enableCameraToggle={this.props.enableCameraToggle}
          resetTakePicture={this.props.resetTakePicture}
          closeCamera={this.closeCamera}
          pauseCapture={this.props.pauseCapture}
          uploadPicture={this.uploadPicture}
          takePictureOptions={{
            quality: 0.1,
            base64: true,
          }}
          screenId={"faceDetection"}
          cameraMounted={this.cameraMounted}
          onTakePicture={this.onTakePicture}
          takePictureCheck={this.takePictureCheck}
          cameraSettings={{
            type: "front",
            zoom: 0,
            whiteBalance: "auto",
            focusDepth: 0,
          }}
          showErrorMessage={this.props.showErrorMessage}
        /> */}
        {this.renderHeader()}
        {!this.props.showLoadingText && (
          <View
            style={{
              height: 34,
              width: "100%",
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              bottom: 20,
              position: "absolute",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 12.7,
                lineHeight: 16.7,
                alignSelf: "center",
                textAlign: "center",
                paddingHorizontal: 10,
              }}
              numberOfLines={3}
            >
              {safeMetaLabelFinder("healthAI", "focusCameraText")}
            </Text>
          </View>
        )}
        {this.props.showLoadingText && (
          <View
            style={{
              height: 34,
              width: "100%",
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "center",
              bottom: 20,
              position: "absolute",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 14,
                lineHeight: 19,
                alignSelf: "center",
                textAlign: "center",
                paddingHorizontal: 10,
              }}
              numberOfLines={2}
            >
              {safeMetaLabelFinder("healthAI", "loadCameraText")}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

FaceDetectorComponent.propTypes = {
  maximumCaptures: PropTypes.number,
  showLoadingText: PropTypes.bool,
  savePicture: PropTypes.func,
  pauseCapture: PropTypes.func,
  hideErrorMessage: PropTypes.func,
  showErrorMessage: PropTypes.bool,
  resetTakePicture: PropTypes.func,
  initFaceDetection: PropTypes.func,
  enableButtonClick: PropTypes.bool,
  enableCameraToggle: PropTypes.bool,
  sendEvent: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    maximumCaptures: pathOr(
      5,
      ["meta", "countryCommonMeta", "maximumCaptures"],
      state
    ),
    showLoadingText: state.faceDetection.showLoadingText,
    showErrorMessage: state.faceDetection.showErrorMessage,
    enableButtonClick: pathOr(
      true,
      ["meta", "countryCommonMeta", "faceDetection", "enableButtonClick"],
      state
    ),
    enableCameraToggle: pathOr(
      false,
      ["meta", "countryCommonMeta", "faceDetection", "enableCameraToggle"],
      state
    ),
  };
};

const mapDispatchToProps = dispatch => ({
  sendEvent: (type, attribute) => {
    dispatch(registerEvent(type, attribute));
  },
  savePicture: (pictureInfo, enableButtonClick, sourceType) => {
    dispatch({
      context: screenNames.FACE_DETECTION,
      type: actions.savePicture,
      payload: {
        pictureInfo,
        sourceType,
      },
      disableTimeout: true,
      mode: enableButtonClick ? "manual" : "auto",
    });
  },
  pauseCapture: () => {
    dispatch({
      type: "faceDetection/disableTakePicture",
      context: "FACE_DETECTION",
    });
  },
  hideErrorMessage: () => {
    dispatch({
      type: actions.hideErrorMessage,
      context: "FACE_DETECTION",
    });
  },
  resetTakePicture: () => {
    dispatch({
      type: actions.resetTakePicture,
      context: "FACE_DETECTION",
    });
  },
  initFaceDetection: () => {
    dispatch({
      type: actions.initFaceDetection,
      context: "FACE_DETECTION",
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FaceDetectorComponent);

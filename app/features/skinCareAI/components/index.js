/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
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
const { NavigationService } = CoreServices;

class SkinCareComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.captureCount = 0;
  }

  componentDidMount() {
    this.props.initSkinCareAI();
  }

  cameraMounted = () => {
    this.props.sendEvent(eventNames.onSkinCareAICameraLoad);
  };

  onTakePicture = type => {
    this.props.sendEvent(eventNames.takePictureSkinCareAI, {
      type,
    });
  };

  closeCamera = () => {
    this.props.sendEvent(eventNames.cameraGoBackSkinCareAI);
    NavigationService.navigate("MainTab");
  };

  uploadPicture = data => {
    this.captureCount++;
    const sourceType = pathOr(
      "camera",
      ["navigation", "state", "params", "sourceType"],
      this.props
    );
    this.props.sendEvent(eventNames.savePictureApiSkinCareAI);
    this.props.savePicture(data, this.props.enableButtonClick, sourceType);
  };

  showErrorMessage = () => {
    CustomAlert.show(
      "",
      safeMetaLabelFinder("skinCareAI", "skinCareErrorMsg"),
      {
        positiveText: safeMetaLabelFinder("skinCareAI", "okay"),
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
        this.props.sendEvent(eventNames.errorModalSkinCareAI);
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
          screenId={"skinCare"}
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
              {safeMetaLabelFinder("skinCareAI", "focusCameraText")}
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
              {safeMetaLabelFinder("skinCareAI", "loadCameraText")}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

SkinCareComponent.propTypes = {
  maximumCaptures: PropTypes.number,
  showLoadingText: PropTypes.bool,
  savePicture: PropTypes.func,
  pauseCapture: PropTypes.func,
  hideErrorMessage: PropTypes.func,
  showErrorMessage: PropTypes.bool,
  resetTakePicture: PropTypes.func,
  initSkinCareAI: PropTypes.func,
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
    showLoadingText: state.skinCareAI.showLoadingText,
    showErrorMessage: state.skinCareAI.showErrorMessage,
    enableButtonClick: pathOr(
      true,
      ["meta", "countryCommonMeta", "skinCareAI", "enableButtonClick"],
      state
    ),
    enableCameraToggle: pathOr(
      false,
      ["meta", "countryCommonMeta", "skinCareAI", "enableCameraToggle"],
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
      context: screenNames.SKIN_CARE_AI,
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
      type: "skinCareAI/disableTakePicture",
      context: "SKIN_CARE_AI",
    });
  },
  hideErrorMessage: () => {
    dispatch({
      type: actions.hideErrorMessage,
      context: "SKIN_CARE_AI",
    });
  },
  resetTakePicture: () => {
    dispatch({
      type: actions.resetTakePicture,
      context: "SKIN_CARE_AI",
    });
  },
  initSkinCareAI: () => {
    dispatch({
      type: actions.initSkinCareAI,
      context: "SKIN_CARE_AI",
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SkinCareComponent);

const styles = StyleSheet.create({
  backButton: {
    height: 25,
    justifyContent: "center",
    left: 24,
    position: "absolute",
    top: 30,
    width: 25,
    zIndex: 100,
  },
  backButtonImage: {
    height: 12.5,
    width: 15,
  },
  wrapper: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});

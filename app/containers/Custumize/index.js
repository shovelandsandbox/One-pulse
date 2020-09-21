import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  Text
} from "react-native";
import MetaConstants from "./meta";

const { pageKeys } = CoreConfig;
import { Theme } from "../../themes";
const { Colors, Fonts } = Theme;

import {
  CoreActionTypes,
  CoreConfig,
  CoreUtils
} from "@pru-rt-internal/pulse-common";
const { isNilOrEmpty } = CoreUtils;
const { KEY_CALCULATE_BMI } = CoreActionTypes;

import { connect } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import OpenSettings from "react-native-open-settings";
import { CustomAlert } from "../../components";

const KEY_BMI_TITLE = "uploadyourselfie";

class Custumize extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFingerprintEnabled: false
    };
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  showCamera = () => {
    const { sessionId, calculateBmi } = this.props;
    const cameraPermission = this.metaConstants.KEY_CAMERA_PERMISSION_LABEL;
    const ok = this.metaConstants.KEY_OK_LABEL.toUpperCase();
    const cancel = this.metaConstants.KEY_CANCEL_LABEL;

    ImagePicker.openCamera({
      width: 200,
      height: 200,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      includeBase64: true,
      useFrontCamera: true,
      compressImageQuality: 0.8,
      photo: "photo"
    })
      .then(image => {
        if (!isNilOrEmpty(sessionId)) {
          calculateBmi(sessionId, image.data);
        }
      })
      .catch(error => {
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          CustomAlert.show(
            "",
            cameraPermission,
            {
              positiveText: ok,
              onPositivePress: () => {
                OpenSettings.openSettings();
              },
            },
            {
              negativeText: cancel,
              onNegativePress: () =>{},
            }
          );
        }
      });
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.userLanguagePreference !== nextProps.userLanguagePreference
    ) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  componentDidMount() {
    this.showCamera();
  }

  render() {
    return (
      <ScrollView style={{ backgroundColor: Colors.white }}>
        <View
          style={{
            marginLeft: 42,
            marginRight: 40
          }}
        >
          {/* <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: Colors.pulseRed,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              this.showCamera();
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontFamily: Fonts.fontFamilyBold,
                fontSize: 20
              }}
            >
              Take a Selfie
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    userPreferences: state.userPreferences,
    sessionId: state.auth.token,
    userProfile: state.profile,
    userLanguagePreference: state.userPreferences.language
  };
};
export default connect(mapStateToProps, {
  calculateBmi: (sessionId, image) => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.KEY_CALCULATE_BMI,
    payload: {
      sessionId,
      data: image,
      KEY_BMI_TITLE,
      bmiFeedbackCall: false
    }
  }),
  resetBMIError: () => ({
    type: CoreActionTypes.RESET_BMI_ERROR
  })
})(Custumize);

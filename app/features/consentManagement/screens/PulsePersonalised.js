/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-depth */
/* eslint-disable react/prop-types */
/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, BackHandler, Platform } from "react-native";
import { connect } from "react-redux";
import Styles from "./styles";
import { screenNames } from "../config/screenNames";
import * as actionsNames from "../config/actionNames";
import MetaConstants from "../meta";
import LinearGradient from "react-native-linear-gradient";
import {
  CoreActionTypes,
  CoreConfig
} from "@pru-rt-internal/pulse-common";
import { path } from "ramda";
import {
  PULSE_PERSONALISED_IMAGE
} from "../../../config/images";

const { pageKeys } = CoreConfig;

class PulsePersonalised extends Component {
  constructor(props) {
    super(props);
    this.state = { };
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  UNSAFE_componentWillMount() {
    if (Platform.OS === "android") {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress");
    }
  }

  onAndroidBackPress = () => {
    return true;
  };

  continueToViewDigitalScreen = () => {
    const payload = path(["navigation", "state", "params"], this.props);
    console.log(payload);
    this.props.goToFullAssessment(payload);
  };

  updateMarketingConsent = () => {
    const payload = {
      status: true,
      babylonParams: path(["navigation", "state", "params"], this.props)
    };
    this.props.updateMarketingConsent(payload);
  };

  render() {
    const title = this.metaConstants.pulsePersonalisedTitle;
    const description = this.metaConstants.pulsePersonalisedDescription;
    const cancelBtn = this.metaConstants.pulsePersonalisedCancelButton;
    const continueBtn = this.metaConstants.pulsePersonalisedContinueButton;
    return (
      <ScrollView
        style={Styles.pulsePersonalisedContainer}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center"
          }}
        >
          <View>
            <Text
              style={Styles.pulsePersonalisedTitle}
            >
              {title}
            </Text>
            <Text
              style={Styles.pulsePersonalisedDesc}
            >
              {description}
            </Text>
          </View>

          <Image
            source={PULSE_PERSONALISED_IMAGE}
            style={Styles.pulsePersonalisedImage}
          >
          </Image>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 45
            }}
          >
            <TouchableOpacity
              style={Styles.pulsePersonalisedNegativeBtn}
              onPress={() => {
                this.continueToViewDigitalScreen()
              }}
            >
              <Text
                style={Styles.pulsePersonalisedNegativeBtnText}
              >
                {cancelBtn}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.pulsePersonalisedPositiveBtn}
              onPress={() => {
                this.updateMarketingConsent()
              }}
            >
              <LinearGradient
                colors={["#ec1c2e", "#a21421"]}
                style={Styles.pulsePersonalisedPositiveBtnGradient}
              >
                <Text
                  style={Styles.pulsePersonalisedPositiveBtnText}
                >
                  {continueBtn}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    termsConditions: state.auth.termsConditions
  };
};

export default connect(mapStateToProps, {
  goToFullAssessment: params => ({
    context: pageKeys.CHAT_CONVERSATION,
    type: CoreActionTypes.GO_TO_FULL_ASSESSMENT,
    payload: {
      params,
    },
  }),
  updateMarketingConsent: payload => ({
    context: screenNames.MARKETING_CONSENT,
    type: actionsNames.MARKETING_CONSENT_STATUS,
    payload,
  }),
})(PulsePersonalised);

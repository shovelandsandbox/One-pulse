import { StaticChatMessageCard } from "../../../../components/ChatBot/ChatBotMessage";
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Text,
  Image
} from "react-native";
import { connect } from "react-redux";
import {
  CoreConfig,
  metaHelpers,
  CoreActionTypes
} from "@pru-rt-internal/pulse-common";
import {
  BACK,
  DOC_INLINE_LOGO,
  BABYLON_LOGO_BLUE
} from "../../../../config/images";
import ScreenNames from "../../configs/ScreenNames";
const {
  TALKTOADOCTOR,
  TALKTOADOCTOR_IJUSTNEEDSTARTED,
  TALKTOADOCTOR_GETSTARTED
} = CoreConfig;
const { pageKeys } = CoreConfig;

class DocGetStarted extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.GET_CUSTOMER_DETAILS();
  }
  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={[
            {
              width: "100%",
              height: 52,
              backgroundColor: "#ffffff",
              alignItems: "center",
              paddingLeft: 11,
              paddingRight: 11,
              flexDirection: "row",
              justifyContent: "space-between"
            }
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("PulseHealth");
            }}
            style={{
              width: 55,
              height: 55,
              alignItems: "flex-start",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                width: 20,
                height: 20,
                left: 0
              }}
              source={BACK}
            />
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => showHistory()}
            accessibilityLabel="home"
            accesible
            style={{
              width: 76,
              height: "100%",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              style={{
                width: 60,
                height: 30
              }}
              resizeMode="contain"
              source={DOC_INLINE_LOGO}
            />
          </TouchableOpacity>
        </View>
        <StaticChatMessageCard
          value={
            metaHelpers.findElement(
              TALKTOADOCTOR,
              TALKTOADOCTOR_IJUSTNEEDSTARTED
            ).label
          }
          title={
            metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_GETSTARTED)
              .label
          }
          _onPress={() => {
            this.props.navigation.navigate(ScreenNames.DOC_REGISTRATION_SCREEN);
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps, {
  GET_CUSTOMER_DETAILS: payload => ({
    context: pageKeys.PROFILE,
    type: CoreActionTypes.GET_CUSTOMER_DETAILS
  })
})(DocGetStarted);

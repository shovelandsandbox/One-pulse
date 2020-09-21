/* eslint-disable */
import React, { Component } from "react";
import {
  View,
  Image,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import {
  CoreComponents,
  CoreConfig,
  CoreUtils,
  metaHelpers,
  CoreConstants,
  CoreActionTypes
} from "@pru-rt-internal/pulse-common";
import { CLOSE } from "../../config/images";
const KEY_REGISTER = "registerlabel";
import { gotoPulseRegistration, gotoLogin } from "../../actions";

import { activeTheme } from "../../themes";
import loginStyles from "./style";

const { pageKeys, SING_IN, SING_IN_REGISTERLABEL } = CoreConfig;

const CONNECT_FB = "connectFb";
const CONNECT_GOOGLE = "connectGoogle";

const { AppButton, SocialLogin } = CoreComponents;
const LOGIN_WITH_GOOGLE = "loginGoogle";

class MoreLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      exception: false
    };
  }

  goToRegister = () => {
    this.props.gotoPulseRegistration();
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={() => this.props.gotoLogin()}
            style={{ marginTop: 20, marginRight: 15 }}
            accessibilityLabel="loginBtn"
            accesible
          >
            <Image
              style={{
                width: 28.3,
                height: 28.3,
                marginLeft: 15
              }}
              source={CLOSE}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={component => (this._scrollView = component)}
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            paddingBottom: 50,
            paddingTop: 50
          }}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View
              style={loginStyles.container}
              accessibilityLabel="container"
              accesible
            >
              <View style={loginStyles.subContainer4}>
              {(Platform.OS !== "ios") && (<SocialLogin
                  context={pageKeys.LOGIN}
                  fbText={metaHelpers.findCommon(CONNECT_FB).label}
                  gmailText={metaHelpers.findCommon(CONNECT_GOOGLE).label}
                  gmailText={metaHelpers.findCommon(LOGIN_WITH_GOOGLE).label}
                  // isGoogle
                  {...this.props}
                />)}

                <AppButton
                  type={[
                    activeTheme.btn,
                    activeTheme.primary,
                    loginStyles.goRegisterBtn
                  ]}
                  title={
                    metaHelpers.findElement(SING_IN, SING_IN_REGISTERLABEL)
                      .label
                  }
                  textStyle={loginStyles.goRegisterBtnText}
                  // title={metaHelpers.findElement(SCREEN_KEY_LOGIN, KEY_REGISTER).label}
                  press={this.goToRegister.bind(this)}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, {
  gotoPulseRegistration,
  gotoLogin
})(MoreLogin);

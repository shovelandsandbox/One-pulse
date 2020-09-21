import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { gotoLogin } from "../../actions";
import {
  CoreComponents,
  CoreConfig,
  metaHelpers,
  CoreActionTypes,
  CoreSelectors
} from "@pru-rt-internal/pulse-common";
import { configureLineHeight } from "../../utils/lineHeightsUtils";
const { ForgotPasswordSelector } = CoreSelectors;
import { RESET_SUCCESS, CLOSE_PAGE } from "../../config/images";
const { AppButton } = CoreComponents;
const {
  ElementErrorManager,
  SCREEN_KEY_FORGOT_PASSWORD,
  NEW_EMAIL_FORGOTPASSWORD,
  NEW_EMAIL_FORGOTPASSWORD_SUCCESSFULLY,
  NEW_EMAIL_FORGOTPASSWORD_DESC,
  NEW_EMAIL_FORGOTPASSWORD_SINGIN
} = CoreConfig;

const KEY_SEND_OTP = "Next";

import { activeTheme } from "../../themes";

import AuthWrapper from "../../features/auth/components/AuthWrapper";

class EmailOpt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnTitle: metaHelpers.findElement(
        SCREEN_KEY_FORGOT_PASSWORD,
        KEY_SEND_OTP
      ).label,
      disable: false
    };
  }

  _onClose() {
    this.props.gotoLogin();
  }

  onSend = () => {
    this.props.gotoLogin();
  };

  componentDidMount() {
    this.props.resetOTPError();
  }

  render() {
    ElementErrorManager.setCurrentScreen(SCREEN_KEY_FORGOT_PASSWORD);
    return (
      <AuthWrapper
        needLang={false}
        customStyles={{ paddingTop: 31, paddingHorizontal: 23 }}
        country={this.props.userCountryDetails.simCountry}
      >
        <View style={{ flex: 1, height: '100%' }}>
          <View style={{ flex: 1, height: '100%' }}>
            <View style={{ margin: 30 }}>
              <Text
                style={{...activeTheme.screenTitle, ...configureLineHeight("22")}}
                accessibilityLabel="screenTitle"
                accesible
              >
                {
                  metaHelpers.findElement(
                    NEW_EMAIL_FORGOTPASSWORD,
                    NEW_EMAIL_FORGOTPASSWORD_SUCCESSFULLY
                  ).label
                }
              </Text>
              <Text
                style={[activeTheme.screenDescription1, { height: 90 }]}
                accessibilityLabel="screenDescription"
                accesible
              >
                {
                  metaHelpers.findElement(
                    NEW_EMAIL_FORGOTPASSWORD,
                    NEW_EMAIL_FORGOTPASSWORD_DESC
                  ).label
                }
              </Text>
            </View>
          </View>
          <View>
            <AppButton
              type={[
                activeTheme.btn, 
                activeTheme.primary, 
                {
                  height: 44,
                  width: 200,
                  borderRadius: 22,
                  backgroundColor: "#ed1b2e",
                }, 
                { 
                  width: Dimensions.get('window').width*0.8,
                }
              ]}
              textStyle={{  
                color: "#fff",
                fontSize: 16,
                fontWeight: "500",
                lineHeight: 22,
              }}
              title={
                metaHelpers.findElement(
                  NEW_EMAIL_FORGOTPASSWORD,
                  NEW_EMAIL_FORGOTPASSWORD_SINGIN
                ).label
              }
              press={this.onSend.bind(this)}
            />
          </View>
        </View>
      </AuthWrapper>
    );
  }
}

const mapStateToProps = state => ({
  meta: state.meta,
  validatingOtp: state.forgotPassword.validatingOtp,
  validateOtpError: state.forgotPassword.validateOtpError,
  generatingOtp: state.forgotPassword.generatingOtp,
  generatedOtpResponse: ForgotPasswordSelector.getGeneratedOtpResponse(state),
  generateOtpError: state.forgotPassword.generateOtpError,
  userCountryDetails: state.auth.countryInfo,
});

export default connect(mapStateToProps, {
  resetOTPError: () => ({
    type: CoreActionTypes.RESET_FORGOT_PASSWORD_OTP_ERROR
  }),
  gotoLogin
})(EmailOpt);

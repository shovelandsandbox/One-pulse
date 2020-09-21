import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { connect } from "react-redux";
import {
  CoreComponents,
  CoreConfig,
  metaHelpers,
  CoreActionTypes,
  CoreActions,
  CoreSelectors,
  events,
  CoreUtils,
  firebaseEvents,
} from "@pru-rt-internal/pulse-common";
import fpstyles from "./styles";
const { ForgotPasswordSelector } = CoreSelectors;
import { goto, dispatchEvent } from "../../actions";
import NewTextInput from "../../components/NewTextInput";
const { logFirebaseEvent } = CoreUtils;
const { Timer } = CoreComponents;
const {
  ElementErrorManager,
  SCREEN_KEY_FORGOT_PASSWORD,
  pageKeys,
  NEW_EMAIL_FORGOTPASSWORD,
  NEW_EMAIL_FORGOTPASSWORD_EMAILSENT,
  NEW_EMAIL_FORGOTPASSWORD_SENTEMAIL,
  NEW_EMAIL_FORGOTPASSWORD_PASSWORDRESETCODE,
  NEW_EMAIL_FORGOTPASSWORD_NEXT,
  NEW_EMAIL_FORGOTPASSWORD_RESEND,
  NEW_EMAIL_FORGOTPASSWORD_DIDN,
} = CoreConfig;
import { activeTheme } from "../../themes";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { configureLineHeight } from "../../utils/lineHeightsUtils";
import AuthWrapper from "../../features/auth/components/AuthWrapper";

class EmailOpt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnTitle: metaHelpers.findElement(
        NEW_EMAIL_FORGOTPASSWORD,
        NEW_EMAIL_FORGOTPASSWORD_NEXT
      ).label,
      disable: false,
      opt: "",
      isFocus: false,
      showResend: false,
      restartTimer: false,
      exception: false,
    };
  }

  onSend = () => {
    logFirebaseEvent(
      firebaseEvents.Forgot_Password_Verify_Attempt.name,
      firebaseEvents.Forgot_Password_Verify_Attempt.params
    );
    this.props.dispatchEvent(events.ForgotPasswordRequestProceedClick);
    if (this.props.generatedOtpResponse.response) {
      let workflowId = this.props.generatedOtpResponse.response.workflowId;

      this.props.resetOTPError();

      this.props.onValidateOTP(this.state.opt, workflowId);
    }
  };
  componentDidMount() {
    this.props.resetOTPError();
    // this.props.cleanForgetPassWordOtpErr()
  }

  componentWillUnmount() {
    this.setState({
      opt: "",
    });
  }

  handleChange = e => {
    this.setState(
      {
        opt: e,
      },
      () => {
        if (this.state.opt.length > 5) {
          this.onSend();
        }
      }
    );
  };
  resendOpt = () => {
    if (this.props.generatedOtpResponse.actionPayload) {
      let { email } = this.props.generatedOtpResponse.actionPayload;
      this.props.onForgotPassword({
        email: email,
      });
      this.setState({
        restartTimer: true,
        showResend: false,
      });
    }
  };
  activateResend() {
    this.setState({
      showResend: true,
    });
  }
  ipFocus = () => {
    this.setState({
      isFocus: true,
    });
  };
  onBlur = () => {
    this.setState({
      isFocus: false,
    });
  };
  render() {
    ElementErrorManager.setCurrentScreen(SCREEN_KEY_FORGOT_PASSWORD);
    const { showResend, restartTimer } = this.state;

    let FS = this.state.isFocus ? 32 : 16;

    const loginPreference = this.props.loginPreference;

    if (this.props.validateOtpError == "Suc") {
      this.props.goto("ResetPassWordSuc");
    }

    const resend = metaHelpers.findElement(
      NEW_EMAIL_FORGOTPASSWORD,
      NEW_EMAIL_FORGOTPASSWORD_RESEND
    ).label;
    return (
      <KeyboardAwareScrollView
        accessibilityLabel="container"
        accesible
        keyboardShouldPersistTaps="always"
        ref={component => (this._scrollView = component)}
        scrollEnabled={false}
      >
        <AuthWrapper
          needLang={false}
          title={
            metaHelpers.findElement(
              NEW_EMAIL_FORGOTPASSWORD,
              NEW_EMAIL_FORGOTPASSWORD_EMAILSENT
            ).label
          }
          customStyles={{ paddingTop: 31, paddingHorizontal: 23 }}
          country={this.props.userCountryDetails.simCountry}
        >
          <ScrollView
            accessibilityLabel="container"
            accesible
            keyboardShouldPersistTaps="always"
            ref={component => (this._scrollView = component)}
            scrollEnabled={false}
          >
            <View>
              <View style={fpstyles.screenDescriptionWraper}>
                <Text
                  style={{...activeTheme.screenDescription, ...configureLineHeight("15")}}
                  accessibilityLabel="screenDescription"
                  accesible
                >
                  {
                    metaHelpers.findElement(
                      NEW_EMAIL_FORGOTPASSWORD,
                      loginPreference === "phone"
                        ? "sent_you_an_sms"
                        : NEW_EMAIL_FORGOTPASSWORD_SENTEMAIL
                    ).label
                  }
                </Text>
              </View>
              <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 15 }}>
                <NewTextInput
                  placeholder={
                    this.state.isFocus
                      ? ""
                      : metaHelpers.findElement(
                          NEW_EMAIL_FORGOTPASSWORD,
                          NEW_EMAIL_FORGOTPASSWORD_PASSWORDRESETCODE
                        ).label
                  }
                  maxLength={6}
                  autoCorrect={false}
                  presetValue={this.state.opt}
                  inputRectStyle={{
                    fontSize: FS,
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                  shouldDisplayTitle={false}
                  onChange={value => {
                    this.handleChange(value);
                  }}
                  onSubmit={value => {}}
                  exception={this.props.validateOtpError ? true : false}
                  onFocus={this.ipFocus}
                  showTipOnFocus={false}
                  onBlur={this.onBlur}
                  errorMessage={
                    this.props.validateOtpError
                      ? metaHelpers.findCommonErrorMessages(
                          this.props.validateOtpError.errorCode + ""
                        ).message
                      : ""
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                <Text
                  style={{...fpstyles.resendOTPDesc, ...configureLineHeight("16")}}
                >
                  {
                    metaHelpers.findElement(
                      NEW_EMAIL_FORGOTPASSWORD,
                      NEW_EMAIL_FORGOTPASSWORD_DIDN
                    ).label
                  }
                </Text>
                {showResend && (
                  <TouchableOpacity
                    style={{
                      marginLeft: 10,
                    }}
                    onPress={this.resendOpt}
                  >
                    <Text
                      style={{...fpstyles.resendOTPText, ...configureLineHeight("16")}}
                    >
                      {resend}
                    </Text>
                  </TouchableOpacity>
                )}

                {!showResend && (
                  <Timer
                    onFinish={this.activateResend.bind(this)}
                    onRestart={restartTimer}
                    textStyle={{
                      color: "#222529",
                      fontFamily: "Avenir",
                      fontSize: 16,
                      fontWeight: "500",
                      lineHeight: 28,
                      alignSelf: "center",
                      marginLeft: 8,
                    }}
                  />
                )}
              </View>
            </View>
          </ScrollView>
        </AuthWrapper>
      </KeyboardAwareScrollView>
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
  loginPreference: state.auth.loginPreference,
});

export default connect(mapStateToProps, {
  onForgotPassword: req => ({
    context: pageKeys.FORGOT_PASSWORD,
    type: CoreActionTypes.FORGOT_PASSWORD_GENERATE_OTP,
    payload: {
      email: req.email,
    },
  }),
  onValidateOTP: (otp, workflowId) => ({
    context: pageKeys.FORGOT_PASSWORD,
    type: CoreActionTypes.FORGOT_PASSWORD_VALIDATE_OTP,
    payload: {
      otp,
      workflowId,
    },
  }),
  resetOTPError: () => ({
    type: CoreActionTypes.RESET_FORGOT_PASSWORD_OTP_ERROR,
  }),
  goto,
  dispatchEvent,
})(EmailOpt);

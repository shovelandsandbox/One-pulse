import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  BackHandler,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import {
  CoreComponents,
  CoreConfig,
  metaHelpers,
  CoreConstants,
  CoreActionTypes,
  CoreUtils,
  firebaseEvents,
  events,
  CoreSelectors,
} from "@pru-rt-internal/pulse-common";
const { ForgotPasswordSelector } = CoreSelectors;
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const { AppButton } = CoreComponents;
import { goto, dispatchEvent } from "../../actions";
const { isNilOrEmpty, logFirebaseEvent } = CoreUtils;
const {
  ElementErrorManager,
  SCREEN_KEY_FORGOT_PASSWORD,
  pageKeys,
  SCREEN_KEY_LOGIN,
  NEW_EMAIL_FORGOTPASSWORD,
  NEW_EMAIL_FORGOTPASSWORD_EMAIL,
  NEW_EMAIL_FORGOTPASSWORD_EMAIL_INVALID,
  NEW_EMAIL_FORGOTPASSWORD_NEWPASSWORD,
  NEW_EMAIL_FORGOTPASSWORD_WEEMAIL,
  NEW_EMAIL_FORGOTPASSWORD_SEND,
} = CoreConfig;
const { EMAIL_PATTERN } = CoreConstants;
import fpstyles from "./styles";
import NewTextInput from "../../components/NewTextInput";
const KEY_EMAIL = "email";
const ERROR_KEY_EMAIL_REQUIRED = "required";

import { activeTheme } from "../../themes";
import { configureLineHeight } from "../../utils/lineHeightsUtils";
import AuthWrapper from "../../features/auth/components/AuthWrapper";
import { validateUserName } from "../../utils/UserCredentials";
import { path } from "ramda";

// eslint-disable-next-line react/require-optimization
class EmailOpt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnTitle: metaHelpers.findElement(
        NEW_EMAIL_FORGOTPASSWORD,
        NEW_EMAIL_FORGOTPASSWORD_SEND
      ).label,
      disable: false,
      email: "",
      errorMessage: "",
      exception: false,
    };
  }

  onSend = () => {
    const loginPreference = this.props.loginPreference;

    logFirebaseEvent(
      firebaseEvents.Forgot_Password_Request.name,
      firebaseEvents.Forgot_Password_Request.params
    );
    this.props.dispatchEvent(events.ForgotPasswordVerifyAttemptClick);
    if (isNilOrEmpty(this.state.email)) {
      this.setState({
        errorMessage: metaHelpers.findErrorMessage(
          metaHelpers.findElement(SCREEN_KEY_LOGIN, loginPreference),
          ERROR_KEY_EMAIL_REQUIRED
        ).message,
        exception: true,
      });
      return false;
    }
    const isEnteredUserValid = validateUserName(
      this.state.email,
      this.props.countryPhoneRegex,
      this.props.countryEmailRegex
    );
    if (!isEnteredUserValid) {
      this.setState({
        errorMessage: metaHelpers.findErrorMessage(
          metaHelpers.findElement(NEW_EMAIL_FORGOTPASSWORD, loginPreference),
          NEW_EMAIL_FORGOTPASSWORD_EMAIL_INVALID
        ).message,
        exception: true,
      });
      return false;
    }
    this.setState({
      errorMessage: " ",
      exception: false,
    });

    this.props.onForgotPassword({
      email: this.state.email,
    });
  };

  componentDidMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick.bind(this)
    );
    this.props.resetOTPError();
    this.keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardDidShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardDidHide
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick.bind(this)
    );
    this.keyboardWillShowListener && this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener && this.keyboardWillHideListener.remove();
    this.setState({
      email: "",
    });
    this.props.resetOTPError();
  }

  handleChange = e => {
    this.setState({
      email: e,
    });
  };

  render() {
    ElementErrorManager.setCurrentScreen(SCREEN_KEY_FORGOT_PASSWORD);
    const loginPreference = this.props.loginPreference;
    let marginBottom = 0;

    if (Platform.OS === "ios") {
      marginBottom = 20;
    }

    if (this.props.generateOtpError == "SUC") {
      this.props.goto("SentOpt");
    }
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
              NEW_EMAIL_FORGOTPASSWORD_NEWPASSWORD
            ).label
          }
          customStyles={{ paddingTop: 31, paddingHorizontal: 23 }}
          country={this.props.userCountryDetails.simCountry}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
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
                        ? "Wewillsendyouaresetpasswordrequestsms"
                        : NEW_EMAIL_FORGOTPASSWORD_WEEMAIL
                    ).label
                  }
                </Text>
              </View>

              <View style={{ flex: 1, paddingHorizontal: 20, marginBottom }}>
                <NewTextInput
                  placeholder={
                    metaHelpers.findElement(
                      NEW_EMAIL_FORGOTPASSWORD,
                      loginPreference
                    ).label
                  }
                  presetValue={this.state.email}
                  autoCorrect={false}
                  shouldDisplayTitle={false}
                  onChange={value => {
                    this.handleChange(value);
                  }}
                  onSubmit={value => {}}
                  exception={
                    this.props.generateOtpError ? true : this.state.exception
                  }
                  showTipOnFocus={false}
                  errorMessage={
                    this.props.generateOtpError
                      ? metaHelpers.findCommonErrorMessages(
                          this.props.generateOtpError.errorCode + ""
                        ).message
                      : this.state.errorMessage
                  }
                />
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <AppButton
                  type={[
                    fpstyles.btn,
                    activeTheme.primary,
                    fpstyles.verify,
                    { width: Dimensions.get("window").width * 0.8 },
                  ]}
                  textStyle={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "500",
                    lineHeight: 26,
                    fontFamily: "Avenir",
                  }}
                  title={this.state.btnTitle}
                  press={this.onSend}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
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
  loginError: state.auth.loginError,
  userCountryDetails: state.auth.countryInfo,
  userLanguagePreference: state.userPreferences.language,
  loginPreference: state.auth.loginPreference,
  countryPhoneRegex: path(
    ["meta", "countryCommonMeta", "countryPhoneRegex"],
    state
  ),
  countryEmailRegex: path(
    ["meta", "countryCommonMeta", "countryEmailRegex"],
    state
  ),
});

export default connect(mapStateToProps, {
  onForgotPassword: req => ({
    context: pageKeys.FORGOT_PASSWORD,
    type: CoreActionTypes.FORGOT_PASSWORD_GENERATE_OTP,
    payload: {
      email: req.email,
    },
  }),
  resetOTPError: () => ({
    type: CoreActionTypes.RESET_FORGOT_PASSWORD_OTP_ERROR,
  }),
  goto,
  dispatchEvent,
})(EmailOpt);

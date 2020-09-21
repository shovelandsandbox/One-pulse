/* eslint-disable */
import React, { Component } from "react";
import {
  View,
  Text,
  Alert,
  Modal,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import Validation from '../../../../containers/Validation';
import ReactNativeBiometrics from "react-native-biometrics";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateUserName } from "../../../../utils/UserCredentials";
import {
  gotoMoreLogin,
  gotoSentOtp,
  gotoPulseRegistration,
  justDispatchAction,
  goto,
  dispatchEvent,
} from "../../../../actions";
import PruIcon from "../../../../components/PruIcon";
import { Theme } from "../../../../themes/";
const { Styles, Sizes } = Theme;
import {
  CoreComponents,
  CoreConfig,
  CoreUtils,
  CoreConstants,
  CoreActionTypes,
  CoreSelectors,
  firebaseEvents,
  events,
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;

import { connect } from "react-redux";
import { activeTheme } from "../../../../themes";
import loginStyles from "./styles";
import NewPassword from "../../../../containers/NewPassword";
import PruCamera from "../../../../components/PruCamera";
import { CustomAlert } from "../../../../components";
import {configureLineHeight} from "../../../../utils/lineHeightsUtils";
const { pageKeys } = CoreConfig;
const { AppButton, OrDivider, SocialLogin, Languages } = CoreComponents;

const {
  EMAIL_ID_REQUIRED,
  INVALID_EMAIL_ID,
  INVALID_PASSWORD,
  PASSWORD_MATCH_CRITERIA_UNMET,
  PASSWORD_REQUIRED,
} = CoreConstants;
const {
  AUTH_EMAIL_CHANGED,
  AUTH_PASSWORD_CHANGED,
  LOGIN_USER,
  FORGOT_PASSWORD_DETAILS_RESET,
  RESET_LOGIN_ERROR,
  SET_USER_LAST_ACTIVITY_TIME
} = CoreActionTypes;
const { isNilOrEmpty, logFirebaseEvent } = CoreUtils;

const KEY_LOGIN = "loginbutton";
import NewTextInput from "../../../../components/NewTextInput";
import MetaConstants from "../../meta";

import AuthWrapper from "../../components/AuthWrapper";

import { path, pathOr } from "ramda";
const KEY_LOGIN_BUTTON = "loginbutton";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginInProgress: false,
      emailError: null,
      passwordError: null,
      error: null,
      showNewPasswordModal: false,
      newPasswordData: {},
      isFingerPrintSupported: false,
      emalaiErrorMessage: "",
      exception: false,
      passException: false,
      passErrorMessage: "",
      fingerPrintModal: false,
      countryPickerModal: false,
      selectedCountry: props.userCountryDetails.simCountry,
      countryModal: false,
      selectedLanguage: "",
      showCamera: false,
    };

    this.setPicture.bind(this);
    this.openFaceAuthModal.bind(this);
    this.openFingerPrintDialog.bind(this);
    this.closeCamera.bind(this);
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentWillMount() {
    this.props.justDispatchAction(FORGOT_PASSWORD_DETAILS_RESET);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.userLanguagePreference !== nextProps.userLanguagePreference
    ) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  openFaceAuthModal() {
    if (this.props.isFaceAuthEnrolled) {
      this.setState({ showCamera: true });
    } else {
      CustomAlert.show(
        this.metaConstants.FACE_ID_ENROLMENT_HEADER_LABEL,
        this.metaConstants.FACE_ID_NOT_ENABLED_LABEL,
        {
          positiveText: this.metaConstants.FACE_ID_CANCEL_LABEL,
          onPositivePress: () => {},
        }
      );
    }
  }

  setPicture = pictureInfo => {
    this.setState({ showCamera: false });
    if (pictureInfo && pictureInfo.base64) {
      this.props.loginWithFace({
        loginId: this.props.email,
        password: pictureInfo.base64,
      });
    }
  };

  closeCamera = () => {
    this.setState({ showCamera: false });
  };

  componentDidMount() {
    this.props.cleanLoginError();
    this.props.enableLoginBtn();
    if (this.props.isTouchEnrolled && !this.props.isFaceAuthEnrolled) {
      this.openFingerPrintDialog();
    }
    this.props.dispatchEvent(events.loginScreen);
    this.props.updateLastActivityTime();
  }

  openFingerPrintDialog() {
    const randomNonce = Math.random()
      .toString(36)
      .substr(2, 7);
    if (this.props.isTouchEnrolled) {
      ReactNativeBiometrics.createSignature({
        cancelButtonText: this.metaConstants.FINGER_PRINT_USER_LOGIN_LABEL,
        promptMessage: this.metaConstants.FINGER_PRINT_CONFIRM_TOUCH_LABEL,
        payload: `${this.props.email}:${randomNonce}`,
      })
        .then(result => {
          if (result) {
            this.props.touchLogin({
              loginId: this.props.email,
              password: `${randomNonce}:${result.signature}`,
            });
          } else {
            console.log("Coundn't get signature");
          }
        })
        .catch(error => {
          this.props.touchLoginFailed();
          console.log(
            `Finger print login incomplete due to : [${error.message}]`
          );
        });
    }
  }

  keyboardDidShow = () => {
    this._scrollView.scrollTo({ x: 0, y: 200, animated: true });
  };

  keyboardDidHide = () => {
    this._scrollView.scrollTo({ x: 0, y: 0, animated: true });
  };

  static showFingerPrintErrorAlert() {
    const errorText = this.metaConstants.KEY_FINGER_PRINT_ERROR_MESSAGE;

    CustomAlert.show("Fingerprint Error", errorText, {
      positiveText: "OK",
      onPositivePress: () => {},
    });
  }

  isNewUser = () => {
    return (
      <View style={{ marginTop: 20, flexDirection: "row" }}>
        <Text>
          {this.metaConstants.DONT_HAVE_ACCOUNT || "Don't have an Account?"}
        </Text>
        <TouchableOpacity
          hitSlop={{ top: 20, left: 0, bottom: 20, right: 0 }}
          onPress={() => {
            this.props.goto(pageKeys.PULSE_REGISTRATION);
            this.props.justDispatchAction(CoreActionTypes.SET_NEW_USER);
          }}
          accessibilityLabel="loginBtn"
          accesible
          style={{ marginLeft: 10 }}
        >
          <View>
            <Text
              accessibilityLabel="registerText"
              accesible
              style={{
                textDecorationLine: "underline",
                color: "#ed1b2e",
                textDecorationColor: "#ed1b2e",
              }}
            >
              {this.metaConstants.SIGNUP}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  onLogin() {
    const { email, password, previousUser, loginPreference } = this.props;

    this.setState({
      emailError: null,
      passwordError: null,
    });
    const isValidUser = validateUserName(email, this.props.countryPhoneRegex, this.props.countryEmailRegex);

    if (!isValidUser) {
      this.setState({
        emalaiErrorMessage: this.metaConstants.ERROR_KEY_EMAIL_REQUIRED_MESSAGE(
          loginPreference
        ),
        exception: true,
        passErrorMessage: "",
        passException: false,
      });
      return false;
    }
    if (isNilOrEmpty(email)) {
      this.setState({
        emalaiErrorMessage: this.metaConstants.ERROR_KEY_INVALID_EMAIL_ID_MESSAGE(
          loginPreference
        ),
        exception: true,
        passErrorMessage: "",
        passException: false,
      });
      return false;
    }
    if (isNilOrEmpty(password)) {
      this.setState({
        passErrorMessage: this.metaConstants
          .ERROR_KEY_PASSWORD_REQUIRED_MESSAGE,
        passException: true,
        emalaiErrorMessage: "",
        exception: false,
      });
      return false;
    }

    this.props.handleLogin(
      email,
      password,
      previousUser,
      this.state.selectedCountry
    );
    Keyboard.dismiss();
  }

  
  verifyContent(email) {
    return <Validation email={email} />
  }

  onEmailChange(email) {
    this.props.handleEmailChange(email);
  }

  onPasswordChange(password) {
    this.props.handlePasswordChange(password);
  }

  navigate(page) {
    this.props.navigation.replace(page);
  }

  gotoWebView() {}

  getErrorMsg(errorKey) {
    const loginPreference = this.props.loginPreference;

    switch (errorKey) {
      case EMAIL_ID_REQUIRED:
        return this.metaConstants.ERROR_KEY_EMAIL_REQUIRED_MESSAGE(
          loginPreference
        );
      case INVALID_EMAIL_ID:
        return this.metaConstants.ERROR_KEY_INVALID_EMAIL_ID_MESSAGE(
          loginPreference
        );
      case PASSWORD_REQUIRED:
        return this.metaConstants.ERROR_KEY_PASSWORD_REQUIRED_MESSAGE;
      case INVALID_PASSWORD:
        return this.metaConstants.ERROR_KEY_PASSWORD_REQUIRED_MESSAGE;
      case PASSWORD_MATCH_CRITERIA_UNMET:
        return this.metaConstants.ERROR_KEY_PASSWORD_CRITERIA_MISMATCH_MESSAGE;
      default:
        return "";
    }
  }

  setForgotPasswordModalVisible(visible) {
    logFirebaseEvent(
      firebaseEvents.Forgot_Password_Attempt.name,
      firebaseEvents.Forgot_Password_Attempt.params
    );
    this.props.dispatchEvent(events.ForgotPasswordLinkProceedClick);
    this.props.gotoSentOtp();
    this.props.cleanLoginError();
  }
  storeNewPasswordData(result) {
    this.setState({ newPasswordData: result });
  }
  setNewPasswordModalVisible(visible) {
    this.setState({ showNewPasswordModal: visible });
    if (!visible) {
      this.setState({ newPasswordData: {} });
    }
  }

  renderErrorMsg = () => {
    if (this.props.loginError && this.props.loginError.errorCode !== 2180) {
      return (
        <View style={loginStyles.errorPadding}>
        
          <Text style={{
                      ...loginStyles.errorText,
                      ...configureLineHeight("15")
                      }}>
            {MetaConstants.findBackendErrorMessage(
              this.props.loginError.errorCode,
              KEY_LOGIN
            )}
          </Text>
        </View>
      );
    } else if (
      this.props.loginError &&
      this.props.loginError.errorCode == 2180
    ) {
      const errorMsg = MetaConstants.findBackendErrorMessageByScreen(
        "login",
        this.props.loginError.errorCode,
        KEY_LOGIN_BUTTON
      );
      this.props.resetLoginError();

      CustomAlert.show(" ", errorMsg, {
        positiveText: "OK",
        onPositivePress: () => {
          this.setForgotPasswordModalVisible(true);
        },
      });
    }
    return null;
  };

  renderLoginButton = () => {
    if (this.isUseridBasedLogin()) {
      return (
        <AppButton
          type={[
            activeTheme.btn,
            activeTheme.primary,
            loginStyles.singInBtn,
            {
              width: Dimensions.get("window").width * 0.8,
            },
          ]}
          textStyle={{
           ...loginStyles.loginLableTextStyle,
           ...configureLineHeight("16")
          }}
          title={this.metaConstants.KEY_LOGIN_LABEL}
          press={this.onLogin.bind(this)}
        />
      );
    } else if (
      this.isBiometricEnabled() &&
      !this.props.isTouchLoginFailed &&
      !this.props.isFaceLoginFailed
    ) {
      return (
        <AppButton
          type={[activeTheme.btn, activeTheme.primary, loginStyles.singInBtn]}
          title={this.metaConstants.KEY_LOGIN_LABEL}
          press={this.login.bind(this)}
        />
      );
    } else if (this.isSocialLogin()) {
      if (this.isFacebookLogin()) {
        return (
          <SocialLogin
            context={pageKeys.LOGIN}
            source={"LoginScreen"}
            fbText={this.metaConstants.SING_IN_FACEBOOK_LABEL}
            gmailText={this.metaConstants.SIGN_IN_GOOGLE}
          />
        );
      }
      if (this.isGoogleLogin()) {
        return (
          <SocialLogin
            context={pageKeys.LOGIN}
            source={"LoginScreen"}
            fbText={this.metaConstants.SING_IN_FACEBOOK_LABEL}
            gmailText={this.metaConstants.SIGN_IN_GOOGLE}
            {...this.props}
            isGoogle
          />
        );
      }
      if (this.isAppleLogin()) {
        return (
          <SocialLogin
            context={pageKeys.LOGIN}
            fbText={this.metaConstants.SING_IN_FACEBOOK_LABEL}
            gmailText={this.metaConstants.SIGN_IN_GOOGLE}
            {...this.props}
            isApple
          />
        );
      }
    }

    // }
    return null;
  };

  renderOTPScreen(email) {
    return (
      <Modal visible={this.props.mfa}>
        <ScrollView
          style={{padding:0}}
          keyboardShouldPersistTaps="always"
        >
          {this.verifyContent(email)}
        </ScrollView>
      </Modal>
    );
  }

  goToRegister = () => {
    this.props.gotoPulseRegistration({
      fromAuthAction: true,
    });
  };
  fingerCancelFun = () => {
    this.setState({
      fingerPrintModal: false,
    });
  };
  resetErr = (err, exc) => {
    this.setState({
      [err]: "",
      [exc]: false,
    });
  };

  getPasswordErrorMsg = err => {
    if (err.errorCode == 500) {
      return this.metaConstants.KEY_INTERNAL_SERVER_ERROR_LABEL;
    } else if (err.errorCode) {
      return MetaConstants.findCommonErrorMessages(err.errorCode + "").message;
    } else {
      return err.errorMsg;
    }
  };

  isUseridBasedLogin = () => {
    if (this.props.isTouchLoginFailed && !this.isSocialLogin()) {
      return true;
    }
    if (this.props.isFaceLoginFailed && !this.isSocialLogin()) {
      return true;
    }
    if (!this.isBiometricEnabled() && !this.isSocialLogin()) {
      return true;
    }
    return false;
  };

  isBiometricEnabled = () => {
    return this.props.isFaceAuthEnrolled || this.props.isTouchEnrolled;
  };

  isSocialLogin = () => {
    // if (Platform.OS === "ios") {
    //   return false;
    // }
    return (
      this.isFacebookLogin() || this.isGoogleLogin() || this.isAppleLogin()
    );
  };

  isFacebookLogin = () => {
    const loginRealm = this.props.bootStrapReducer.loginRealm;
    if (loginRealm === "facebook") {
      return true;
    }
    return false;
  };

  isGoogleLogin = () => {
    const loginRealm = this.props.bootStrapReducer.loginRealm;
    if (loginRealm === "google") {
      return true;
    }
    return false;
  };

  isAppleLogin = () => {
    const loginRealm = this.props.bootStrapReducer.loginRealm;
    if (loginRealm === "apple") {
      return true;
    }
    return false;
  };

  login = () => {
    if (this.props.isFaceAuthEnrolled) {
      this.openFaceAuthModal();
    } else if (this.props.isTouchEnrolled) {
      this.openFingerPrintDialog();
    }
  };

  iconClickAction = () => {
    if (this.props.isFaceAuthEnrolled) {
      this.openFaceAuthModal();
    } else if (this.props.isTouchEnrolled) {
      this.openFingerPrintDialog();
    }
  };

  render() {
    const biometricIcon = this.props.isFaceAuthEnrolled
      ? "face"
      : "fingerprint";
    const loginPreference = this.props.loginPreference;

    return (
      <KeyboardAwareScrollView
        style={loginStyles.scrollContainer}
        enableOnAndroid
        contentContainerStyle={{ flexGrow: 1 }}
        extraScrollHeight={Platform.OS == "ios" ? 10 : 50}
      >
        <AuthWrapper
          needLang={true}
          title={""}
          customStyles={{ paddingTop: 31, paddingHorizontal: 23 }}
          country={this.props.userCountryDetails.simCountry}
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
              {this.isBiometricEnabled() && (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.iconClickAction();
                    }}
                  >
                    <PruIcon name={biometricIcon} size={40} />
                  </TouchableOpacity>
                  {((this.props.isTouchEnrolled && this.props.isTouchLoginFailed) || (this.props.isFaceAuthEnrolled && this.props.isFaceLoginFailed)) ? 
                    <OrDivider
                      style={loginStyles.orDivider}
                      commonKeyOr={this.metaConstants.KEY_COMMON_OR_LABEL}
                    /> : null
                  }
                </View>
              )}
              {this.isUseridBasedLogin() && (
                <View style={loginStyles.subContainer2}>
                  <NewTextInput
                    placeholder={this.metaConstants.phoneOrEmail(
                      loginPreference
                    )}
                    exception={false}
                    autoCorrect={false}
                    onChange={value => {
                      this.onEmailChange(value);
                    }}
                    onFocus={() => {
                      this.resetErr("emalaiErrorMessage", "exception");
                    }}
                    presetValue={this.props.email}
                    showTipOnFocus={true}
                    errorMessage={this.state.emalaiErrorMessage}
                    showTipOnFocus={false}
                    exception={this.state.exception}
                    maxLength={100}
                    restrictSpace={true}
                  />
                  <NewTextInput
                    passwordMode={true}
                    autoCorrect={false}
                    placeholder={this.metaConstants.KEY_PASSWORD_LABEL}
                    // exception={false}
                    tipMessage={
                      "8-16 characters with at least 1 number,1 uppercase, 1 lowercase and 1 special character"
                    }
                    onChange={value => {
                      this.onPasswordChange(value);
                    }}
                    value={this.props.password}
                    onSubmit={value => {}}
                    onFocus={() => {
                      this.resetErr("passErrorMessage", "passException");
                    }}
                    presetValue={this.props.password}
                    exception={
                      this.props.loginError ? true : this.state.passException
                    }
                    maxLength={100}
                    showTipOnFocus={true}
                    errorMessage={
                      this.props.loginError
                        ? this.getPasswordErrorMsg(this.props.loginError)
                        : this.state.passErrorMessage
                    }
                  />

                  <View style={{ width: Sizes.fullScreen }}>
                    <TouchableOpacity
                      accessibilityLabel="forgotBtn"
                      accesible
                      onPress={() => {
                        this.setForgotPasswordModalVisible(true);
                      }}
                    >
                      <Text
                        accessibilityLabel="forgotText"
                        accesible
                        style={loginStyles.forgotPasswordText}
                      >
                        {this.metaConstants.KEY_FORGOT_PASSWORD_LABEL}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              <View
                style={{
                  margin: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {this.renderLoginButton()}
                {this.props.isMfaLoggedInSuccess &&  this.renderOTPScreen(this.props.email)}
                {this.isNewUser()}
              </View>
              <Modal visible={this.state.showNewPasswordModal}>
                <NewPassword
                  setNewPasswordModalVisible={this.setNewPasswordModalVisible.bind(
                    this
                  )}
                  newPasswordData={this.state.newPasswordData}
                />
              </Modal>
            </View>
          </TouchableWithoutFeedback>

          {this.state.showCamera && (
            <Modal>
              <PruCamera
                setPicture={this.setPicture}
                closeCamera={this.closeCamera}
              />
            </Modal>
          )}
        </AuthWrapper>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: AuthSelector.getUserEmail(state),
    password: state.auth.password,
    loginPreference: state.auth.loginPreference,
    meta: state.meta,
    previousUser: state.sharedData.user,
    loginError: state.auth.loginError,
    isTouchEnrolled: state.auth.isTouchAuthEnrolled,
    userCountryDetails: state.auth.countryInfo,
    isFaceAuthEnrolled: state.auth.isFaceAuthEnrolled,
    userLanguagePreference: state.userPreferences.language,
    bootStrapReducer: state.bootStrap,
    isTouchLoginFailed: state.auth.isTouchLoginFailed,
    isFaceLoginFailed: state.auth.isFaceLoginFailed,
    verifyEmail:state.register.verifyEmail,
    mfa:state.auth.mfa,
    isMfaLoggedInSuccess: state.auth.mfaLoginUserSuccess,
    commonMeta: state.meta.commonMeta,
    countryPhoneRegex: path(["meta", "countryCommonMeta", "countryPhoneRegex"], state),
    countryEmailRegex: path(["meta", "countryCommonMeta", "countryEmailRegex"], state),
  };
};

export default connect(mapStateToProps, {
  enableLoginBtn: () => ({
    type: CoreActionTypes.ENABLE_LOGIN_BTN,
  }),
  handlePasswordChange: password => ({
    type: AUTH_PASSWORD_CHANGED,
    payload: password,
  }),
  handleLogin: (email, password, previousUser, countryCode) => ({
    context: pageKeys.LOGIN,
    type: LOGIN_USER,
    payload: {
      email,
      password,
      previousUser,
      countryCode,
    },
  }),
  handleEmailChange: email => ({
    type: AUTH_EMAIL_CHANGED,
    payload: email,
  }),
  cleanLoginError: () => ({
    type: CoreActionTypes.CLEAN_LOGIN_ERROR,
  }),
  resetLoginError: () => ({
    type: RESET_LOGIN_ERROR,
  }),

  touchLogin: payload => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.TOUCH_AUTH_LOGIN,
    payload,
  }),
  touchLoginFailed: () => ({
    type: CoreActionTypes.TOUCH_AUTH_LOGIN_FAILURE,
  }),
  loginWithFace: payload => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.FACE_AUTH_LOGIN,
    payload,
  }),
  gotoMoreLogin,
  gotoSentOtp,
  gotoPulseRegistration,
  justDispatchAction,
  goto,
  dispatchEvent,
  handleMFA: (email) => ({
    context: pageKeys.LOGIN,
    type: MFA_LOGIN_USER,
    payload: {
      email,
    },
  }),
  updateLastActivityTime: () => ({
    type: SET_USER_LAST_ACTIVITY_TIME
  }),
})(Login);

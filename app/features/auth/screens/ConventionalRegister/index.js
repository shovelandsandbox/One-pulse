/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  ScrollView,
  Platform,
} from "react-native";

import {
  CoreConfig,
  CoreUtils,
  CoreConstants,
  CoreActionTypes,
  events,
  CoreSelectors,
} from "@pru-rt-internal/pulse-common";
import { connect } from "react-redux";
import { path, pathOr } from "ramda";
import Validation from "../../../../containers/Validation";
import registrationStyles from "./styles";
import Styles from "../../../../containers/Register/styles";
import PruDropdownComponent from "../../../../components/PruDropdown";
import NewTextInput from "../../../../components/NewTextInput";
import _ from "lodash";
import { validateUserName } from "../../../../utils/UserCredentials";
import MetaConstants from "../../meta";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { configureLineHeight } from "../../../../utils/lineHeightsUtils";
import CheckBox from "react-native-check-box";

const { EVENT_TYPE_USER_ACTIVITY } = CoreActionTypes;
const { setScreen } = CoreUtils;

import {
  goto,
  justDispatchAction,
  dispatchEvent,
  gotoMainTNC,
  gotoNewCommon,
} from "../../../../actions";
const { pageKeys, SCREEN_KEY_REGISTER } = CoreConfig;

const {
  EMAIL_ID_REQUIRED,
  INVALID_EMAIL_ID,
  INVALID_PASSWORD,
  PASSWORD_MATCH_CRITERIA_UNMET,
  EMAIL_ID_ALREADY_EXISTS,
  PASSWORD_REQUIRED,
} = CoreConstants;

const {
  REGISTER_USER,
  AUTH_VALIDATION_ERRORS,
  CLOSE_VERIFY_EMAIL,
  REGISTER_EMAIL_CHANGED,
  REGISTER_PASSWORD_CHANGED,
  SET_REGISTERATION_LANGUAGE,
  SET_REGISTERATION_COUNTRY,
  REGISTER_CLEAN_STATE,
} = CoreActionTypes;

const { MetaSelector } = CoreSelectors;

const { isNilOrEmpty, validatePassword } = CoreUtils;

const KEY_REGISTER = "registerbutton";
import AuthWrapper from "../../components/AuthWrapper";

class NewLoginComponent extends Component {
  constructor(props) {
    super(props);
    this.onCloseVerifyEmail = this.onCloseVerifyEmail.bind(this);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      emailException: false,
      emailErrorMsg: "",
      passwordException: false,
      firstNameException: false,
      firstNameErrorMsg: "",
      lastNameException: false,
      lastNameErrorMsg: "",
      selectedCountry: props.userCountryDetails.simCountry,
    };
    this.getBackendError = this.getBackendError.bind(this);
    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.userLanguagePreference !== nextProps.userLanguagePreference
    ) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }
  componentWillUnmount() {
    this.props.cleanRegistrationState();
  }

  _isEmailValid() {
    this.setState({
      emailException: false,
      emailErrorMsg: " ",
    });
    const isValidaUser = validateUserName(
      this.state.email,
      this.props.countryPhoneRegex,
      this.props.countryEmailRegex
    );
    let e_err = !isValidaUser ? "invalid_email_id" : null;
    if (isNilOrEmpty(this.state.email)) {
      e_err = "email_id_required";
    }
    switch (e_err) {
      case "email_id_required":
        emailMsg = this.metaConstants.NEW_REGISTER_EMAIL_REQUIRED_MESSAGE;
        break;
      case "invalid_email_id":
        emailMsg = this.metaConstants.NEW_REGISTER_EMAIL_INVALID_MESSAGE;
        break;
    }
    if (!isNilOrEmpty(e_err)) {
      // Email Exception
      this.setState({
        emailException: true,
        emailErrorMsg: emailMsg,
      });
    }
    return isNilOrEmpty(e_err);
  }

  _isPasswordValid() {
    this.setState({
      passwordException: false,
    });
    const p_err = validatePassword(this.state.password, true);
    if (!isNilOrEmpty(p_err)) {
      events.RegisterPasswordViolation.global_token = MetaSelector.getGlobalToken(
        this.props.commonMeta
      );
      this.props.dispatchEvent(events.RegisterPasswordViolation);
      this.setState({
        passwordException: true,
      });
    }
    return isNilOrEmpty(p_err);
  }

  _sendCode() {
    Keyboard.dismiss();
    const passwordValid = this._isPasswordValid();
    const emailValid = this._isEmailValid();
    if (isNilOrEmpty(this.state.firstName)) {
      this.setState({
        firstNameException: true,
        firstNameErrorMsg: this.metaConstants
          .NEW_REGISTER_FIRSTNAME_REQUIRED_MESSAGE,
      });
    }
    if (isNilOrEmpty(this.state.lastName)) {
      this.setState({
        lastNameException: true,
        lastNameErrorMsg: this.metaConstants
          .NEW_REGISTER_LASTNAME_REQUIRED_MESSAGE,
      });
    }
    //const isValidaUser = validateUserName(email)
    if (this.state.firstNameException || this.state.lastNameException) {
      return false;
    }
    if (!passwordValid) {
      return;
    }

    this.onRegister();
  }

  componentDidMount() {
    setScreen("EmailRegForm", EVENT_TYPE_USER_ACTIVITY);
    events[
      pageKeys.PULSE_REGISTRATION
    ].global_token = MetaSelector.getGlobalToken(this.props.commonMeta);
    this.props.dispatchEvent(events[pageKeys.PULSE_REGISTRATION]);
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  getBackendError = errorCode => {
    return MetaConstants.findBackendErrorMessageByScreen(
      SCREEN_KEY_REGISTER,
      errorCode,
      KEY_REGISTER
    );
  };
  // eslint-disable-next-line complexity
  getErrorMsg(errorKey) {
    switch (errorKey) {
      case EMAIL_ID_REQUIRED:
        return this.metaConstants.ERROR_KEY_EMAIL_REQUIRED_MESSAGE;

      case INVALID_EMAIL_ID:
        return this.metaConstants.ERROR_KEY_INVALID_EMAIL_ID_MESSAGE;

      case EMAIL_ID_ALREADY_EXISTS:
        return this.metaConstants.ERROR_KEY_EMAIL_ALREADY_EXISTS_MESSAGE;

      case PASSWORD_REQUIRED:
        return this.metaConstants.ERROR_KEY_PASSWORD_REQUIRED_MESSAGE;

      case INVALID_PASSWORD:
        return this.metaConstants.ERROR_KEY_INVALID_PASSWORD_MESSAGE;

      case PASSWORD_MATCH_CRITERIA_UNMET:
        return this.metaConstants.ERROR_KEY_PASSWORD_CRITERIA_MISMATCH_MESSAGE;

      default:
        return "";
    }
  }

  onEmailChange = email => {
    this.props.onEmailChange(email);
    this.setState({
      email,
    });
  };

  onPasswordChange(password) {
    this.props.onPasswordChange(password);
    this.setState({
      password,
    });
  }

  onRegister() {
    const { email, password } = this.state;
    const { firstName, lastName, selectedCountry } = this.state;
    //const emailError = validateEmail(email);
    const emailError = this.metaConstants.ERROR_KEY_EMAIL_REQUIRED_MESSAGE;
    const passwordError = validatePassword(password, true);
    const isValidaUser = validateUserName(
      email,
      this.props.countryPhoneRegex,
      this.props.countryEmailRegex
    );
    // const temporaryPassword = sha512(password);
    // const hashedPassword = temporaryPassword.toString();
    if (isValidaUser && isNilOrEmpty(passwordError) && firstName && lastName) {
      this.props.registerUser({
        email,
        password,
        firstName,
        surName: lastName,
        addressDetails: {
          address: {
            countryCode: this.state.selectedCountry,
          },
        },
      });
      this.props.setRegistrationLanguage(this.props.userLanguagePreference);
      this.props.setRegistrationCountry(selectedCountry);
    } else {
      this.props.authValidationError({
        emailError,
        passwordError,
        loading: false,
      });
    }
    // this.props.registerUser({ email, password });
    Keyboard.dismiss();
  }

  onCloseVerifyEmail() {
    this.props.onCloseVerify();
  }

  navigate(page) {
    this.props.navigation.replace(page);
  }

  verifyContent(email) {
    return <Validation email={email} onCloseAction={this.onCloseVerifyEmail} />;
  }

  onCountrySelection = selectedCountry => {
    this.setState({ selectedCountry });
    this.props.resetLanguage();
    this.props.fetchAllLanguages(selectedCountry);
    this.props.setCountry(selectedCountry);
  };

  prepareCountryPicker = () => {
    const { deviceId, commonMeta } = this.props;

    const enabledCountries = pathOr([], ["enabledCountries"], commonMeta);
    const mappedCountryList = enabledCountries.map(countryItem => {
      return {
        label: countryItem.countryDisplayName,
        value: countryItem.countryCode2,
      };
    });

    const enabled =
      commonMeta.enableCountrySwitch &&
      commonMeta.countrySwitchEnabledDevices[deviceId] === true;

    return (
      <PruDropdownComponent
        selectedValueCB={this.onCountrySelection}
        selectedOption={this.state.selectedCountry}
        options={mappedCountryList}
        enabled={enabled}
      ></PruDropdownComponent>
    );
  };

  onLanguageSelection = selectedLanguage => {
    this.props.fetchMeta(selectedLanguage);
  };

  prepareLanguagePicker = () => {
    const { languageList } = this.props;
    const mappedLangList = languageList.map(langItem => {
      return {
        label: langItem.name,
        value: langItem.languageCode,
      };
    });

    return (
      <PruDropdownComponent
        selectedValueCB={this.onLanguageSelection}
        selectedOption={this.props.userLanguagePreference}
        options={mappedLangList}
        enabled={true}
      ></PruDropdownComponent>
    );
  };

  emailVerify() {
    const email = this.state.email;

    if (this.props.verifyEmail === true) {
      setScreen("RegOtp", EVENT_TYPE_USER_ACTIVITY);
    }

    return (
      <Modal visible={this.props.verifyEmail === true}>
        <ScrollView
          style={registrationStyles.popContent}
          keyboardShouldPersistTaps="always"
        >
          {this.verifyContent(email)}
        </ScrollView>
      </Modal>
    );
  }

  render() {
    const { emailException, emailErrorMsg, passwordException } = this.state;

    const SIGN_UP = this.metaConstants.SIGNUP;
    const ALREADY_HAVE_ACOOUNT = this.metaConstants.ALREADY_HAVE_ACCOUNT;
    const NEW_REGISTRATION_SIGN_IN = this.metaConstants.NEW_REGISTRATION_SIGNIN;
    const backHeading = this.metaConstants.CREATE_ACCOUNT;
    return (
      <ScrollView>
        <KeyboardAwareScrollView
          enableOnAndroid
          contentContainerStyle={{ flexGrow: 1 }}
          extraScrollHeight={Platform.OS == "ios" ? 10 : 50}
        >
          <AuthWrapper
            needLang={false}
            title={backHeading}
            customStyles={{ paddingTop: 31, paddingHorizontal: 23 }}
            country={this.props.userCountryDetails.simCountry}
          >
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View
                style={{ flex: 1, paddingBottom: 20 }}
                accessibilityLabel="container"
                accesible
              >
                <View style={{ marginHorizontal: 20 }}>
                  <NewTextInput
                    placeholder={
                      this.metaConstants.NEW_REGISTER_FIRSTNAME_LABEL
                    }
                    maxLength={100}
                    exception={this.state.firstNameException}
                    errorMessage={this.state.firstNameErrorMsg}
                    autoCorrect={false}
                    onChange={value => {
                      this.setState({
                        firstName: value,
                      });
                    }}
                    onFocus={() => {
                      this.setState({
                        firstNameException: false,
                        firstNameErrorMsg: "",
                      });
                    }}
                    showTipOnFocus={false}
                    restrictSpace={
                      (
                      this.state.selectedCountry === "ID" || this.state.selectedCountry === "SG"
                      ) ? false : true
                    }
                  />
                  <NewTextInput
                    placeholder={this.metaConstants.NEW_REGISTER_LASTNAME_LABEL}
                    maxLength={100}
                    exception={this.state.lastNameException}
                    errorMessage={this.state.lastNameErrorMsg}
                    autoCorrect={false}
                    onChange={value => {
                      this.setState({
                        lastName: value,
                      });
                    }}
                    onFocus={() => {
                      this.setState({
                        lastNameException: false,
                        lastNameErrorMsg: "",
                      });
                    }}
                    showTipOnFocus={false}
                    restrictSpace={
                      (
                        this.state.selectedCountry === "ID" || this.state.selectedCountry === "SG"
                      ) ? false : true
                    }
                  />
                  <NewTextInput
                    placeholder={this.metaConstants.NEW_REGISTER_EMAIL_LABEL}
                    maxLength={100}
                    exception={
                      emailException ||
                      !isNilOrEmpty(path(["payload"], this.props.error))
                    }
                    errorMessage={
                      !isNilOrEmpty(path(["payload"], this.props.error))
                        ? this.getBackendError(this.props.error.payload)
                        : emailErrorMsg
                    }
                    autoCorrect={false}
                    onChange={value => {
                      this.setState(
                        {
                          email: value,
                        },
                        () => {
                          this.onEmailChange(value);
                        }
                      );
                    }}
                    onSubmit={value => {
                      this.setState(
                        {
                          email: value,
                        },
                        () => {}
                      );
                    }}
                    onFocus={() => {
                      this.setState({
                        emailException: false,
                        emailErrorMsg: "",
                      });
                    }}
                    showTipOnFocus={false}
                    restrictSpace={true}
                  />
                  <NewTextInput
                    passwordMode={true}
                    autoCorrect={false}
                    maxLength={16}
                    placeholder={this.metaConstants.NEW_REGISTER_PASSWORD_LABEL}
                    exception={passwordException}
                    errorMessage={
                      this.metaConstants.NEW_REGISTER_PASSWORD_SECURITY_MESSAGE
                    }
                    tipMessage={
                      this.metaConstants.NEW_REGISTER_PASSWORD_SECURITY_MESSAGE
                    }
                    onChange={value => {
                      this.setState(
                        {
                          password: value,
                        },
                        () => {
                          this.onPasswordChange(value);
                        }
                      );
                    }}
                    onSubmit={value => {
                      this.setState(
                        {
                          password: value,
                        },
                        () => {}
                      );
                    }}
                    onFocus={() => {
                      this.setState({
                        passwordException: false,
                        passwordErrorMsg: "",
                      });
                    }}
                    showTipsOnFocus={true}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1, marginRight: 20 }}>
                      <Text
                        style={{
                          ...registrationStyles.inputLabelText,
                          ...configureLineHeight("12"),
                        }}
                      >
                        {this.metaConstants.NEW_REGISTER_COUNTRY_LABEL}
                      </Text>
                      {this.prepareCountryPicker()}
                    </View>
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      <Text
                        style={{
                          ...registrationStyles.inputLabelText,
                          ...configureLineHeight("12"),
                        }}
                      >
                        {this.metaConstants.NEW_REGISTER_LANGUAGES_LABEL}
                      </Text>
                      {this.prepareLanguagePicker()}
                    </View>
                  </View>
                </View>
                {/* {this.props.userCountryDetails.simCountry == "SG" && (
                  <View style={{ margiTop: 10 }}>
                    <CheckBox
                      rightTextStyle={Styles.marketingConsentText}
                      checkedIcon="dot-circle-o"
                      uncheckedIcon="circle-o"
                      checkBoxColor={"#ED1B2E"}
                      onClick={() => {
                        if (this.state.isConsentCheck) {
                          this.setState({
                            isConsentCheck: false,
                          });
                        } else {
                          this.setState({
                            isConsentCheck: true,
                          });
                        }
                      }}
                      isChecked={this.state.isConsentCheck}
                      rightText={
                        "I agree to receive marketing material from Prudential Group and its business and marketing partners. I will be able to manage my marketing consent via the settings once I have logged in."
                      }
                    />
                  </View>
                )} */}
                <TouchableOpacity
                  style={{
                    ...Styles.sendCodeBtnRect,
                    width: "90%",
                  }}
                  onPress={this._sendCode.bind(this)}
                >
                  <Text
                    style={{
                      ...Styles.sendCodeBtnTitle,
                      ...configureLineHeight("16"),
                    }}
                  >
                    {SIGN_UP}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    marginLeft: "20%",
                    marginTop: 20,
                    flexDirection: "row",
                  }}
                >
                  <Text style={registrationStyles.newText}>
                    {ALREADY_HAVE_ACOOUNT}
                  </Text>

                  <TouchableOpacity
                    hitSlop={{ top: 20, left: 0, bottom: 20, right: 0 }}
                    onPress={() => {
                      this.props.goto(pageKeys.PULSE_LOGIN);
                      this.props.justDispatchAction(
                        CoreActionTypes.SET_EXISTING_USER
                      );
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
                        {NEW_REGISTRATION_SIGN_IN}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
            {this.emailVerify()}
          </AuthWrapper>
        </KeyboardAwareScrollView>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  email: state.register.email,
  error: state.register.error,
  loading: state.register.loading,
  meta: state.meta,
  password: state.register.password,
  privacy: state.trigger.openPrivacy,
  terms: state.trigger.openTerms,
  verifyEmail: state.register.verifyEmail,
  userCountryDetails: state.auth.countryInfo,
  languageList: state.meta.languageList,
  userLanguagePreference: state.userPreferences.language,
  deviceId: state.auth.userAgent.deviceId,
  commonMeta: state.meta.commonMeta,
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
  gotoMainTNC,
  gotoNewCommon,
  onEmailChange: email => ({
    type: REGISTER_EMAIL_CHANGED,
    payload: email,
  }),
  onPasswordChange: password => ({
    type: REGISTER_PASSWORD_CHANGED,
    payload: password,
  }),
  onCloseVerify: () => ({
    type: CLOSE_VERIFY_EMAIL,
  }),
  fetchMeta: languageId => ({
    context: pageKeys.CHANGE_LANGUAGE_PAGE,
    type: CoreActionTypes.FETCH_META,
    payload: { languageId },
  }),
  resetLanguage: () => ({
    type: CoreActionTypes.CHANGE_LANGUAGE,
  }),
  fetchAllLanguages: country => ({
    context: pageKeys.ALL,
    type: CoreActionTypes.FETCH_LANGUAGES,
    payload: { country },
  }),
  setCountry: country => ({
    type: CoreActionTypes.SET_COUNTRY_INFO,
    payload: {
      countryInfo: {
        simCountry: country,
      },
    },
  }),
  registerUser: payload => ({
    context: pageKeys.REGISTRATION,
    type: REGISTER_USER,
    payload: payload,
  }),
  setRegistrationLanguage: language => ({
    type: SET_REGISTERATION_LANGUAGE,
    payload: language.toUpperCase(),
  }),
  setRegistrationCountry: country => ({
    type: SET_REGISTERATION_COUNTRY,
    payload: country.toUpperCase(),
  }),
  cleanRegistrationState: () => ({
    type: REGISTER_CLEAN_STATE,
  }),
  authValidationError: payload => ({
    type: AUTH_VALIDATION_ERRORS,
    payload: payload,
  }),
  goto,
  justDispatchAction,
  dispatchEvent,
})(NewLoginComponent);

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import {
  CoreComponents,
  CoreConfig,
  metaHelpers,
  CoreActionTypes,
  ElementErrorManager,
  CoreSelectors,
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
import styles from "./styles";
import { EYE_CLOSE, EYE_OPEN } from "../../config";
import NewTextInput from "../../components/NewTextInput";
import { PruHeaderText } from "../../components";

const {
  pageKeys,
  NEW_CHANGPASSWORD,
  NEW_CHANGPASSWORD_CURRENTPASSWORD,
  NEW_CHANGPASSWORD_NEWPASSWORD,
  NEW_CHANGPASSWORD_CONFIRM,
  NEW_CHANGPASSWORD_ERROE1,
  NEW_CHANGPASSWORD_ERROE2,
  NEW_CHANGPASSWORD_ERROE3,
  NEW_CHANGPASSWORD_ERROE4,
  NEW_CHANGPASSWORD_ERROE5,
  CHANGPASSWORD,
  colors,
  PASSWORD_PATTERN,
  SCREEN_KEY_CHANGE_PASSWORD,
  SCREEN_KEY_CHAT_REPORT,
} = CoreConfig;
const { CHANGE_PASSWORD } = CoreActionTypes;
const { AppButton } = CoreComponents;
const { Loader } = CoreComponents;
const helpers = metaHelpers;

const KEY_POLICY = "policy";

const KEY_CONFIRM_PASSWORD = "confirmpassword";
const KEY_NEW_PASSWORD = "newpassword";
const KEY_CURRENT_PASSWORD = "currentpassword";
const KEY_PASSWORD_CHANGED_MSG = "changepasswordsuccessmessage";
const ERROR_KEY_PASSWORD_REQUIRED = "required";
const ERROR_KEY_MATCH_CRITERIA = "match_criteria";
const KEY_CHANGE_PASSWORD = "change";
const KEY_CONFIRM = "confirm";
const KEY_OK = "ok";
const KEY_CHANGE = "change";

//RAGE
// const USE_NEW_DESIGN = true;

const InputWithLabel = ({
  label,
  hidePassword,
  managePasswordVisibility,
  handleTextChange,
  value,
  field,
  passErr,
  onBlur,
}) => {
  return (
    <View
      style={[
        styles.inputWithLabel,
        passErr
          ? { borderColor: colors.crimson, borderBottomWidth: 2 }
          : { borderColor: colors.silver },
      ]}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.textBoxBtnHolder}>
        <TextInput
          placeholder={label}
          onBlur={onBlur}
          autoCapitalize="none"
          onChangeText={text => handleTextChange(field, text)}
          value={value}
          secureTextEntry={hidePassword}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.visibilityBtn}
          onPress={() => managePasswordVisibility(field)}
        >
          <Image
            source={hidePassword ? EYE_CLOSE : EYE_OPEN}
            style={styles.btnImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// eslint-disable-next-line react/require-optimization
class ChangePassword extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const USE_NEW_DESIGN = true;
    const _this = this;
    const { changePasswordLoading, changePasswordError } = nextProps;
    if (
      changePasswordLoading !== undefined &&
      !changePasswordLoading &&
      changePasswordLoading !== prevState.changePasswordLoading
    ) {
      if (changePasswordError) {
        return {
          changePasswordLoading: false,
          errorMessage: metaHelpers.findBackendErrorMessage(
            changePasswordError.errorCode.toString(),
            KEY_CHANGE
          ),
        };
      }
      const alertMessage = helpers.findElement(
        SCREEN_KEY_CHANGE_PASSWORD,
        KEY_PASSWORD_CHANGED_MSG
      ).label;
      const ok = helpers
        .findElement(SCREEN_KEY_CHAT_REPORT, KEY_OK)
        .label.toUpperCase();

      nextProps.dispatch({
        context: pageKeys.CHANGE_PASSWORD,
        type: "GOBACK",
      });
    }
    return {
      changePasswordLoading,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      hidePasswordOld: true,
      hidePasswordNew: true,
      hidePasswordConfirm: true,
      currentPassErr: false,
      newPassErr: false,
      confirmPassErr: false,
      errorMessage: "",
      changePasswordLoading: props.changePasswordLoading,
    };
    this.onPressChangeButton = this.onPressChangeButton.bind(this);
    this.managePasswordVisibility = this.managePasswordVisibility.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.Capitalize = this.Capitalize.bind(this);
  }

  managePasswordVisibility(key) {
    if (key === "oldPassword") {
      this.setState({ hidePasswordOld: !this.state.hidePasswordOld });
    } else if (key === "newPassword") {
      this.setState({ hidePasswordNew: !this.state.hidePasswordNew });
    } else {
      this.setState({ hidePasswordConfirm: !this.state.hidePasswordConfirm });
    }
  }

  handleTextChange(key, val) {
    const obj = {};
    obj[key] = val;
    this.setState(obj);
  }

  getErrorMsg(element, errorKey) {
    return helpers.findErrorMessage(element, errorKey).message;
  }

  // eslint-disable-next-line complexity
  onPressChangeButton() {
    const currentPassElement = helpers.findElement(
      SCREEN_KEY_CHANGE_PASSWORD,
      KEY_CURRENT_PASSWORD
    );
    const newPassElement = helpers.findElement(
      SCREEN_KEY_CHANGE_PASSWORD,
      KEY_NEW_PASSWORD
    );
    const confirmPassElement = helpers.findElement(
      SCREEN_KEY_CHANGE_PASSWORD,
      KEY_CONFIRM_PASSWORD
    );

    const message1 = helpers.findErrorMessage(
      helpers.findElement(NEW_CHANGPASSWORD),
      NEW_CHANGPASSWORD_ERROE1
    ).message;
    const message3 = helpers.findErrorMessage(
      helpers.findElement(NEW_CHANGPASSWORD),
      NEW_CHANGPASSWORD_ERROE3
    ).message;
    const message4 = helpers.findErrorMessage(
      helpers.findElement(NEW_CHANGPASSWORD),
      NEW_CHANGPASSWORD_ERROE4
    ).message;
    const message5 = helpers.findErrorMessage(
      helpers.findElement(NEW_CHANGPASSWORD),
      NEW_CHANGPASSWORD_ERROE5
    ).message;

    const { oldPassword, newPassword, confirmPassword } = this.state;
    if (
      oldPassword === "" ||
      typeof oldPassword === "undefined" ||
      oldPassword == null
    ) {
      this.setState({
        errorMessage: true
          ? message3
          : this.getErrorMsg(currentPassElement, ERROR_KEY_PASSWORD_REQUIRED),
        currentPassErr: true,
        newPassErr: false,
        confirmPassErr: false,
      });
    } else if (
      newPassword === "" ||
      typeof newPassword === "undefined" ||
      newPassword == null
    ) {
      this.setState({
        errorMessage: true
          ? message4
          : this.getErrorMsg(newPassElement, ERROR_KEY_PASSWORD_REQUIRED),
        newPassErr: true,
        currentPassErr: false,
        confirmPassErr: false,
      });
    } else if (
      confirmPassword === "" ||
      typeof confirmPassword === "undefined" ||
      confirmPassword == null
    ) {
      this.setState({
        errorMessage: this.getErrorMsg(
          confirmPassElement,
          ERROR_KEY_PASSWORD_REQUIRED
        ),
        confirmPassErr: true,
        currentPassErr: false,
        newPassErr: false,
      });
    } else if (!newPassword.match(PASSWORD_PATTERN)) {
      this.setState({
        errorMessage: true
          ? message1
          : this.getErrorMsg(newPassElement, ERROR_KEY_MATCH_CRITERIA),
        newPassErr: true,
        currentPassErr: false,
        confirmPassErr: false,
      });
    } else if (newPassword !== confirmPassword) {
      this.setState({
        errorMessage: this.getErrorMsg(
          confirmPassElement,
          ERROR_KEY_MATCH_CRITERIA
        ),
        confirmPassErr: true,
        currentPassErr: false,
        newPassErr: false,
      });
    } else if (oldPassword === newPassword) {
      this.setState({
        errorMessage: message5,
        confirmPassErr: true,
        currentPassErr: false,
        newPassErr: true,
      });
    } else {
      passwordError = "";
      passwordHasError = false;
      this.setState({
        errorMessage: "",
        confirmPassErr: false,
        currentPassErr: false,
        newPassErr: false,
        changePasswordLoading: true,
      });
      this.props.dispatch({
        context: pageKeys.PROFILE,
        type: CHANGE_PASSWORD,
        payload: {
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword,
        },
      });
    }
  }

  Capitalize(str) {
    const capital = str.charAt(0).toUpperCase() + str.slice(1);
    return capital;
  }

  onPressCloseButton() {
    this.props.navigation.goBack();
  }

  handleBlur() {
    if (this.state.newPassword !== this.state.confirmPassword) {
      this.setState({ newPassErr: true });
    } else {
      this.setState({ newPassErr: false });
    }
  }

  // eslint-disable-next-line complexity
  render() {
    // When navigation passed useNewDesign param, this page will render in new design
    const USE_NEW_DESIGN = true;

    const { meta } = this.props;
    ElementErrorManager.setCurrentScreen(SCREEN_KEY_CHANGE_PASSWORD);
    const title = helpers.findElement(NEW_CHANGPASSWORD, CHANGPASSWORD).label;
    const current = helpers.findElement(
      SCREEN_KEY_CHANGE_PASSWORD,
      KEY_CURRENT_PASSWORD
    ).label;
    const policy = helpers.findElement(SCREEN_KEY_CHANGE_PASSWORD, KEY_POLICY)
      .label;
    const newPassword = helpers.findElement(
      SCREEN_KEY_CHANGE_PASSWORD,
      KEY_NEW_PASSWORD
    ).label;
    const confirmPassword = helpers.findElement(
      SCREEN_KEY_CHANGE_PASSWORD,
      KEY_CONFIRM_PASSWORD
    ).label;
    const changePassword = helpers.findElement(
      SCREEN_KEY_CHANGE_PASSWORD,
      KEY_CHANGE_PASSWORD
    ).label;

    const SCREEN_CURRENTPASSWORD_TEXT = helpers.findElement(
      NEW_CHANGPASSWORD,
      NEW_CHANGPASSWORD_CURRENTPASSWORD
    ).label;
    const SCREEN_NEWPASSWORD_TEXT = helpers.findElement(
      NEW_CHANGPASSWORD,
      NEW_CHANGPASSWORD_NEWPASSWORD
    ).label;
    const SCREEN_CONFIRM_BUTTON = helpers.findElement(
      NEW_CHANGPASSWORD,
      NEW_CHANGPASSWORD_CONFIRM
    ).label;
    const message2 = helpers.findErrorMessage(
      helpers.findElement(NEW_CHANGPASSWORD),
      NEW_CHANGPASSWORD_ERROE2
    ).message;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <ScrollView
              style={{
                paddingLeft: "5%",
                paddingRight: "5%",
              }}
            >
              <View
                style={
                  !USE_NEW_DESIGN
                    ? { flex: 1.4 }
                    : {
                        marginBottom: 53,
                      }
                }
              >
                {/* <Text
                    style={
                      !USE_NEW_DESIGN
                        ? styles.title
                        : {
                          alignSelf: "center",
                          color: "#515B61",
                          fontFamily: "Avenir",
                          fontSize: 22,
                          fontWeight: "900",
                          lineHeight: 30,
                          textAlign: "center"
                        }
                    }
                  >
                    {title}
                  </Text> */}
                <PruHeaderText text={title} />
              </View>
              {!USE_NEW_DESIGN && (
                <View style={{ flex: 1 }}>
                  <Text style={styles.subTitle}>{policy}</Text>
                </View>
              )}
              {!USE_NEW_DESIGN && (
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.red,
                      fontFamily:
                        Platform.OS === "ios"
                          ? "PruSansNormal"
                          : "pruSansRegular",
                    }}
                  >
                    {this.state.errorMessage}
                  </Text>
                </View>
              )}
              {USE_NEW_DESIGN && (
                <View
                  style={{
                    marginHorizontal: 40,
                  }}
                >
                  <NewTextInput
                    placeholder={SCREEN_CURRENTPASSWORD_TEXT}
                    maxLength={16}
                    passwordMode={true}
                    errorMessage={
                      this.state.currentPassErr
                        ? this.state.errorMessage
                        : this.state.errorMessage !== "" ||
                          this.state.errorMessage !== undefined
                        ? this.state.errorMessage == "Incorrect Password"
                          ? message2
                          : ""
                        : ""
                    }
                    exception={
                      this.state.currentPassErr ||
                      (this.state.errorMessage !== undefined &&
                        this.state.errorMessage !== "")
                    }
                    onChange={content => {
                      this.handleTextChange("oldPassword", content);
                    }}
                  />
                  <NewTextInput
                    placeholder={SCREEN_NEWPASSWORD_TEXT}
                    maxLength={16}
                    passwordMode={true}
                    exception={this.state.newPassErr}
                    errorMessage={
                      this.state.newPassErr ? this.state.errorMessage : ""
                    }
                    onChange={content => {
                      this.handleTextChange("newPassword", content);
                      this.handleTextChange("confirmPassword", content);
                    }}
                  />
                </View>
              )}
              {!USE_NEW_DESIGN && (
                <InputWithLabel
                  passErr={this.state.currentPassErr}
                  field="oldPassword"
                  label={current}
                  value={this.state.oldPassword}
                  handleTextChange={this.handleTextChange}
                  hidePassword={this.state.hidePasswordOld}
                  managePasswordVisibility={this.managePasswordVisibility}
                />
              )}
              {!USE_NEW_DESIGN && (
                <InputWithLabel
                  passErr={this.state.newPassErr}
                  field="newPassword"
                  label={newPassword}
                  value={this.state.newPassword}
                  handleTextChange={this.handleTextChange}
                  hidePassword={this.state.hidePasswordNew}
                  managePasswordVisibility={this.managePasswordVisibility}
                />
              )}
              {!USE_NEW_DESIGN && (
                <InputWithLabel
                  field="confirmPassword"
                  label={confirmPassword}
                  value={this.state.confirmPassword}
                  handleTextChange={this.handleTextChange}
                  hidePassword={this.state.hidePasswordConfirm}
                  passErr={this.state.confirmPassErr}
                  onBlur={this.handleBlur}
                  managePasswordVisibility={this.managePasswordVisibility}
                />
              )}

              <View
                style={
                  !USE_NEW_DESIGN
                    ? { flex: 2, marginTop: 25, marginBottom: 25 }
                    : {
                        marginTop: 28,
                        marginBottom: 25,
                        marginHorizontal: 45,
                      }
                }
              >
                {!this.state.changePasswordLoading && (
                  <AppButton
                    type={
                      !USE_NEW_DESIGN
                        ? styles.getStart
                        : {
                            width: "100%",
                            height: 44,
                            borderRadius: 50,
                            backgroundColor: "#ED1B2E",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 16,
                            fontFamily: "Avenir",
                            textAlign: "center",
                            alignSelf: "center",
                          }
                    }
                    title={
                      !USE_NEW_DESIGN ? changePassword : SCREEN_CONFIRM_BUTTON
                    }
                    press={() => {
                      this.onPressChangeButton();
                    }}
                  />
                )}
                {this.state.changePasswordLoading && (
                  <View>
                    <ActivityIndicator size="large" color={colors.crimson} />
                  </View>
                )}
                {this.state.error !== "" && (
                  <View style={styles.errorPadding}>
                    <Text style={styles.errorText}>{this.state.error}</Text>
                  </View>
                )}
              </View>
              <View style={{ flex: 1 }} />
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  meta: state.meta,
  email: AuthSelector.getUserEmail(state),
  password: state.auth.password,
  sessionId: state.auth.token,
  changePasswordLoading: state.auth.changePasswordLoading,
  changePasswordError: state.auth.changePasswordError,
});

export default connect(mapStateToProps)(ChangePassword);

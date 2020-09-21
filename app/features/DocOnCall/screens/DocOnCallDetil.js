import React, { PureComponent } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Text,
  Image
} from "react-native";
import Modal from "react-native-modal";
import { pathOr } from "ramda";
import OTPInputView from '@twotalltotems/react-native-otp-input';

import {
  CoreComponents,
  CoreActionTypes,
  CoreConfig,
  CoreConstants,
  colors,
  metaHelpers
} from "@pru-rt-internal/pulse-common";
const {
  DOC_SERVICE_REGISTER,
  RegistrationStatus,
  NAME_PATTERN,
  MOBILE_PATTERN,
  SCREEN_KEY_DOC_ON_CALL_REGISTER,
  COMMON_KEY_DOC_ON_CALL_LOGO,
  DOC_SERVICE_REGISTER_PATIENT,
  DOC_SERVICE_VERIFY_PHONE,
  DOC_SERVICE_VERIFY_OTP,
  DOC_SERVICE_RESEND_OTP,
  DOC_SERVICE_VERIFY_OTP_CANCEL,
  GO_BACK_TO_PREVIOUS_STACK,
  GO_TO_MANAGE_PROFILE,
  RESET_REGISTRATION_STATUS
} = CoreConstants;

const { Timer, Label, AppButton } = CoreComponents;

import { connect } from "react-redux";
import { BACK, DOC_INLINE_LOGO } from "../../../config/images";
import NewTextInput from "../../../components/NewTextInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const {
  pageKeys,
  TALKTOADOCTOR,
  TALKTOADOCTOR_BYCLICK,
  TALKTOADOCTOR_FIRSTNAME,
  TALKTOADOCTOR_LASTNAME,
  TALKTOADOCTOR_EMAIL,
  TALKTOADOCTOR_COUNTRYOFRESIDENCE,
  TALKTOADOCTOR_CD,
  TALKTOADOCTOR_PN,
  TALKTOADOCTOR_NRIC,
  TALKTOADOCTOR_PROCEED,
  TALKTOADOCTOR_Verify,
  TALKTOADOCTOR_Cancel,
  DOC_NRIC_REQUIRED_MSG
} = CoreConfig;
import styles from "./styles";
import actionNames from "../configs/actionNames";
import ScreenNames from "../configs/ScreenNames";

const OTP = "docRegisterPageOtp";
const RESEND_OTP = "docRegisterPageResendOtp";

class DocOnCallDetil extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.profile.firstName ? props.profile.firstName : "",
      surName: props.profile.surName ? props.profile.surName : "",
      email: props.profile.email ? props.profile.email : "",
      phone: props.profile.phone ? props.profile.phone.replace(/\+60/, "") : "",
      country: "Malaysia",
      NRIC: this.props.IC ? this.props.IC : "",

      isChecked: false,
      showResend: false,
      restartTimer: false,
      error: {
        firstName: false,
        surName: false,
        phone: false
      },
      firstNameErr: "",
      surNameErr: "",
      emailErr: "",
      phoneErr: "",
      countryErr: "",
      NRICErr: "",
      firstNameException: false,
      surNameException: false,
      emailException: false,
      phoneException: false,
      countryException: false,
      NRICException: false
    };
    this.containerProps = { style: styles.otpInputContainer };
    this.otp = "";
    this.resendOtp = "";
  }
  componentDidMount() {
    this.props.dispatch({
      context: pageKeys.PROFILE,
      type: CoreActionTypes.GET_CUSTOMER_DETAILS
    });
    this.setState(
      {
        NRIC: this.props.IC,
        firstName: this.props.profile.firstName
          ? this.props.profile.firstName
          : "",
        surName: this.props.profile.surName ? this.props.profile.surName : "",
        email: this.props.profile.email ? this.props.profile.email : "",
        phone: this.props.profile.phone
          ? this.props.profile.phone.replace(/\+60/, "")
          : ""
      },
      () => { }
    );
  }

  onProceed = () => {
    // firstName, surName, email, phone, country
    let { token, IC } = this.props;
    if (this.props.registrationStatus != 2) {
      return false;
    }

    if (!this.state.firstName) {
      this.setState({
        firstNameErr: "First Name / Given Name is required",
        firstNameException: true
      });
      return false;
    }
    if (!this.state.surName) {
      this.setState({
        firstNameErr: "",
        firstNameException: false,
        surNameErr: "Last Name / Family Name is required",
        surNameException: true
      });
      return false;
    }
    if (!this.state.email) {
      this.setState({
        emailErr: "Email is required",
        emailException: true,
        surNameErr: "",
        surNameException: false
      });
      return false;
    }

    if (!this.state.country) {
      this.setState({
        countryErr: "Country is required",
        countryException: true,
        emailErr: "",
        emailException: false
      });
      return false;
    }
    if (!this.state.phone) {
      this.setState({
        phoneErr: "Phone No is required",
        phoneException: true,
        countryErr: "",
        countryException: false
      });
      return false;
    }

    if (!this.state.NRIC) {
      this.setState({
        NRICErr: metaHelpers.findElement(TALKTOADOCTOR, DOC_NRIC_REQUIRED_MSG)
          .label,
        NRICException: true,
        phoneErr: "",
        phoneException: false
      });
      return false;
    }

    this.setState({
      NRICErr: "",
      NRICException: false
    });

    this.props.dispatch({
      context: ScreenNames.DOC_REGISTRATION_SCREEN,
      type: actionNames.DOC_SERVICE_REGISTER_PATIENT,
      payload: {
        country: "+60",
        ...this.state,
        NRICID: this.state.NRIC
      }
    });
  };
  selfInput = (type, value) => {
    this.setState({
      [type]: value
    });
  };
  onFulfill = otp => {
    this.props.dispatch({
      context: ScreenNames.DOC_REGISTRATION_SCREEN,
      type: actionNames.DOC_SERVICE_VERIFY_OTP,
      payload: {
        otp
      }
    });
  };
  cellProps = ({ /*index, isFocused,*/ hasValue }) => {
    if (hasValue) {
      return {
        style: [styles.otpInput, styles.otpInputNotEmpty]
      };
    }

    return {
      style: styles.otpInput
    };
  };
  activateResend = () => {
    this.setState({
      showResend: true
    });
  };
  resendOtpFunc = () => {
    const { phone, country } = this.props.profile;
    this.props.dispatch({
      context: ScreenNames.DOC_REGISTRATION_SCREEN,
      type: actionNames.DOC_SERVICE_RESEND_OTP,
      payload: {
        countryPhoneCode: country.countryPhoneCode,
        mobileNumber: this.appendCountryCodeToPhone(
          country.countryPhoneCode,
          phone
        )
      }
    });
    // this.refs.otp.clear();
    this.setState({
      showResend: false
    });
  };

  appendCountryCodeToPhone = (countryCode, phone) => {
    return countryCode.concat("-").concat(phone);
  };

  getOtpModal = () => {
    //
    return (
      <Modal
        isVisible={Boolean(
          this.props.workflowId &&
          this.props.registrationStatus === RegistrationStatus.TNC_ACCEPTED
        )}
        style={styles.mainContainer}
        backdropColor={colors.black}
        backdropOpacity={0.5}
        transparent={true}
      >
        <Text style={[styles.otpHeading]}>{this.otp}</Text>
        {/* <CodeInput
          inputPosition="full-width"
          variant="clear"
          size={40}
          activeColor={colors.nevada}
          inactiveColor={colors.nevada}
          onFulfill={code => this.onFulfill(code)}
          containerStyle={styles.otpInputContainer}
          containerProps={this.containerProps}
          cellProps={this.cellProps}
          keyboardType="numeric"
          codeLength={6}
          ref="otp"
        /> */}
        <OTPInputView
          style={{ width: '80%', height: 60 }}
          pinCount={6}
          // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          // onCodeChanged = {code => { this.setState({code})}}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => this.onFulfill(code)}
        />
        <View style={styles.resendOTPContainer}>
          {!this.state.showResend && (
            <Timer
              onFinish={this.activateResend}
              onRestart={this.state.restartTimer}
            />
          )}
          {this.props.error && this.props.error.otp && (
            <View style={styles.errorPadding}>
              <Text style={styles.errorText}>{this.props.error.otp}</Text>
            </View>
          )}
          {this.state.showResend && (
            <TouchableOpacity onPress={this.resendOtpFunc}>
              <Text style={styles.resendOTPLink}>{this.resendOtp}</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.cancelOTPContainer}
          onPress={this.removeOTPPopup}
        >
          <Text style={styles.cancelOTP}>
            {/* Cancel */}
            {metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_Cancel).label}
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  };
  removeOTPPopup = () => {
    this.props.dispatch({
      context: ScreenNames.DOC_REGISTRATION_SCREEN,
      type: actionNames.DOC_SERVICE_VERIFY_OTP_CANCEL
    });
  };
  resetErr = (err, ect) => {
    this.setState({
      [err]: "",
      [ect]: false
    });
  };
  verifyPhone = () => {
    const { phone, country } = this.props.profile;

    if (this.props.registrationStatus == 2) {
      return false;
    }
    if (!this.state.phone) {
      return;
    }
    this.props.dispatch({
      context: ScreenNames.DOC_REGISTRATION_SCREEN,
      type: actionNames.DOC_SERVICE_VERIFY_PHONE,
      payload: {
        countryPhoneCode: "+60",
        mobileNumber: this.state.phone
      }
    });
  };
  // eslint-disable-next-line complexity
  render() {
    let { height } = Dimensions.get("window");
    let { profile } = this.props;
    const docRegisterScreen = metaHelpers.findScreen(
      SCREEN_KEY_DOC_ON_CALL_REGISTER
    );
    this.otp = metaHelpers.findElementWithScreen(docRegisterScreen, OTP).label;
    this.resendOtp = metaHelpers.findElementWithScreen(
      docRegisterScreen,
      RESEND_OTP
    ).label;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff"
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
              this.props.navigation.goBack();
              this.props.dispatch({
                type: actionNames.INIT_NOT_REGISTERED
              });
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
        <KeyboardAwareScrollView onKeyboardWillShow={frames => { }}>
          <ScrollView
            style={{
              height: height - 10,
              paddingHorizontal: 20
            }}
          >
            <View
              style={{
                paddingTop: 20,
                paddingHorizontal: 20
              }}
            >
              <NewTextInput
                placeholder={
                  metaHelpers.findElement(
                    TALKTOADOCTOR,
                    TALKTOADOCTOR_FIRSTNAME
                  ).label
                }
                presetValue={this.state.firstName}
                exception={false}
                autoCorrect={false}
                onChange={value => {
                  this.selfInput("firstName", value);
                }}
                onBlur={() => { }}
                onFocus={() => { }}
                showTipOnFocus={true}
                errorMessage={this.state.firstNameErr}
                exception={this.state.firstNameException}
                // exception={this.state.firstNameException}
                onBlur={() => {
                  this.resetErr("firstNameErr", "firstNameException");
                }}
                onFocus={() => {
                  this.resetErr("firstNameErr", "firstNameException");
                }}
              />
              <NewTextInput
                placeholder={
                  // "Last Name / Family Name"
                  metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_LASTNAME)
                    .label
                }
                presetValue={this.state.surName}
                exception={false}
                autoCorrect={false}
                onChange={value => {
                  this.selfInput("surName", value);
                }}
                onBlur={() => {
                  // this.resetErr("lastNameErrorMessage", "lastNameException")
                }}
                onFocus={() => {
                  // this.resetErr("lastNameErrorMessage", "lastNameException")
                }}
                showTipOnFocus={true}
                errorMessage={this.state.surNameErr}
                exception={this.state.surNameException}
                onBlur={() => {
                  this.resetErr("surNameErr", "surNameException");
                }}
                onFocus={() => {
                  this.resetErr("surNameErr", "surNameException");
                }}
              />
              <NewTextInput
                placeholder={
                  // "Email"
                  metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_EMAIL)
                    .label
                }
                presetValue={this.state.email}
                isEditable={false}
                exception={false}
                autoCorrect={false}
                exception={false}
                autoCorrect={false}
                inputRectStyle={{ color: "#A7A8AA" }}
                onChange={value => {
                  this.selfInput("email", value);
                }}
                onSubmit={value => { }}
                errorMessage={this.state.emailErr}
                exception={this.state.emailException}
                onBlur={() => {
                  this.resetErr("emailErr", "emailException");
                }}
                onFocus={() => {
                  this.resetErr("emailErr", "emailException");
                }}
              />
              <NewTextInput
                placeholder={
                  // "Country of Residence"
                  metaHelpers.findElement(
                    TALKTOADOCTOR,
                    TALKTOADOCTOR_COUNTRYOFRESIDENCE
                  ).label
                }
                presetValue={this.state.country}
                isEditable={false}
                exception={false}
                autoCorrect={false}
                exception={false}
                autoCorrect={false}
                inputRectStyle={{ color: "#A7A8AA" }}
                onChange={value => {
                  this.selfInput("country", value);
                }}
                errorMessage={this.state.countryErr}
                exception={this.state.countryException}
                onBlur={() => {
                  this.resetErr("countryErr", "countryException");
                }}
                onFocus={() => {
                  this.resetErr("countryErr", "countryException");
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <NewTextInput
                  placeholder={
                    // "Country Code"
                    metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_CD)
                      .label
                  }
                  DownArrow={false}
                  presetValue={"+60"}
                  exception={false}
                  autoCorrect={false}
                  inputRectStyle={{ width: "40%", color: "#A7A8AA" }}
                  onChange={value => { }}
                  onSubmit={value => { }}
                  showTipOnFocus={true}
                  isEnabled={true}
                  isEditable={false}
                />
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 10
                  }}
                >
                  <NewTextInput
                    placeholder={
                      // "Phone No"
                      metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_PN)
                        .label
                    }
                    presetValue={this.state.phone}
                    exception={false}
                    autoCorrect={false}
                    inputRectStyle={{ width: "80%" }}
                    onChange={value => {
                      this.selfInput("phone", value);
                    }}
                    inputRectStyle={{
                      color: this.props.userProfile.phone ? "#A7A8AA" : ""
                    }}
                    errorMessage={this.state.phoneErr}
                    exception={this.state.phoneException}
                    onBlur={() => {
                      this.resetErr("phoneErr", "phoneException");
                    }}
                    onFocus={() => {
                      this.resetErr("phoneErr", "phoneException");
                    }}
                    showTipOnFocus={false}
                    isEditable={
                      this.props.registrationStatus == 2
                        ? false
                        : this.props.userProfile.phone
                          ? false
                          : true
                    }
                    isEnabled={
                      this.props.registrationStatus != 2
                        ? true
                        : this.props.userProfile.phone
                          ? false
                          : true
                    }
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.verifyBtn,
                    {
                      backgroundColor:
                        this.props.registrationStatus == 2
                          ? "rgb(229,125,131)"
                          : "#ED1B2E"
                    }
                  ]}
                  onPress={this.verifyPhone}
                >
                  <Text style={styles.verifyText}>
                    {/* Verify */}
                    {
                      metaHelpers.findElement(
                        TALKTOADOCTOR,
                        TALKTOADOCTOR_Verify
                      ).label
                    }
                  </Text>
                </TouchableOpacity>
              </View>
              <NewTextInput
                placeholder={
                  // "NRIC"
                  metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_NRIC)
                    .label
                }
                presetValue={this.props.IC ? this.props.IC : this.state.NRIC}
                exception={false}
                autoCorrect={false}
                onChange={value => {
                  this.selfInput("NRIC", value);
                }}
                errorMessage={this.state.NRICErr}
                exception={this.state.NRICException}
                inputRectStyle={{ color: this.props.IC ? "#A7A8AA" : "" }}
                isEditable={this.props.IC ? false : true}
                isEnabled={true}
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                marginBottom: 15
              }}
            >
              {
                metaHelpers.findElement(TALKTOADOCTOR, TALKTOADOCTOR_BYCLICK)
                  .label
              }
            </Text>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor:
                    this.props.registrationStatus != 2
                      ? "rgb(229,125,131)"
                      : "#ED1B2E",

                  width: 260,
                  height: 45,
                  borderRadius: 45,
                  justifyContent: "center",
                  marginBottom: 44
                }}
                onPress={() => {
                  this.onProceed();
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 16
                  }}
                >
                  {
                    metaHelpers.findElement(
                      TALKTOADOCTOR,
                      TALKTOADOCTOR_PROCEED
                    ).label
                  }
                  {/* Proceed */}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 100 }}></View>
          </ScrollView>
        </KeyboardAwareScrollView>

        {this.getOtpModal()}
      </View>
    );
  }
}
const profileSelector = state => ({
  ...state.profile,
  country: state.babylonAuth.country //TODO: wrong place to store country
});

const mapStateToProps = state => {
  const userProfile = state.profile;

  return {
    meta: state.meta,
    profile: profileSelector(state),
    workflowId: state.doctorOnCallService.workflowId,
    registrationStatus: state.doctorOnCallService.registrationStatus,
    verifiedPhoneNumber: state.doctorOnCallService.mobileNumber,
    error: state.doctorOnCallService.error,
    country: state.babylonAuth.country,
    token: state.auth.token,
    IC: pathOr("", ["externalIds", "NATIONAL_ID"], userProfile),
    userProfile
  };
};
export default connect(mapStateToProps)(DocOnCallDetil);

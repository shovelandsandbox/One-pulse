/* eslint-disable */
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback, Dimensions } from "react-native";
import { CLOSE_PAGE } from '../../config/images'
import PropTypes from "prop-types"

import {
  CoreConfig,
  metaHelpers,
  CoreComponents,
  CoreActionTypes,
  CoreUtils,
} from "@pru-rt-internal/pulse-common";
import CodeInput from "react-native-confirmation-code-field";
import Toast from "react-native-root-toast";
import OTPInputView from '@twotalltotems/react-native-otp-input';
// import styles from "./styles";
const { Button, Timer } = CoreComponents;
import { connect } from "react-redux";
import { isNil, path, pathOr } from "ramda";

const { colors, SCREEN_KEY_EMAIL_OTP_VERIFICATION, pageKeys, SCREEN_KEY_FORGOT_PASSWORD,
  REGISTERVERIFICATION,
  REGISTERVERIFICATION_POLICY,
  REGISTERVERIFICATION_INVALID,
  REGISTERVERIFICATION_DIDN,
  REGISTERVERIFICATION_HINT,
  REGISTERVERIFICATION_RESEND,
  REGISTERVERIFICATION_CODERR,
  REGISTERVERIFICATION_CODE,
  REGISTERVERIFICATION_NOTE
} = CoreConfig;
const helpers = metaHelpers;
const { CHANGE_OTP, VERIFY_OTP, RESEND_OTP, ACCEPT_MAIN_TERMS_AND_CONDITIONS,
  BABYLON_ACCEPT_TNC, CLEAR_OTP_ERROR, CLOSE_VERIFY_EMAIL, MFA_VERIFY_OTP, MFA_RESEND_OTP } = CoreActionTypes;
const { ElementErrorManager } = CoreConfig;
const KEY_CODE = "emailverificationotp";
const KEY_VERIFY_MSG = "emailverificationheaderdesc";
const KEY_VERIFY_MSG_2 = "emailverificationheaderdescret";
const KEY_VERIFY_OTP = "verifyemailverificaitonotp";
const KEY_LOADING_MSG = "emailverificationloadingmsg";
const KEY_FOOTER_TITLE = "emailotpverificationFooterTitle";
const KEY_STEP1_DESCRIPTION =
  "emailotpverificationFooterResendEmailStepOneDescription";
const ERROR_KEY_REQUIRED = "required";
const KEY_RESEND_ACTIVATION_CODE = "resendactivationcode";
const { isNilOrEmpty } = CoreUtils;

const CODE_PLACEHOLDER = 'Verification Code';

const KEY_NOT_RECEIVE_CODE = "Didn't receive the code?";

import AuthWrapper from "../../features/auth/components/AuthWrapper";

class Validation extends Component {

  constructor(props) {
    super(props);

    this.state = {
      code: '',
      error: null,
      showResend: false,
      restartTimer: false,
      isFocused: false,
      codeFontSize: 16,
    };
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: CHANGE_OTP,
      payload: "",
    });
  }
  _onClose() {
    const { onCloseAction } = this.props

    onCloseAction && onCloseAction()
  }

  _onResend() {
    const { onResendAction } = this.props

    onResendAction && onResendAction()
    this._requestResendOtp()

  }

  _onSubmit() {
    // const { onSubmitAction } = this.props
    // onSubmitAction && onSubmitAction(this.state.code)
    this.verify()
  }
  onSubmit() {
    const { navigation, isLoggedIn, isRegistered, workflowId } = this.props;
    const { commons } = this.props.meta.metaDetail;
    const fromAuthAction = path(
      ["state", "params", "fromAuthAction"],
      navigation
    );

    const socialAccessType = path(
      ["state", "params", "socialAccessType"],
      navigation
    );

    const tncVersion = metaHelpers.findCommon("PULSE_TnC_VERSION").value;
    const privacyVersion = metaHelpers.findCommon("PULSE_PP_VERSION").value;

    if (true && (isLoggedIn || isRegistered)) {

      const userDetails = {
        firstName: this.props.firstName,
        surName: this.props.lastName,
        contactDetails: {
          email: {
            channel: "EMAIL",
            value: this.props.registeredEmail,
          },
        },
      };
      return this.props.dispatch({
        context: pageKeys.REGISTRATION,
        type: ACCEPT_MAIN_TERMS_AND_CONDITIONS,
        payload: {
          workflowId,
          email: this.props.registeredEmail,
          userDetails,
          socialAccessType,
          tncVersion,
          privacyVersion,
        }
      });
    }
    this.props.dispatch({
      context: pageKeys.HEALTH_CHECK_HOME_PAGE,
      type: BABYLON_ACCEPT_TNC,
      payload: {
        tncAccepted: true,
        ...navigation.state.params,
      }
    });
  }
  verify = () => {
    Keyboard.dismiss();
    const { workflowId, otp, mfa, mfaworkflowId, previousUser, email } = this.props;
    const otpElement = helpers.findElement(
      SCREEN_KEY_EMAIL_OTP_VERIFICATION,
      KEY_CODE
    );
    const otpRequired = helpers.findErrorMessage(otpElement, ERROR_KEY_REQUIRED)
      .message;
    this.setState({
      error: null,
    }, () => {
    });

    if (mfa && otp) {
      this.props.dispatch({
        context: pageKeys.LOGIN,
        type: MFA_VERIFY_OTP,
        payload: {
            otp: this.state.code,
            mfaworkflowId,
            previousUser,
            email
        },
      });
    } else if (otp) {
      this.props.dispatch({
        context: pageKeys.REGISTRATION,
        type: VERIFY_OTP,
        payload: {
          otp: this.state.code,
          workflowId,
          // email
        },
      });

      // this.onSubmit()

    } else {
      this.setState({
        error: otpRequired,
      }, () => {
      });
    }
  }
  onChangeOtp(otpValue) {
    this.props.dispatch({
      type: CHANGE_OTP,
      payload: otpValue,
    })


  }
  _requestResendOtp() {
    const { workflowId, mfa, mfaworkflowId } = this.props;

    if (mfa) {
      this.props.dispatch({
          context: pageKeys.LOGIN,
          type: MFA_RESEND_OTP,
          payload: {
            mfaworkflowId,
          },
      });
    } else {
      this.props.dispatch({
        context: pageKeys.REGISTRATION,
        type: RESEND_OTP,
        payload: {
          workflowId,
        },
      });
    }
    this.setState({
      restartTimer: true,
      showResend: false,
    });
  }
  activateResend() {
    this.setState({
      showResend: true,
    });
  }

  render() {
    const { email, userCountryDetails, loginPreference } = this.props
    const { showResend, restartTimer, error, code, isFocused, codeFontSize } = this.state
    const otpDisclaimer = metaHelpers.findElement(REGISTERVERIFICATION, REGISTERVERIFICATION_NOTE).label
    const height = Dimensions.get('window').height - 180;
    const countryCode = `+ ${pathOr("", ["countryCommonMeta", "isdCode"], this.props.meta)}`;

    return <AuthWrapper
      needLang={false}
      title={
        metaHelpers.findScreen(REGISTERVERIFICATION).label
      }
      customStyles={{ paddingTop: 31, paddingHorizontal: 23 }}
      country={userCountryDetails.simCountry}
    >
      <TouchableWithoutFeedback style={{ height, overflow: 'hidden' }} onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ height }}>
          <Text style={{
            color: '#222529',
            fontFamily: 'Avenir',
            fontSize: 16,
            fontWeight: '300',
            lineHeight: 30,
            textAlign: 'center',
          }}>
            {metaHelpers.findElement(REGISTERVERIFICATION, REGISTERVERIFICATION_HINT).label}
          </Text>
          <Text style={{
            marginTop: 8,
            height: 24,
            color: '#222529',
            fontFamily: 'Avenir',
            fontSize: 16,
            fontWeight: '500',
            // lineHeight: 22,
            textAlign: 'center',
          }}>
            {
              loginPreference === "phone" ?
                `${countryCode} ${email}` :
                email
            }
          </Text>
          <View style={{
            marginTop: 34,
            flexDirection: 'row',
            justifyContent: "flex-start",
            paddingHorizontal: 40,
          }}>
            <OTPInputView
              style={{ flex: 1, height: 60 }}
              pinCount={6}
              autoFocusOnLoad
              codeInputFieldStyle={{
                width: 30,
                height: 45,
                borderWidth: 1,
                borderBottomWidth: 1,
              }}
              onCodeFilled={(content) => {
                this.setState({
                  code: content
                }, () => {
                  if (this.state.code.length > 5) {
                    this.verify()
                  } else {
                    this.props.dispatch({
                      type: CLEAR_OTP_ERROR,
                    });
                  }
                })
                this.onChangeOtp(content)
              }}
            />
            {/* <TextInput
              style={{
                flex: 1,
                textAlign: 'center',
                alignSelf: 'center',
                fontWeight: '900',
                fontFamily: 'Avenir',
                fontSize: codeFontSize,
                marginRight: !isNilOrEmpty(error) ? -24 : 0,
                // lineHeight: 44,
              }}
              defaultValue={code}
              maxLength={6}
              autoFocus={false}
              autoCorrect={false}
              placeholder={isFocused ? '' : metaHelpers.findElement(REGISTERVERIFICATION, REGISTERVERIFICATION_CODE).label}
              autoComplete={'off'}
              autoCapitalize={'none'}
              returnKeyType={'done'}
              onChangeText={(content) => {
                this.setState({
                  code: content
                }, () => {
                  if (this.state.code.length > 5) {
                    this.verify()
                  } else {
                    this.props.dispatch({
                      type: CLEAR_OTP_ERROR,
                    });
                  }
                })
                this.onChangeOtp(content)
              }}
              onSubmitEditing={() => {
                this._onSubmit()
              }}
              onFocus={() => {
                this.setState({
                  isFocused: true,
                  codeFontSize: 32,
                })
              }}
              onBlur={() => {
                const size = isNilOrEmpty(this.state.code) ? 16 : 32
                this.setState({
                  isFocused: false,
                  codeFontSize: size,
                })
              }}
            > */}
            {/* </TextInput> */}
            {
              !isNilOrEmpty(error) &&
              <TouchableOpacity
                style={{
                  width: 24,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  this.setState({
                    code: '',
                    codeFontSize: 16,
                  })
                }}
              >
                <Image style={{ tintColor: '#e87722' }} source={CLOSE_PAGE} />
              </TouchableOpacity>
            }
          </View>

          <View style={{
            height: this.state.isFocused ? 2 : 1,
            backgroundColor: !isNilOrEmpty(error) ? '#E87722' : '#515b61',
            marginHorizontal: 40,
          }} />
          {
            !isNilOrEmpty(this.props.error) &&
            <Text style={{
              marginTop: 4,
              height: 16,
              color: '#E87722',
              fontFamily: 'Avenir',
              fontSize: 12,
              fontWeight: '500',
              lineHeight: 16,
              textAlign: 'center',
            }}>
              {metaHelpers.findElement(REGISTERVERIFICATION, REGISTERVERIFICATION_CODERR).label}
            </Text>
          }
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
            <Text style={{
              // height: 22,
              color: '#222529',
              fontSize: 16,
              fontWeight: '300',
              // lineHeight: 22,
              fontFamily: 'Avenir',
              marginLeft: 10
            }}>
              {
                metaHelpers.findElement(
                  REGISTERVERIFICATION,
                  REGISTERVERIFICATION_DIDN
                ).label
              }
            </Text>
            {
              showResend &&
              <TouchableOpacity
                style={{
                  marginLeft: 5,
                }}
                onPress={this._onResend.bind(this)}>
                <Text style={{
                  textAlign: 'center',
                  color: '#ed1b2e',
                  fontFamily: 'Avenir',
                  fontSize: 16,
                  // lineHeight: 22,
                  fontWeight: '500'
                }}>
                  {metaHelpers.findElement(REGISTERVERIFICATION, REGISTERVERIFICATION_RESEND).label}
                </Text>
              </TouchableOpacity>
            }

            {!showResend && (
              <Timer
                onFinish={this.activateResend.bind(this)}
                onRestart={restartTimer}
                textStyle={{
                  // height: 22,
                  color: '#222529',
                  fontFamily: 'Avenir',
                  fontSize: 16,
                  fontWeight: '500',
                  // lineHeight: 22,
                  alignSelf: 'center',
                  marginLeft: 8,
                }} />
            )}
          </View>
          <Text style={{
            marginTop: 10,
            color: '#515b61',
            fontFamily: 'Avenir',
            fontSize: 14,
            marginLeft: 10,
            marginRight: 10,
            lineHeight: 22,
            textAlign: 'center',
          }}>
            {otpDisclaimer}
          </Text>
        </View >
      </TouchableWithoutFeedback >
    </AuthWrapper >
  }

}

Validation.PropTypes = {
  email: PropTypes.isRequired,
  onCloseAction: PropTypes.func,
  onResendAction: PropTypes.func,
  onSubmitAction: PropTypes.func,
}

const mapStateToProps = state => {
  return {
    accountEmail: state.account.email,
    firstName: state.account.firstName,
    isLoggedIn: state.auth.isLoggedIn,
    isRegistered: state.register.isRegistered,
    isSocialLoggedIn: state.account.isSocialLoggedIn,
    lastName: state.account.lastName,
    loading: state.auth.loading,
    error: state.register.verifyOtpError ? state.register.verifyOtpError :state.auth.mfaOtpError,
    meta: state.meta,
    loginPreference: state.auth.loginPreference,
    otp: state.register.otp,
    otpVerified: state.register.otpVerified,
    userVerified: state.register.userVerified,
    profilePic: state.account.profilePic,
    profilePicData: state.account.profilePicData,
    socialAccessType: state.account.socialAccessType,
    socialEmailReturned: state.account.socialEmailReturned,
    socialLoginID: state.account.socialLoginID,
    workflowId: state.register.workflowId,
    currentScreen: state.trigger.currentScreen,
    navigateToMainScreen: state.auth.navigateToMainScreen,
    password: state.auth.password,
    refreshImage: state.meta.refreshImage,
    sessionId: state.auth.token,
    termsAccepted: state.auth.termsAccepted,
    registeredEmail: state.register.email,
    userCountryDetails: state.auth.countryInfo,
    mfa: state.auth.mfa,
    mfaworkflowId: state.auth.workflowId,
  }
};

export default connect(mapStateToProps)(Validation)

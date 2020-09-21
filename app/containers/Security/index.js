/* eslint-disable */
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  Platform,
  Modal,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { NOTIFICATION_SUCCESS } from "../../config/images";
import DetailArrowCell from "../../components/DetailArrowCell";
// import ProfileHeader from '../../components/ProfileHeader';
import SwitchCell from "../../components/SwitchCell";
import PruCamera from "../../components/PruCamera";
import checkBimetricSupported from "../../core/Biometrics";
import { checkScreenFeatures } from "../../actions";
import { screenFeatures, features, isFeatureEnable } from "../../core/Features";
import { dispatchEvent } from "../../actions";
import NewTextInput from "../../components/NewTextInput";
import { CustomAlert } from "../../components";
const {
  pageKeys,
  NEW_SECURITY,
  NEW_SECURITY_SECURITY,
  NEW_SECURITY_CHANGE_PASSWORD,
  NEW_SECURITY_ENABLETOUCH,
  NEW_SECURITY_ENABLEFACE,
  NEW_SECURITY_PASSWORDCHANGED,
  NEW_ME,
  NEW_ME_LANGUAGE
} = CoreConfig;
import PropTypes from "prop-types";

const { isNilOrEmpty } = CoreUtils;
import {
  CoreConfig,
  CoreUtils,
  metaHelpers,
  CoreActions,
  CoreActionTypes,
  events,
  CoreSelectors
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;

import TouchID from "react-native-touch-id";

const LanguageTool = metaHelpers;
const { GO_TO_NEW_PROFILE } = CoreActionTypes;
const { enableDisableFingerprints } = CoreActions;

// Language Keys
const SCREEN_KEY_SECURITY = "security";
const ELEMENT_TITLE = "title";
const ELEMENT_CHANGEPASSWORD_LABEL_TEXT = "changePassword";
const ELEMENT_ENABLE_TOUCHID_LABEL_TEXT = "enableTouchID";

class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTouchIDSupported: false,
      selected: false,
      notificationOpacity: new Animated.Value(0),
      notificationHeight: new Animated.Value(0),
      notificaitonMessage: LanguageTool.findElement(
        NEW_SECURITY,
        NEW_SECURITY_PASSWORDCHANGED
      ).label,
      shouldPresentNotification: false,
      presentingNotification: false,
      isFaceAuthenticationEnabled: false,
      showCamera: false,
      pictureInfo: {}
    };
    this.setPicture.bind(this);
    this.enrollBioMetric = this.enrollBioMetric.bind(this);
    this.closeCamera.bind(this);
  }

  setPicture = pictureInfo => {
    this.setState({ showCamera: false });
    if (pictureInfo && pictureInfo.base64) {
      this.props.enrollFaceAuth({
        id: this.props.userId,
        publicKeys: {
          facial: {
            value: pictureInfo.base64
          }
        }
      });
    } else {
      CustomAlert.show("FaceID Enrollment", "Enrollment failed", {
        positiveText: "Cancel",
        onPositivePress: () => {},
        });
    }
  };

  closeCamera = () => {
    this.setState({ showCamera: false });
  };

  componentWillMount() {
    TouchID.isSupported()
      .then(type => {
        if (type !== "FaceID") {
          this.setState({
            isTouchIDSupported: true
          });
        }
      })
      .catch(error => {
        this.state({
          isTouchIDSupported: false
        });
      });
  }

  componentDidMount() {
    this.props.checkScreenFeatures(screenFeatures[pageKeys.PULSE_SECURITY]);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.enrollFaceAuth != nextProps.enrollFaceAuth &&
      nexttProps.enrollFaceAuth === true
    ) {
      CustomAlert.show("FaceID Enrollment", "Enrollment Success.", {
        positiveText: "OK",
        onPositivePress: () => {},
        })
    }
  }

  enrollBioMetric(userId, publicKey) {
    const payload = {
      id: userId,
      publicKeys: {
        fingerprint: {
          value: publicKey
        }
      }
    };
    this.props.enrollUser(payload);
  }

  enableDisableFingerprints = value => {
    const optionalConfigObjectAndroid = {
      unifiedErrors: false,
      passcodeFallback: true
    };
    const optionalConfigObject = {
      unifiedErrors: false // use unified error messages (default false)
    };
    const optionalObject =
      Platform.OS == "ios" ? optionalConfigObject : optionalConfigObjectAndroid;
    TouchID.isSupported(optionalObject)
      .then(biometryType => {
        // Success code
        if (biometryType !== "FaceID") {
          this.props.enableDisableFingerprints(
            value,
            this.props.email,
            this.props.refreshToken
          );
        }
      })
      .catch(error => {
        if (error.code === NOT_ENROLLED) {
          const oopsLabel = metaHelpers.findElement(
            SCREEN_KEY_LOGIN,
            KEY_FINGERPRINT_OOPS_LABEL
          ).label;
          const addFingerprint = metaHelpers.findElement(
            SCREEN_KEY_LOGIN,
            KEY_FINGERPRINT_ADD_FINGERPRINT_MESSAGE
          ).label;
          Alert.alert(oopsLabel, addFingerprint);
        }
      });
  };

  updateFingerprintSupport = async () => {
    const optionalConfigObject = {
      unifiedErrors: false // use unified error messages (default false)
    };
    TouchID.isSupported(optionalConfigObject)
      .then(biometryType => {
        // Success code
        if (biometryType === "FaceID") {
        } else {
          this.setState({
            isFingerPrintSupported: true,
            isFingerprintEnrolled: true
          });
        }
      })
      .catch(error => {
        if (error.code === NOT_ENROLLED) {
          this.setState({
            isFingerPrintSupported: true,
            isFingerprintEnrolled: false
          });
        } else {
          this.setState({ isFingerPrintSupported: false });
        }
      });
  };

  _adjustNotificationBannerHeight(expanded) {
    if (expanded) {
      Animated.timing(this.state.notificationHeight, {
        toValue: 80,
        duration: 1
      }).start();
    } else {
      Animated.timing(this.state.notificationHeight, {
        toValue: 0,
        duration: 1
      }).start();
    }
  }

  popNotification(t) {
    setTimeout(() => {
      this._adjustNotificationBannerHeight(true);
      Animated.timing(this.state.notificationOpacity, {
        toValue: 1,
        duration: 250,
        easing: Easing.linear
      }).start(() => {
        setTimeout(() => {
          Animated.timing(this.state.notificationOpacity, {
            toValue: 0,
            duration: 250,
            easing: Easing.linear
          }).start(() => {
            this._adjustNotificationBannerHeight(false);
          });
        }, t);
      });
    }, 500);
  }

  render() {
    const { changeSuccess } = this.props;
    const isTouchIdAvailable = isFeatureEnable(
      this.props.featuresStatus,
      features.TOUCH_ID
    );
    const isFaceIdAvailable = isFeatureEnable(
      this.props.featuresStatus,
      features.FACE_ID
    );
    const {
      isTouchIDSupported,
      notificationOpacity,
      notificaitonMessage
    } = this.state;
    const { fingerPrintAuthEnabledForEmail, email } = this.props;
    let isFingerprintEnabled = fingerPrintAuthEnabledForEmail == email;
    const debug = true;
    const title = debug
      ? false
      : LanguageTool.findElement(SCREEN_KEY_SECURITY, ELEMENT_TITLE).label;
    const t_cp = debug
      ? false
      : LanguageTool.findElement(
        SCREEN_KEY_SECURITY,
        ELEMENT_CHANGEPASSWORD_LABEL_TEXT
      ).label;
    const t_et = debug
      ? false
      : LanguageTool.findElement(
        SCREEN_KEY_SECURITY,
        ELEMENT_ENABLE_TOUCHID_LABEL_TEXT
      ).label;

    if (
      !isNilOrEmpty(fingerPrintAuthEnabledForEmail) &&
      email == fingerPrintAuthEnabledForEmail
    ) {
      isFingerprintEnabled = true;
    }

    const SCREEN_SECURITY = LanguageTool.findElement(
      NEW_SECURITY,
      NEW_SECURITY_SECURITY
    ).label;
    const SCREEN_SECURITY_CHANGE_PASSWORD = LanguageTool.findElement(
      NEW_SECURITY,
      NEW_SECURITY_CHANGE_PASSWORD
    ).label;
    const SCREEN_SECURITY_ENABLETOUCH = LanguageTool.findElement(
      NEW_SECURITY,
      NEW_SECURITY_ENABLETOUCH
    ).label;
    const SCREEN_SECURITY_ENABLEFACE = LanguageTool.findElement(
      NEW_SECURITY,
      NEW_SECURITY_ENABLEFACE
    ).label;
    const SCREEN_ME_LANGUAGE = metaHelpers.findElement(NEW_ME, NEW_ME_LANGUAGE)
      .label;

    changeSuccess && this.popNotification(1500);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "flex-start"
        }}
      >
        {/* Notification PopUp */}
        <Animated.View
          style={{
            width: "100%",
            height: this.state.notificationHeight,
            backgroundColor: "#F3F3F3",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            opacity: notificationOpacity,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            flexDirection: "row"
          }}
        >
          <Image
            style={{
              marginLeft: 12,
              marginRight: 12,
              alignSelf: "center"
            }}
            source={NOTIFICATION_SUCCESS}
          />
          <Text
            style={{
              color: "#515B61",
              fontFamily: "Avenir",
              fontSize: 16,
              fontWeight: "500",
              alignSelf: "center",
              textAlign: "left"
            }}
            numberOfLines={1}
            lineBreakMode={"tail"}
          >
            {notificaitonMessage}
          </Text>
        </Animated.View>
        <View
          style={{
            marginTop: 110,
            marginBottom: 53,
            width: "100%"
          }}
        >
          <Text
            style={{
              color: "#515B61",
              fontFamily: "Avenir",
              fontSize: 22,
              fontWeight: "900",
              lineHeight: 30,
              textAlign: "center",
              letterSpacing: 1
            }}
          >
            {/* {title ? title : SCREEN_SECURITY} */}
            {"Settings"}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            marginHorizontal: 40,
            flexDirection: "column"
          }}
        >
          {/** Detail Type Cell */}
          {/* metaHelpers.findCommon(this.props.countryCommonMeta.countryCode2).label */}
          <DetailArrowCell
            labelText={"Country"}
            onPress={() => { }}
            hideArrow={true}
            showRightText={true}
            rightLabel={
              metaHelpers.findCommon(this.props.countryCommonMeta.countryCode2)
                .label
            }
          />
          <DetailArrowCell
            labelText={SCREEN_ME_LANGUAGE}
            onPress={() => {
              const payload = {
                path: pageKeys.PULSE_CHANGE_LANGUAGE,
                userData: {
                  ...this.props.userProfile,
                  profilePicture: this.props.userIcon
                },
                editable: true,
                related: false,
                newProfile: false
              };
              this.props.goNext(payload);
            }}
            event={events.SwitchLanguage}
          />
          <DetailArrowCell
            labelText={t_cp ? t_cp : SCREEN_SECURITY_CHANGE_PASSWORD}
            onPress={() => {
              this.props.goToChangePassword();
            }}
            event={events.ProfileChangePassword}
          />
          {isTouchIDSupported && isTouchIdAvailable && (
            <SwitchCell
              labelText={t_et ? t_et : SCREEN_SECURITY_ENABLETOUCH}
              isOn={this.props.isTouchAuthEnrolled}
              onToggle={() => {
                if (this.props.isTouchAuthEnrolled) {
                  this.props.disableTouchLogin();
                  this.props.dispatchEvent(events.ProfileDisableTouch);
                } else {
                  if (!this.props.isTouchAuthEnrolled) {
                    this.props.dispatchEvent(events.ProfileEnableTouch);
                    checkBimetricSupported(
                      this.props.userId,
                      this.enrollBioMetric,
                      () => { }
                    );
                  }
                }
              }}
            />
          )}

          {isFaceIdAvailable && (
            <SwitchCell
              labelText={SCREEN_SECURITY_ENABLEFACE}
              isOn={this.props.isFaceAuthEnrolled}
              onToggle={() => {
                if (this.props.isFaceAuthEnrolled) {
                  this.props.dispatchEvent(events.ProfileDisableFace);
                  this.props.disableFaceLogin();
                } else {
                  this.props.dispatchEvent(events.ProfileEnableFace);
                  this.enableFaceAuthentication();
                }
              }}
            />
          )}
        </View>
        <Modal visible={this.state.showCamera}>
          <PruCamera
            setPicture={this.setPicture}
            closeCamera={this.closeCamera}
          />
        </Modal>
      </View>
    );
  }

  enableFaceAuthentication = () => {
    this.setState({ showCamera: true });
  };

  disableFaceAuthentication = () => {
    this.setState({ showCamera: false });
  };
}

Security.propTypes = {
  fingerPrintAuthEnabledForEmail: PropTypes.string,
  email: PropTypes.string,
  enableDisableFingerprints: PropTypes.func
};

const mapStateToProps = state => {
  return {
    changeSuccess: state.auth.changePasswordSuccess,
    email: state.profile.email,
    email: AuthSelector.getUserEmail(state),
    featuresStatus: state.auth.featuresStatus,
    sessionId: state.auth.token,
    socialLoginType: state.account.socialAccessType,
    isSocialLoggedIn: state.account.isSocialLoggedIn,
    fingerPrintAuthEnabledForEmail:
      state.sharedData.fingerPrintAuthEnabledForEmail,
    refreshToken: AuthSelector.getRefreshToken(state),
    isFaceAuthEnrolled: state.auth.isFaceAuthEnrolled,
    isTouchAuthEnrolled: state.auth.isTouchAuthEnrolled,
    countryCommonMeta: state.meta.countryCommonMeta,
    userProfile: state.profile,
    userIcon: state.profile.profilePicture,
    language: state.userPreferences.language,
  };
};

export default connect(mapStateToProps, {
  enableDisableFingerprints,
  goNext: payload => ({
    context: pageKeys.MANAGE_PROFILE,
    type: GO_TO_NEW_PROFILE,
    payload: {
      ...payload
    }
  }),
  goToChangePassword: () => ({
    context: pageKeys.ACCOUNT_SCREEN,
    type: CoreActionTypes.KEY_CHANGE_PASSWORD
  }),
  enrollFaceAuth: payload => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.FACE_AUTH_ENROLL,
    payload
  }),
  enrollUser: payload => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.TOUCH_AUTH_ENROLL,
    payload
  }),
  disableFaceLogin: () => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.FACE_AUTH_LOGIN_DISABLE
  }),
  disableTouchLogin: () => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.TOUCH_AUTH_LOGIN_DISABLE
  }),
  dispatchEvent,
  checkScreenFeatures
})(Security);

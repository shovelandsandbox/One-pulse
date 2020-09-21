/* eslint-disable */
import React from "react";
import {
  Image,
  View,
  Text,
  Platform,
  Dimensions,
  NativeModules,
  Modal,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import DetailArrowCell from "../../components/DetailArrowCell";
import { PruHeaderText } from "../../components";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  CoreActions,
  events
} from "@pru-rt-internal/pulse-common";
import {

  NEW_GLOBE,
  NEW_LANGUAGE,
  NEW_PASSWORD,
  NEW_FINGERPRINT,
  NEW_FACEID,
  CALENDER,
  NEW_PRAYER_ICON
} from "../../config/images";
import styles from "./styles";
import checkBimetricSupported from "../../core/Biometrics";
import PruDetailArrowCell from "../../components/PruDetailArrowCell";
import * as NotificationTool from "../../utils/NotificationScheduleTool";
const { RNDeviceInfoBridge } = NativeModules;
const { dispatchFeedbackReset, setInsanHome, updateScheduledNotification } = CoreActions;
const KEY_VRESION = "version";
const helpers = metaHelpers;
import PruCamera from "../../components/PruCamera";
import {CustomAlert} from '../../components';
const {
  pageKeys,
  NEW_ME,
  NEW_ME_LANGUAGE,
  NEW_ME_PROVIDEFEEDBACK,
  NEW_ME_SIGNOUT,
  SCREEN_KEY_ABOUT_US,
  NEW_ABOUT,
  NEW_ABOUT_TERMSCONDITIONS,
  NEW_ABOUT_PRIVACYNOTICE,
  NEW_ABOUT_APPVERSION,
  NEW_ABOUT_APPVERSION_NUMBER,
  NEW_ABOUT_ABOUT,
  APP_VERSION,
  NEW_SECURITY,
  NEW_SECURITY_CHANGE_PASSWORD,
  NEW_SECURITY_ENABLETOUCH,
  NEW_SECURITY_ENABLEFACE,
  NEW_ME_SETTINGS_COUNTRY,
  MY_SETTINGS,
  INSAAN_HOME_TILE,
  NEW_SECURITY_ENABLEPRAYER,
  NEW_LANGUAGR
} = CoreConfig;
const { GO_TO_TERMSANDCOND, GO_TO_PRIVACY_POLICY } = CoreActionTypes;
const LanguageTool = metaHelpers;
const KEY_TERMS = "termsandconditions";
const KEY_PRIVACY = "privacy";
import { dispatchEvent, gotoNewTNC, gotoNewPrivacy } from "../../actions";

const isIphoneX = () => {
  const { height, width } = Dimensions.get("window");
  return Platform.OS === "ios" && (height >= 812 || width >= 812);
};
// const appverion = DeviceInfo.getVersion();
class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appVersion: "",
      showCamera: false
    };
  }

  componentDidMount() {
    this.props.resetPassword();
    this.props.resetProfileNotification();
    this.props.dispatchFeedbackReset();
    if (RNDeviceInfoBridge) {
      RNDeviceInfoBridge.execute("getAppVersion", {}).then(appVersion => {
        this.setState({ appVersion: appVersion.appVersion });
      });
    }
  }

  whichAction(action) {
    switch (action) {
      case 'language':
        return this.nextScreen(pageKeys.PULSE_CHANGE_LANGUAGE);
      case 'password':
        return this.props.goToChangePassword();
      case 'touch':
        return this.enableTouchId();
      case 'face':
        return this.enableFaceId();
      case 'insaan':
        return this.toggleInsaan();
      // case 'calender':
      //   return this.nextScreen(pageKeys.CHANGE_CALANDER);
    }
  }

  nextScreen(screenPath) {
    const payload = {
      path: screenPath,
      userData: {
        ...this.props.userProfile,
        profilePicture: this.props.userIcon
      },
      editable: true,
      related: false,
      newProfile: false
    };
    this.props.goNext(payload);
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

  enableTouchId() {
    if (this.props.isTouchAuthEnrolled) {
      this.props.disableTouchLogin();
      this.props.dispatchEvent(events.ProfileDisableTouch);
    } else {
      if (!this.props.isTouchAuthEnrolled) {
        this.props.dispatchEvent(events.ProfileEnableTouch);
        checkBimetricSupported(
          this.props.userProfile.id,
          this.enrollBioMetric.bind(this),
          () => { }
        );
      }
    }
  }

  enableFaceId() {
    if (this.props.isFaceAuthEnrolled) {
      this.props.dispatchEvent(events.ProfileDisableFace);
      this.props.disableFaceLogin();
    } else {
      this.props.dispatchEvent(events.ProfileEnableFace);
      this.enableFaceAuthentication();
    }
  }

  enableFaceAuthentication = () => {
    this.setState({ showCamera: true });
  };

  setPicture = pictureInfo => {
    this.setState({ showCamera: false });
    if (pictureInfo && pictureInfo.base64) {
      this.props.enrollFaceAuth({
        id: this.props.userProfile.id,
        publicKeys: {
          facial: {
            value: pictureInfo.base64
          }
        }
      });
    } else {
      CustomAlert.show("FaceID Enrollment", "Enrollment failed", {
        positiveText: "Cancel",
        onPositivePress: () => { },
     
        });
    }
  };

  closeCamera = () => {
    this.setState({ showCamera: false });
  };

  detailCellPressed(account) {
    this.setState({
      activeListItem: account
    }, () => {
      return this.whichAction(account.actionType);
    })
  }

  toggleInsaan = () => {
    if (this.props.isInsaanEnabled) {
      this.props.dispatchEvent(events.InsaanDisable);
      this.props.setInsanHome(false);
      if (Platform.OS == "ios") {
        this.props.updateScheduledNotification([]);
        NotificationTool.reScheduleAllInsaanNotificationForWeek({});
      }
      else {
        this.props.updateScheduledNotification([]);
        NotificationTool.reScheduleAllInsanNotificationForWeek({});
      }
    } else {
      this.props.dispatchEvent(events.InsaanEnable);
      this.props.setInsanHome(true);
    }
  }


  render() {
    // const title = helpers.findScreen(SCREEN_KEY_ABOUT_US).label;
    const SCREEN_ME_LANGUAGE = metaHelpers.findElement(NEW_ME, NEW_ME_LANGUAGE)
      .label;

    const settings = metaHelpers.findElement(NEW_SECURITY, MY_SETTINGS)
      .label;

    const SCREEN_SECURITY_CHANGE_PASSWORD = LanguageTool.findElement(
      NEW_SECURITY,
      NEW_SECURITY_CHANGE_PASSWORD
    ).label;
    const PASSWORD_TEXT = SCREEN_SECURITY_CHANGE_PASSWORD;
    const SCREEN_SECURITY_ENABLETOUCH = LanguageTool.findElement(
      NEW_SECURITY,
      NEW_SECURITY_ENABLETOUCH
    ).label;
    const SCREEN_SECURITY_ENABLEFACE = LanguageTool.findElement(
      NEW_SECURITY,
      NEW_SECURITY_ENABLEFACE
    ).label;
    const COUNTRY = metaHelpers.findElement(
      NEW_SECURITY,
      NEW_ME_SETTINGS_COUNTRY
    ).label;
    const SCREEN_SECURITY = LanguageTool.findElement(
      INSAAN_HOME_TILE,
      NEW_SECURITY_ENABLEPRAYER
    );
    const SCREEN_SECURITY_ENABLEPRAYER = SCREEN_SECURITY ? SCREEN_SECURITY.label : 'NEW_SECURITY_ENABLEPRAYER';
    // const SCREEN_ABOUT_APPVERSION_NUMBER = helpers.findElement(NEW_ABOUT, NEW_ABOUT_APPVERSION_NUMBER).label;
    const SCREEN_ABOUT_APPVERSION_NUMBER = `Pulse ${this.state.appVersion}`;
    const SCREEN_ABOUT_ABOUT = helpers.findElement(NEW_ABOUT, NEW_ABOUT_ABOUT)
      .label;
    const { navigation } = this.props;
    const finalLang = this.props.languageList.filter(
      lang => lang.languageCode === this.props.language
    )[0];


    const LANGUAGE_TEXT = helpers.findElement(NEW_LANGUAGR, finalLang.languageCode).label;
    const COUNTRY_CODE = this.props.countryCommonMeta.countryCode2;
    const COUNTRY_NAME = metaHelpers.findCommon(this.props.countryCommonMeta.countryCode2).label;
    const accountList = [
      {
        icon: NEW_GLOBE,
        cellName: COUNTRY,
        thirdColumn: true,
        isSwitch: false,
        thirdColumnText: COUNTRY_NAME,
        actionType: '',
        thirdComponent: 'text',
      },
      {
        icon: NEW_LANGUAGE,
        cellName: SCREEN_ME_LANGUAGE,
        thirdColumn: true,
        isSwitch: false,
        thirdColumnText: LANGUAGE_TEXT,
        actionType: 'language',
        thirdComponent: 'text',
      },
      {
        icon: NEW_PASSWORD,
        cellName: PASSWORD_TEXT,
        thirdColumn: false,
        isSwitch: false,
        thirdColumnText: '',
        actionType: 'password'
      },
      {
        icon: NEW_FINGERPRINT,
        cellName: SCREEN_SECURITY_ENABLETOUCH,
        thirdColumn: true,
        isSwitch: true,
        thirdColumnText: '',
        actionType: 'touch',
        switchValue: this.props.isTouchAuthEnrolled,
        thirdComponent: 'switchButton',
      },
      {
        icon: NEW_FACEID,
        cellName: SCREEN_SECURITY_ENABLEFACE,
        thirdColumn: true,
        isSwitch: true,
        thirdColumnText: '',
        actionType: 'face',
        switchValue: this.props.isFaceAuthEnrolled,
        thirdComponent: 'switchButton',
      },
      {
        icon: NEW_PRAYER_ICON,
        cellName: SCREEN_SECURITY_ENABLEPRAYER,
        thirdColumn: true,
        isSwitch: true,
        thirdColumnText: '',
        actionType: 'insaan',
        switchValue: this.props.isInsaanEnabled,
        thirdComponent: 'switchButton',
        isVisible: COUNTRY_CODE !== "MY",
      },
      // {
      //   icon: CALENDER,
      //   cellName: 'Calendar',
      //   thirdColumn: true,
      //   isSwitch: false,
      //   thirdColumnText: this.props.calenderSelected,
      //   actionType: 'calender',
      // },

    ];
    return (
      <View style={styles.container}>
        <PruHeaderText text={settings} />
        <ScrollView>
          <View style={{ marginTop: 20 }}>
            {
              accountList.map(account => {
                if (!account.isVisible) {
                  return (
                    <PruDetailArrowCell
                      {...account}
                      key={account.actionType}
                      onclick={() => this.detailCellPressed(account)}
                    />
                  )
                }
              })
            }
          </View>
        </ScrollView>

        {this.state.showCamera && (
            <Modal>
              <PruCamera
                setPicture={this.setPicture}
                closeCamera={this.closeCamera}
              />
            </Modal>
          )}
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userProfile: state.profile,
    connectedList: state.profile.connectedList,
    relationList: state.relationData.relationList,
    relationDataLoading: state.relationData.loading,
    relations: state.relationData.relationList,
    updatingRelations: state.profile.loading,
    updatingConnects: state.connectData.loading,
    relatedMembers: state.profile.relationList,
    connectedMembers: state.connectData.connectedList,
    documents: state.documents,
    isTouchAuthEnrolled: state.auth.isTouchAuthEnrolled,
    isFaceAuthEnrolled: state.auth.isFaceAuthEnrolled,
    babylonUserLoggedIn: state.babylonAuth.babylonUserLoggedIn,
    socialAccessType: state.account.socialAccessType,
    feedback: state.feedback,
    InsanReducer: state.InsanReducer,
    email: state.profile.email,
    userIcon: state.profile.profilePicture,
    featuresStatus: state.auth.featuresStatus,
    language: state.userPreferences.language,
    languageList: state.meta.languageList,
    countryCommonMeta: state.meta.countryCommonMeta,
    calenderSelected: state.profile.calenderSelected,
    isInsaanEnabled: state.userPreferences.isShowInsan,
  };
};

export default connect(mapStateToProps, {
  goNext: payload => ({
    context: pageKeys.MANAGE_PROFILE,
    type: CoreActionTypes.GO_TO_NEW_PROFILE,
    payload: {
      ...payload
    }
  }),
  goToChangePassword: () => ({
    context: pageKeys.ACCOUNT_SCREEN,
    type: CoreActionTypes.KEY_CHANGE_PASSWORD
  }),
  getCustomerDetile: () => ({
    context: pageKeys.LOGIN,
    type: GET_CUSTOMER_DETAILS
  }),
  disableTouchLogin: () => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.TOUCH_AUTH_LOGIN_DISABLE
  }),
  testcreateCustomer: payload => ({
    context: pageKeys.CHALLENGES,
    type: CoreActionTypes.GET_ALL_CUSTOMERS_WEARABLES,
    payload: payload
  }),
  enrollUser: payload => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.TOUCH_AUTH_ENROLL,
    payload
  }),
  enrollFaceAuth: payload => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.FACE_AUTH_ENROLL,
    payload
  }),
  disableFaceLogin: () => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.FACE_AUTH_LOGIN_DISABLE
  }),
  resetPassword: () => ({
    context: pageKeys.ACCOUNT_SCREEN,
    type: CoreActionTypes.CHANGE_PASSWORD_RESET
  }),
  resetProfileNotification: () => ({
    context: pageKeys.ACCOUNT_SCREEN,
    type: CoreActionTypes.RESET_UPDATE_NOTIFICATION
  }),
  dispatchFeedbackReset,
  dispatchEvent,
  gotoNewTNC,
  gotoNewPrivacy,
  setInsanHome,
  updateScheduledNotification
})(Settings);

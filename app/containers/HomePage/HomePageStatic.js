/* eslint-disable */
import React, { PureComponent } from "react";
import {
  View,
  ScrollView,
  Platform,
  findNodeHandle,
  UIManager,
  Alert,
  DeviceEventEmitter,
  RefreshControl,
  Share,
  Modal,
  PermissionsAndroid,
  Linking,
  TouchableOpacity,
  Text,
} from "react-native";
import { connect } from "react-redux";
import Contacts from "react-native-contacts";
import {
  gotoNotificationRequest,
  denyBiometric,
  getScreenRenderingConfig,
  gotoAccountsTab,
} from "../../actions";
import _ from "lodash";
import {
  AVATAR,
  PLACEHOLDER,
  GRAPHICIMAGE,
  WHATSAPP_ICON,
  FLAT,
  EMAIL,
  INVITE_FINISH,
  PHONE_BOOK,
} from "../../config/images";
import HomeStyle from "./style";
import VerticalGroupedLayout from "../../components/ScreenLayouts/VerticalGroupedLayout";
import { pathOr } from "ramda";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  CoreActions,
  CoreSelectors,
  CoreServices,
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
import PRULeads from "react-native-pruleads";
import { URL, URLSearchParams } from "whatwg-url";

const { checkPermission, getFirebaseMsgToken } = CoreServices;
import AppConfig from "../../config/AppConfig";

import moment from "moment";
import * as NotificationTool from "../../utils/NotificationScheduleTool";
import NewsUpdateCard from "../../components/NewsUpdateCard";
import PulseAppHeader from "../../components/PulseAppHeader";
import { DeeplinkSelector } from "../../features/deepLinking/Selector";
import notificationActions from "../../features/notificationCentre/configs/actionNames";
import notificationScreens from "../../features/notificationCentre/configs/screenNames";
import {
  UserConsent,
  InviteFinish,
  InviteStart,
} from "../../features/socialInvite/components";
import MetaConstants from "./meta";
import videoSalesActions from "../../features/videoSales/configs/actionNames";
import {
  safeMetaLabelFinder,
  safeMetaContextLabelFinder,
} from "../../utils/meta-utils";
import PruShareModal from "../../components/PruShare/withModal";
import InsaanHomeTile from "../../features/insaan/components/InsaanHomeTile";
import * as ChallengeNotificationTool from "../../utils/ChallengeNotificationTool";

const {
  setLongitudeLatitude,
  updateScheduledNotification,
  setLoadTime,
  setNotificationProcessed,
} = CoreActions;

const {
  pageKeys,
  HOMEREWARD,
  HOMEREWARD_WELCOMETOPULSE,
  HOMEREWARD_COMPLETINGYOURPULSE,
  FITTER_WITH_PULSE,
  TOUCH_ENROLL_SUCCSS_HEAD,
  TOUCH_ENROLL_SUCCESS,
  TOUCH_OK,
  NEW_SECURITY,
} = CoreConfig;

class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: 0,
      opacity: 0,
      compassVisible: false,
      currentTime: "",
      curid: 0,
      heightY: 0,
      isFetching: false,
      loadTimeArr: [],
      timeStamp: new Date().getTime(),
      screenConfig: {},
      enableUserConsent: false,
      enableStartShare: false,
      NewsUpdate: [
        {
          refName: "Rewards",
          Source: PLACEHOLDER,
          isFirst: true,
          LableText: "Welcome to Pulse!",
          InfoText: "Earn a special reward by completing your Pulse profile.",
          MsgText: "Redeem Reward",
          EntryPage: "RewardsHome",
        },
        {
          refName: "Promotion",
          Source: GRAPHICIMAGE,
          isLast: true,
          LableText: "Promotion news title",
          InfoText:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry… ",
          MsgText: "Read more",
        },
      ],
    };
    this.MetaConstants = {
      ...MetaConstants.initializeScreenMeta(),
      getLabelByContext: MetaConstants.getLabelByContext,
    };
    this.handleScrollBegin = this.handleScrollBegin.bind(this);
    this.enrollBioMetric = this.enrollBioMetric.bind(this);
    this.denyBiometric = this.denyBiometric.bind(this);
    this.didFocusListener = [];
  }

  sliders() {
    const newConfig = [
      {
        refName: "Rewards",
        Source: PLACEHOLDER,
        isFirst: true,
        LableText: metaHelpers.findElement(
          HOMEREWARD,
          HOMEREWARD_WELCOMETOPULSE
        ).label,
        InfoText: metaHelpers.findElement(
          HOMEREWARD,
          HOMEREWARD_COMPLETINGYOURPULSE
        ).label,
        MsgText: "Redeem Reward",
      },
    ];
    return newConfig.map((item, k) => {
      return (
        <NewsUpdateCard
          key={k}
          ref={item.refName}
          Source={item.Source}
          isFirst={k == 0 ? true : false}
          LableText={item.LableText}
          InfoText={item.InfoText}
          isLast={k == newConfig.length - 1 ? true : false}
        />
      );
    });
  }

  handleScrollBegin() {
    this.setState({
      initialPage: 0,
    });
  }

  UNSAFE_componentWillMount() {
    const { isNotificationProcessed } = this.props;

    if (Platform.OS == "ios") {
      if (!isNotificationProcessed) {
        this._presentNotificationRequestPage();
      }
    }

    this.props.getReferralCode();
  }

  componentWillReceiveProps(nextProps) {
    const touch_enroll = metaHelpers.findElement(
      NEW_SECURITY,
      TOUCH_ENROLL_SUCCSS_HEAD
    ).label;
    const touch_enroll_success = metaHelpers.findElement(
      NEW_SECURITY,
      TOUCH_ENROLL_SUCCESS
    ).label;

    const touch_enroll_ok = metaHelpers.findElement(NEW_SECURITY, TOUCH_OK)
      .label;
    if (this.props.isTouchAuthEnrolled != nextProps.isTouchAuthEnrolled) {
      if (nextProps.isTouchAuthEnrolled)
        Alert.alert(touch_enroll, touch_enroll_success, [
          { text: touch_enroll_ok },
        ]);
    }
    if (nextProps.deepLinkUrl) {
      this.navigateToScreen(nextProps.deepLinkUrl);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { enableStartShare } = this.state;
    if (
      prevState.enableStartShare !== enableStartShare &&
      enableStartShare == true
    ) {
      setTimeout(() => {
        this.onShare();
      }, 500);
    }
  }

  navigateToScreen = deepLinkUrl => {
    const { goToScreen, resetDeeplinkUrl } = this.props;
    if (deepLinkUrl) {
      const urlObj = new URL(deepLinkUrl);
      const searchQuery = new URLSearchParams(unescape(urlObj.search));
      const screenId = searchQuery.get("screenId");
      const screenParams = searchQuery.get("screenParams");
      const params = screenParams
        ? screenId === "WebView"
          ? DeeplinkSelector.getSearchParams(screenParams)
          : DeeplinkSelector.getFormattedParams(screenParams)
        : {};
      const payload = {};
      payload.params = params;
      goToScreen(screenId, payload);
      resetDeeplinkUrl();
    }
  };

  componentWillUnmount() {
    this.didFocusListener.remove();
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  _presentNotificationRequestPage() {
    this.props.gotoNotificationRequest();
  }

  enrollBioMetric(userId, publicKey) {
    const payload = {
      id: userId,
      publicKeys: {
        fingerprint: {
          value: publicKey,
        },
      },
    };
    this.props.enrollUser(payload);
  }

  denyBiometric() {
    this.props.denyBiometric();
  }

  componentDidMount() {
    this.props.enableLoginBtn();
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.onRefresh();
      }
    );
    const { userPreferences, backgroundNotification, deepLinkUrl } = this.props;
    const CurrentTime = moment(new Date()).format("YYYY-MM-DD");
    userPreferences.loadTime.push(CurrentTime);

    if (userPreferences.loadTime.length > 2) {
      userPreferences.loadTime.shift();
    }

    this.props.setLoadTime(userPreferences.loadTime);

    this.props.GET_CUSTOMER_DETAILS();

    this.translateDate();

    this.subscription = DeviceEventEmitter.addListener(
      "translateDateFun",
      this.translateDate
    );
    if (backgroundNotification) {
      const platform = backgroundNotification.platform;
      const commId = pathOr("", ["payload", "commId"], backgroundNotification);

      if (platform === "twilio") {
        this.props.chatNotification(backgroundNotification);
      } else {
        this.props.newPayloadForNotification(commId);
        this.props.newPayload(commId);
        this.props.clearOfflineNotification();
      }
    }
    this.navigateToScreen(deepLinkUrl);
    this.props.getAllWearables({
      realm: "fitness",
      token: this.props.token,
    });
  }

  // eslint-disable-next-line complexity
  translateDate = () => {
    const { userPreferences } = this.props;
    const { language } = userPreferences;

    const dates = new Date().toString().split(" ");
    const days = new Date().getDay().toString();
    const moths = new Date().getMonth();
    let day = "";

    switch (moths) {
      case 0:
        moth = language == "BM" ? "Jan" : "Jan";
        break;
      case 1:
        moth = language == "BM" ? "Feb" : "Feb";
        break;
      case 2:
        moth = language == "BM" ? "Mac" : "Mar";
        break;
      case 3:
        moth = language == "BM" ? "Apr" : "Apr";
        break;
      case 4:
        moth = language == "BM" ? "Mei" : "May";
        break;
      case 5:
        moth = language == "BM" ? "Jun" : "Jun";
        break;
      case 6:
        moth = language == "BM" ? "Jul" : "Jul";
        break;
      case 7:
        moth = language == "BM" ? "Ogo" : "Aug";
        break;
      case 8:
        moth = language == "BM" ? "Sep" : "Sep";
        break;
      case 9:
        moth = language == "BM" ? "Okt" : "Oct";
        break;
      case 10:
        moth = language == "BM" ? "Nov" : "Nov";
        break;
      case 11:
        moth = language == "BM" ? "Dis" : "Dec";
        break;
    }
    // console.log(dates, "=================")
    switch (days) {
      case "0":
        day = language == "BM" ? "Ahad" : "Sunday";
        break;
      case "1":
        day = language == "BM" ? "Isnin" : "Monday";
        break;
      case "2":
        day = language == "BM" ? "Selasa" : "Tuesday";
        break;
      case "3":
        day = language == "BM" ? "Rabu" : "Wednesday";
        break;
      case "4":
        day = language == "BM" ? "Khamis" : "Thursday";
        break;
      case "5":
        day = language == "BM" ? "Jumaat" : "Friday";
        break;
      case "6":
        day = language == "BM" ? "Sabtu" : "Saturday";
        break;
    }
    const currentTime = day + ", " + dates[2] + " " + moth;

    this.setState({
      currentTime,
    });
  };

  onScrollScrollView = event => {
    const y = event.nativeEvent.contentOffset.y;
    const o = y / 128;
    this.setState({
      opacity: o,
      heightY: y,
    });
  };

  _scheduleLocalNotificationDebug() {
    const t = new Date();
    for (let i = 0; i < 10; i++) {
      t.setSeconds(t.getSeconds() + 2);
      if (Platform.OS == "ios") {
        NotificationTool.scheduleNotificationIOS(
          "Title",
          "Body",
          t,
          t.toISOString()
        );
      } else {
        NotificationTool.scheduleNotification(
          "Title",
          "Body",
          t,
          t.toISOString()
        );
      }
    }
  }

  _valuesOrderByTime(dict) {
    const array = [];
    const example = {};
    for (const key in dict) {
      if (key == "gregorianDate") {
        continue;
      }
      if (key == "islamicDate") {
        // islamicDate = dict[key]
        continue;
      }
      const v = dict[key];
      array.push(dict[key]);
      example[v] = key;
    }
    // Sort by asec
    array.sort();
    return { array, example };
  }

  _scheduleLocalChallengeNotificationDebug() {
    if (Platform.OS == "ios") {
      ChallengeNotificationTool.scheduleNotificationIOS(
        "Title",
        "Body",
        t,
        t.toISOString()
      );
    } else {
      ChallengeNotificationTool.scheduleNotification(
        "Title",
        "Body",
        t,
        t.toISOString()
      );
    }
  }

  hideModal() {
    this.props.handleNewUser(false);
  }

  _fectchNotificationConfigForType(type) {
    const { userPreferences } = this.props;
    const scheduled = userPreferences.scheduledNotifications[0]
      ? userPreferences.scheduledNotifications[0]
      : {};
    const key = type;
    const preValue = scheduled[key];

    return preValue ? preValue.isOn : false;
  }

  onShare = async () => {
    const { shareReferralContext } = this.props;
    const fitter_with_app = this.MetaConstants.getLabelByContext(
      shareReferralContext,
      HOMEREWARD
    ).shareMessage;

    Linking.openURL(
      `whatsapp://send?text=${`${fitter_with_app} 
    ${this.props.referralDescription}`}`
    );
    this.setState({ enableStartShare: false });
  };

  layout = ref => {
    const handle = findNodeHandle(ref);

    return new Promise(resolve => {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        resolve({
          x,
          y,
          width,
          height,
          pageX,
          pageY,
        });
      });
    });
  };

  continueToInvite = () => {
    const { resetCMSReferralShare } = this.props;
    resetCMSReferralShare();
    this.setState({ enableUserConsent: true });
  };

  goToSocialInviteScreen = () => {
    const { goToScreen } = this.props;
    this.setState({ enableUserConsent: false });
    if (Platform.OS === "android") {
      try {
        const granted = PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS
        );
        granted.then(res => {
          if (res === PermissionsAndroid.RESULTS.GRANTED) {
            goToScreen("SocialInvite", {});
          }
        });
      } catch (err) {
        console.warn(err);
      }
    } else {
      Contacts.checkPermission((err, permission) => {
        if (err) throw err;
        // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
        if (permission === "undefined") {
          Contacts.requestPermission((err, permission) => {
            if (permission === "authorized") {
              goToScreen("SocialInvite", {});
            }
          });
        }
        if (permission === "authorized") {
          goToScreen("SocialInvite", {});
        }
      });
    }
  };

  hideInviteDoneModal = () => {
    const { disableInviteDoneModal } = this.props;
    disableInviteDoneModal();
  };

  handleInviteTilePress = id => {
    const { resetCMSReferralShare } = this.props;
    resetCMSReferralShare();
    switch (id) {
      case "whatsapp":
        this.setState({ enableStartShare: true });
        break;
      case "phonebook":
        this.setState({ enableUserConsent: true });
        break;
    }
  };

  renderInvitationModal = () => {
    const { shareReferral, resetCMSReferralShare } = this.props;
    const inviteFriendVia = safeMetaContextLabelFinder(
      "invite",
      "SocialInvite",
      "inviteFriendVia"
    );
    const title = safeMetaLabelFinder("homeTab", "shareWithFriendsTitle");
    const desc =
      safeMetaContextLabelFinder("invite", "HomeReward", "fitterpulse") +
      " " +
      this.props.referralDescription;
    return (
      <PruShareModal
        config={{ title, desc }}
        userAgent={this.props.auth.userAgent}
        onClose={resetCMSReferralShare}
        visible={shareReferral}
        title={inviteFriendVia}
      />
    );
  };

  renderInvitationDoneModal = () => {
    const { enableInviteDone } = this.props;
    const title = this.MetaConstants.awesome;
    const subtext = this.MetaConstants.thanksMessage;
    const continueText = this.MetaConstants.getStarted;
    return (
      <Modal
        transparent={true}
        visible={enableInviteDone}
        animationType="slide"
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <InviteFinish
            backgroundImage={INVITE_FINISH}
            title={title}
            subtext={subtext}
            midImage={FLAT}
            continueButtonText={continueText}
            onContinuePress={this.hideInviteDoneModal}
          />
        </View>
      </Modal>
    );
  };

  renderuserConsentModal = () => {
    const { enableUserConsent } = this.state;
    const { shareReferralContext } = this.props;
    const titleText = this.MetaConstants.accessRequired;
    const messageText = this.MetaConstants.getLabelByContext(
      shareReferralContext
    ).accessMessage;
    const skipText = this.MetaConstants.skip;
    const allowAccessText = this.MetaConstants.allowAccess;
    return (
      <Modal
        transparent={true}
        visible={enableUserConsent}
        animationType="slide"
      >
        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <UserConsent
            title={titleText}
            message={messageText}
            skip={skipText}
            allowAccess={allowAccessText}
            onSkipPress={() => {
              this.setState({ enableUserConsent: false });
            }}
            onAllowAccessPress={this.goToSocialInviteScreen}
          />
        </View>
      </Modal>
    );
  };

  renderGrid = () => {
    const { homeScreenConfig } = this.props;
    // return (
    //   <VerticalGroupedLayout config={homeScreenConfig} transform={true} />
    // );
  };

  onRefresh = () => {
    this.props.getScreenRenderingConfig({
      id: `m::ui::home_${this.props.userPreferences.language}`,
    });
    this.setState({ timeStamp: new Date().getTime() });
    this.checkNotificationPermission();
  };

  checkNotificationPermission = async () => {
    const { isNotificationProcessed } = this.props;
    const isNotifPermAvailable = await checkPermission();
    if (isNotifPermAvailable) {
      if (!this.props.notificationGranted) {
        const fcmToken = await getFirebaseMsgToken();
        console.log("fcmToken = ", fcmToken);
        this.props.sendFireBaseToken(fcmToken);
        this.props.setNotificationProcessed(isNotificationProcessed, true);
      }
    } else {
      this.props.setNotificationProcessed(isNotificationProcessed, false);
    }
  };

  renderPlukPruLeadsModal = () => {
    return (
      <PRULeads
        hidePruLeads={() => {
          this.props.closePlukPruLeads();
        }}
        user={{
          username: this.props.email,
          email: this.props.email,
          firstname: this.props.userProfile.firstName,
          lastname: this.props.userProfile.surName,
          gender: this.props.userProfile.gender,
          birthDate: this.props.userProfile.dob,
          isAgent: true,
        }}
        config={{
          serviceUrl: AppConfig.getPlukPruLeadsServiceUrl(),
          gotoNf2f: () => {
            this.props.gotoNf2f();
          },
          gotoReferAFriend: () => {
            this.props.gotoReferAFriend();
          },
        }}
      />
    );
  };

  render() {
    const {
      userIcon,
      shareReferral,
      enableInviteDone,
      showPlukPruleads,
      userCountryDetails,
    } = this.props;
    const { enableUserConsent } = this.state;
    const simCountry = userCountryDetails.simCountry;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "rgb(246,246,246)",

          position: "relative",
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
            />
          }
          style={{
            marginHorizontal: 0,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <PulseAppHeader
            onPress={() => {
              this.props.gotoAccountsTab({ params: { showBackButton: true } });
            }}
          />
          {simCountry === "MY" && (
            <InsaanHomeTile
              onDenyPress={() => this.props.navigation.navigate("MainPage")}
              onCalendarPressHome={nextPrayerIn =>
                this.props.navigation.navigate("InsaanSchedule", {
                  nextPrayerTime: nextPrayerIn,
                })
              }
            />
          )}
          <View>{this.renderGrid()}</View>
        </ScrollView>
        {shareReferral && this.renderInvitationModal()}
        {/* {enableInviteDone && this.renderInvitationDoneModal()} */}
        {enableUserConsent && this.renderuserConsentModal()}
        {showPlukPruleads && this.renderPlukPruLeadsModal()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userCountryDetails: state.auth.countryInfo,
    userPreferences: state.userPreferences,
    userIcon: state.profile.profilePicture,
    isNotificationProcessed: state.userPreferences.notificationProcessed,
    notificationGranted: state.userPreferences.notificationGranted,
    isTouchAuthEnrolled: state.auth.isTouchAuthEnrolled,
    homeScreenConfig: state.screenConfig.Home,
    shareReferral: state.screenConfig.shareReferral,
    showPlukPruleads: state.screenConfig.showPlukPruleads,
    referralDescription: state.referralGroup.referralDescription,
    deepLinkUrl: state.deepLink.deepLinkUrl,
    backgroundNotification: state.notifications.backgroundNotification,
    token: state.auth.token,
    enableInviteDone: state.contacts.enableInviteDone,
    shareReferralContext: state.screenConfig.shareReferralContext,
    email: AuthSelector.getUserEmail(state),
    userProfile: state.profile,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  updateScheduledNotification,
  getAllWearables: payload => ({
    context: "WEARABLE_SCREEN",
    type: "GET_ALL_CUSTOMERS_WEARABLES",
    payload: payload,
    disableTimeout: true,
  }),
  enableLoginBtn: () => ({
    type: CoreActionTypes.ENABLE_LOGIN_BTN,
  }),
  gotoNf2f: () => ({
    type: "GO_TO_SCREEN",
    navigateTo: "INITIATE_CALL_SCREEN",
    payload: {
      params: {},
      navigateTo: "INITIATE_CALL_SCREEN",
    },
  }),
  gotoReferAFriend: () => ({
    context: "CMS_DISPATCHES",
    type: "REFERRALS",
    payload: {},
  }),
  handleNewUser: value => ({
    type: CoreActionTypes.IS_NEW_USER,
    payload: {
      value: value,
    },
  }),
  setLongitudeLatitude,
  GET_CUSTOMER_DETAILS: () => ({
    context: pageKeys.PROFILE,
    type: CoreActionTypes.GET_CUSTOMER_DETAILS,
  }),
  goTo: () => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: "WellnessGoals",
  }),
  setLoadTime,
  getHealthFlows: () => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.GET_HEALTH_FLOWS,
  }),
  getCustomerVouchers: () => ({
    context: pageKeys.REWARD,
    type: CoreActionTypes.GET_CUSTOMER_VOUCHERS,
  }),
  enrollUser: payload => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.TOUCH_AUTH_ENROLL,
    payload,
  }),
  getReferralCode: () => ({
    context: pageKeys.REFER_A_FRIEND,
    type: CoreActionTypes.GET_REFERRAL_CODE,
  }),
  resetCMSReferralShare: () => ({
    type: CoreActionTypes.RESET_CMS_REFERRALS,
  }),
  closePlukPruLeads: () => ({
    type: CoreActionTypes.CLOSE_PLUK_PRULEADS,
  }),
  loadMyPolicy: () => ({
    context: pageKeys.MY_POLICY_MAIN_SCREEN,
    type: "LOAD_MY_POLICY_MAIN",
  }),
  clearPolicy: () => ({
    context: pageKeys.CLAIM_SCREEN,
    type: CoreActionTypes.MY_POLICY_CLEAR,
  }),
  checkPolicyService: () => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.USER_WHITELIST,
  }),
  gotoNotificationRequest,
  denyBiometric,
  getScreenRenderingConfig,
  gotoAccountsTab,
  setNotificationProcessed,
  goToScreen: (screen, payload) => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: screen,
    payload,
  }),
  newPayloadForNotification: commId => ({
    type: notificationActions.newNotificationReceived,
    payload: {
      commId,
    },
  }),
  chatNotification: payload => ({
    type: videoSalesActions.createCustomerChatRoom,
    payload: {
      textChatDetails: payload,
      shouldOpenPopup: true,
    },
  }),
  newPayload: commId => ({
    context: notificationScreens.PULSE_NOTIFICATION,
    type: notificationActions.getCustomerCommById,
    payload: {
      commId,
      showNotification: true,
    },
  }),
  clearOfflineNotification: () => ({
    type: notificationActions.clearOfflineNotification,
  }),
  resetDeeplinkUrl: () => ({
    type: "deeplink/resetUrl",
  }),
  disableInviteDoneModal: () => ({
    type: "socialInvite/disableInviteDoneModal",
  }),
  sendFireBaseToken: fcmToken => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.UPDATE_CUSTOMER_DEVICE_1,
    payload: {
      fcmToken,
    },
  }),
  gotoPulseFood: () => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: "FoodDairyLanding",
  }),
  gotoNavigator: () => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: "HospitalMap",
  }),
})(HomePage);

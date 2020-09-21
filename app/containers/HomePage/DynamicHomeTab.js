import React, { PureComponent } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
  RefreshControl,
  PermissionsAndroid,
  findNodeHandle,
  UIManager,
  Platform,
  Alert,
  Modal,
  Text,
} from "react-native";
import { connect } from "react-redux";
import { pathOr } from "ramda";
import PropTypes from "prop-types";
import VerticalGroupedLayout from "../../components/ScreenLayouts/VerticalGroupedLayout";
import XIcon from "../../components/XIcon";
import PulseAppHeader from "../../components/PulseAppHeader";
import {
  justDispatchAction,
  getScreenRenderingConfig,
  gotoNotificationRequest,
  denyBiometric,
  gotoAccountsTab,
} from "../../actions";
import MetaConstants from "./meta";
import {
  healthArticle,
  pruShop,
  myPolicy,
  myCommunities,
  assessHealth,
  menu_default,
} from "../../config/images";
import {
  safeMetaLabelFinder,
  safeMetaContextLabelFinder,
} from "../../utils/meta-utils";
import PruShareModal from "../../components/PruShare/withModal";

import {
  CoreActionTypes,
  CoreSelectors,
  CoreActions,
  CoreConfig,
} from "@pru-rt-internal/pulse-common";
import Contacts from "react-native-contacts";
import notificationScreens from "../../features/notificationCentre/configs/screenNames";
import notificationActions from "../../features/notificationCentre/configs/actionNames";
import videoSalesActions from "../../features/videoSales/configs/actionNames";
import { DeeplinkSelector } from "../../features/deepLinking/Selector";

import { registerEvent, sendEvent } from "../../utils/registerEvents/actions";
import { eventNames } from "../../utils/registerEvents/all-events";
import PRULeads from "react-native-pruleads";
import AppConfig from "../../config/AppConfig";
const { pageKeys } = CoreConfig;
const { AuthSelector } = CoreSelectors;
const {
  setLongitudeLatitude,
  updateScheduledNotification,
  setLoadTime,
  setNotificationProcessed,
} = CoreActions;
const { width: screenWidth } = Dimensions.get("window");

const screenName = "homeTab";

class DynamicHomeTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      reachedScrollEnd: false,
    };
    this.MetaConstants = {
      ...MetaConstants.initializeScreenMeta(),
      getLabelByContext: MetaConstants.getLabelByContext,
    };
    this.enrollBioMetric = this.enrollBioMetric.bind(this);
    this.denyBiometric = this.denyBiometric.bind(this);
    this.didFocusListener = [];
  }

  metaFinderHomeStickerMenu = key => {
    const result = safeMetaLabelFinder("HomeStickerMenu", key);
    return result !== key ? result : [];
  };

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
    this.onRefresh();
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.onRefresh();
      }
    );

    this.props.GET_CUSTOMER_DETAILS();

    const { backgroundNotification, deepLinkUrl } = this.props;

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
  }

  componentWillReceiveProps(nextProps) {
    const touch_enroll = safeMetaLabelFinder("SecurityNew", "touchenrollement");
    const touch_enroll_success = safeMetaLabelFinder(
      "SecurityNew",
      "touchsuccess"
    );
    const touch_enroll_ok = safeMetaLabelFinder("SecurityNew", "touchok");

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

  UNSAFE_componentWillMount() {
    const { isNotificationProcessed } = this.props;

    if (Platform.OS == "ios") {
      if (!isNotificationProcessed) {
        this._presentNotificationRequestPage();
      }
    }

    this.props.getReferralCode();
  }

  _presentNotificationRequestPage() {
    this.props.gotoNotificationRequest();
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
      if (screenId) {
        goToScreen(screenId, payload);
      }
      resetDeeplinkUrl();
    }
  };

  onRefresh = () => {
    this.props.getScreenRenderingConfig({
      id: `m::ui::dynamicHome_${this.props.userPreferences.language}`,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.deepLinkUrl !== this.props.deepLinkUrl) {
      this.navigateToScreen(this.props.deepLinkUrl);
    }
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  onPress = ({
    context,
    type,
    navigateTo,
    params,
    eventName,
    eventDetails,
  }) => {
    if (eventDetails) {
      this.props.sendEvent(eventDetails);
    } else {
      this.props.registerEvent(eventNames[eventName]);
    }
    this.props.onMenuPress({
      context,
      type,
      navigateTo,
      payload: {
        ...params,
      },
    });
  };

  _fectchNotificationConfigForType(type) {
    const { userPreferences } = this.props;
    const scheduled = userPreferences.scheduledNotifications[0]
      ? userPreferences.scheduledNotifications[0]
      : {};
    const key = type;
    const preValue = scheduled[key];

    return preValue ? preValue.isOn : false;
  }

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

  hideInviteDoneModal = () => {
    const { disableInviteDoneModal } = this.props;
    disableInviteDoneModal();
  };

  handleInviteTilePress = id => {
    const { resetCMSReferralShare, setCMSReferralShare } = this.props;
    resetCMSReferralShare();
    setCMSReferralShare({ referralMedium: id });
  };

  resetCMSReferralShare = () => {
    this.props.resetCMSReferralShare();
  };

  getImageByName = name => {
    switch (name) {
      case "healthArticle":
        return healthArticle;
      case "pruShop":
        return pruShop;
      case "myPolicy":
        return myPolicy;
      case "myCommunities":
        return myCommunities;
      case "assessHealth":
        return assessHealth;
      default:
        return menu_default;
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

  renderMenu = ({ item }) => {
    // const menuIcons = this.metaFinderHomeStickerMenu("menuIcons");
    const { enabledHomeStickers } = this.props;
    const numIcons = enabledHomeStickers.length;
    const iconSize = 52;
    const margin = (screenWidth - numIcons * iconSize) / (2 * numIcons);
    const menuFirstLabel = safeMetaLabelFinder(screenName, item.firstKey);
    const menuSecondLabel = safeMetaLabelFinder(screenName, item.secondKey);
    return (
      <View style={{ marginLeft: margin, marginRight: margin }}>
        <XIcon
          width={36.7}
          height={36.7}
          colors={item.colors}
          img={this.getImageByName(item.img)}
          imgUrl={item.img_uri}
          country={this.props.userCountryDetails.simCountry}
          containerStyle={{
            borderRadius: 36.7 / 2,
          }}
          outContainerStyle={{ width: iconSize }}
          firstLabel={menuFirstLabel}
          secondLabel={menuSecondLabel}
          onPress={() =>
            this.onPress({
              type: item.type,
              context: item.context,
              navigateTo: item.navigateTo,
              params: item.params,
              eventName: item.eventName,
              eventDetails: item.eventDetails,
            })
          }
          // onPress={}
          imgStyle={item.imageStyle}
        />
      </View>
    );
  };

  renderMenuIcons = () => {
    const { enabledHomeStickers = [] } = this.props;
    const menuIcons = this.metaFinderHomeStickerMenu("menuIcons");

    if (enabledHomeStickers.length === 0) {
      return null;
    }

    const menuIconsArr = [];

    enabledHomeStickers.forEach(item => {
      const icon = menuIcons.find(x => x.id === item);
      icon && menuIconsArr.push(icon);
    });

    return (
      <View
        style={{
          // flex: 1,
          width: screenWidth,
          height: 80,
          marginTop: 12,
        }}
      >
        <FlatList
          data={menuIconsArr}
          renderItem={this.renderMenu}
          horizontal={true}
        />
      </View>
    );
  };

  renderHeader = () => {
    return (
      <PulseAppHeader
        onPress={() => {
          this.props.gotoAccountsTab({ params: { showBackButton: true } });
        }}
      />
    );
  };

  renderGrid = () => {
    const { gridConfig } = this.props;
    return (
      <VerticalGroupedLayout
        config={gridConfig}
        transform={true}
        baseContainerStyle={{}}
      />
    );
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

  showThatsAll = () => {
    if (this.MetaConstants.thatsAllConfig == "enable")
      return (
        <View
          style={{ justifyContent: "center", alignItem: "center", padding: 10 }}
        >
          <Text style={JSON.parse(this.MetaConstants.thatsAllStyle)}>
            {this.MetaConstants.thatsAllText}
          </Text>
        </View>
      );
    return null;
  };

  render() {
    const { showPlukPruleads, shareReferral } = this.props;
    const { enableUserConsent, enabledHomeStickers } = this.props;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {enabledHomeStickers.length > 0 ? this.renderMenuIcons() : null}
        <ScrollView
          style={{
            marginHorizontal: 0,
          }}
          refreshControl={
            <RefreshControl
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
            />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={() => this.setState({ reachedScrollEnd: true })}
        >
          {this.renderGrid()}
          {this.state.reachedScrollEnd && this.showThatsAll()}
        </ScrollView>
        {shareReferral && this.renderInvitationModal()}
        {enableUserConsent && this.renderuserConsentModal()}
        {showPlukPruleads && this.renderPlukPruLeadsModal()}
      </View>
    );
  }
}

DynamicHomeTab.propTypes = {
  enableUserConsent: PropTypes.boolean,
  gridConfig: PropTypes.object,
  getScreenRenderingConfig: PropTypes.func,
  userPreferences: PropTypes.object,
  enrollUser: PropTypes.func,
  resetCMSReferralShare: PropTypes.func,
  denyBiometric: PropTypes.func,
  disableInviteDoneModal: PropTypes.func,
  navigation: PropTypes.object,
  shareReferralContext: PropTypes.string,
  enableInviteDone: PropTypes.bool,
  showPlukPruleads: PropTypes.bool,
  goToScreen: PropTypes.func,
  backgroundNotification: PropTypes.shape({
    platform: PropTypes.string,
    payload: PropTypes.object,
  }),
  deepLinkUrl: PropTypes.string,
  chatNotification: PropTypes.func,
  newPayloadForNotification: PropTypes.func,
  newPayload: PropTypes.func,
  clearOfflineNotification: PropTypes.func,
  resetDeeplinkUrl: PropTypes.func,
  registerEvent: PropTypes.func,
  setCMSReferralShare: PropTypes.func,
  enabledHomeStickers: PropTypes.array,
};

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  closeButton: {
    marginLeft: 75,
  },
  closeIcon: {
    height: 18,
    width: 18,
  },
  container: {
    backgroundColor: "#f6f6f6",
    flex: 1,
  },
  modalContainer: {
    alignSelf: "flex-end",
    flexDirection: "column",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  optionsBaseContainer: {
    backgroundColor: "rgba(0,0,0,0.3)",
    height: window.height,
    justifyContent: "flex-end",
    width: window.width,
  },
  optionsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
  },
  shareBaseContainer: {
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
    height: "12%",
    justifyContent: "center",
    width: "100%",
  },
  shareContainer: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  skipContainer: {
    alignItems: "flex-end",
    flexDirection: "row",
    paddingTop: 25,
  },
  titleText: {
    color: "#393939",
    fontFamily: "Avenir-Black",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    paddingTop: 2,
  },
});
const mapStateToProps = state => {
  return {
    enableUserConsent: state.screenConfig.enableUserConsent,
    enableStartShare: state.screenConfig.enableStartShare,
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
    enableInviteDone: state.contacts.enableInviteDone,
    shareReferralContext: state.screenConfig.shareReferralContext,
    email: AuthSelector.getUserEmail(state),
    userProfile: state.profile,
    token: state.auth.token,
    gridConfig: state.screenConfig.dynamicHome,
    meta: state.meta,
    language: state.userPreferences.language,
    commonMeta: state.meta.commonMeta,
    auth: state.auth,
    safeMetaLabelFinder,
    enabledHomeStickers: pathOr(
      ["myHealth", "myCommunities", "myContent", "myPolicy", "pruShop"],
      ["meta", "countryCommonMeta", "enabledHomeStickers"],
      state
    ),
  };
};

export default connect(mapStateToProps, {
  getScreenRenderingConfig,
  registerEvent,
  sendEvent,
  justDispatchAction,
  updateScheduledNotification,
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
  getReferralCode: () => ({
    context: pageKeys.REFER_A_FRIEND,
    type: CoreActionTypes.GET_REFERRAL_CODE,
  }),
  resetCMSReferralShare: () => ({
    type: CoreActionTypes.RESET_CMS_REFERRALS,
  }),
  setCMSReferralShare: payload => ({
    type: CoreActionTypes.CMS_REFERRALS,
    payload,
  }),
  gotoNotificationRequest,
  denyBiometric,
  setNotificationProcessed,
  gotoAccountsTab,
  goToScreen: (screen, payload) => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: screen,
    payload,
  }),
  disableInviteDoneModal: () => ({
    type: "socialInvite/disableInviteDoneModal",
  }),
  enrollUser: payload => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.TOUCH_AUTH_ENROLL,
    payload,
  }),
  sendFireBaseToken: fcmToken => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.UPDATE_CUSTOMER_DEVICE_1,
    payload: {
      fcmToken,
    },
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
  closePlukPruLeads: () => ({
    type: CoreActionTypes.CLOSE_PLUK_PRULEADS,
  }),
  onMenuPress: payload => ({
    ...payload,
  }),
})(DynamicHomeTab);

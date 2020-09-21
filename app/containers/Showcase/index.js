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
} from "react-native";
import { connect } from "react-redux";
import {
  gotoNotificationRequest,
  denyBiometric,
  getScreenRenderingConfig,
} from "../../actions";
import _ from "lodash";
import {
  AVATAR,
  PLACEHOLDER,
  GRAPHICIMAGE,
} from "../../config/images";
import HomeStyle from "./style";
import VerticalGroupedLayout from "../../components/ScreenLayouts/VerticalGroupedLayout";
import { isEmpty, isNil, pathOr } from "ramda";
import config from "./grouped-layout-defn.json";

import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  CoreActions,
  CoreSelectors,
} from "@pru-rt-internal/pulse-common";

const { AuthSelector } = CoreSelectors;

import moment from "moment";
import * as NotificationTool from "../../utils/NotificationScheduleTool";
import NewsUpdateCard from "../../components/NewsUpdateCard";
import AppHeaderComponent from "../../../app/components/AppHeader";
import { CustomAlert } from "../../components";
const {
  setLongitudeLatitude,
  updateScheduledNotification,
  setLoadTime,
} = CoreActions;

const {
  pageKeys,
  HOMEREWARD,
  HOMEREWARD_WELCOMETOPULSE,
  HOMEREWARD_COMPLETINGYOURPULSE,
} = CoreConfig;

class ShowCasePage extends PureComponent {
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
    this.handleScrollBegin = this.handleScrollBegin.bind(this);
    this.enrollBioMetric = this.enrollBioMetric.bind(this);
    this.denyBiometric = this.denyBiometric.bind(this);
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

    this.props.getScreenRenderingConfig({
      id: `m::ui::home_${this.props.userPreferences.language}`,
    });

    this.props.getReferralCode();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.isTouchAuthEnrolled != nextProps.isTouchAuthEnrolled) {
      if (nextProps.isTouchAuthEnrolled)
        CustomAlert.show("Touch Enrollment", "Touch enrollment successful", {
          positiveText: "OK",
          onPositivePress: () => {},
        });
    }
    if (nextProps.shareReferral) {
      this.onShare();
    }
  }

  componentWillUnmount() {
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.userPreferences.language !== this.props.userPreferences.language
    ) {
      this.props.getScreenRenderingConfig({
        id: `m::ui::home_${this.props.userPreferences.language}`,
      });
    }
  }

  componentDidMount() {
    const { userPreferences } = this.props;
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
      NotificationTool.scheduleNotification(
        "Title",
        "Body",
        t,
        t.toISOString()
      );
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
    try {
      const result = await Share.share({
        message:
          "I am enjoying getting fitter with pulse. Join me by downloading Pulse App" +
          "\n\n" +
          this.props.referralDescription,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
      this.props.resetCMSReferralShare();
    } catch (error) {
      alert(error.message);
    }
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

  groupByTitle = () => {
    const homeGrid = this.props.homeScreenConfig;
    const homeGridGroupByTitle = _.groupBy(homeGrid.containers, "title");
    return homeGridGroupByTitle;
  };

  // renderGrid = () => {
  //   const grid = this.groupByTitle();
  //   const headers = Object.keys(grid);
  //   return headers.map(value => {
  //     return (
  //       // eslint-disable-next-line react/jsx-key
  //       <PruSectionGrid
  //         header={value}
  //         data={grid[value][0].components}
  //         horizontal={grid[value][0].horizontal}
  //         itemsPerRow={grid[value][0].itemsPerRow}
  //         navigation={this.props.navigation}
  //         aspectRatio={grid[value][0].aspectRatio}
  //         width={grid[value][0].width}
  //         timeStamp={this.state.timeStamp}
  //       />
  //     );
  //   });
  // };

  renderGrid = () => {
    // const { homeScreenConfig } = homeScreenConfig;
    return <VerticalGroupedLayout config={config} />;
  };

  onRefresh = () => {
    this.props.getScreenRenderingConfig({
      id: `m::ui::home_${this.props.userPreferences.language}`,
    });
    this.setState({ timeStamp: new Date().getTime() });
  };

  render() {
    const { rule, userIcon } = this.props;
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
          scrollEventThrottle={100}
          style={{
            marginHorizontal: 0,
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <AppHeaderComponent
            style={HomeStyle.welcomeWraper}
            profilelogo={
              userIcon ? { uri: `data:image/jpeg;base64,${userIcon}` } : AVATAR
            }
          />
          {rule && rule.errorCode === 9091 && (
            <View
              style={{
                alignItems: "center",
              }}
            ></View>
          )}
          <View>{this.renderGrid()}</View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userPreferences: state.userPreferences,
    userProfile: state.profile,
    isNewUser: state.auth.isNewUser,
    rule: state.mpolicyMyPolicy.rule,
    externalIds: state.profile.externalIds,
    userIcon: state.profile.profilePicture,
    isNotificationProcessed: state.userPreferences.notificationProcessed,
    healthFlowsData: state.healthCheck.healthFlows,
    redeem: state.redeem,
    IC: state.auth.IC,
    userCountryDetails: state.auth.countryInfo,
    isTouchAuthEnrolled: state.auth.isTouchAuthEnrolled,
    email: AuthSelector.getUserEmail(state),
    isBiometricAuthDenied: state.auth.isBiometricAuthDenied,
    shareReferral: state.screenConfig.shareReferral,
    referralDescription: state.referralGroup.referralDescription,
    countryCode2: state.meta.countryCommonMeta.countryCode2,
  };
};

export default connect(mapStateToProps, {
  updateScheduledNotification,
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
})(ShowCasePage);

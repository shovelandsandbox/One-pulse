import React from "react";
import { Platform, Image, Text } from "react-native";
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  withNavigationFocus
} from "react-navigation";
import {
  CoreComponents,
  CoreConfig,
  CoreConstants,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";

import Header from "../../components/Header";
import FaceBlenderScreenConfig from '../../features/FaceBlender/navigation'
import TermsAndConditionsComponent from "../../components/TermsConditions/TermsAndConditionsComponent";
import PulseHome from "../HomePage/index";
import PulseHealth from "../PulseHealth";
import {
  TABBAR_ICON_HOME_ACTIVE,
  TABBAR_ICON_HOME_INACTIVE,
  TABBAR_ICON_HEALTH_ACTIVE,
  TABBAR_ICON_HEALTH_INACTIVE,
  TABBAR_ICON_PROFILE_ACTIVE,
  TABBAR_ICON_PROFILE_INACTIVE,
  POLICY_TAB_ACTIVE_ICON,
  POLICY_TAB_INACTIVE_ICON,
  TABBAR_ICON_SERVICE_ACTIVE,
  TABBAR_ICON_SERVICE_INACTIVE,
  REWARD_ICON,
} from "../../config/images";
import HealthAssessmentCarousal from "../HealthCheckAssessment/HealthAssessmentCarousal";
import HealthCheckPage from "../HealthCheckAssessment/HealthCheck";
import ChatOnboard from "../SymptomChecker/ChatOnboard";

import CheckSymptoms from "../Babylon/CheckSymptoms";
import ChatWebview from "../SymptomChecker/ChatWebview";
import Account from "../Account/account";
import PolicyTab from "../PolicyTab";
import { Header as ChatHeader } from "../../components/ChatComponent/Header";

const helpers = metaHelpers;
const { pageKeys, HEALTHDASHBOARD_PULSEHEALTH, HOMETAB_ACCOUNT, POLICY_TAB } = CoreConfig;
const { SCREEN_KEY_HOME_TAB } = CoreConstants;
const { withBackHandler } = CoreComponents;

const ACTIVE_HOME = "activehome";

export const HealthCheckStack = createStackNavigator({
  BuildProfile: {
    screen: withBackHandler(HealthAssessmentCarousal, ChatHeader, {
      backRouteName: "MainPage",
      hideLeftIcon: true,
      style: {
        height: 0,
        width: 0,
        padding: 0,
      },
    }),
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  HealthCheckAssessmentHome: {
    screen: HealthCheckPage,
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  UserRegistration: {
    screen: withBackHandler(ChatOnboard, ChatHeader, {
      backRouteName: "MainPage",
      hideLeftIcon: true,
    }),
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
      tabBarVisible: false,
    },
  },
  HATermsAndConditions: {
    screen: withBackHandler(TermsAndConditionsComponent, Header, {
      backRouteName: "MainPage",
    }),
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
});

export const ChatStack = createStackNavigator({
  TermsAndConditions: {
    screen: withBackHandler(TermsAndConditionsComponent, Header, {
      backRouteName: "MainPage",
    }),
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  ChatOnboard: {
    screen: withBackHandler(CheckSymptoms, ChatHeader, {
      backRouteName: "MainPage",
      hideLeftIcon: true,
    }),
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
  ChatWebview: {
    screen: withBackHandler(ChatWebview),
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    },
  },
});

const HomeTab = createStackNavigator(
  {
    MainPage: {
      screen: PulseHome,
      // screen:DocOnCallDetile,
      navigationOptions: {
        gesturesEnabled: false,
        header: null, // this will hide the header
      },
    },
    ClinicTab: {
      screen: HealthCheckStack,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    ChatTab: {
      screen: ChatStack,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
  },
  {
    initialRouteName: "MainPage",
  }
);

// eslint-disable-next-line complexity
HomeTab.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const { routeName, routes, index } = navigation.state.routes[
    navigation.state.index
  ];
  const currentPage = routes ? routes[index].routeName : routeName;
  if (
    currentPage === pageKeys.CHAT_CONVERSATION ||
    currentPage === pageKeys.BABYLON_CHAT_SCREEN ||
    currentPage === pageKeys.CHAT_SUGGESTION
  ) {
    tabBarVisible = false;
  }
  if (
    (routeName === "ClinicTab" && currentPage == "HATermsAndConditions") ||
    (routeName === "ChatTab" && currentPage === "TermsAndConditions")
  ) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const PulseHealthTab = createStackNavigator(
  {
    PulseHealth: {
      screen: PulseHealth,
      navigationOptions: {
        gesturesEnabled: false,
        header: null, // this will hide the header
      },
    },
  },
  {
    initialRouteName: pageKeys.PULSE_HEALTH_PAGE,
  }
);

const homeTab = {
  screen: HomeTab,
  navigationOptions: navigationAttributes(
    ACTIVE_HOME,
    TABBAR_ICON_HOME_ACTIVE,
    TABBAR_ICON_HOME_INACTIVE
  ),
};
const pulseHealthTab = {
  screen: PulseHealthTab,
  navigationOptions: navigationAttributes(
    HEALTHDASHBOARD_PULSEHEALTH,
    TABBAR_ICON_HEALTH_ACTIVE,
    TABBAR_ICON_HEALTH_INACTIVE
  )
};

const policyTab = {
  screen: PolicyTab,
  navigationOptions: navigationAttributes(
    POLICY_TAB,
    POLICY_TAB_ACTIVE_ICON,
    POLICY_TAB_INACTIVE_ICON
  ),
};

const accountsTab = {
  screen: Account,
  navigationOptions: navigationAttributes(
    HOMETAB_ACCOUNT,
    TABBAR_ICON_PROFILE_ACTIVE,
    TABBAR_ICON_PROFILE_INACTIVE
  ),
};

export function navigationAttributes(displayName, ActiveIcon, InactiveIcon) {
  return {
    tabBarLabel: () => {
      return <Text>{homeTabMeta(displayName).label}</Text>;
    },
    tabBarIcon: ({ focused }) => {
      return (
        <Image
          style={{
            width: 32,
            height: 32,
          }}
          source={focused ? ActiveIcon : InactiveIcon}
        />
      );
    },
  };
}

const MainTabCompleteApp = createMaterialTopTabNavigator(
  {
    HomeTab: homeTab,
    GettingTreatment: pulseHealthTab,
    account: accountsTab,
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        opacity: 0,
      },
      activeTintColor: "#ed1b2e",
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      inactiveTintColor: "#a8a8a8", // Color of tab when not pressed
      labelStyle: {
        fontSize: 10.7,
        lineHeight: 12,
        marginTop: 0,
        paddingTop: 4,
        paddingBottom: 4,
        fontFamily: Platform.OS == "ios" ? "PruSansNormal" : "pruSansRegular",
      },
      style: {
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: "#fff", // Makes Android tab bar white instead of standard blue
        height: 63, // I didn't use this in my app, so the numbers may be off.
      },
    },
    tabBarPosition: "bottom",
    lazy: true,
    swipeEnabled: false,
    initialRouteName: "HomeTab",
  }
);

const homeTabMeta = key => {
  return helpers.findElement(SCREEN_KEY_HOME_TAB, key);
};

const MainTab = createStackNavigator(
  {
    ...FaceBlenderScreenConfig
    
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
      header: null, // this will hide the header
    }
  }
);
export default createStackNavigator({ MainTab }, { headerMode: "none" });

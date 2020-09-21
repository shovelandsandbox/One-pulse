import React from "react";
import { Platform } from "react-native";
import {
  TabNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation";
import {
  colors,
  CoreConstants,
  CoreComponents,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
import FullAssessment from "../HealthCheckAssessment/FullAssessment"; //3D
import Report from "../HealthCheckAssessment/Report";
import { Header as ChatHeader } from "../../components/ChatComponent/Header";
const { SCREEN_KEY_DIGITAL_TWIN } = CoreConstants;
const HEALTH_CHECK_TAB_TITLE = "healthchecktabtitle";
const HEALTH_CHECK_REPORT_TAB_TITLE = "healthcheckreporttabtitle";
const { withBackHandler } = CoreComponents;

const HealthCheckTab = createMaterialTopTabNavigator(
  {
    FullAssessment: {
      screen: FullAssessment,
      navigationOptions: () => ({
        title: metaHelpers.findElement(
          SCREEN_KEY_DIGITAL_TWIN,
          HEALTH_CHECK_TAB_TITLE
        ).label,
      }),
    },
    ReportTab: {
      screen: Report,
      navigationOptions: () => ({
        title: metaHelpers.findElement(
          SCREEN_KEY_DIGITAL_TWIN,
          HEALTH_CHECK_REPORT_TAB_TITLE
        ).label,
      }),
    },
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        opacity: 1,
        backgroundColor: "#efefef",
        height: 7,
        padding: 0,
      },
      activeTintColor: colors.nevada,
      showIcon: false,
      showLabel: true,
      upperCaseLabel: false,
      inactiveTintColor: "#a8a8a8", // Color of tab when not pressed
      labelStyle: {
        fontSize: 16.3,
        lineHeight: 28.3,
        fontFamily: Platform.OS == "ios" ? "PruSansNormal" : "pruSansRegular",
      },
      style: {
        marginTop: 0,
        paddingTop: 0,
        backgroundColor: colors.white, // Makes Android tab bar white instead of standard blue
      },
    },
    tabBarPosition: "top",
    lazy: true,
    swipeEnabled: false,
  }
);
// export default createStackNavigator(
//   {
//     HealthCheckTab: {
//       screen: withBackHandler(
//         HealthCheckTab,
//         ChatHeader,
//         { backRouteName: "MainPage", hideLeftIcon: true },
//         true
//       ),
//     },
//   },
//   { headerMode: "none" }
// );
export default createStackNavigator({ HealthCheckTab }, { headerMode: "none" });

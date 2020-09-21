import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,
} from "react-navigation";
import HospitalInfo from "./Info";
import ClinicInfo from "../ClinicDetail/Info";
import {
  CoreConfig,
  metaHelpers,
  CoreActions,
  CoreComponents,
} from "@pru-rt-internal/pulse-common";
import { Popup } from "react-native-map-link";
const {
  colors,
  SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
  SCREEN_KEY_NAVIGATOR_FLEX,
  KEY_MODAL_HEADER,
  KEY_MODAL_SUB_HEADER,
  KEY_MODAL_CANCEL_BUTTON,
  FINDHOSPITAL,
  FINDHOSPITAL_NAVIGATE,
  SCREEN_KEY_HOSPITAL_DETAIL_INFO_TAB,
  SCREEN_KEY_HOSPITAL_DETAIL_SPECIALITY_TAB,
  SCREEN_KEY_HOSPITAL_DETAIL_DOCTOR_TAB,
  SCREEN_KEY_HOSPITAL_DETAIL_ROOM_TAB,
} = CoreConfig;

// const helpers = metaHelpers;
import Doctors from "./Doctors";
import Rooms from "./Rooms";
import Specialization from "./Specialization";
// const KEY_INFO_TAB = "hospitaldetailscreendetailsinfotab";
// const KEY_SPECIALITY_TAB = "hospitaldetailscreendetailsspecidalitytab";
// const KEY_DOCTORS_TAB = "hospitaldetailscreendetailsdoctorstab";
// const KEY_ROOMS_TAB = "hospitaldetailscreendetailsroomstab";

const SettingsTabs = createMaterialTopTabNavigator(
  {
    InfoTab: {
      screen: HospitalInfo,
      navigationOptions: () => ({
        tabBarLabel: metaHelpers.findElement(
          SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
          SCREEN_KEY_HOSPITAL_DETAIL_INFO_TAB
        ).label,
      }),
    },
    SpecialityTab: {
      screen: () => <Specialization />,
      navigationOptions: () => ({
        tabBarLabel: metaHelpers.findElement(
          SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
          SCREEN_KEY_HOSPITAL_DETAIL_SPECIALITY_TAB
        ).label,
      }),
    },
    DoctorsTab: {
      screen: () => <Doctors />,
      navigationOptions: () => ({
        tabBarLabel: metaHelpers.findElement(
          SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
          SCREEN_KEY_HOSPITAL_DETAIL_DOCTOR_TAB
        ).label,
      }),
    },
    RoomsTab: {
      screen: () => <Rooms />,
      navigationOptions: () => ({
        tabBarLabel: metaHelpers.findElement(
          SCREEN_KEY_HOSPITAL_DETAIL_SCREEN_TABS,
          SCREEN_KEY_HOSPITAL_DETAIL_ROOM_TAB
        ).label,
      }),
    },
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        opacity: 1,
        backgroundColor: "#ED1A2D",
        height: 2,
        padding: 0,
      },
      activeTintColor: "#ED1A2D",
      showIcon: false,
      showLabel: true,
      upperCaseLabel: false,
      inactiveTintColor: "#4A555B", // Color of tab when not pressed
      labelStyle: {
        fontSize: 16,
        // lineHeight: 16.3,
        marginTop: 0,
        marginBottom: 2,
        marginLeft: 0,
        marginRight: 0,
        fontFamily: "Avenir",
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
//Issue: the tab navigator needs to be wrapped inside a stack navigator
export default createStackNavigator({ SettingsTabs }, { headerMode: "none" });

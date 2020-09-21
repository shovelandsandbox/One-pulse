import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  BackHandler,
} from "react-native";
import { connect } from "react-redux";

import {
  CoreConfig,
  metaHelpers,
  CoreComponents,
} from "@pru-rt-internal/pulse-common";

import styles from "./styles";
const { AIME_CONTAINER_SCREEN, colors } = CoreConfig;
const helpers = metaHelpers;
import { Header } from "./Header";
import TrendSelection from "./TrendSelection/TrendSelection";
import ZoneTabContainer from "./zoneTab/ZoneTabContainer";
import { TabNavigator } from "react-navigation";
import HealthTip from "./HealthTip";
const { SlideUpPanel } = CoreComponents;
const DENGUE_TAB = "denguezonetab";
const TRENDS_TAB = "trendstab";
const regularFont = Platform.OS === "ios" ? "PruSansNormal" : "pru-regular";
const boldFont = Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold";

const NavigatorDetailMenu = navigateCallback =>
  TabNavigator(
    {
      DengueZone: {
        screen: () => <ZoneTabContainer navigateCallback={navigateCallback} />,
        navigationOptions: () => {
          return {
            tabBarLabel: helpers.findElement(AIME_CONTAINER_SCREEN, DENGUE_TAB)
              .label,
          };
        },
      },
      Trends: {
        screen: () => <TrendSelection navigateCallback={navigateCallback} />,
        navigationOptions: () => {
          return {
            tabBarLabel: helpers.findElement(AIME_CONTAINER_SCREEN, TRENDS_TAB)
              .label,
          };
        },
      },
    },
    {
      ...TabNavigator.Presets.AndroidTopTabs,
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
          lineHeight: 16.3,
          marginTop: 0,
          marginBottom: 2,
          marginLeft: 5,
          marginRight: 5,
          fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
        },
        style: {
          // borderBottomColor: '#29000000',
          // borderBottomWidth: 2,
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

class StayingWell extends Component {
  constructor(props) {
    super(props);
    (this.state = {
      fontWeightTab1: "bold",
      fontWeighttab2: "",
      showTab1: true,
      showTab2: false,
      isSliderOpen: false,
      isDeviceBackPressed: false,
    }),
      (this.navigateCallback = this.navigateCallback.bind(this));
    this.NavigationTab = NavigatorDetailMenu(this.navigateCallback);
    this.slideUpPanel = undefined;
    this.dengueTabLabel = "";
    this.areaLabel = "";
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    //this.onProceed =  this.onProceed.bind(this);
  }

  navigateCallback() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    this.props.navigation.goBack();
    return true;
  }

  updateSliderStatus = status => {
    this.setState({ isSliderOpen: status });
  };
  componentDidMount() {
    this.dengueTabLabel = helpers.findElement(
      AIME_CONTAINER_SCREEN,
      DENGUE_TAB
    ).label;
    this.trendsTabLabel = helpers.findElement(
      AIME_CONTAINER_SCREEN,
      TRENDS_TAB
    ).label;
  }
  selectTab = tabName => {
    if (tabName === "tab1") {
      this.setState({
        fontWeightTab1: "bold",
        fontWeighttab2: "",
        showTab1: true,
        showTab2: false,
      });
    } else {
      this.setState({
        fontWeightTab1: "",
        fontWeighttab2: "bold",
        showTab1: false,
        showTab2: true,
      });
    }
  };
  header() {
    const shadowStyle = {
      shadowOpacity: 1,
    };
    return (
      <View style={{ height: 50, flexDirection: "column", shadowStyle }}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.selectTab("tab1")}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily:
                    this.state.fontWeightTab1 === "bold"
                      ? boldFont
                      : regularFont,
                }}
              >
                {this.dengueTabLabel}
              </Text>
            </TouchableOpacity>
            <View style={{ height: 5, width: 10, backgroundColor: "black" }} />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.selectTab("tab2")}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily:
                    this.state.fontWeightTab2 === "bold"
                      ? boldFont
                      : regularFont,
                }}
              >
                {this.trendsTabLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { meta } = this.props;
    return (
      <View style={styles.container}>
        <Header
          leftIconType="back"
          onLeftPress={e => {
            e.preventDefault();
            this.props.navigation.navigate("MainPage");
          }}
          showRightIcon={false}
          sliderStatus={this.state.isSliderOpen}
        />
        <this.NavigationTab />
        <SlideUpPanel
          render={additionalProps => {
            return <HealthTip {...additionalProps} />;
          }}
          additionalStyles={{
            borderRadius: 35,
          }}
          updateSliderStatus={this.updateSliderStatus}
          isDeviceBackPressed={this.state.isDeviceBackPressed}
          screenHeight={meta.applicationHeight}
          expandedHeight={50}
          showCloseIcon={true}
        />
      </View>
    );
  }
}

StayingWell.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = state => ({
  meta: state.meta,
  regStatus: state.regAIME.registrationStatus,
});

export default connect(mapStateToProps)(StayingWell);

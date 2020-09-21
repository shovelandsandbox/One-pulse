import React from "react";
import { Animated, StyleSheet, View, Platform } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { connect } from "react-redux";
import TabBarButtonComponent from "./TabBarButtonComponent";
import CrossFadeIcon from "./CrossFadeIcon";
import { goto, gotoWithParams } from "../../actions";
import {
  CoreConstants,
  CoreConfig,
  CoreUtils,
  CoreActions,
  CoreSelectors,
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
const { TOUR_STEPS, handleActiveTab, handleDrawer } = CoreActions;

const { BABYLON_SC_REG_STATUS, BABYLON_HA_REG_STATUS } = CoreConstants;
const { isNilOrEmpty } = CoreUtils;
import { path } from "ramda";
const { pageKeys } = CoreConfig;

const majorVersion = parseInt(Platform.Version, 10);
const isIos = Platform.OS === "ios";
const isIOS11 = majorVersion >= 11 && isIos;

const DEFAULT_MAX_TAB_ITEM_WIDTH = 125;

// eslint-disable-next-line react/require-optimization
class TabBarComponent extends React.Component {
  static defaultProps = {
    activeTintColor: "#007AFF",
    activeBackgroundColor: "transparent",
    inactiveTintColor: "#8E8E93",
    inactiveBackgroundColor: "transparent",
    showLabel: true,
    showIcon: true,
    allowFontScaling: true,
    adaptive: isIOS11,
    safeAreaInset: { bottom: "always", top: "never" }
  };

  _renderLabel = ({ route, focused }) => {
    const {
      activeTintColor,
      inactiveTintColor,
      labelStyle,
      showLabel,
      showIcon,
      allowFontScaling
    } = this.props;

    if (showLabel === false) {
      return null;
    }

    const label = this.props.getLabel({ route });
    const tintColor = focused ? activeTintColor : inactiveTintColor;

    if (typeof label === "string") {
      return (
        <Animated.Text
          numberOfLines={2}
          style={[
            styles.label,
            { color: tintColor },
            showIcon && this._shouldUseHorizontalLabels()
              ? styles.labelBeside
              : styles.labelBeneath,
            labelStyle
          ]}
          allowFontScaling={allowFontScaling}
        >
          {label}
        </Animated.Text>
      );
    }

    if (typeof label === "function") {
      return label({ route, focused, tintColor });
    }

    return label;
  };

  _renderIcon = ({ route, focused }) => {
    const {
      navigation,
      activeTintColor,
      inactiveTintColor,
      renderIcon,
      showIcon,
      showLabel
    } = this.props;
    if (showIcon === false) {
      return null;
    }

    const horizontal = this._shouldUseHorizontalLabels();

    const activeOpacity = focused ? 1 : 0;
    const inactiveOpacity = focused ? 0 : 1;

    return (
      <CrossFadeIcon
        route={route}
        horizontal={horizontal}
        navigation={navigation}
        activeOpacity={activeOpacity}
        inactiveOpacity={inactiveOpacity}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        renderIcon={renderIcon}
        style={[
          styles.iconWithExplicitHeight,
          showLabel === false && !horizontal && styles.iconWithoutLabel,
          showLabel !== false && !horizontal && styles.iconWithLabel
        ]}
      />
    );
  };

  _shouldUseHorizontalLabels = () => {
    const { routes } = this.props.navigation.state;
    const { isLandscape, dimensions, adaptive, tabStyle } = this.props;

    if (!adaptive) {
      return false;
    }

    if (Platform.isPad) {
      let maxTabItemWidth = DEFAULT_MAX_TAB_ITEM_WIDTH;

      const flattenedStyle = StyleSheet.flatten(tabStyle);

      if (flattenedStyle) {
        if (typeof flattenedStyle.width === "number") {
          maxTabItemWidth = flattenedStyle.width;
        } else if (typeof flattenedStyle.maxWidth === "number") {
          maxTabItemWidth = flattenedStyle.maxWidth;
        }
      }

      return routes.length * maxTabItemWidth <= dimensions.width;
    }
    return isLandscape;
  };

  handlePress(route, index) {
    if (route.key === "HomeTab") {
      this.props.goto(pageKeys.PULSE_MAIN_PAGE);
    } else if (route.key === "GettingTreatment") {
      this.props.goto(pageKeys.PULSE_HEALTH_PAGE);
    } else if (route.key === "ChatTab") {
      this.props.pressCheckSymptoms(this.props);
    } else if (route.key === "ClinicTab") {
      this.props.pressClinicTab();
    } else if (route.key !== "HealthCheckTab") {
      this.props.jumpToIndex(index);
      this.props.handleActiveTab(route.key);
    } else {
      this.props.handleDrawer(true);
    }
  }

  getIdentifier(route) {
    const routeName = this.props.getLabel({ route });
    let identifier = null;
    if (routeName === "Home" || routeName === "Laman Utama") {
      identifier = TOUR_STEPS.FIFTH;
    } else if (
      routeName === "Getting Treatment" ||
      routeName === "Mendapat rawatan" ||
      routeName === "Dapatkan Rawatan"
    ) {
      identifier = TOUR_STEPS.SIXTH;
    } else if (routeName === "More" || routeName === "Lain-lain") {
      identifier = TOUR_STEPS.SEVENTH;
    } else if (routeName === "Assess Health") {
      identifier = TOUR_STEPS.SEVENTH;
    }

    return identifier;
  }

  render() {
    const {
      navigation,
      activeBackgroundColor,
      inactiveBackgroundColor,
      safeAreaInset,
      style,
      tabStyle,
      isNewUser
    } = this.props;

    const { routes } = navigation.state;

    const tabBarStyle = [
      styles.tabBar,
      this._shouldUseHorizontalLabels() && !Platform.isPad
        ? styles.tabBarCompact
        : styles.tabBarRegular,
      style,
      isNewUser
        ? {
            borderTopWidth: 0
          }
        : {}
    ];

    return (
      <SafeAreaView style={tabBarStyle} forceInset={safeAreaInset}>
        {/* {isNewUser && <View style={styles.tourOverlay} />} */}
        {routes.map((route, index) => {
          const focused = index === navigation.state.index;
          const scene = { route, focused };
          const accessibilityLabel = this.props.getLabel({
            route
          });

          const testID = this.props.getTestIDProps({ route });
          const identifier = this.getIdentifier(route);

          const backgroundColor = focused
            ? activeBackgroundColor
            : inactiveBackgroundColor;

          const ButtonComponent = TabBarButtonComponent;

          return (
            <ButtonComponent
              key={route.key}
              index={index / routes.length}
              onPress={() => this.handlePress(route, index)}
              onLongPress={() => this.handlePress(route, index)}
              testID={testID}
              accessibilityLabel={accessibilityLabel}
              style={[
                styles.tab,
                { backgroundColor },
                this._shouldUseHorizontalLabels()
                  ? styles.tabLandscape
                  : styles.tabPortrait,
                tabStyle
              ]}
              identifier={identifier}
            >
              {this._renderIcon(scene)}
              {this._renderLabel(scene)}
            </ButtonComponent>
          );
        })}
      </SafeAreaView>
    );
  }
}

export const pressCheckSymptoms = props => dispatch => {
  const {
    navigation,
    babylonToken,
    babylonHaStatus,
    babylonScStatus,
    babylonUserLoggedIn,
    userProfile
  } = props;
  const babylonTncConsent = path(
    ["termsConditions", "Babylon", "consent"],
    userProfile
  );
  if (isNilOrEmpty(babylonToken)) {
    //not babylon registered
    if (isNilOrEmpty(babylonScStatus) && !(babylonTncConsent === "ACCEPT")) {
      navigation.navigate(pageKeys.BABYLON_CHAT_QUICK_START);
    } else if (babylonScStatus === BABYLON_SC_REG_STATUS.QUICK_START_DONE) {
      if (
        babylonHaStatus === BABYLON_HA_REG_STATUS.TNC_ACCEPTED ||
        babylonTncConsent === "ACCEPT"
      ) {
        navigation.navigate("ChatOnboard");
      } else {
        navigation.navigate("TermsAndConditions", {
          fromAuthAction: false,
          babylon: true,
          goBack: () => navigation.navigate("HomeTab")
        });
      }
    } else if (
      babylonScStatus === BABYLON_SC_REG_STATUS.TNC_ACCEPTED ||
      babylonTncConsent === "ACCEPT"
    ) {
      navigation.navigate("ChatOnboard", { healthAssessment: false });
    }
  } else if (babylonUserLoggedIn) {
    navigation.navigate(pageKeys.BABYLON_SYMPTOM_CHECKER);
  }
};

/* eslint-disable complexity */
export const pressClinicTab = props => dispatch => {
  const {
    navigation,
    babylonToken,
    babylonHaStatus,
    babylonScStatus,
    healthFlowsData,
    userProfile
  } = props;
  const babylonTncConsent = path(
    ["termsConditions", "Babylon", "consent"],
    userProfile
  );
  if (isNilOrEmpty(babylonToken)) {
    //not babylon registered
    if (isNilOrEmpty(babylonHaStatus) && !(babylonTncConsent === "ACCEPT")) {
      navigation.navigate("HelthCheckAssessmentHome");
    } else if (babylonHaStatus === BABYLON_HA_REG_STATUS.HA_INTRO_DONE) {
      if (
        babylonScStatus === BABYLON_SC_REG_STATUS.TNC_ACCEPTED ||
        babylonTncConsent === "ACCEPT"
      ) {
        navigation.navigate("UserRegistration", { healthAssessment: true });
      } else {
        navigation.navigate("HATermsAndConditions", {
          fromAuthAction: false,
          babylon: true,
          healthAssessment: true,
          goBack: () => navigation.navigate("HomeTab")
        });
      }
    } else if (
      babylonHaStatus === BABYLON_HA_REG_STATUS.TNC_ACCEPTED ||
      babylonTncConsent === "ACCEPT"
    ) {
      navigation.navigate("UserRegistration", { healthAssessment: true });
    }
  } else {
    if (
      healthFlowsData.initialFlows !== undefined &&
      healthFlowsData.initialFlows.length > 0
    ) {
      if (healthFlowsData.initialFlows[0].conversationId !== "-1") {
        navigation.navigate("BuildProfile");
      } else {
        navigation.navigate("FullAssessment", {
          fromHealthCheckHome: false
        });
      }
    } else {
      const { getHealthCheckInitialFlows } = this.props;
      getHealthCheckInitialFlows();
      // BabylonEvents.getHealthCheckInitialFlows(e => {
      //   const { initialFlows } = e;
      //   dispatch(getHealthFlowResponse(e));
      //   if (initialFlows.length && initialFlows[0].conversationId !== "-1") {
      //     navigation.navigate("BuildProfile");
      //   } else {
      //     navigation.navigate("FullAssessment", {
      //       fromHealthCheckHome: false,
      //     });
      //   }
      // });
    }
  }
};

const DEFAULT_HEIGHT = 49;
const COMPACT_HEIGHT = 29;

const styles = {
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#fff",
    flexDirection: "row"
  },
  tabBarCompact: {
    height: COMPACT_HEIGHT
  },
  tabBarRegular: {
    height: DEFAULT_HEIGHT
  },
  tab: {
    flex: 1,
    alignItems: isIos ? "center" : "stretch"
  },
  tabPortrait: {
    justifyContent: "flex-end",
    flexDirection: "column"
  },
  tabLandscape: {
    justifyContent: "center",
    flexDirection: "row"
  },
  iconWithoutLabel: {
    flex: 1
  },
  iconWithLabel: {
    flex: 1
  },
  iconWithExplicitHeight: {
    height: Platform.isPad ? DEFAULT_HEIGHT : COMPACT_HEIGHT
  },
  label: {
    textAlign: "center",
    backgroundColor: "transparent"
  },
  labelBeneath: {
    fontSize: 11,
    marginBottom: 1.5
  },
  labelBeside: {
    fontSize: 12,
    marginLeft: 15
  },
  tourOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
    opacity: 0.8,
    zIndex: 9
  }
};

const mapStateToProps = state => ({
  babylonToken: AuthSelector.getBabylonToken(state),
  babylonStatus: state.auth.babylonStatus,
  healthFlowsData: state.healthCheck.healthFlows,
  babylonScStatus: state.register.babylonScStatus,
  babylonHaStatus: state.register.babylonHaStatus,
  babylonUserLoggedIn: state.babylonAuth.babylonUserLoggedIn,
  isNewUser: state.auth.isNewUser,
  meta: state.meta // require meta to update language of main tab
});

export default connect(mapStateToProps, {
  handleActiveTab,
  handleDrawer,
  pressCheckSymptoms,
  pressClinicTab,
  getHealthCheckInitialFlows: () => ({
    context: pageKeys.HA_GET_STARTED,
    type: GET_HEALTH_FLOWS
  }),
  goto,
  gotoWithParams
})(TabBarComponent);

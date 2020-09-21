/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import PropTypes from "prop-types";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  BackHandler,
} from "react-native";
import { BACK } from "../../../config/images";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import { styles as cardStyles } from "./cards/style";
import { pickBy, head, keys, pathOr } from "ramda";
import getCard from "../card-factory";
import screens from "../configs/screenNames";
import types from "../configs/actionNames";
import { CoreUtils, CoreActionTypes } from "@pru-rt-internal/pulse-common";
import BaseProfileCard from "./cards/baseProfileCard";
import { createPlatformEvent } from "../actions";
import metaKeys from "../screenMetaKeys";
import { metaFinder } from "../stringUtils";
import WizardButton from "./WizardButton";
import { configureLineHeight } from "../../../utils/lineHeightsUtils";
const { EVENT_TYPE_USER_ACTIVITY } = CoreActionTypes;
const { logFirebaseEvent, setScreen } = CoreUtils;

class PruWizard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentScreen: this.getFirstScreen(),
    };
  }

  updateEvent = (event, eventType, attributes) => {
    const { config } = this.props;

    return {
      type: eventType,
      ...event,
      tags: (event.tags || []).concat(config.name),
      attributes: {
        ...attributes,
        ...event.attributes,
        currentScreen: this.state.currentScreen.name,
      },
      source: "pulse",
    };
  };

  componentDidMount() {
    const { config } = this.props;

    this.props.createPlatformEvent(
      this.updateEvent(config.platformEvents.WizardOpened, "ScreenEvent")
    );

    this.sendFirebaseEvent(this.state.currentScreen?.name);

    logFirebaseEvent(config.firebaseEvents.WizardOpened);

    if (Platform.OS === "android") {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress
      );
    }
  }

  onAndroidBackPress = () => {
    this.onPrevPressed();
    return true;
  };

  isFirstScreen = screenName => {
    const { flow } = this.props.config;
    return screenName === flow._start.to;
  };

  isLastScreen = screenName => {
    const { flow } = this.props.config;
    return !flow[screenName];
  };

  getScreen = screenName => {
    const { cards } = this.props.config;
    return {
      name: screenName,
      config: cards[screenName],
    };
  };

  getFirstScreen = () => {
    const {
      flow: {
        _start: { to },
      },
    } = this.props.config;

    return this.getScreen(to);
  };

  getNextScreen = screenName => {
    const { flow } = this.props.config;
    if (this.isLastScreen(screenName)) {
      return null;
    }
    return this.getScreen(flow[screenName].to);
  };

  getPreviousScreen = screenName => {
    const { flow } = this.props.config;
    const screen = pickBy(val => {
      return val.to == screenName;
    }, flow);
    return screenName === "_start" ? null : this.getScreen(head(keys(screen))); //get the first key of the object as only that is picked
  };

  sendSuccessEvent = () => {
    const { config } = this.state.currentScreen;
    const productCode = pathOr(
      null,
      ["config", "productInfo", "productCode"],
      this.props
    );

    let params = {
      status: "success",
    };
    if (productCode) {
      params = {
        product: productCode,
        status: "success",
      };
    }
    logFirebaseEvent(config.firebaseEvent, params);
  };

  sendErrorEvent = error => {
    const { config } = this.state.currentScreen;
    const productCode = pathOr(
      null,
      ["config", "productInfo", "productCode"],
      this.props
    );

    let params = {
      status: "error",
      error
    };
    if (productCode) {
      params = {
        product: this.props.config.productInfo.productCode,
        status: "error",
        error,
      };
    }
    logFirebaseEvent(config.firebaseEvent, params);
  };

  onNextPressed = () => {
    const result = this.currentStepRef.process();
    const { currentScreen } = this.state;

    if (result.success) {
      this.sendSuccessEvent();
      this.props.createPlatformEvent(
        this.updateEvent(
          currentScreen.config.platformEvents.WizardNextPressed,
          "ClickEvent",
          {
            status: "success",
          }
        )
      );
      if (this.isLastScreen(currentScreen.name)) {
        //TODO : it should take you to the policy page
        const productCode = pathOr(
          "",
          ["config", "productInfo", "productCode"],
          this.props
        );
        this.props.updateCustomerDetailsLastCard(
          productCode,
          this.props.config.postCustomerUpdateNavigation
        );
        const screenId = this.props.isPostRegister
          ? "PRFApplication"
          : "IAFApplication";
        setScreen(screenId, EVENT_TYPE_USER_ACTIVITY);
        return null;
      }
      this.setState(state => ({
        currentScreen: this.getNextScreen(state.currentScreen.name),
      }));
    } else {
      this.props.createPlatformEvent(
        this.updateEvent(
          currentScreen.config.platformEvents.WizardNextPressed,
          "ClickEvent",
          {
            status: "error",
            error: result.errors[0],
          }
        )
      );
      this.sendErrorEvent(result.errors[0]);
    }
  };

  onPrevPressed = () => {
    if (!this.isFirstScreen(this.state.currentScreen.name)) {
      this.setState(state => ({
        currentScreen: this.getPreviousScreen(state.currentScreen.name),
      }));
    }
  };

  onSkip = () => {
    const { config } = this.state.currentScreen;
    const productCode = pathOr(
      null,
      ["config", "productInfo", "productCode"],
      this.props
    );

    let params = {};
    if (productCode) {
      params = {
        product: productCode,
        status: "skipped",
      };
    }
    logFirebaseEvent(config.skipEvent, params);
    this.props.createPlatformEvent(
      this.updateEvent(config.platformEvents.WizardSkipPressed, "ClickEvent", {
        status: "skipped",
      })
    );
    this.props.updateCustomerDetails();
  };

  sendFirebaseEvent = screenName => {
    let screenId = "";
    const isPostRegister = this.props.isPostRegister;
    switch (screenName) {
      case "birthdateScreen":
        screenId = isPostRegister ? "PRFBirthday" : "IAFBirthday";
        break;
      case "genderScreen":
        screenId = isPostRegister ? "PRFGender" : "IAFGender";
        break;
      case "nationalIdScreen":
        screenId = isPostRegister ? "PRFNationalID" : "IAFNationalID";
        break;
      case "addressScreen":
        screenId = isPostRegister ? "PRFAddress" : "IAFAddress";
        break;
      case "phoneScreen":
        screenId = isPostRegister ? "PRFPhoneNo" : "IAFPhoneNo";
        break;
    }
    setScreen(screenId, EVENT_TYPE_USER_ACTIVITY);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentScreen?.name != this.state.currentScreen?.name) {
      this.sendFirebaseEvent(this.state.currentScreen?.name);
    }
  }

  renderCurrentScreen = () => {
    const { currentScreen } = this.state;
    const productInfo = this.props.config.productInfo;

    const Card = getCard(currentScreen.config.screenId);
    return (
      <BaseProfileCard
        onRef={ref => (this.currentStepRef = ref)}
        config={currentScreen.config}
        productInfo={productInfo}
        currentScreen={currentScreen}
        SubComponent={Card}
        onNextPressed={this.onNextPressed}
      />
    );
  };

  renderWizardNav = currentScreenName => {
    return (
      <SafeAreaView style={styles.wizardHeader}>
        <View style={styles.headerWrapper}>
          {!this.isFirstScreen(currentScreenName) && (
            <TouchableOpacity
              style={styles.previousButtonStyle}
              onPress={this.onPrevPressed}
            >
              <Image style={{ width: 20, height: 20, left: 0 }} source={BACK} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.skipButtonStyle}
            onPress={this.onSkip}
          >
            <Text style={{ fontSize: 15 }}>
              {metaFinder(metaKeys.wizard.skip)}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  renderContinueBtn = () => (
    <WizardButton
      onNextPressed={this.onNextPressed}
      text={metaFinder(metaKeys.wizard.continueBtnText)}
    />
  );

  renderWelcome = currentScreenName => {
    if (this.isFirstScreen(currentScreenName)) {
      return (
        <View style={cardStyles.subContainer}>
          <Text style={cardStyles.welcomeText}>
            {metaFinder(metaKeys.wizard.welcomeMsg)}
          </Text>

          <Text style={{...cardStyles.welcomeDesc, ...configureLineHeight("15")}}>
            {metaFinder(metaKeys.wizard.completeProfile)}
            <Text style={{ color: "#E41729", fontWeight: "bold" }}>
              {metaFinder(metaKeys.wizard.free)}
            </Text>{" "}
            {metaFinder(metaKeys.wizard.freeHA)}
          </Text>
        </View>
      );
    } else {
      return null;
    }
  };

  render() {
    const {
      currentScreen: { name: currentScreenName },
    } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        {this.renderWizardNav(currentScreenName)}
        <View style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={10}
            extraScrollHeight={10}
          >
            {this.renderWelcome(currentScreenName)}
            {this.renderCurrentScreen()}
          </KeyboardAwareScrollView>
          {this.renderContinueBtn()}
        </View>
      </View>
    );
  }
}

PruWizard.propTypes = {
  config: PropTypes.array,
  updateCustomerDetails: PropTypes.func,
  updateCustomerDetailsLastCard: PropTypes.func,
  createPlatformEvent: PropTypes.func,
  isPostRegister: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    isPostRegister: state.wizardData.isPostRegister,
  };
};

const mapDispatchToProps = {
  updateCustomerDetails: () => ({
    context: screens.PRU_WIZARD_SCREEN,
    type: types.updateCustomerDetails,
  }),
  updateCustomerDetailsLastCard: (productCode, postUpdateNavigation) => ({
    context: screens.BUY_POLICY_CARD,
    type: types.updateCustomerDetails,
    payload: { productCode, postUpdateNavigation },
  }),
  createPlatformEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(PruWizard);

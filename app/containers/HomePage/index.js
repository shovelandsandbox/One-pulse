import React, { PureComponent } from "react";
import { BackHandler, Platform } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import HomePage from "./HomePageStatic";
import DynamicHomeTab from "./DynamicHomeTab";
import { goto } from "../../actions";
import { CustomAlert } from "../../components";
import {
  CoreActions,
  CoreUtils,
  CoreSelectors,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";
const { SET_USER_LAST_ACTIVITY_TIME, APP_STATE } = CoreActionTypes;
const { createInactivityNotifier, removeInactivityNotifier } = CoreUtils;
const { doLogout } = CoreActions;
const { AuthSelector } = CoreSelectors;
const { isNilOrEmpty } = CoreUtils;
const DEFAULT_INACTIVE_TIMEOUT = 7200000;

let restrictBackNav = false;
class PulseHome extends PureComponent {
  constructor(props) {
    super(props);
    this.inactivityNotifier = null;
  }

  onAndroidBackPress = () => {
    if (restrictBackNav) return true;
    return false;
  };

  componentWillUnmount() {
    this.didBlurSubscription.remove();
    this.didFocusSubscription.remove();
    if (this.inactivityNotifier) {
      removeInactivityNotifier(this.inactivityNotifier);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { email, profileEmail, profilePhone } = this.props;
    if (
      isNilOrEmpty(email) &&
      isNilOrEmpty(profileEmail) &&
      isNilOrEmpty(profilePhone)
    ) {
      this.props.goto("CollectSocialRegnEmail");
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.countryMetaCountry !== this.props.countryMetaCountry &&
      this.props.addrCountryCode === nextProps.countryMetaCountry
    ) {
      const timeout = Number(nextProps.appInactivityTimeout)
        ? Number(nextProps.appInactivityTimeout)
        : DEFAULT_INACTIVE_TIMEOUT;
      // CustomAlert.show(
      //   "UNSAFE_componentWillReceiveProps :: Updated timeout " + timeout,
      //   "this.props.userLastActivityTime :: " + new Date(this.props.userLastActivityTime),
      //   {
      //     positiveText: "OK",
      //     onPositivePress: () => {},
      //   }
      // );
      if (
        this.props.userLastActivityTime !== 0 &&
        this.props.userLastActivityTime + timeout < Date.now()
      ) {
        this.props.doLogout();
      } else {
        this.props.updateLastActivityTime({
          timeStamp: Date.now(),
        });
      }
    }
  }

  componentDidMount() {
    this.props.updatePreferredLang(this.props.lang);
    this.didFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.onAndroidBackPress
        );
        restrictBackNav = true;
      }
    );

    this.didBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        BackHandler.removeEventListener("hardwareBackPress");
        restrictBackNav = false; //On Tabs removelistener does not works so custom flag is required
      }
    );

    this.inactivityNotifier = createInactivityNotifier(
      this.handleStateChange.bind(this),
      DEFAULT_INACTIVE_TIMEOUT
    );
    if (this.props.addrCountryCode === this.props.countryMetaCountry) {
      const timeout = Number(this.props.appInactivityTimeout)
        ? Number(this.props.appInactivityTimeout)
        : DEFAULT_INACTIVE_TIMEOUT;
      // CustomAlert.show(
      //   "componentDidMount :: Updated timeout " + timeout,
      //   " this.props.userLastActivityTime :: " + new Date(this.props.userLastActivityTime),
      //   {
      //     positiveText: "OK",
      //     onPositivePress: () => {},
      //   }
      // );
      if (
        this.props.userLastActivityTime !== 0 &&
        this.props.userLastActivityTime + timeout < Date.now()
      ) {
        this.props.doLogout();
      } else {
        this.props.updateLastActivityTime({
          timeStamp: Date.now(),
        });
      }
    }
  }

  render() {
    const { useDynamicHomeScreen } = this.props;

    if (useDynamicHomeScreen === true) {
      return <DynamicHomeTab {...this.props} />;
    } else if (useDynamicHomeScreen === false) {
      return <HomePage {...this.props} />;
    }
    return null;
  }

  handleStateChange = appState => {
    if ([APP_STATE.BACKGROUND, APP_STATE.INACTIVE].includes(appState)) {
      this.props.updateLastActivityTime({
        timeStamp: Date.now(),
      });
    } else if (appState === APP_STATE.ACTIVE) {
      const timeout = Number(this.props.appInactivityTimeout)
        ? Number(this.props.appInactivityTimeout)
        : DEFAULT_INACTIVE_TIMEOUT;
      if (
        this.props.userLastActivityTime !== 0 &&
        this.props.userLastActivityTime + timeout < Date.now()
      ) {
        this.props.doLogout();
      } else {
        this.props.updateLastActivityTime({
          timeStamp: Date.now(),
        });
      }
    }
  };
}

PulseHome.propTypes = {
  useDynamicHomeScreen: PropTypes.bool,
  doLogout: PropTypes.func,
  appInactivityTimeout: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    useDynamicHomeScreen: state.meta.countryCommonMeta.useDynamicHomeScreen,
    appInactivityTimeout: pathOr(
      DEFAULT_INACTIVE_TIMEOUT,
      ["meta", "countryCommonMeta", "appInactivityTimeout"],
      state
    ),
    lang: state.userPreferences.language,
    email: AuthSelector.getUserEmail(state),
    profileEmail: state.profile.email,
    profilePhone: state.profile.phone,
    userLastActivityTime: state.auth.userLastActivityTime,
    countryMetaCountry: state.meta.countryCommonMeta.countryCode2,
    addrCountryCode: state.profile.countryCode,
  };
};

const mapDispatchToProps = {
  goto,
  updatePreferredLang: lang => ({
    context: "COMMON_UPDATE_CUSTOMER",
    type: "UPDATE_PREFFERED_LANGUAGE",
    payload: {
      value: lang,
    },
  }),
  doLogout,
  updateLastActivityTime: payload => ({
    type: SET_USER_LAST_ACTIVITY_TIME,
    payload,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(PulseHome);

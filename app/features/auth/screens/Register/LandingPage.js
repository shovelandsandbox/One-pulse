import React, { Component } from "react";
import {
  Platform,
  View,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";

import {
  CoreConfig,
  CoreActionTypes,
  CoreComponents,
  CoreUtils,
  firebaseEvents,
  events
} from "@pru-rt-internal/pulse-common";
import { connect } from "react-redux";
import registrationStyles from "./styles";
import Styles from "../../../../containers/Register/styles";
import _ from "lodash";
import MetaConstants from "../../meta";
import { goto, gotoNewCommon, dispatchEvent } from "../../../../actions";
import { WC_ML, WHITE_PHONE } from "../../../../config/images";
const { pageKeys } = CoreConfig;
const { SocialLogin, Languages } = CoreComponents;
const { EVENT_TYPE_USER_ACTIVITY } = CoreActionTypes;
const { logFirebaseEvent, setScreen } = CoreUtils;

import WelcomeWrapper from "../../components/WelcomeWrapper";
import Logo from "../../components/Logo";

// eslint-disable-next-line react/require-optimization
class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
  }

  componentDidMount() {
    setScreen("LoggedOutHome", EVENT_TYPE_USER_ACTIVITY);
    this.props.dispatchEvent(events.landing);
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.props.enableLoginBtn();
      }
    );
  }

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.userLanguagePreference !== nextProps.userLanguagePreference
    ) {
      this.metaConstants = { ...MetaConstants.initializeScreenMeta() };
    }
  }

  prepareTnCPrivacyText = () => {
    const tempTncText = this.metaConstants.NEW_REGISTER_REGISTERHINT1_LABEL;
    const tempTncTextSplit = tempTncText.split(" ");
    return (
      <View style={Styles.tncPrivacyContainer}>
        {tempTncTextSplit.map(str => {
          return (
            <View style={Styles.tncPrivacyTextSpacing}>
              <Text style={Styles.tncPrivacyTextStyle}>{str}</Text>
            </View>
          );
        })}
        <TouchableOpacity
          style={Styles.tncPrivacyTextSpacing}
          onPress={() => {
            this.props.dispatchEvent(events.tncViewed);
            this.props.loadPrivacypolicy("Pulse", "TermAndConditions");
          }}
        >
          <Text
            style={[
              { textDecorationLine: "underline" },
              Styles.tncPrivacyTextStyle,
            ]}
          >
            {this.metaConstants.NEW_REGISTER_REGISTERHINT2_LABEL}
          </Text>
        </TouchableOpacity>
        <View style={Styles.tncPrivacyTextSpacing}>
          <Text style={Styles.tncPrivacyTextStyle}>
            {this.metaConstants.NEW_REGISTER_and_LABEL}
          </Text>
        </View>
        <TouchableOpacity
          style={Styles.tncPrivacyTextSpacing}
          onPress={() => {
            this.props.dispatchEvent(events.privacyPolicyViewed);
            this.props.loadPrivacypolicy("Pulse", "PrivacyPolicy");
          }}
        >
          <Text
            style={[
              { textDecorationLine: "underline" },
              Styles.tncPrivacyTextStyle,
            ]}
          >
            {this.metaConstants.NEW_REGISTER_REGISTERHINT3_LABEL}
          </Text>
        </TouchableOpacity>
        <View style={Styles.tncPrivacyTextSpacing}>
          <Text style={Styles.tncPrivacyTextStyle}>
            {this.metaConstants.NEW_REGISTER_REGISTERHINT4_LABEL}
          </Text>
        </View>
      </View>
    );
  };

  renderLoginTypes = () => {
    if (Platform.OS === "ios") {
      return null;
    }

    return (
      <View>
        <SocialLogin
          context={pageKeys.LOGIN}
          fbText={this.metaConstants.FB_CONNECT}
          source={"LandingScreen"}
          {...this.props}
        />
        <SocialLogin
          context={pageKeys.LOGIN}
          gmailText={this.metaConstants.GOOGLE_CONNECT}
          source={"LandingScreen"}
          {...this.props}
          isGoogle
        />
      </View>
    )
  }

  render() {
    const loginEmail = this.metaConstants.LOGIN_EMAIL;

    return (
      <WelcomeWrapper>
        <View style={registrationStyles.langHeader}>
          <Languages
            accesible
            textStyle={registrationStyles.langStyle}
            containerStyle={{ paddingHorizontal: 10 }}
            accessibilityLabel="langContainer"
            testID="langContainer"
            indicateColor="#6b6a6d"
          />
        </View>
        <View style={registrationStyles.container}>
          <Logo country={this.props.userCountryDetails.simCountry} />
          <View style={{ marginBottom: 40 }}>
            <View style={{ paddingHorizontal: 30 }}>{this.prepareTnCPrivacyText()}</View>
            <View style={{ paddingHorizontal: 62, }}>
              <View style={{ marginTop: 16, justifyContent: 'center', alignItems: 'center' }}>
                {this.renderLoginTypes()}
                <TouchableOpacity
                  style={registrationStyles.loginMail}
                  onPress={() => {
                    logFirebaseEvent("login_with", {
                      reg_auth_type: "email",
                    });
                    this.props.goto("NewLoginComponent");
                    this.props.loginPreference("email");
                    this.props.dispatchEvent(events.continueEmailButtonClick);
                  }}
                >
                  <Image
                    accessible
                    accessibilityLabel="mailLogo"
                    testID="maillogo"
                    resizeMode="contain"
                    style={registrationStyles.iconMailLogo}
                    source={WC_ML}
                  />
                  <Text
                    style={registrationStyles.mailLoginText}
                    numberOfLines={2}
                  >
                    {loginEmail || "Login with Email"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </WelcomeWrapper>
    );
  }
}

const mapStateToProps = state => ({
  email: state.register.email,
  error: state.register.error,
  loading: state.register.loading,
  meta: state.meta,
  password: state.register.password,
  privacy: state.trigger.openPrivacy,
  terms: state.trigger.openTerms,
  verifyEmail: state.register.verifyEmail,
  userCountryDetails: state.auth.countryInfo,
  languageList: state.meta.languageList,
  userLanguagePreference: state.userPreferences.language,
  deviceId: state.auth.userAgent.deviceId,
  commonMeta: state.meta.commonMeta,
});

export default connect(mapStateToProps, {
  enableLoginBtn: () => ({
    type: CoreActionTypes.ENABLE_LOGIN_BTN,
  }),
  gotoNewCommon,
  goto,
  loadPrivacypolicy: (source, value) => ({
    context: "LOAD_TNC_AND_PRIVACY_POLICY",
    type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
    payload: {
      source: source,
      value: value,
    },
  }),
  loginPreference: loginPreference => ({
    type: "loginPreference",
    payload: {
      loginPreference
    }
  }),
  dispatchEvent
})(LandingPage);

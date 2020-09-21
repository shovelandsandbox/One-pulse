import React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler
} from "react-native";
import { connect } from "react-redux";
import { OfflineImage } from "react-native-image-offline";
import PropTypes from "prop-types";
import CheckBox from "react-native-check-box";
import styles from "../HealthCheckStyle";
import { HEALTH_GET_STARTED, BABYLON_LOGO_BLUE } from "../../../config/images";

import {
  CoreActionTypes,
  CoreActions,
  CoreComponents,
  CoreConfig,
  CoreConstants,
  metaHelpers,
  colors,
  CoreUtils
} from "@pru-rt-internal/pulse-common";
import { WARNING, CLOSE_PAGE, DOCTORONCALL } from "../../../config/images";
import { gotoCommon } from "../../actions";
const {
  ACCEPT_MAIN_TERMS_AND_CONDITIONS,
  BABYLON_ACCEPT_TNC
} = CoreActionTypes;
import { isNil, path } from "ramda";
const { AppButton } = CoreComponents;
const { pageKeys } = CoreConfig;
const { updateBabylonRegStatus } = CoreActions;
const {
  SCREEN_KEY_HEALTH_CHECK_START,
  COMMON_KEY_BABYLON_POWERED_BY_TEXT,
  COMMON_KEY_BABYLON_LOGO,
  BABYLON_HA_REG_STATUS,
  SCREEN_KEY_TERMS_AND_CONDITIONS,
  COMMON_KEY_TERMS_BABYLON,
  SCREEN_KEY_PRIVACY_POLICY,
  COMMON_KEY_PRIVACY_BABYLON
} = CoreConstants;
const KEY_HEALTH_CHECK_VERSION = "healthcheckstartscreenversion";
const KEY_SCREEN_DESCRIPTION = "healthcheckstartscreendescription";
const KEY_SCREEN_SUBDESCRIPTION = "healthcheckstartscreensubdescription";
const KEY_DISCOVER_BTN = "healthcheckstartscreendiscoverbutton";
const KEY_I_AGREE = "iagreetext";
const KEY_T_C = "termsandconditionstext";
const KEY_AND = "andtext";
const KEY_PP = "privacypolicytext";
const KEY_BABYLON = "babylontext";
const KEY_ACKNOWLEDGEMNT = "acknowledgementtext";
const KEY_WHENEVER = "whenevertext";
const KEY_OUR_SERVICES = "servicestext";
const KEY_FROM_BABYLINE = "frombabylontext";

// eslint-disable-next-line react/require-optimization
class TermsAndConditionsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
    this.checkUserRegistration = this.checkUserRegistration.bind(this);
  }
  _onClose() {}
  checkUserRegistration() {
    this.props.updateBabylonRegStatus({
      babylonHaStatus: BABYLON_HA_REG_STATUS.HA_INTRO_DONE
    });
    const { navigation, isLoggedIn, isRegistered, workflowId } = this.props;
    const { commons } = this.props.meta.metaDetail;
    const fromAuthAction = path(
      ["state", "params", "fromAuthAction"],
      navigation
    );

    const socialAccessType = path(
      ["state", "params", "socialAccessType"],
      navigation
    );

    const tncVersion = metaHelpers.findCommon("PULSE_TnC_VERSION").value;
    const privacyVersion = metaHelpers.findCommon("PULSE_PP_VERSION").value;

    if (fromAuthAction && (isLoggedIn || isRegistered)) {
      const userDetails = {
        firstName: this.props.firstName,
        surName: this.props.lastName,
        contactDetails: {
          email: {
            channel: "EMAIL",
            value: this.props.registeredEmail
          }
        }
      };
      // return this.props.acceptTnC({
      //   workflowId,
      //   email: this.props.registeredEmail,
      //   userDetails,
      //   socialAccessType,
      //   tncVersion,
      //   privacyVersion,
      //   babylonTncConsent === "ACCEPT"
      // })
    }
    this.props.acceptBabylonTnC({
      tncAccepted: true,
      ...navigation.state.params
    });
    // this.props.goToBabylonTnC();
    const tncData = {
      termsConditions: {
        Babylon: {
          consent: "ACCEPT",
          consentDate: CoreUtils.getTimeStamp(),
          version: metaHelpers.findCommon("BABYLON_TnC_VERSION").value,
          org: "Babylon",
          privacy: "ACCEPT",
          privacyDate: CoreUtils.getTimeStamp(),
          privacyVersion: metaHelpers.findCommon("BABYLON_PP_VERSION").value
        }
      }
    };

    //this.props.updateBabylonTnc(tncData);
  }
  goBack = () => {
    this.props.gotHomePage();
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }

  renderInlineLogoText = () => {
    const whenevertext = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_START,
      KEY_WHENEVER
    ).label;
    const ourservices = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_START,
      KEY_OUR_SERVICES
    ).label;
    const fromBabylon = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_START,
      KEY_FROM_BABYLINE
    ).label;
    return (
      <View>
        <View style={styles.textLogo}>
          <Text style={styles.poweredByText}>{whenevertext}</Text>
          <OfflineImage
            accessibilityLabel="babylonLogo"
            resizeMode="contain"
            accesible
            key={COMMON_KEY_BABYLON_LOGO}
            style={styles.babylonImage}
            fallbackSource={BABYLON_LOGO_BLUE}
            source={{
              uri: metaHelpers.findCommon(COMMON_KEY_BABYLON_LOGO).image
            }}
          />
          <Text style={styles.poweredByText}>{ourservices}</Text>
        </View>
        <Text style={[styles.poweredByText, { marginTop: 0 }]}>
          {" "}
          {fromBabylon}
        </Text>
      </View>
    );
  };

  checkboxText() {
    const { navigation } = this.props;
    const tncTitle = metaHelpers.findScreen(SCREEN_KEY_TERMS_AND_CONDITIONS)
      .label;
    const privacyTitle = metaHelpers.findScreen(SCREEN_KEY_PRIVACY_POLICY)
      .label;
    const termsBabylon = metaHelpers.findCommon(COMMON_KEY_TERMS_BABYLON).label;
    const privacyBabylon = metaHelpers.findCommon(COMMON_KEY_PRIVACY_BABYLON)
      .label;
    const iagreetext = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_START,
      KEY_I_AGREE
    ).label;
    const termsandconditionstext = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_START,
      KEY_T_C
    ).label;
    const andtext = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_START,
      KEY_AND
    ).label;
    const privacypolicytext = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_START,
      KEY_PP
    ).label;
    const babylontext = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_START,
      KEY_BABYLON
    ).label;
    const acknowledgementtext = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_START,
      KEY_ACKNOWLEDGEMNT
    ).label;

    return (
      <View style={styles.termsWrap}>
        <Text>
          <Text style={{ color: colors.nevada }}>{iagreetext}</Text>

          <Text
            style={{ color: colors.crimson }}
            onPress={() =>
              this.props.gotoCommon({
                content: termsBabylon,
                screenTitle: tncTitle,
                page: "Babylon"
              })
            }
          >
            {" "}
            {termsandconditionstext}{" "}
          </Text>

          <Text style={{ color: colors.nevada }}>{andtext}</Text>

          <Text
            style={{ color: colors.crimson }}
            onPress={() =>
              this.props.gotoCommon({
                content: privacyBabylon,
                screenTitle: privacyTitle,
                page: "Babylon"
              })
            }
          >
            {" "}
            {privacypolicytext}{" "}
          </Text>

          <Text style={{ color: colors.nevada }}>{babylontext}</Text>
          <Text style={{ color: colors.nevada }}>{acknowledgementtext}</Text>
        </Text>
        {this.renderInlineLogoText()}
      </View>
    );
  }

  render() {
    const healthCheckStartPage = metaHelpers.findScreen(
      SCREEN_KEY_HEALTH_CHECK_START
    );
    return (
      <View style={styles.headView}>
        <View style={styles.container}>
          <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 60,
                  flexDirection: "row",
                  justifyContent: "flex-end",

                  zIndex: 5
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 60,
                    height: 60,
                    position: "absolute",
                    top: 15,
                    right: 20,
                    justifyContent: "center"
                  }}
                  onPress={() => {
                    this.goBack();
                  }}
                >
                  <Image
                    style={{ flex: 1, alignSelf: "center" }}
                    source={CLOSE_PAGE}
                    resizeMode={"contain"}
                  />
                </TouchableOpacity>
              </View>

              <Image source={WARNING} style={{}}></Image>
              <View
                style={{
                  paddingLeft: 40,
                  paddingRight: 40,
                  marginBottom: 16
                }}
              >
                <Text
                  style={{
                    height: "auto",
                    color: "#515B61",
                    fontFamily: "Avenir",
                    fontSize: 22,
                    fontWeight: "900",
                    lineHeight: 30,
                    textAlign: "center",
                    marginTop: 24
                  }}
                >
                  {"Babylon"}
                </Text>
                <Text
                  style={{
                    height: "auto",
                    color: "#222529",
                    fontFamily: "Avenir",
                    fontSize: 16,
                    fontWeight: "500",
                    lineHeight: 22,
                    textAlign: "center",
                    marginTop: 16
                  }}
                >
                  Check your symptoms and get personalized care recommendations
                  with our AI-powered technology
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 45
                  }}
                >
                  <Text
                    style={{
                      width: 70,
                      height: 20,
                      color: "#222529",
                      fontFamily: "Avenir",
                      fontSize: 14,
                      fontWeight: "300",
                      lineHeight: 20,
                      textAlign: "center"
                    }}
                  >
                    Whenever
                  </Text>
                  <Image
                    source={DOCTORONCALL}
                    resizeMode={"contain"}
                    style={{}}
                  ></Image>
                  <Text
                    style={{
                      color: "#222529",
                      fontFamily: "Avenir",
                      fontSize: 14,
                      fontWeight: "300",
                      lineHeight: 20,
                      height: 20,
                      textAlign: "center"
                    }}
                  >
                    appears, you are receiving
                  </Text>
                </View>
                <Text
                  style={{
                    height: 20,
                    color: "#222529",
                    fontFamily: "Avenir",
                    fontSize: 14,
                    fontWeight: "300",
                    lineHeight: 20,
                    textAlign: "center",
                    marginBottom: 64
                  }}
                >
                  the services from Babylon.
                </Text>
                <Text
                  style={{
                    height: 32,
                    width: 320,
                    color: "#515B61",
                    fontFamily: "Avenir",
                    fontSize: 12,
                    fontWeight: "300",
                    lineHeight: 16,
                    textAlign: "center"
                  }}
                >
                  By clicking on Agree below, I confirm that I have read and
                  agree to the Terms & Conditions for Babylon.
                </Text>
              </View>
              <AppButton
                disable={false}
                type={[styles.btn, styles.primary]}
                title={
                  "yes"
                  // metaHelpers.findElementWithScreen(
                  //   healthCheckStartPage,
                  //   KEY_DISCOVER_BTN
                  // ).label
                }
                press={this.checkUserRegistration}
              />
            </View>
            {/* <View> */}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  refreshImage: state.meta.refreshImage,
  babylonScStatus: state.register.babylonScStatus,
  babylonHaStatus: state.register.babylonHaStatus,
  tncOnRegistration: state.register.tncOnRegistration,
  meta: state.meta,
  isRegistered: state.register.isRegistered,
  isLoggedIn: state.auth.isLoggedIn
});

TermsAndConditionsComponent.propTypes = {
  refreshImage: PropTypes.bool,
  updateBabylonRegStatus: PropTypes.func,
  navigation: PropTypes.object,
  isLoggedIn: PropTypes.bool,
  isRegistered: PropTypes.bool,
  workflowId: PropTypes.string,

  lastName: PropTypes.string,
  firstName: PropTypes.string,
  meta: PropTypes.object
};

export default connect(mapStateToProps, {
  updateBabylonRegStatus,
  goToBabylonTnC: () => ({
    context: pageKeys.HEALTH_CHECK_ASSESSMENT_HOME,
    type: CoreActionTypes.GO_TO_BABYLON_TERMS_AND_CONDITIONS
  }),
  updateBabylonTnc: tncData => ({
    context: pageKeys.HEALTH_CHECK_ASSESSMENT_HOME,
    type: CoreActionTypes.UPDATE_CUSTOMER_TNC,
    payload: {
      tncData
    }
  }),
  acceptTnC: payload => ({
    context: pageKeys.REGISTRATION,
    type: ACCEPT_MAIN_TERMS_AND_CONDITIONS,
    payload: payload
  }),
  acceptBabylonTnC: payload => ({
    context: pageKeys.HEALTH_CHECK_HOME_PAGE,
    type: BABYLON_ACCEPT_TNC,
    payload: payload
  }),
  gotHomePage: () => ({
    context: pageKeys.DOC_SERVICE_INTRO,
    type: CoreActionTypes.GO_TO_HEALTH_TAB
  }),
  gotoCommon
})(TermsAndConditionsComponent);

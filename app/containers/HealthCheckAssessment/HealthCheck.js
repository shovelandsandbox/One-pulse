import React from "react";
import { Text, View, ScrollView } from "react-native";
import { connect } from "react-redux";
import { OfflineImage } from "react-native-image-offline";
import PropTypes from "prop-types";
import CheckBox from "react-native-check-box";
import styles from "./HealthCheckStyle";
import { HEALTH_GET_STARTED, BABYLON_LOGO_BLUE } from "../../config/images";
import { configureLineHeight } from "../../utils/lineHeightsUtils";

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
import { gotoCommon } from "../../actions";

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
class HealthCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
    this.checkUserRegistration = this.checkUserRegistration.bind(this);
  }

  checkUserRegistration() {
    this.props.updateBabylonRegStatus({
      babylonHaStatus: BABYLON_HA_REG_STATUS.HA_INTRO_DONE
    });
    //this.props.goToBabylonTnC();
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
    this.props.updateBabylonTnc(tncData);
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
          <Text style={{
            ...styles.poweredByText,
            ...configureLineHeight("11")
            }}>{whenevertext}</Text>
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
          <Text style={{
            ...styles.poweredByText,
            ...configureLineHeight("11")
            }}>{ourservices}</Text>
        </View>
        <Text style={[styles.poweredByText, { marginTop: 0, ...configureLineHeight("11") }]}>
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
          <Text style={{ color: colors.nevada, ...configureLineHeight("14") }}>{iagreetext}</Text>

          <Text
            style={{ color: colors.crimson, ...configureLineHeight("14") }}
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

          <Text style={{ color: colors.nevada, ...configureLineHeight("14") }}>{andtext}</Text>

          <Text
            style={{ color: colors.crimson, ...configureLineHeight("14") }}
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

          <Text style={{ color: colors.nevada, ...configureLineHeight("14") }}>{babylontext}</Text>
          <Text style={{ color: colors.nevada, ...configureLineHeight("14") }}>{acknowledgementtext}</Text>
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
        <OfflineImage
          accessibilityLabel="babylonLogo"
          resizeMode="contain"
          accesible
          key={COMMON_KEY_BABYLON_LOGO}
          style={styles.babylonHeader}
          fallbackSource={BABYLON_LOGO_BLUE}
          source={{
            uri: metaHelpers.findCommon(COMMON_KEY_BABYLON_LOGO).image
          }}
        />
        <View style={styles.container}>
          <OfflineImage
            resizeMode="cover"
            key={healthCheckStartPage.key}
            reloadImage={this.props.refreshImage}
            style={[styles.imgBackground]}
            fallbackSource={HEALTH_GET_STARTED}
            source={{
              uri: healthCheckStartPage.image
            }}
          />
          <Text style={{
            ...styles.headerText,
            ...configureLineHeight("20")
            }}>{healthCheckStartPage.label}</Text>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.chatbotContainer}>
              <View style={styles.healthCheckText}>
                <Text style={{
                  ...styles.betaText,
                  ...configureLineHeight("16")
                  }}>
                  {
                    metaHelpers.findElementWithScreen(
                      healthCheckStartPage,
                      KEY_HEALTH_CHECK_VERSION
                    ).label
                  }
                </Text>
                <Text style={{
                  ...styles.getMostOfLife,
                  ...configureLineHeight("20")
                  }}>
                  {
                    metaHelpers.findElementWithScreen(
                      healthCheckStartPage,
                      KEY_SCREEN_DESCRIPTION
                    ).label
                  }
                </Text>
                <Text style={{
                  ...styles.detailText,
                  ...configureLineHeight("15")
                  }}>
                  {
                    metaHelpers.findElementWithScreen(
                      healthCheckStartPage,
                      KEY_SCREEN_SUBDESCRIPTION
                    ).label
                  }
                </Text>
              </View>
              <View style={styles.termsWrapper}>
                <CheckBox
                  style={styles.checkBox}
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked
                    });
                  }}
                  isChecked={this.state.isChecked}
                  rightTextView={this.checkboxText()}
                  rightTextStyle={styles.iAcceptText}
                  checkBoxColor={colors.nevada}
                />
              </View>
            </View>
            {/* <View> */}
            <AppButton
              disable={!this.state.isChecked}
              type={[styles.btn, styles.primary]}
              title={
                metaHelpers.findElementWithScreen(
                  healthCheckStartPage,
                  KEY_DISCOVER_BTN
                ).label
              }
              press={this.checkUserRegistration}
            />
            {/* <View style={styles.textLogo}>
            <Text style={styles.poweredByText}>
              {metaHelpers.findCommon(COMMON_KEY_BABYLON_POWERED_BY_TEXT).label}
            </Text>
            <OfflineImage
              accessibilityLabel="babylonLogo"
              resizeMode="contain"
              accesible
              key={COMMON_KEY_BABYLON_LOGO}
              style={styles.babylonImage}
              fallbackSource={BABYLON_LOGO_BLUE}
              source={{
                uri: metaHelpers.findCommon(COMMON_KEY_BABYLON_LOGO).image,
              }}
            />
          </View>
        </View> */}
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
  tncOnRegistration: state.register.tncOnRegistration
});

HealthCheck.propTypes = {
  refreshImage: PropTypes.bool,
  updateBabylonRegStatus: PropTypes.func,
  navigation: PropTypes.object
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
  gotoCommon
})(HealthCheck);

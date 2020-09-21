import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  BackHandler,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { OfflineImage } from "react-native-image-offline";
import CheckBox from "react-native-check-box";
import { ChatQuickstartStyle as styles } from "./styles";
import {configureLineHeight} from "../../utils/lineHeightsUtils";

import { pathOr } from "ramda";
import {
  CoreActionTypes,
  CoreConfig,
  CoreConstants,
  CoreServices,
  metaHelpers,
  CoreUtils,
  colors,
} from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;
import {
  CHAT_BG,
  CHATBOT_ICON_IMAGE,
  BABYLON_LOGO_BLUE,
  CLOSE,
  WARNING,
  CLOSE_PAGE,
  DOCTORONCALL,
} from "../../config/images";
import {
  gotoCommon,
  gotoMainPage,
  gotoPulsehealth,
  gotoNewCommon,
  gotoWithParams,
} from "../../actions";
const {
  BABYLON_SC_REG_STATUS,
  COMMON_KEY_CROSS_ICON,
  HEALTH_CHECK_TAB_TITLE,
  SCREEN_KEY_DIGITAL_TWIN,
  HEALTHDASHBOARD,
  HEALTHDASHBOARD_CHECKYOURSYMPTOM,
  HEALTHDASHBOARD_DESCRIPTION,
  HEALTHDENGUETC_WHENEVER,
  BABYLON_CHATQUICKSTART_MSG,
  APPEARS_YOU_ARE_RECEIVING,
  SERVICESFROMBABYLONHEALTH,
  BABYLON_TC_BELOW_MSG,
  BABYLON_TC_READ_AGREE,
  HEATHTC_BYCLICKINGONAGREEBELOW,
  HEATHTC,
  BabyLon_To,
  BabyLon_Use_The_Services_From,
  SCREEN_KEY_CHAT_ONBOARD_CONFIRM,
  BABYLON_CONTINUE,
  HEATHTC_BABYLONHEALTH,
} = CoreConstants;
const helpers = metaHelpers;
const {
  pageKeys,
  SCREEN_KEY_CHAT_QUICKSTART,
  COMMON_KEY_BABYLON_LOGO,
  COMMON_KEY_TERMS_BABYLON,
  SCREEN_KEY_TERMS_AND_CONDITIONS,
  SCREEN_KEY_PRIVACY_POLICY,
  COMMON_KEY_PRIVACY_BABYLON,
  NEW_PRIVACYNOTICE_BABYLON,
  NEW_PRIVACYNOTICE,
  TALKTOADOCTOR_AND,
  NEW_BABYLONPRIVACYPOLICY,
  TALKTOADOCTOR,
} = CoreConfig;

const KEY_LABEL_DESCRIPTION = "chatquickstartlabeldesc";
const KEY_CHATBOT_ICON = "chatquickstartchatboticon";
const KEY_GET_STARTED = "chatquickstartgetstarted";
const KEY_I_AGREE = "iagreetext";
const KEY_T_C = "termsandconditionstext";
const KEY_AND = "andtext";
const KEY_PP = "privacypolicytext";
const KEY_BABYLON = "babylontext";
const KEY_ACKNOWLEDGEMNT = "acknowledgementtext";
const KEY_WHENEVER = "whenevertext";
const KEY_OUR_SERVICES = "servicestext";
const KEY_FROM_BABYLINE = "frombabylontext";

class ChatQuickstart extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
    this.submit = this.submit.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }
  goBack = () => {
    const fromHealthAIScreen = pathOr(
      false,
      ["navigation", "state", "params", "fromHealthAIScreen"],
      this.props
    );
    if (fromHealthAIScreen) {
      NavigationService.goBack();
      return true;
    }
    this.props.gotHomePage();
    return true;
  };
  submit() {
    if (!this.state.isChecked) {
      return false;
    }
    this.props.updateBabylonRegStatus({
      babylonScStatus: BABYLON_SC_REG_STATUS.QUICK_START_DONE,
    });
    const tncData = {
      termsConditions: {
        Babylon: {
          consent: "ACCEPT",
          consentDate: CoreUtils.getTimeStamp(),
          version: helpers.findCommon("BABYLON_TnC_VERSION").value,
          org: "Babylon",
          privacy: "ACCEPT",
          privacyDate: CoreUtils.getTimeStamp(),
          privacyVersion: helpers.findCommon("BABYLON_PP_VERSION").value,
        },
      },
    };
    this.props.updateBabylonTnc(tncData);
  }

  renderInlineLogoText = () => {
    const whenevertext = helpers.findElement(
      SCREEN_KEY_CHAT_QUICKSTART,
      KEY_WHENEVER
    ).label;
    const ourservices = helpers.findElement(
      SCREEN_KEY_CHAT_QUICKSTART,
      KEY_OUR_SERVICES
    ).label;
    const fromBabylon = helpers.findElement(
      SCREEN_KEY_CHAT_QUICKSTART,
      KEY_FROM_BABYLINE
    ).label;

    return (
      <View>
        <View style={styles.textLogo}>
          <Text style={{
            ...styles.poweredByText,
            ...configureLineHeight("12")
          }}>{whenevertext}</Text>
          <OfflineImage
            accessibilityLabel="babylonLogo"
            resizeMode="contain"
            accesible
            key={COMMON_KEY_BABYLON_LOGO}
            style={styles.babylonImage}
            fallbackSource={BABYLON_LOGO_BLUE}
            source={{
              uri: helpers.findCommon(COMMON_KEY_BABYLON_LOGO).image,
            }}
          />
          <Text style={{
            ...styles.poweredByText,
            ...configureLineHeight("12")
          }}>{ourservices}</Text>
        </View>
        <Text style={[{
          ...styles.poweredByText,
          ...configureLineHeight("12")
        }, { marginTop: 0 }]}>
          {fromBabylon}
        </Text>
      </View>
    );
  };

  checkboxText() {
    const { navigation } = this.props;
    const iagreetext = helpers.findElement(
      SCREEN_KEY_CHAT_QUICKSTART,
      KEY_I_AGREE
    ).label;
    const termsandconditionstext = helpers.findElement(
      SCREEN_KEY_CHAT_QUICKSTART,
      KEY_T_C
    ).label;
    const andtext = helpers.findElement(SCREEN_KEY_CHAT_QUICKSTART, KEY_AND)
      .label;
    const privacypolicytext = helpers.findElement(
      SCREEN_KEY_CHAT_QUICKSTART,
      KEY_PP
    ).label;
    const babylontext = helpers.findElement(
      SCREEN_KEY_CHAT_QUICKSTART,
      KEY_BABYLON
    ).label;
    const acknowledgementtext = helpers.findElement(
      SCREEN_KEY_CHAT_QUICKSTART,
      KEY_ACKNOWLEDGEMNT
    ).label;

    const tncTitle = helpers.findScreen(SCREEN_KEY_TERMS_AND_CONDITIONS).label;
    const privacyTitle = helpers.findScreen(SCREEN_KEY_PRIVACY_POLICY).label;
    const termsBabylon = helpers.findCommon(COMMON_KEY_TERMS_BABYLON).label;
    const privacyBabylon = helpers.findCommon(COMMON_KEY_PRIVACY_BABYLON).label;

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
                page: "Babylon",
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
                page: "Babylon",
              })
            }
          >
            {" "}
            {privacypolicytext}{" "}
          </Text>
          <Text style={{ color: colors.nevada, ...configureLineHeight("14") }}>{babylontext} </Text>
          <Text style={{ color: colors.nevada, ...configureLineHeight("14") }}>{acknowledgementtext}</Text>
        </Text>
        {this.renderInlineLogoText()}
      </View>
    );
  }
  handleCloseButtonPress() {
    this.props.gotoMainPage();
  }

  _onClose() {
    const fromHealthAIScreen = pathOr(
      false,
      ["navigation", "state", "params", "fromHealthAIScreen"],
      this.props
    );
    if (fromHealthAIScreen) {
      NavigationService.goBack();
    } else this.props.gotoPulsehealth();
  }
  render() {
    const { userPreferences } = this.props;
    const { language } = userPreferences;
    const HealthCheck = metaHelpers.findElement(
      SCREEN_KEY_DIGITAL_TWIN,
      HEALTH_CHECK_TAB_TITLE
    ).label;
    const HealthCheckMsg = metaHelpers.findElement(
      SCREEN_KEY_DIGITAL_TWIN,
      BABYLON_CHATQUICKSTART_MSG
    ).label;
    const CheckYourSymptom = metaHelpers.findElement(
      HEALTHDASHBOARD,
      HEALTHDASHBOARD_CHECKYOURSYMPTOM
    ).label;
    const CheckYourSymptomMsg = metaHelpers.findElement(
      HEALTHDASHBOARD,
      HEALTHDASHBOARD_DESCRIPTION
    ).label;
    const termsBabylon = helpers.findCommon(COMMON_KEY_TERMS_BABYLON).label;
    const Whenever = metaHelpers.findElement(
      HEALTHDASHBOARD,
      HEALTHDENGUETC_WHENEVER
    ).label;
    const Appears = metaHelpers.findElement(
      HEALTHDASHBOARD,
      APPEARS_YOU_ARE_RECEIVING
    ).label;
    const Services = metaHelpers.findElement(
      HEALTHDASHBOARD,
      SERVICESFROMBABYLONHEALTH
    ).label;
    const BelowMsg = metaHelpers.findElement(
      HEALTHDASHBOARD,
      BABYLON_TC_BELOW_MSG
    ).label;
    const ReadAndAgree = metaHelpers.findElement(
      HEALTHDASHBOARD,
      BABYLON_TC_READ_AGREE
    ).label;
    const TermsAndCondition = metaHelpers.findElement(
      HEATHTC,
      HEATHTC_BYCLICKINGONAGREEBELOW
    ).label;
    const To = metaHelpers.findElement(HEATHTC, BabyLon_To).label;
    const UseServicesFrom = metaHelpers.findElement(
      HEATHTC,
      BabyLon_Use_The_Services_From
    ).label;
    const ContinueBtn = metaHelpers.findElement(
      SCREEN_KEY_CHAT_ONBOARD_CONFIRM,
      BABYLON_CONTINUE
    ).label;
    const BabylonHealth = metaHelpers.findElement(
      HEATHTC,
      HEATHTC_BABYLONHEALTH
    ).label;
    // const title = helpers.findCommon(COMMON_KEY_TERMS_BABYLON).header;
    const title = helpers.findScreen(SCREEN_KEY_TERMS_AND_CONDITIONS).label;
    const privacyBabylon = helpers.findCommon(COMMON_KEY_PRIVACY_BABYLON).label;
    const PNtitle = helpers.findElement(
      NEW_PRIVACYNOTICE,
      NEW_BABYLONPRIVACYPOLICY
    ).label;
    const PRIVACYNOTICE_BABYLON = helpers.findElement(
      NEW_PRIVACYNOTICE,
      NEW_PRIVACYNOTICE_BABYLON
    ).label;
    const { pageKey } = this.props.navigation.state.params;
    const heading =
      pageKey === "HEAHTH_ASSESSMENT" ? HealthCheck : CheckYourSymptom;
    // 'Check Your Symptom';
    const content =
      pageKey === "HEAHTH_ASSESSMENT"
        ? HealthCheckMsg
        : //'Conduct a health assessment and discover more about your body through your personal Digital Twin.'
        CheckYourSymptomMsg;
    //'Feeling a bit under the weather? Get personalized care recommendations through AI-powered symptom checker.'
    return (
      <ScrollView style={mainStyles.container}>
        <View style={mainStyles.mainContainer}>
          <View style={mainStyles.closeIconContainer}>
            <TouchableOpacity
              style={mainStyles.closebtnContainer}
              onPress={this._onClose.bind(this)}
            >
              <Image
                style={mainStyles.closeIcon}
                source={CLOSE_PAGE}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>

          <Image source={WARNING} style={{}}></Image>
          <View style={mainStyles.bodyContainer}>
            <Text style={{
              ...mainStyles.headingText,
              ...configureLineHeight("22")
              }}>{heading}</Text>
            <Text style={{
              ...mainStyles.subheadingText,
              ...configureLineHeight("16")
              }}>{content}</Text>
            <View style={mainStyles.subContainer}>
              <Text style={{
                ...mainStyles.whenevertext,
                ...configureLineHeight("14")
                }}>{Whenever}</Text>
              <Image
                source={BABYLON_LOGO_BLUE}
                resizeMode={"contain"}
                style={{marginLeft: 5}}
              ></Image>
              <Text style={{
                ...mainStyles.appearsText,
                ...configureLineHeight("14")
                }}>{" " + Appears}</Text>
            </View>
            <Text style={{
              ...mainStyles.servicesText,
              ...configureLineHeight("14")
              }}>{Services}</Text>
            <View style={mainStyles.tcContainer}>
              <View>
                <CheckBox
                  style={{
                    paddingBottom: 10,
                    marginRight: 10,
                  }}
                  onClick={() => {
                    this.setState({
                      isChecked: !this.state.isChecked,
                    });
                  }}
                  isChecked={this.state.isChecked}
                  // rightTextView={this.checkboxText()}
                  rightTextStyle={{
                    color: "red",
                  }}
                  checkBoxColor={{
                    color: "red",
                  }}
                />
              </View>
              <View style={{ margin: 5 }}>
                <Text
                  style={{
                    color: "#515B61",
                    fontFamily: "Avenir",
                    fontSize: 12,
                    fontWeight: "300",
                    textAlign: "center",
                    letterSpace: 3,
                    ...configureLineHeight("12")
                  }}
                >
                  <Text style={{
                    ...mainStyles.BelowMsgText,
                    ...configureLineHeight("12")
                    }}>{BelowMsg}</Text>
                  <Text
                    style={{
                      ...mainStyles.tcText,
                      ...configureLineHeight("12")
                    }}
                    onPress={() => {
                      this.props.loadTermsAndCondition(
                        "Babylon",
                        "TermAndConditions"
                      );
                    }}
                  >
                    {TermsAndCondition}
                  </Text>
                  <Text style={{
                    ...mainStyles.readAndAgreeText,
                    ...configureLineHeight("12")
                    }}>
                    {" "}
                    {ReadAndAgree}
                  </Text>
                  <Text
                    style={{
                      ...mainStyles.privacyPolicyText,
                      ...configureLineHeight("12")
                    }}
                    onPress={() => {
                      this.props.loadTermsAndCondition(
                        "Babylon",
                        "PrivacyPolicy"
                      );
                    }}
                  >
                    {" " + PNtitle}
                  </Text>
                  {language == "BM" && <Text> Babylon.</Text>}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              disabled={false}
              style={[
                mainStyles.continueBtn,
                { backgroundColor: this.state.isChecked ? "#ED1B2E" : "#CCC" },
              ]}
              onPress={() => {
                this.submit();
              }}
            >
              <Text style={{
                ...mainStyles.continueBtnText,
                ...configureLineHeight("16")
                }}>{ContinueBtn}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

ChatQuickstart.propTypes = {
  updateBabylonRegStatus: PropTypes.func,
  goToBabylonTnC: PropTypes.func,
  updateBabylonTnc: PropTypes.func,
};

const mapStateToProps = state => ({
  refreshImage: state.meta.refreshImage,
  tncOnRegistration: state.register.tncOnRegistration,
  userPreferences: state.userPreferences,
});

export default connect(mapStateToProps, {
  updateBabylonRegStatus: payload => ({
    type: CoreActionTypes.UPDATE_BABYLON_REGISTRATION_STATUS,
    payload,
  }),
  goToBabylonTnC: () => ({
    context: pageKeys.CHAT_QUICK_START,
    type: CoreActionTypes.GO_TO_BABYLON_TERMS_AND_CONDITIONS,
  }),
  updateBabylonTnc: tncData => ({
    context: pageKeys.CHAT_QUICK_START,
    type: CoreActionTypes.UPDATE_BABYLON_TNC,
    payload: {
      tncData,
    },
  }),
  gotHomePage: () => ({
    context: pageKeys.DOC_SERVICE_INTRO,
    type: CoreActionTypes.GO_TO_HEALTH_TAB,
  }),
  loadTermsAndCondition: (source, value) => ({
    context: "LOAD_TNC_AND_PRIVACY_POLICY",
    type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
    payload: {
      source: source,
      value: value,
    },
  }),
  gotoCommon,
  gotoMainPage,
  gotoPulsehealth,
  gotoNewCommon,
  gotoWithParams,
})(ChatQuickstart);

const mainStyles = StyleSheet.create({
  BelowMsgText: {
    color: "#515B61",
    fontFamily: "Avenir",
    fontSize: 12,
    fontWeight: "300",
    lineHeight: 16,
    paddingLeft: 5,
    paddingRight: 10,
    textAlign: "center",
  },
  continueBtn: {
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 22,
    flexShrink: 0,
    height: 44,
    justifyContent: "center",
    marginBottom: 32,
    marginTop: 24,
    width: 220,
  },
  continueBtnText: {
    color: "#FFFFFF",
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 22,
  },
  appearsText: {
    color: "#222529",
    fontFamily: "Avenir",
    fontSize: 14,
    fontWeight: "300",
    height: 20,
    lineHeight: 20,
    textAlign: "center",
  },
  bodyContainer: {
    paddingLeft: 40,
    paddingRight: 40,
  },
  closeIcon: { alignSelf: "center", flex: 1 },
  closeIconContainer: {
    flexDirection: "row",
    height: 44,
    justifyContent: "flex-end",
  },
  closebtnContainer: { padding: 15, width: 60 },
  container: {
    backgroundColor: "#fff",
    height: "100%",
    width: "100%",
  },
  headingText: {
    color: "#515B61",
    fontFamily: "Avenir",
    fontSize: 22,
    fontWeight: "900",
    height: "auto",
    lineHeight: 30,
    marginTop: 24,
    textAlign: "center",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
  },
  privacyPolicyText: {
    color: "#515B61",
    fontFamily: "Avenir",
    fontSize: 12,
    fontWeight: "300",
    marginLeft: 5,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  readAndAgreeText: {
    color: "#515B61",
    fontFamily: "Avenir",
    fontSize: 12,
    fontWeight: "300",
    lineHeight: 16,
    textAlign: "center",
  },
  servicesText: {
    color: "#222529",
    fontFamily: "Avenir",
    fontSize: 14,
    fontWeight: "300",
    height: 20,
    lineHeight: 20,
    marginBottom: 25,
    textAlign: "center",
  },
  subContainer: {
    flexDirection: "row",
    marginTop: 25,
    justifyContent: "center",
  },
  subheadingText: {
    color: "#222529",
    fontFamily: "Avenir",
    fontSize: 16,
    fontWeight: "700",
    height: "auto",
    lineHeight: 22,
    marginTop: 16,
    textAlign: "center",
  },
  tcContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  tcText: {
    color: "#515B61",
    fontFamily: "Avenir",
    fontSize: 12,
    fontWeight: "300",
    marginRight: 5,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  whenevertext: {
    color: "#222529",
    fontFamily: "Avenir",
    fontSize: 14,
    fontWeight: "300",
    height: 20,
    lineHeight: 20,
    textAlign: "center",
  },
});

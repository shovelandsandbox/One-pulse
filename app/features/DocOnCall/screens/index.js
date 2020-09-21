import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from "react-native";
import {
  CoreConfig,
  CoreActionTypes,
  CoreComponents,
  metaHelpers,
  CoreConstants,
  CoreActions,
  CoreUtils,
  colors,
} from "@pru-rt-internal/pulse-common";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { OfflineImage } from "react-native-image-offline";
import CheckBox from "react-native-check-box";
import styles from "./styles";
import { DOCTOR, CLOSE, DOC_INLINE_LOGO } from "../../../config/images";
const { AppButton } = CoreComponents;
const {
  COMMON_KEY_TERMS_MY_DOC,
  SCREEN_KEY_TERMS_AND_CONDITIONS,
  SCREEN_KEY_PRIVACY_POLICY,
  COMMON_KEY_PRIVACY_MY_DOC,
  SCREEN_KEY_DOC_ON_CALL_WELCOME,
  COMMON_KEY_T_AND_C_TITLE,
  COMMON_KEY_PRIVACY_POLICY_TITLE,
  COMMON_KEY_DOC_ON_CALL_LOGO,
} = CoreConstants;
const { DOC_SERVICE_CLEAN_STATE } = CoreActionTypes;

const { updateCustomerTnc } = CoreActions;
const { pageKeys } = CoreConfig;
const I_AGREE = "agree";
const AND = "and";
const DOCTOR_ON_CALL_T_C = "doctoroncalltc";
const DOC_ON_CALL = "docservice";
const WHENEVER = "Whenever";
const SERVICES = "services";
const KEY_PROCEED = "docWelcomePageProceedBtn";
const KEY_DESCRIPTION = "docWelcomePageDescription";
const KEY_DOCTOR_ICON = "docWelcomePageDoctorIcon";
const KEY_TITLE1 = "docWelcomePageTitle1";
const KEY_TITLE2 = "docWelcomePageTitle2";

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    };
    this.whenever = "";
    this.docService = "";
    this.services = "";
    this.onProceed = this.onProceed.bind(this);
  }

  onProceed() {
    const tncData = {
      termsConditions: {
        DOC: {
          consent: "ACCEPT",
          consentDate: CoreUtils.getTimeStamp(),
          version: metaHelpers.findCommon("DOCONCALL_TnC_VERSION").value,
          org: "DOC",
          privacy: "ACCEPT",
          privacyDate: CoreUtils.getTimeStamp(),
          privacyVersion: metaHelpers.findCommon("DOCONCALL_PP_VERSION").value,
        },
      },
    };
    this.props.handleDocTnCAcceptance(tncData);
    // updateCustomerTnc(tncData, this.props.token, () => {
    //   handleDocTnCAcceptance(DOC_SERVICE_INTRO, DOC_SERVICE_TNC_ACCEPTED);
    // });
  }

  goBack = () => {
    // this.props.dispatch({
    //   context: DOC_SERVICE_INTRO,
    //   type: GO_BACK_TO_PREVIOUS_SCREEN,
    // });
    const { navigation } = this.props;
    navigation.navigate("PulseHealth");
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }
  renderInlineLogoText = () => {
    return (
      <View>
        <View style={styles.textLogo}>
          <Text style={styles.poweredByText}>{this.whenever} </Text>
          <OfflineImage
            accessibilityLabel="DocOnCallLogo"
            resizeMode="contain"
            accesible
            key="DocOnCallinlineLogo"
            style={styles.docOnCallImage}
            fallbackSource={DOC_INLINE_LOGO}
            source={DOC_INLINE_LOGO}
          />
          <Text style={styles.poweredByText}>{this.services}</Text>
        </View>
        <Text style={[styles.poweredByText, { marginTop: 0 }]}>
          {this.docService}
        </Text>
      </View>
    );
  };

  checkboxText() {
    const { meta, navigation } = this.props;
    const title = metaHelpers.findScreen(SCREEN_KEY_TERMS_AND_CONDITIONS).label;
    const docWelcomeScreen = metaHelpers.findScreen(
      SCREEN_KEY_DOC_ON_CALL_WELCOME
    );
    const terms_and_conditions_title = metaHelpers.findCommon(
      COMMON_KEY_T_AND_C_TITLE
    ).label;
    const privacy_policy_title = metaHelpers.findCommon(
      COMMON_KEY_PRIVACY_POLICY_TITLE
    ).label;
    const agreeLabel = metaHelpers.findElementWithScreen(
      docWelcomeScreen,
      I_AGREE
    ).label;

    const andLabel = metaHelpers.findElementWithScreen(docWelcomeScreen, AND)
      .label;

    const docTcLabel = metaHelpers.findElementWithScreen(
      docWelcomeScreen,
      DOCTOR_ON_CALL_T_C
    ).label;

    this.whenever = metaHelpers.findElementWithScreen(
      docWelcomeScreen,
      WHENEVER
    ).label;

    this.services = metaHelpers.findElementWithScreen(
      docWelcomeScreen,
      SERVICES
    ).label;

    this.docService = metaHelpers.findElementWithScreen(
      docWelcomeScreen,
      DOC_ON_CALL
    ).label;

    const termsDoconCall = metaHelpers.findCommon(COMMON_KEY_TERMS_MY_DOC)
      .label;
    const privacyTitle = metaHelpers.findScreen(SCREEN_KEY_PRIVACY_POLICY)
      .label;
    const privacyDoconCall = metaHelpers.findCommon(COMMON_KEY_PRIVACY_MY_DOC)
      .label;
    return (
      <View style={[styles.flexRow, { flexWrap: "wrap" }]}>
        <Text>
          <Text style={{ color: colors.nevada }}>{agreeLabel}</Text>
          {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate("Common", {
              content: termsPrutopia,
              screenTitle: title,
            })
          }
        > */}
          <Text
            style={{ color: colors.crimson }}
            onPress={() =>
              navigation.navigate("Common", {
                content: termsDoconCall,
                screenTitle: title,
                page: "DocCall",
              })
            }
          >
            {terms_and_conditions_title}
          </Text>
          {/* </TouchableOpacity> */}
          <Text style={{ color: colors.nevada }}>{andLabel}</Text>
          {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate("Common", {
              content: termsPrutopia,
              screenTitle: privacyTitle,
            })
          }
        > */}
          <Text
            style={{ color: colors.crimson }}
            onPress={() =>
              navigation.navigate("Common", {
                content: privacyDoconCall,
                screenTitle: privacyTitle,
                page: "DocCall",
              })
            }
          >
            {privacy_policy_title}
          </Text>
          {/* </TouchableOpacity> */}
          <Text style={{ color: colors.nevada }}>{docTcLabel}</Text>
        </Text>
        {this.renderInlineLogoText()}
      </View>
    );
  }
  render() {
    const docWelcomeScreen = metaHelpers.findScreen(
      SCREEN_KEY_DOC_ON_CALL_WELCOME
    );
    const proceed = metaHelpers.findElementWithScreen(
      docWelcomeScreen,
      KEY_PROCEED
    ).label;
    const doctorIcon = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_WELCOME,
      KEY_DOCTOR_ICON
    ).image;
    const title1 = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_WELCOME,
      KEY_TITLE1
    ).label;
    const title2 = metaHelpers.findElement(
      SCREEN_KEY_DOC_ON_CALL_WELCOME,
      KEY_TITLE2
    ).label;
    const description = metaHelpers.findElementWithScreen(
      docWelcomeScreen,
      KEY_DESCRIPTION
    ).label;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.closeIcon}>
            <TouchableOpacity style={styles.closeIcon} onPress={this.goBack}>
              <OfflineImage
                accessibilityLabel="back"
                accesible
                key="backIcon"
                style={[styles.closeIcon]}
                fallbackSource={CLOSE}
                source={CLOSE}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerIconContainer}>
            <OfflineImage
              accessibilityLabel="docOnCallLogo"
              resizeMode="contain"
              accesible
              key={COMMON_KEY_DOC_ON_CALL_LOGO}
              style={styles.doclogo}
              fallbackSource={DOC_INLINE_LOGO}
              source={{
                uri: metaHelpers.findCommon(COMMON_KEY_DOC_ON_CALL_LOGO).image,
              }}
            />
          </View>
        </View>

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.doctorImgaeWrapper}>
            <OfflineImage
              accessibilityLabel="doctorIcon"
              accesible
              style={styles.doctorImage}
              key={KEY_DOCTOR_ICON}
              resizeMode={"contain"}
              fallbackSource={DOCTOR}
              source={{
                uri: doctorIcon,
              }}
            />
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.title}>{title1}</Text>
            <Text style={styles.title}>{title2}</Text>
            <Text style={styles.subTitle}>{description}</Text>
          </View>
          <View style={styles.termsWrapper}>
            <CheckBox
              style={styles.checkBox}
              onClick={() => {
                this.setState({
                  isChecked: !this.state.isChecked,
                });
              }}
              isChecked={this.state.isChecked}
              rightTextView={this.checkboxText()}
              rightTextStyle={styles.iAcceptText}
              checkBoxColor={colors.nevada}
            />
          </View>
          <View style={styles.proceedBt}>
            <AppButton
              title={proceed}
              disable={!this.state.isChecked}
              press={this.onProceed}
              type={[styles.btn, styles.primary]}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

Introduction.propTypes = {
  meta: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({
  meta: state.meta,
  token: state.auth.token,
});

export default connect(
  mapStateToProps,
  {
    updateCustomerTnc,
    handleDocTnCAcceptance: tncData => ({
      context: pageKeys.DOC_SERVICE_INTRO,
      type: CoreActionTypes.DOC_SERVICE_TNC_ACCEPTED,
      payload: {
        tncData,
      },
    }),
  }
)(Introduction);

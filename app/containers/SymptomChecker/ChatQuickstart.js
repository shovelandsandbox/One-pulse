import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { OfflineImage } from "react-native-image-offline";
import CheckBox from "react-native-check-box";
import { ChatQuickstartStyle as styles } from "./styles";
import {
  CoreActionTypes,
  CoreConfig,
  CoreConstants,
  metaHelpers,
  CoreUtils,
  colors
} from "@pru-rt-internal/pulse-common";
import { gotoMainPage, gotoCommon } from "../../actions";
import {
  CHAT_BG,
  CHATBOT_ICON_IMAGE,
  BABYLON_LOGO_BLUE,
  CLOSE
} from "../../config/images";
const { BABYLON_SC_REG_STATUS, COMMON_KEY_CROSS_ICON } = CoreConstants;
const helpers = metaHelpers;
const {
  pageKeys,
  SCREEN_KEY_CHAT_QUICKSTART,
  COMMON_KEY_BABYLON_LOGO,
  COMMON_KEY_TERMS_BABYLON,
  SCREEN_KEY_TERMS_AND_CONDITIONS,
  SCREEN_KEY_PRIVACY_POLICY,
  COMMON_KEY_PRIVACY_BABYLON
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
      isChecked: false
    };
    this.submit = this.submit.bind(this);
  }

  submit() {
    this.props.updateBabylonRegStatus({
      babylonScStatus: BABYLON_SC_REG_STATUS.QUICK_START_DONE
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
          privacyVersion: helpers.findCommon("BABYLON_PP_VERSION").value
        }
      }
    };
    this.props.updateBabylonTnc(tncData);
    //this.props.goToBabylonTnC();
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
          <Text style={styles.poweredByText}>{whenevertext}</Text>
          <OfflineImage
            accessibilityLabel="babylonLogo"
            resizeMode="contain"
            accesible
            key={COMMON_KEY_BABYLON_LOGO}
            style={styles.babylonImage}
            fallbackSource={BABYLON_LOGO_BLUE}
            source={{
              uri: helpers.findCommon(COMMON_KEY_BABYLON_LOGO).image
            }}
          />
          <Text style={styles.poweredByText}>{ourservices}</Text>
        </View>
        <Text style={[styles.poweredByText, { marginTop: 0 }]}>
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
          <Text style={{ color: colors.nevada }}>{iagreetext}</Text>
          {/* <TouchableOpacity
          onPress={() =>
            navigation.navigate("Common", {
              content: termsBabylon,
              screenTitle: tncTitle,
            })
          }
        > */}
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
          {/* </TouchableOpacity> */}
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
          {/* </TouchableOpacity> */}
          <Text style={{ color: colors.nevada }}>{babylontext} </Text>
          <Text style={{ color: colors.nevada }}>{acknowledgementtext}</Text>
        </Text>
        {this.renderInlineLogoText()}
      </View>
    );
  }
  handleCloseButtonPress() {
    this.props.gotoMainPage();
  }

  render() {
    const { meta } = this.props;
    const quickStartScreen = helpers.findScreen(SCREEN_KEY_CHAT_QUICKSTART);
    return (
      <View style={styles.container}>
        <OfflineImage
          key={quickStartScreen.key}
          resizeMode="cover"
          style={[styles.chatBackground]}
          fallbackSource={CHAT_BG}
          source={{ uri: quickStartScreen.image }}
        />
        <View style={styles.flexRow}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => this.handleCloseButtonPress()}
          >
            <OfflineImage
              accessibilityLabel="close"
              accesible
              key={COMMON_KEY_CROSS_ICON}
              style={[styles.close]}
              fallbackSource={CLOSE}
              source={{
                uri: helpers.findCommon(COMMON_KEY_CROSS_ICON).image
              }}
            />
          </TouchableOpacity>
          <OfflineImage
            accessibilityLabel="babylonLogo"
            resizeMode="contain"
            accesible
            key={COMMON_KEY_BABYLON_LOGO}
            style={styles.babylonHeader}
            fallbackSource={BABYLON_LOGO_BLUE}
            source={{
              uri: helpers.findCommon(COMMON_KEY_BABYLON_LOGO).image
            }}
          />
        </View>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.chatbotContainer}>
            <OfflineImage
              accessibilityLabel="chatbot"
              accesible
              key={KEY_CHATBOT_ICON}
              style={styles.chatbotIcon}
              fallbackSource={CHATBOT_ICON_IMAGE}
              source={{
                uri: helpers.findElementWithScreen(
                  quickStartScreen,
                  KEY_CHATBOT_ICON
                ).image
              }}
            />
            <Text style={styles.headStyle}>{quickStartScreen.label}</Text>
            <Text style={[styles.iAcceptText, styles.description]}>
              {
                helpers.findElementWithScreen(
                  quickStartScreen,
                  KEY_LABEL_DESCRIPTION
                ).label
              }
            </Text>
          </View>
          <View style={styles.navViewContainer}>
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
            <TouchableOpacity
              disabled={!this.state.isChecked}
              style={
                !this.state.isChecked
                  ? [styles.getStart, { opacity: 0.5 }]
                  : [styles.getStart]
              }
              onPress={this.submit}
            >
              <Text style={styles.getStartedTextStyle}>
                {
                  helpers.findElementWithScreen(
                    quickStartScreen,
                    KEY_GET_STARTED
                  ).label
                }
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

ChatQuickstart.propTypes = {
  updateBabylonRegStatus: PropTypes.func,
  goToBabylonTnC: PropTypes.func,
  updateBabylonTnc: PropTypes.func
};

const mapStateToProps = state => ({
  refreshImage: state.meta.refreshImage,
  tncOnRegistration: state.register.tncOnRegistration
});

export default connect(mapStateToProps, {
  updateBabylonRegStatus: payload => ({
    type: CoreActionTypes.UPDATE_BABYLON_REGISTRATION_STATUS,
    payload
  }),
  goToBabylonTnC: () => ({
    context: pageKeys.CHAT_QUICK_START,
    type: CoreActionTypes.GO_TO_BABYLON_TERMS_AND_CONDITIONS
  }),
  updateBabylonTnc: tncData => ({
    context: pageKeys.CHAT_QUICK_START,
    type: CoreActionTypes.UPDATE_BABYLON_TNC,
    payload: {
      tncData
    }
  }),
  gotoMainPage,
  gotoCommon
})(ChatQuickstart);

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import HTML from "react-native-render-html";
import CheckBox from "react-native-check-box";
import styles from "./styles";
import {
  CoreConfig,
  CoreActionTypes,
  CoreComponents,
  metaHelpers,
  CoreUtils,
  CoreActions,
  events
} from "@pru-rt-internal/pulse-common";
import {
  AIME_BACKGROUND,
  AIME_REG_MOSQUITO,
  AIME_LOGO,
} from "../../../../config/images";
import { dispatchEvent } from "../../../../actions";
const { updateCustomerTnc } = CoreActions;
const { AIME_TERMS_CONDITIONS, COMMON_KEY_TERMS_AIME } = CoreConfig;
const { pageKeys } = CoreConfig;

const { AppButton, AppStatusBar } = CoreComponents;
const helpers = metaHelpers;
import { Header } from "./Header";

const { AIME_SERVICE_REGISTERED } = CoreActionTypes;

const I_AGREE = "agree";
const TERMS_CONDITIONS = "termsconditions";
const AIME = "aime";
const AIME_NOTIFICATION = "aimenotification";
const PROCEED = "proceed";
const STAY_ALERT = "stayalert";
const WHENEVER = "whenever";
const AIME_SERVICE_DESC = "aimeServiceDesc";

const fontFamily = Platform.OS === "ios" ? "PruSansNormal" : "pru-regular";
const boldFont = Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold";
const containerStyle = {
  margin: 15,
};
const baseFontStyle = {
  fontFamily,
};

class AIMERegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disable: true,
      isChecked: false,
      isModalVisible: false,
    };
    this.agreeLabel = "";
    this.termsAndConditionLabel = "";
    this.aimeLabel = "";
    this.aimeNotificationLabel = "";
    this.proceedLable = "";
  }
  componentDidMount() {
    this.props.dispatchEvent(events.AimeTandC);
  }
  onProceed = () => {
    const { navigation, updateCustomerTnc } = this.props;

    const tncData = {
      termsConditions: {
        AIME: {
          consent: "ACCEPT",
          consentDate: CoreUtils.getTimeStamp(),
          version: helpers.findCommon("AIME_TnC_VERSION").value,
          org: "AIME",
          privacy: "REJECT",
          privacyDate: CoreUtils.getTimeStamp(),
          privacyVersion: "",
        },
      },
    };
    this.props.dispatchEvent(events.OnProceedClickAimeTandC)
    this.props.updateAIMETnC(tncData);
    this.props.navigation.goBack(null);
  };

  onPressTC = () => {
    this.props.loadTermsCondition();
    // this.setState({ isModalVisible: true });
  };
  closeModal = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  getTnCHtml(termsKey) {
    return (
      <HTML
        style={{
          fontSize: 24,
          textAlign: "left",
          color: "#68737a",
          marginBottom: 5,
          lineHeight: 28,
          fontFamily: Platform.OS === "ios" ? "PruSansNormal" : "pru-regular",
          marginLeft: 16,
          marginRight: 16,
        }}
        containerStyle={containerStyle}
        baseFontStyle={baseFontStyle}
        html={helpers.findCommon(termsKey).label}
      />
    );
  }

  checkboxText = () => {
    return (
      <View style={styles.flexRow}>
        <Text style={{ fontFamily: fontFamily, lineHeight: 15 }}>
          {this.agreeLabel}
        </Text>
        <TouchableOpacity onPress={this.onPressTC}>
          <Text
            style={{ color: "#eb002a", fontFamily: fontFamily, lineHeight: 15 }}
          >
            {" "}
            {this.termsAndConditionLabel}{" "}
          </Text>
        </TouchableOpacity>
        <Text style={{ fontFamily: fontFamily, lineHeight: 15 }}>
          {this.aimeLabel}
        </Text>
      </View>
    );
  };

  registrationPage = () => {
    const stayalert = helpers.findElement(AIME_TERMS_CONDITIONS, STAY_ALERT)
      .label;
    const wheneverLbl = helpers.findElement(AIME_TERMS_CONDITIONS, WHENEVER)
      .label;
    const aimeServiceDesc = helpers.findElement(
      AIME_TERMS_CONDITIONS,
      AIME_SERVICE_DESC
    ).label;

    return (
      <ImageBackground
        source={AIME_BACKGROUND}
        style={{ width: "100%", height: "100%" }}
      >
        <Header
          leftIconType="back"
          onLeftPress={e => {
            e.preventDefault();
            this.props.dispatchEvent(events.BackArrowAimeTandC);
            this.props.navigation.pop(2);
          }}
          showRightIcon={false}
        />
        <Image style={{ width: 250, height: 200 }} source={AIME_REG_MOSQUITO} />

        <View style={{ marginTop: 10, padding: 30, flex: 1 }}>
          <Text
            style={{
              color: "#eb002a",
              letterSpacing: 0.11,
              textAlign: "left",
              fontSize: 21.7,
              paddingBottom: 20,
              fontFamily: boldFont,
            }}
          >
            {stayalert}
          </Text>
          <Text
            style={{
              color: "#707070",
              lineHeight: 18.3,
              letterSpacing: 0.08,
              fontFamily: fontFamily,
              fontSize: 15,
            }}
          >
            {this.aimeNotificationLabel}
          </Text>
        </View>

        <View style={styles.termsWrapper}>
          <CheckBox
            style={styles.checkBox}
            onClick={() => {
              this.props.dispatchEvent(events.CheckBoxClickAimeTandC);
              this.setState({
                isChecked: !this.state.isChecked,
                disable: !this.state.disable,
              });
            }}
            isChecked={this.state.isChecked}
            rightTextView={this.checkboxText()}
          />
          <Text>
            <Text style={styles.description}>{wheneverLbl}</Text>
            <Image style={styles.aimeLogo} source={AIME_LOGO} />
            <Text style={styles.description}>{aimeServiceDesc}</Text>
          </Text>
          <AppButton
            title={this.proceedLable}
            press={this.onProceed}
            type={[styles.btn, styles.primary]}
            disable={this.state.disable}
          />
        </View>
      </ImageBackground>
    );
  };

  termConditionsPage = terms => {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={this.closeModal}
      >
        <AppStatusBar />
        <Header
          leftIconType="close"
          onLeftPress={e => {
            this.closeModal();
          }}
          showRightIcon={false}
        />
        <ScrollView>{terms}</ScrollView>
      </Modal>
    );
  };

  render() {
    this.agreeLabel = helpers.findElement(AIME_TERMS_CONDITIONS, I_AGREE).label;
    this.termsAndConditionLabel = helpers.findElement(
      AIME_TERMS_CONDITIONS,
      TERMS_CONDITIONS
    ).label;

    this.aimeLabel = helpers.findElement(AIME_TERMS_CONDITIONS, AIME).label;
    this.aimeNotificationLabel = helpers.findElement(
      AIME_TERMS_CONDITIONS,
      AIME_NOTIFICATION
    ).label;
    this.proceedLable = helpers.findElement(
      AIME_TERMS_CONDITIONS,
      PROCEED
    ).label;
    const terms = this.getTnCHtml(COMMON_KEY_TERMS_AIME);
    return (
      <View style={styles.container}>
        {this.state.isModalVisible === true
          ? this.termConditionsPage(terms)
          : this.registrationPage()}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  meta: state.meta,
  token: state.auth.token,
});

export default connect(mapStateToProps, {
  updateCustomerTnc,
  dispatchEvent,
  updateAIMETnC: tncData => ({
    context: pageKeys.AIME_REGISTER,
    type: CoreActionTypes.UPDATE_AIME_TNC,
    payload: {
      tncData,
    },
  }),
  loadTermsCondition: () => ({
    context: "LOAD_TNC_AND_PRIVACY_POLICY",
    type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
    payload: {
      source: "Aime",
      value: "TermAndConditions",
    },
  }),
})(AIMERegister);

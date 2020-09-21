import React, { Component } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  CoreActionTypes,
  CoreConfig,
  CoreActions,
  CoreServices,
  metaHelpers,
  CoreSelectors
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
import { path } from "ramda";
import { Icon_More_Horizontal } from "../../config/images";
import {
  gotoBabylonConsultationHistory,
  gotoBabylonChatScreen,
  gotoBabylonFullAssessment,
  gotoBabyonChatQuickStart,
  gotoBabyonChatScreen1,
  gotoBabyonChatScreen2,
  goto
} from "../../actions";
import { makeTouchable } from "../../hocs";
import { CustomAlert } from "../../components";
const TouchableImageBackground = makeTouchable(ImageBackground);
const { getFirebaseMsgToken } = CoreServices;
const { pageKeys, ElementErrorManager } = CoreConfig;
const { width: babylonWidth } = Dimensions.get("window");
const KEY_OK = "ok";
const {
  SCREEN_KEY_HEALTH_CHECK_GET_STARTED,
  BABYLON_RESTRICTION_MESSAGE
} = CoreConfig;
const { setEntreBabylon } = CoreActions;

class PulseHealthCard extends Component {
  // eslint-disable-next-line complexity
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
    if (props.addCustomBackHandler) {
      props.addCustomBackHandler(this.goBack);
    }
  }

  goBack() {
    this.props.goBack(null);
  }

  _navigation(key) {
    const { babylonToken, userProfile, babylonScStatus, pageKey } = this.props;
    const babylonTncConsent = path(
      ["termsConditions", "Babylon", "consent"],
      userProfile
    );
    const { healthFlowsData } = this.props;
    const babylonUserLoggedIn = path(
      ["babylonAuth", "babylonUserLoggedIn"],
      this.props
    );
    const babylonRegistrationFailed = path(
      ["babylonAuth", "babylonRegistrationFailed"],
      this.props
    );
    this.props.setEntreBabylon({
      pageKey
    });
    if (key === "Talk_To_Doctor") {
      this.props.pressConsultDoctor();
      getFirebaseMsgToken().then(fcmToken => {
        this.props.sendFireBaseToken(fcmToken);
      });
    } else if(key === "TeleConsultation_Summary") {
      this.props.goto(pageKeys.MYDOC_CONSULTATION_HISTORY_HOME);
    } else if (key === "Consultation_Summary") {
      this.props.gotoBabylonConsultationHistory();
    } else if (
      (!babylonUserLoggedIn && babylonToken) ||
      (!babylonToken && babylonRegistrationFailed)
    ) {
      CustomAlert.show(
        "",
        metaHelpers.findCommonErrorMessages(BABYLON_RESTRICTION_MESSAGE).message,
        {
          positiveText: metaHelpers.findElement(SCREEN_KEY_HEALTH_CHECK_GET_STARTED, KEY_OK).label,
          onPositivePress: () => {
            this.goBack()
          },
        },
      );
    } else if (babylonToken && babylonUserLoggedIn) {
      if (key === "KEY_SERVICE_CHECK_SYMPTOMS") {
        this.props.gotoBabylonChatScreen();
      } else if (key === "HEAHTH_ASSESSMENT") {
        if (
          healthFlowsData.initialFlows &&
          healthFlowsData.initialFlows.length &&
          healthFlowsData.initialFlows[0].conversationId === "-1"
        ) {
          this.props.gotoBabylonFullAssessment({
            fromHealthCheckHome: false
          });
        } else {
          this.props.gotoBabyonChatScreen2();
        }
      }
    } else {
      if (!babylonScStatus && babylonTncConsent !== "ACCEPT") {
        this.props.gotoBabyonChatQuickStart({
          pageKey: key
        });
      } else {
        this.props.gotoBabyonChatScreen1({
          pageKey: key
        });
      }
    }
  }
  render() {
    const {
      cardSize,
      backgoroundImage,
      title,
      info,
      marginDirection,
      source,
      pageKey,
      navigation,
      event
    } = this.props;
    const cardidth =
      cardSize === "big" ? babylonWidth - 40 : (babylonWidth - 40) / 2 - 7.5;
    const cardHeight =
      cardSize === "big" ? cardidth * (132 / 335) : cardidth * (132 / 160);
    return (
      <TouchableImageBackground
        source={source} //
        style={{
          height: cardHeight,
          width: marginDirection === "horizontal" ? cardidth-22 : cardidth,
          // width: cardSize == "big" ? 335 : 160,
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 15,
          marginRight: marginDirection === "right" ? 15 : 0,
          marginHorizontal: marginDirection === "horizontal" ? 10 : 0,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: this.props.backgroundColor
            ? this.props.backgroundColor
            : ""
        }}
        event={event}
        onPress={() => {
          const { onPress } = this.props;
          if (pageKey) {
            this._navigation(pageKey);
            return;
          }
          onPress && onPress();
        }}
      >
        <View>
          <Text
            style={{
              height: cardSize == "big" ? 25 : 80,
              width: cardSize == "big" ? "100%" : 115,
              color: "#FFFFFF",
              fontFamily: "Avenir",
              fontSize: 18,
              fontWeight: "900",
              lineHeight: 25,
              marginTop: 12,
              marginLeft: 12
            }}
          >
            {title}
          </Text>
          {info && (
            <Text
              style={{
                // height: 60,
                width: 214,
                color: "#FFFFFF",
                fontFamily: "Avenir",
                fontSize: 14,
                fontWeight: "500",
                // lineHeight: 20,
                marginTop: 8,
                marginLeft: 12
              }}
            >
              {info}
            </Text>
          )}
        </View>
        {/* <Image
          style={{ marginRight: 18, marginTop: 22 }}
          source={Icon_More_Horizontal}
        /> */}
      </TouchableImageBackground>
    );
  }
}
PulseHealthCard.PropTypes = {
  cardSize: PropTypes.string,
  backgoroundImage: PropTypes.string,
  title: PropTypes.string,
  info: PropTypes.string,
  marginDirection: PropTypes.string,
  onPress: PropTypes.func
};
PulseHealthCard.defaultProps = {
  cardSize: "big",
  backgoroundImage: "",
  title: "",
  marginDirection: "right"
};

const mapStateToProps = state => {
  return {
    meta: state.meta,
    language: state.userPreferences.language,
    sessionId: state.auth.token,
    userProfile: state.profile,
    isNewUser: state.auth.isNewUser,
    bmiLoading: state.bmi.loading,

    babylonAuth: state.babylonAuth,
    babylonToken: AuthSelector.getBabylonToken(state),
    babylonStatus: state.auth.babylonStatus,
    healthFlowsData: state.healthCheck.healthFlows,
    bmiResponse: state.bmi.successData,
    fitnessTracker: state.fitnessTracker,
    babylonScStatus: state.register.babylonScStatus,
    babylonHaStatus: state.register.babylonHaStatus,
    babylonUserLoggedIn: state.babylonAuth.babylonUserLoggedIn,
    regStatus: state.regAIME.registrationStatus,
    currentTour: state.tour.currentTour,
    BMIResponse: state.bmi.BMIResponse,
    BMIErrorMessage: state.bmi.errorMess.errorMsg,
    successFeedbackData: state.bmi.successFeedbackData,
    isBMIFeedbackCall: state.bmi.isFeedbackCall,
    isNotificationProcessed: state.userPreferences.notificationProcessed
  };
};

export default connect(mapStateToProps, {
  goBack: () => ({
    type: CoreActionTypes.GO_BACK_TO_PREVIOUS_SCREEN
  }),
  pressCheckSymptoms: () => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.GO_TO_SYMPTOM_CHECKER
  }),
  pressConsultDoctor: () => ({
    context: pageKeys.GET_TREATMENT,
    type: CoreActionTypes.GO_TO_DOC_SERVICE
  }),
  setEntreBabylon,

  presshealthassessment: () => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.GO_TO_ASSESS_HEALTH
  }),
  sendFireBaseToken: fcmToken => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.UPDATE_CUSTOMER_DEVICE_1,
    payload: {
      fcmToken
    }
  }),
  gotoBabylonConsultationHistory,
  gotoBabylonChatScreen,
  gotoBabylonFullAssessment,
  gotoBabyonChatQuickStart,
  gotoBabyonChatScreen1,
  gotoBabyonChatScreen2,
  goto
})(PulseHealthCard);

/* eslint-disable */
import React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Carousel from "react-native-carousel-view";
import ImagePicker from "react-native-image-crop-picker";
import OpenSettings from "react-native-open-settings";
import { path, isEmpty } from "ramda";
import styles from "./style";
import BMI from "../BMI/BMI";
import Toast from "react-native-root-toast";
import {
  gotoProfile,
  gotoAboutUs,
  gotoManageProfile,
  gotoChangePassword,
  gotoNotificationRequest,
  goto
} from "../../actions";
import {
  CoreActionTypes,
  CoreConstants,
  colors,
  CoreConfig,
  CoreComponents,
  CoreUtils,
  CoreActions,
  CoreSelectors
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
const {
  SCREEN_KEY_LANDING_PAGE,
  prudentialUserStatus,
  EN_REVIEW_SERVICES,
  BM_REVIEW_SERVICES,
  SCREEN_KEY_BMI
} = CoreConstants;
import { EN_BANNER, BM_BANNER } from "../../config/constants";

const { pageKeys, ElementErrorManager } = CoreConfig;
const { TrackActivity } = CoreComponents;
const { TOUR_STEPS } = CoreActions;

import {
  SERVICE_VISIT,
  SERVICE_PRAY,
  SERVICE_WELLNESS,
  SERVICE_DOCTOR,
  SYMPTOMES_GREY_DARK,
  RECORD_GREY_DARK,
  SLIDER_LOGO_WHITE,
  LEFT_ARROW_RED,
  RED_RECTANGLE,
  DOC_ON_CALL_ICON,
  DENGUE_ICON,
  SHADOW_LONG,
} from "../../config/images";

const { metaHelpers, isNilOrEmpty } = CoreUtils;
import { OfflineImage } from "react-native-image-offline";
const {
  KEY_CAMERA_PERMISSION,
  SCREEN_KEY_MANAGE_PROFILE,
  SCREEN_KEY_CHAT_REPORT
} = CoreConfig;
import TourPage from "../TourPage";
import WithHighlight from "../TourPage/WithHighlight";
import { CustomAlert } from "../../components";

const KEY_HOW_CAN_I_HELP = "landingpagehowcanihelplabel";
const TYPE_DROP_DOWN_ITEM = "dropdownitem";
const TYPE_SERVICE = "serviceListml_V1.0";
const KEY_BMI_TITLE = "uploadyourselfie";
const KEY_BMI_DESC = "bmidescription";
const KEY_SERVICE_PRAYER = "servicePrayer";
const KEY_SERVICE_AIME = "serviceAime";
const KEY_SERVICE_DOCTOR = "serviceDoctor";
const KEY_SERVICE_HOSPITAL = "serviceHospital";
const KEY_SERVICE_ACCESS_HEALTH = "accesshealth";
const KEY_SERVICE_CHECK_SYMPTOMS = "checksymptoms";
const KEY_ONLINE_CONSULTATION = "onlinconsultation";
const KEY_OUR_SERVICES = "landingpageourServicesLabel";
const KEY_KNOW_YOUR = "landingpageKnowYourLabel";
const KEY_PULSE = "landingpagePulseLabel";
const KEY_PULSE_POST = "landingpagePulseLabelpostLabel";
const KEY_CANCEL = "cancel";
const KEY_OK = "ok";
const KEY_BMI = "bmi";
const KEY_AGE = "age";
const key_GENDER = "gender";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: 0,
      openBMIModal: false
    };
    this.handleScrollBegin = this.handleScrollBegin.bind(this);
    this.onSelectPicker = this.onSelectPicker.bind(this);
    this.showBMIModal = this.showBMIModal.bind(this);
  }

  componentWillMount() {
    const { isNotificationProcessed } = this.props;
    if (!isNotificationProcessed) {
      this._presentNotificationRequestPage();
    }
  }

  _presentNotificationRequestPage() {
    const { navigation } = this.props;

    this.props.gotoNotificationRequest();
  }

  componentDidMount() {
    const { babylonToken, getHealthFlows, healthFlowsData } = this.props;
    if (babylonToken && isEmpty(healthFlowsData)) getHealthFlows();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.BMIResponse !== nextProps.BMIResponse &&
      !isEmpty(nextProps.BMIResponse) &&
      !nextProps.isBMIFeedbackCall
    ) {
      this.setState({
        openBMIModal: true
      });
    }
    if (
      this.props.BMIErrorMessage !== nextProps.BMIErrorMessage &&
      !isNilOrEmpty(nextProps.BMIErrorMessage)
    ) {
      displayText = nextProps.BMIErrorMessage;
      Toast.show(displayText, {
        duration: 2000,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onHide: this.onGoBack
      });
      this.props.resetBMIError();
    }
  }

  navigate(page) {
    // this.props.navigation && this.props.navigation.navigate(page);
    this.props.goto(page);
  }

  quickAction(act, key) {
    if (key === "uploadyourselfie") {
      this.showCamera();
    } else {
      this.props.pressHealthTip(act);
    }
  }

  showCamera() {
    const { sessionId, language, meta, calculateBmi } = this.props;

    const cameraPermission = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_CAMERA_PERMISSION
    ).label;
    const ok = metaHelpers
      .findElement(SCREEN_KEY_CHAT_REPORT, KEY_OK)
      .label.toUpperCase();
    const cancel = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_CANCEL
    ).label;

    ImagePicker.openCamera({
      width: 200,
      height: 200,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      includeBase64: true,
      useFrontCamera: true,
      compressImageQuality: 0.8,
      photo: "photo"
    })
      .then(image => {
        if (!isNilOrEmpty(sessionId)) {
          // this.props.calculateBmi(
          //   sessionId,
          //   image.data,
          //   language,
          //   this.showBMIModal
          // );
          calculateBmi(sessionId, image.data);
        }
      })
      .catch(error => {
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          CustomAlert.show("", cameraPermission, {
            positiveText:ok,
            onPositivePress: () => {
              OpenSettings.openSettings()
            },
            negativeText: cancel,
            });
        }
      });
  }

  showBMIModal(data) {
    const { navigation, BMIResponse } = this.props;
    if (!isEmpty(BMIResponse)) this.setState({ openBMIModal: true });
  }

  horizontalSlider() {
    const {
      meta,
      language,
      BMIResponse,
      bmiResponse,
      successFeedbackData
    } = this.props;
    const bmiTitle = metaHelpers.findElement(
      SCREEN_KEY_LANDING_PAGE,
      KEY_BMI_TITLE
    ).label;
    const bmiDesc = metaHelpers.findElement(
      SCREEN_KEY_LANDING_PAGE,
      KEY_BMI_DESC
    ).label;
    const bmiKey = metaHelpers.findElement(
      SCREEN_KEY_LANDING_PAGE,
      KEY_BMI_TITLE
    ).key;
    const bmi = metaHelpers.findElement(SCREEN_KEY_BMI, KEY_BMI).label;
    const age = metaHelpers.findElement(SCREEN_KEY_BMI, KEY_AGE).label;
    const gender = metaHelpers.findElement(SCREEN_KEY_BMI, key_GENDER).label;
    let tips =
      language === "EN" ? [...EN_REVIEW_SERVICES] : [...BM_REVIEW_SERVICES];
    let bmiTips;
    // to do , need to be tested
    // if (isNilOrEmpty(bmiResponse)) {
    //   bmiTips = { title: bmiTitle, description: bmiDesc, key: bmiKey };
    // } else {
    //   bmiTips = {
    //     title: bmiTitle,
    //     description: bmiDesc + " : " + bmiResponse.result,
    //     key: bmiKey,
    //     result: bmiResponse.result,
    //   };
    // }
    if (
      isNilOrEmpty(successFeedbackData) ||
      !isNilOrEmpty(successFeedbackData.errorCode)
    ) {
      bmiTips = { title: bmiTitle, description: bmiDesc, key: bmiKey };
    } else {
      bmiTips = {
        title: bmiTitle,
        description:
          bmi +
          " : " +
          successFeedbackData.lifestyle.bmiDesc +
          (successFeedbackData.lifestyle
            ? "\n" + age + " : " + successFeedbackData.lifestyle.ageNextBday
            : "") +
          (successFeedbackData
            ? "\n" + gender + " : " + successFeedbackData.sex
            : ""),
        key: bmiKey,
        result: successFeedbackData.lifestyle.bmiDesc
      };
    }

    tips = [bmiTips, ...tips];
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalView}
      >
        {tips.map((data, index) => (
          <TouchableOpacity
            style={styles.reviewServices}
            key={index}
            testID={`healthTips-${index}`}
            accessibilityLabel={`healthTips-${index}`}
            onPress={() => this.quickAction(data.title, data.key)}
          >
            <Text
              testID={`healthTipsTitle-${index}`}
              accessibilityLabel={`healthTipsTitle-${index}`}
              numberOfLines={3}
              ellipsizeMode="tail"
              style={styles.reviewHead}
            >
              {data.title}
            </Text>
            <Text
              testID={`healthTipsDescription-${index}`}
              accessibilityLabel={`healthTipsDescription-${index}`}
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.descp}
            >
              {data.description}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  hideModal() {
    this.props.handleNewUser(false);
  }

  onSelectPicker(label) {
    const { navigation, meta } = this.props;

    const landingScreen = metaHelpers.findScreen(SCREEN_KEY_LANDING_PAGE);

    const key = metaHelpers
      .findAllElementsByType(landingScreen, TYPE_DROP_DOWN_ITEM)
      .find(item => item.label === label).key;
    this.setState({ value: key });
    switch (key) {
      case "landingpagedropdownaddfamilymember":
        this.props.gotoProfile({
          editable: true,
          related: true,
          newProfile: true
        });
        break;
      case "landingpagedropdownassesshealth":
        this.props.pressClinicTab();
        break;
      case "landingpagedropdownaboutus":
        this.props.gotoAboutUs();
        break;
      case "landingpagedropdownchecksymptoms":
        this.props.pressCheckSymptoms();
        break;
      case "landingpagedropdownaddprofile":
        this.props.gotoManageProfile();
        break;
      case "landingpagedropdownchangepassword":
        this.props.gotoChangePassword();
        break;
      default:
        return false;
    }
  }

  sliders() {
    const { language } = this.props;
    const BANNER = language === "EN" ? EN_BANNER : BM_BANNER;
    return BANNER.map((data, index) => (
      <View key={index}>
        <Image resizeMode="cover" source={data.banner} style={styles.banner} />
      </View>
    ));
  }

  renderActivityTracking = isNotNowRow => {
    return (
      <View style={[styles.centerContent]}>
        <TrackActivity {...this.props} isNotNowRow={isNotNowRow} />
      </View>
    );
  };

  handleScrollBegin() {
    this.setState({
      initialPage: 0
    });
  }

  getServiceImage(key) {
    switch (key) {
      case KEY_SERVICE_PRAYER:
        return SERVICE_PRAY;
      case KEY_SERVICE_AIME:
        return DENGUE_ICON;
      case KEY_SERVICE_DOCTOR:
        return SERVICE_DOCTOR;
      case KEY_SERVICE_HOSPITAL:
        return SERVICE_VISIT;
      case KEY_SERVICE_ACCESS_HEALTH:
        return RECORD_GREY_DARK;
      case KEY_SERVICE_CHECK_SYMPTOMS:
        return SYMPTOMES_GREY_DARK;
      case KEY_ONLINE_CONSULTATION:
        return DOC_ON_CALL_ICON;
      default:
        return null;
    }
  }

  navigateAIME = () => {
    const { navigation, userProfile } = this.props;
    const AIMETncConsent = path(
      ["termsConditions", "AIME", "consent"],
      userProfile
    );
    if (AIMETncConsent === "ACCEPT") {
      navigation.navigate("AIME");
    } else {
      navigation.navigate("AIMERegister");
    }
  };

  navigation(key) {
    if (key === KEY_SERVICE_CHECK_SYMPTOMS) {
      this.props.pressCheckSymptoms();
    }
    if (key === KEY_SERVICE_ACCESS_HEALTH) {
      this.props.pressClinicTab();
    }
    if (key === KEY_ONLINE_CONSULTATION) {
      this.props.pressConsultDoctor();
    }
    if (key === "serviceAime") {
      this.navigateAIME();
    }
    const { navigate } = this.props.navigation;
    const navMap = {
      [KEY_SERVICE_PRAYER]: "",
      //[KEY_SERVICE_AIME]: "StayingWell",
      [KEY_SERVICE_DOCTOR]: "GettingTreatment",
      [KEY_SERVICE_HOSPITAL]: ""
      // [KEY_SERVICE_ACCESS_HEALTH]: "ClinicTab",
      // [KEY_SERVICE_CHECK_SYMPTOMS]: "ChatTab",
    };
    navMap[key] && navigate(navMap[key]);
  }

  upadteScrollContents = () => {
    if (this.scrollView && this.props.isNewUser) {
      if (
        this.props.currentTour === TOUR_STEPS.THIRD ||
        this.props.currentTour === TOUR_STEPS.FOURTH
      ) {
        this.scrollView.scrollToEnd({ animated: true });
      } else if (
        this.props.currentTour === TOUR_STEPS.FIFTH ||
        this.props.currentTour === TOUR_STEPS.SIXTH ||
        this.props.currentTour === TOUR_STEPS.SEVENTH
      ) {
        this.scrollView.scrollTo({ x: 0, y: 10, animated: true });
      }
    }
  };

  // eslint-disable-next-line complexity
  render() {
    const { meta, userProfile, bmiLoading, language } = this.props;
    let pageContent = null;

    const mainPage = metaHelpers.findScreen(SCREEN_KEY_LANDING_PAGE);

    const landingScreen = metaHelpers.findScreen(SCREEN_KEY_LANDING_PAGE);
    const serviceList = metaHelpers.findAllElementsByType(
      landingScreen,
      TYPE_SERVICE
    );
    ElementErrorManager.setCurrentScreen(SCREEN_KEY_LANDING_PAGE);
    const BANNER = language === "EN" ? EN_BANNER : BM_BANNER;
    const ourServicesLabel = metaHelpers.findElement(
      SCREEN_KEY_LANDING_PAGE,
      KEY_OUR_SERVICES
    ).label;
    const knowYourLabel = metaHelpers.findElement(
      SCREEN_KEY_LANDING_PAGE,
      KEY_KNOW_YOUR
    ).label;
    const pulseLabel = metaHelpers.findElement(
      SCREEN_KEY_LANDING_PAGE,
      KEY_PULSE
    ).label;

    const pulsePostLabel = metaHelpers.findElement(
      SCREEN_KEY_LANDING_PAGE,
      KEY_PULSE_POST
    ).label;
    this.upadteScrollContents();
    pageContent = (
      <ScrollView
        ref={ref => {
          this.scrollView = ref;
        }}
        style={styles.scrollview}
        contentContainerStyle={styles.contentView}
      >
        <View style={{ flexDirection: "row", padding: 10 }}>
          {/* <View style={{flex:1}}>
        <OfflineImage
         resizeMode="contain"
         fallbackSource={LEFT_ARROW_RED}
         style={styles.servicesImg}
         source={LEFT_ARROW_RED}
        />
      </View> */}
          <View style={{ flex: 1, alignItems: "center" }}>
            <OfflineImage
              resizeMode="contain"
              fallbackSource={SLIDER_LOGO_WHITE}
              style={styles.pulseLogo}
              source={SLIDER_LOGO_WHITE}
            />
          </View>
        </View>
        <Image
          resizeMode="stretch"
          style={{ width: Dimensions.get("window").width, height: 2 }}
          source={RED_RECTANGLE}
        />
        <View style={styles.carouselContainer}>
          <Carousel
            delay={3000}
            height={(Dimensions.get("window").height * 33) / 100}
            initialPage={this.state.initialPage}
            count={BANNER.length}
            onScrollBegin={this.handleScrollBegin}
            indicatorColor={colors.white}
            indicatorSize={12}
            indicatorOffset={8}
            hideIndicators={true}
          >
            {this.sliders()}
          </Carousel>
          <Image
            resizeMode="stretch"
            style={{ width: Dimensions.get("window").width, height: 8 }}
            source={SHADOW_LONG}
          />
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.headerText}>
            {
              metaHelpers.findElementWithScreen(mainPage, KEY_HOW_CAN_I_HELP)
                .label
            }
            {userProfile && userProfile.firstName
              ? ` ${userProfile.firstName}!`
              : "!"}
          </Text>
        </View>
        <WithHighlight tourStep={TOUR_STEPS.SECOND}>
          <View style={styles.ourServiceContainer}>
            <Text style={styles.ourServicesText}>
              {knowYourLabel} <Text style={styles.pulseText}>{pulseLabel}</Text>
              {pulsePostLabel}
            </Text>
            <View style={styles.serviceWrapper}>
              {serviceList.map((data, index) => (
                <TouchableOpacity
                  key={data.key}
                  onPress={() => this.navigation(data.key)}
                  style={styles.serviceContainer}
                >
                  <View style={styles.serviceImageContainer}>
                    <OfflineImage
                      resizeMode="contain"
                      style={styles.servicesImg}
                      fallbackSource={this.getServiceImage(data.key)}
                      source={{ uri: data.image }}
                    />
                  </View>
                  <Text style={styles.serviceName}>{data.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </WithHighlight>
        <WithHighlight tourStep={TOUR_STEPS.THIRD}>
          {this.renderActivityTracking(false)}
        </WithHighlight>
        {!this.props.fitnessTracker.isFitnessTrackingEnabled &&
          this.renderActivityTracking(true)}
        <WithHighlight tourStep={TOUR_STEPS.FOURTH}>
          <View style={styles.sliderContainer}>{this.horizontalSlider()}</View>
        </WithHighlight>
        {this.props.isNewUser && (
          <TourPage
            show={true}
            hide={this.hideModal.bind(this)}
            navigation={this.props.navigation}
          />
        )}
      </ScrollView>
    );

    return (
      <View style={styles.container}>
        {bmiLoading && (
          <View style={styles.loaderProfile}>
            <ActivityIndicator
              size="large"
              color={Platform.OS == "ios" ? colors.white : colors.crimson}
            />
          </View>
        )}
        {pageContent}
        {this.state.openBMIModal && <BMI />}
      </View>
    );
  }
}

MainPage.propTypes = {
  navigation: PropTypes.object,
  sessionId: PropTypes.string,
  language: PropTypes.string,
  meta: PropTypes.object,
  isNewUser: PropTypes.bool,
  calculateBmi: PropTypes.func,
  fitnessTracker: PropTypes.object
};

const mapStateToProps = state => ({
  meta: state.meta,
  language: state.userPreferences.language,
  sessionId: state.auth.token,
  userProfile: state.profile,
  isNewUser: state.auth.isNewUser,
  bmiLoading: state.bmi.loading,

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
});

export default connect(mapStateToProps, {
  pressConsultDoctor: () => ({
    context: pageKeys.GET_TREATMENT,
    type: CoreActionTypes.GO_TO_DOC_SERVICE
  }),
  pressClinicTab: () => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.GO_TO_ASSESS_HEALTH
  }),
  pressCheckSymptoms: () => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.GO_TO_SYMPTOM_CHECKER
  }),
  pressHealthTip: act => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.GO_TO_HEALTH_TIPS,
    payload: {
      params: { healthTip: act }
    }
  }),
  handleNewUser: value => ({
    type: CoreActionTypes.IS_NEW_USER,
    payload: {
      value: value
    }
  }),
  calculateBmi: (sessionId, image) => ({
    context: pageKeys.MAIN_PAGE,
    type: "KEY_CALCULATE_BMI",
    payload: {
      sessionId,
      data: image.toString(),
      KEY_BMI_TITLE,
      bmiFeedbackCall: false
    }
  }),
  resetBMIError: () => ({
    type: CoreActionTypes.RESET_BMI_ERROR
  }),
  getHealthFlows: () => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.GET_HEALTH_FLOWS
  }),
  gotoProfile,
  gotoAboutUs,
  gotoManageProfile,
  gotoChangePassword,
  gotoNotificationRequest,
  goto
})(MainPage);

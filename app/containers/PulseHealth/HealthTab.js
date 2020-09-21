/* eslint-disable */
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
  RefreshControl,
  ImageBackground,
  TouchableHighlight,
  Alert,
} from "react-native";
import { isEmpty, isNil, pathOr, without } from "ramda";
import { gridResponseMapper } from "../../utils/response-mapper-utils";

import HTML from "react-native-render-html";
import styles from "./styles";
import { connect } from "react-redux";
import moment from "moment";
import _ from "lodash";
import PruSectionGrid from "../../components/PruSectionGrid";
import PulseHealthCard from "../../components/PulseHealthCard";
import VerticalGroupedLayout from "../../components/ScreenLayouts/VerticalGroupedLayout";

import {
  CoreUtils,
  CoreConfig,
  CoreActions,
  CoreActionTypes,
  CoreStyles,
  CoreConstants,
  CoreServices,
  events
} from "@pru-rt-internal/pulse-common";
const { checkPermission, getFirebaseMsgToken } = CoreServices;
import { IGNORED_TAGS } from "react-native-render-html/src/HTMLUtils";
import {
  gotoNotificationRequest,
  goto,
  gotoHealthAssessment,
  gotoSymptomChecker,
  justDispatchAction,
  getScreenRenderingConfig,
  gotoAccountsTab
} from "../../actions";
import ImagePicker from "react-native-image-crop-picker";
import OpenSettings from "react-native-open-settings";
import { CustomAlert } from "../../components";
const {
  SCREEN_KEY_CHAT_TERMS,
  WRINKLE_INDEX_RESULTS,
  BMI_INDEX_RESULTS,
  BMI_INDEX_YOUR_IS,
  WRINKLE_INDEX_YOUR_IS,
  NO_VISIBLE_WRINKLE,
  SHALLOW_WRINKLE,
  MODERATE_WRINKLE,
  DEEP_WRINKLE,
  SEVERE_WRINKLE,
  SOME_WRINKLE,
  BMI_RESULTS,
  LESS_THAN_EIGHTEEN_POINT_FIVE,
  EIGHTEEN_POINT_FIVE_TO_TWENTY_FIVE,
  FROM_TWENTY_FIVE_TO_THIRTY,
  OVER_THIRTY,
  ZERO_TO_NINE,
  TEN_TO_TWENTY_NINE,
  THIRTY_TO_FORTY_NINE,
  FIFTY_TO_SIXTY_NINE,
  SEVENTY_TO_EIGHTY_NINE,
  NINTY_TO_HUNDRED,
  CLASSIFICATION,
  AGE,
  VALUE_IN_PERCENTAGE,
  DESCRIPTION,
  BMI_UNDER_WEIGHT,
  BMI_NORMAL,
  BMI_OVER_WEIGHT,
  BMI_OBESE,
  WRINKLE_CLASSIFICATION,
  BMI_CLASSIFICATION
} = CoreConstants;
const KEY_AGREE = "accept";
const KEY_BMI_TITLE = "uploadyourselfie";
const { isNilOrEmpty } = CoreUtils;
import {
  AVATAR,
  HOME_PAGE_HEADER_BG,
  PULSE__HEADER_LOGO,
} from "../../config/images";

import PulseAppHeader from "../../components/PulseAppHeader";

const tags = without(
  [
    "table",
    "caption",
    "col",
    "colgroup",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr"
  ],
  IGNORED_TAGS
);

import {
  DISPLAY_MODE_HOSPITAL,
  DISPLAY_MODE_DENGUE
} from "../../containers/NavigatorMap";
import { Find_Clinic } from "../../config/images";
import PruInfoWithRag from "../../components/PruInfoWithRag";
//import Modal as LibModal from "react-native-modal";

const {
  HEALTHDASHBOARD,
  HEALTHDASHBOARD_WELCOMETO,
  HEALTHDASHBOARD_HopeYouWell,
  HEALTHDASHBOARD_FINDCLINIC,
  HEALTHDASHBOARD_HEALTHASSESSMENT,
  HEALTHDASHBOARD_DESCRIPTION,
  HEALTHDASHBOARD_CHECKYOURSYMPTOM,
  HEALTHDASHBOARD_CHECKYOURSYMPTOMDESC,
  pageKeys,
  COMMON_KEY_TERMS,
  NEW_TERMSCONDITIONS,
  NEW_TERMSCONDITIONS_PULSE,
  COMMON_KEY_PRIVACY,
  NEW_PRIVACYNOTICE,
  NEW_PRIVACYNOTICE_PULSE,
  CUSTOMISE_CHECKBMI,
  CUSTOMISE,
  HEALTHDASHBOARD_TALKTODOCTOR,
  HEALTHDASHBOARD_TALKTODOCTORDESC,
  HEALTHDASHBOARD_CONSULTATION_SUMMARY,
  KEY_CAMERA_PERMISSION,
  SCREEN_KEY_MANAGE_PROFILE,
  SCREEN_KEY_CHAT_REPORT,
  KEY_OK,
  KEY_CANCEL
} = CoreConfig;
const { metaHelpers } = CoreUtils;

const { setLoadTime, setNotificationProcessed } = CoreActions;
const tableDefaultStyle = {
  flex: 1,
  justifyContent: "flex-start",
  borderWidth: 0.3
};

const tableColumnStyle = {
  ...tableDefaultStyle,
  flexDirection: "column",
  alignItems: "stretch"
};

const tableRowStyle = {
  ...tableDefaultStyle,
  flexDirection: "row",
  alignItems: "stretch"
};

const tdStyle = {
  ...tableDefaultStyle,
  padding: 2
};

const thStyle = {
  ...tdStyle,
  backgroundColor: "#CCCCCC",
  alignItems: "center"
};

const baseFontStyle = {
  fontFamily: CoreStyles.fontFamily.normal
};

/* eslint-disable */
const renderers = {
  table: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  col: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  colgroup: (x, c) => <View style={tableRowStyle}>{c}</View>,
  tbody: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  tfoot: (x, c) => <View style={tableRowStyle}>{c}</View>,
  th: (x, c) => <View style={thStyle}>{c}</View>,
  thead: (x, c) => <View style={tableRowStyle}>{c}</View>,
  caption: (x, c) => <View style={tableColumnStyle}>{c}</View>,
  tr: (x, c) => <View style={tableRowStyle}>{c}</View>,
  td: (x, c) => <View style={tdStyle}>{c}</View>
};

class PulseHealth extends Component {
  constructor(props) {
    super(props);
    this.didFocusListener = [];
  }
  state = {
    dengueAgreementVisible: false,
    dengueAgreementDetailVisible: false,
    versionVisible: false,
    modalVisible: false,
    timestamp: new Date().getTime(),
    isFetching: false
  };

  onRefresh = () => {
    this.props.getScreenRenderingConfig({
      id: `m::ui::health_${this.props.userPreferences.language}`
    });
    this.setState({ timeStamp: new Date().getTime() });
    this.checkNotificationPermission();
  };

  checkNotificationPermission = async () => {
    const { isNotificationProcessed } = this.props;
    const isNotifPermAvailable = await checkPermission();
    if (isNotifPermAvailable) {
      if (!this.props.notificationGranted) {
        const fcmToken = await getFirebaseMsgToken();
        console.log("fcmToken = ", fcmToken);
        this.props.sendFireBaseToken(fcmToken);
        this.props.setNotificationProcessed(isNotificationProcessed, true);
      }
    } else {
      this.props.setNotificationProcessed(isNotificationProcessed, false);
    }
  }

  componentWillMount() {
    const {
      isNotificationProcessed,
      userPreferences,
      token,
      termsConditions
    } = this.props;

    let version = termsConditions
      ? termsConditions.Prudential
        ? termsConditions.Prudential.version
        : ""
      : "";

    let privacyVersion = termsConditions
      ? termsConditions.Prudential
        ? termsConditions.Prudential.privacyVersion
        : ""
      : "";

    const metaTncVersion = metaHelpers.findCommon("PULSE_TnC_VERSION").value;
    const metaPrivacyVersion = metaHelpers.findCommon("PULSE_PP_VERSION").value;
    //TODO: Clean this up. Unnecessary if blocks
    if (Platform.OS == "ios") {
      if (!termsConditions) {
      } else if (!version) {
      } else if (!privacyVersion) {
      } else if (metaTncVersion != version) {
      } else if (metaPrivacyVersion != privacyVersion) {
      } else if (!isNotificationProcessed) {
        this._presentNotificationRequestPage();
      }
    }

    // this.props.getScreenRenderingConfig({
    //   id: `m::ui::health_${this.props.userPreferences.language}`
    // });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.userPreferences.language !== this.props.userPreferences.language
    ) {
      this.props.getScreenRenderingConfig({
        id: `m::ui::health_${this.props.userPreferences.language}`
      });
    }
  }

  componentDidMount() {
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.onRefresh();
      }
    );
    const { userPreferences, termsConditions, token } = this.props;
    let CurrentTime = moment(new Date()).format("YYYY-MM-DD");
    userPreferences.loadTime.push(CurrentTime);

    if (userPreferences.loadTime.length > 2) {
      userPreferences.loadTime.shift();
    }

    this.props.setLoadTime(userPreferences.loadTime);
    this.props.getHealthFlows();
    this.props.GET_CUSTOMER_DETAILS();
  }

  _presentNotificationRequestPage() {
    this.props.gotoNotificationRequest();
  }

  _notifyMe = () => {
    const { navigation } = this.props;
    if (this.props.regStatus === "REGISTERED") {
      navigation.navigate("DengueAlertContainer");
    } else {
      navigation.navigate("DengueTermsAgreement");
    }
  };
  updateTerms = () => {
    const { termsConditions, isNotificationProcessed } = this.props;

    let id = termsConditions
      ? termsConditions.Prudential
        ? termsConditions.Prudential.id
        : ""
      : "";

    const metaTncVersion = metaHelpers.findCommon("PULSE_TnC_VERSION").value;
    const metaPrivacyVersion = metaHelpers.findCommon("PULSE_PP_VERSION").value;

    let version = termsConditions
      ? termsConditions.Prudential
        ? termsConditions.Prudential.version
        : ""
      : "";
    let privacyVersion = termsConditions
      ? termsConditions.Prudential
        ? termsConditions.Prudential.privacyVersion
        : ""
      : "";
    if (!id) {
      this.props.updateTermsAndTnc({
        tncVersion: metaTncVersion
        // privacyVersion: metaPrivacyVersion,
      });
    } else {
      if (!privacyVersion) {
        this.props.updateTermsAndTnc({
          tncVersion: version,
          privacyVersion: metaPrivacyVersion,
          id: id
        });
      } else if (metaTncVersion != version) {
        this.props.updateTermsAndTnc({
          tncVersion: metaTncVersion,
          privacyVersion: privacyVersion,
          id: id
        });
      } else if (metaPrivacyVersion != privacyVersion) {
        this.props.updateTermsAndTnc({
          tncVersion: metaTncVersion,
          privacyVersion: metaPrivacyVersion,
          id: id
        });
        if (!isNotificationProcessed) {
          this._presentNotificationRequestPage();
        }
      }
    }
  };

  showCamera = () => {
    const {
      token,
      calculateBmi,
      justDispatchAction,
      showWrinkleIndex
    } = this.props;
    const cameraPermission = metaHelpers.findElement(
      SCREEN_KEY_MANAGE_PROFILE,
      KEY_CAMERA_PERMISSION
    ).label;
    const ok = metaHelpers.findElement(SCREEN_KEY_CHAT_REPORT, KEY_OK).label;
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
        justDispatchAction(CoreActionTypes.PULSE_RESET_BMI);
        if (!isNilOrEmpty(token)) {
          calculateBmi(token, image.data, showWrinkleIndex);
        }
      })
      .catch(error => {
        justDispatchAction(CoreActionTypes.PULSE_RESET_BMI);
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          CustomAlert.show(
            "",
            cameraPermission,
            {
              positiveText: ok,
              onPositivePress: () => {
                OpenSettings.openSettings();
              },
            },
            {
              negativeText: cancel,
              onNegativePress: () =>{},
            }
          );
        }
      });
  };

  groupByTitle = () => {
    let healthGrid = this.props.healthScreenConfig;
    let healthGridGroupByTitle = _.groupBy(healthGrid.containers, "title");
    return healthGridGroupByTitle;
  };

  // renderGrid = () => {
  //   const grid = this.groupByTitle();
  //   const headers = Object.keys(grid);
  //   return headers.map(value => {
  //     return (
  //       <PruSectionGrid
  //         header={value}
  //         data={grid[value][0].components}
  //         horizontal={grid[value][0].horizontal}
  //         itemsPerRow={grid[value][0].itemsPerRow}
  //         navigation={this.props.navigation}
  //         aspectRatio={grid[value][0].aspectRatio}
  //         width={grid[value][0].width}
  //         timeStamp={this.state.timeStamp}
  //       />
  //     );
  //   });
  // };
  renderGrid = () => {
    const { healthScreenConfig } = this.props;
    return (
      <VerticalGroupedLayout config={healthScreenConfig} transform={true} />
    );
  };

  closePruInfoWithRagModal() {
    this.props.resetBMIWrinkleModal();
  }

  getWrinkleStatus(wrinklePercentage) {
    const noVisiblyWrinkleLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      NO_VISIBLE_WRINKLE
    ).label;
    const shallowWrinkleLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      SHALLOW_WRINKLE
    ).label;
    const moderateWrinkleLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      MODERATE_WRINKLE
    ).label;
    const deepWrinkleLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      DEEP_WRINKLE
    ).label;
    const severeWrinkleLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      SEVERE_WRINKLE
    ).label;
    const someWrinkleLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      SOME_WRINKLE
    ).label;
    if (isNaN(wrinklePercentage)) {
      return "";
    }
    if (wrinklePercentage < 10) {
      return noVisiblyWrinkleLabel;
    } else if (wrinklePercentage < 30) {
      return shallowWrinkleLabel;
    } else if (wrinklePercentage < 50) {
      return someWrinkleLabel;
    } else if (wrinklePercentage < 70) {
      return moderateWrinkleLabel;
    } else if (wrinklePercentage < 90) {
      return deepWrinkleLabel;
    } else {
      return severeWrinkleLabel;
    }
  }

  getBmiStatus(bmiValue) {
    const underWeight = metaHelpers.findElement(
      BMI_RESULTS,
      BMI_UNDER_WEIGHT
    ).label;
    const normal = metaHelpers.findElement(
      BMI_RESULTS,
      BMI_NORMAL
    ).label;
    const overWeight = metaHelpers.findElement(
      BMI_RESULTS,
      BMI_OVER_WEIGHT
    ).label;
    const obese = metaHelpers.findElement(
      BMI_RESULTS,
      BMI_OBESE
    ).label;
    if (isNaN(bmiValue)) {
      return "";
    }
    if (bmiValue < 18.5) {
      return underWeight;
    } else if (bmiValue < 25) {
      return normal;
    } else if (bmiValue < 30) {
      return overWeight;
    } else {
      return obese;
    }
  }

  getBMIIndexArray() {
    const lessThanEighteenPointFiveLabel = metaHelpers.findElement(
      BMI_RESULTS,
      LESS_THAN_EIGHTEEN_POINT_FIVE
    ).label;
    const eighteenPointFiveToTwentyFiveLabel = metaHelpers.findElement(
      BMI_RESULTS,
      EIGHTEEN_POINT_FIVE_TO_TWENTY_FIVE
    ).label;
    const fromTwentyFiveTOThirtyLabel = metaHelpers.findElement(
      BMI_RESULTS,
      FROM_TWENTY_FIVE_TO_THIRTY
    ).label;
    const overThirtyLabel = metaHelpers.findElement(BMI_RESULTS, OVER_THIRTY)
      .label;

    const bmiUnderWeightLabel = metaHelpers.findElement(
      BMI_RESULTS,
      BMI_UNDER_WEIGHT
    ).label;
    const bmiNormalLabel = metaHelpers.findElement(BMI_RESULTS, BMI_NORMAL)
      .label;
    const bmiOverWeightLabel = metaHelpers.findElement(
      BMI_RESULTS,
      BMI_OVER_WEIGHT
    ).label;
    const bmiObeseLabel = metaHelpers.findElement(BMI_RESULTS, BMI_OBESE).label;
    const indexArray = [
      { range: lessThanEighteenPointFiveLabel, color: "#f1f864", description: bmiUnderWeightLabel },
      { range: eighteenPointFiveToTwentyFiveLabel, color: "#239d60", description: bmiNormalLabel },
      { range: fromTwentyFiveTOThirtyLabel, color: "#ff9f68", description: bmiOverWeightLabel },
      { range: overThirtyLabel, color: "#ff0200", description: bmiObeseLabel }
    ];
    return indexArray;
  }

  getWrinkleIndexArray() {
    const zeroToNineLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      ZERO_TO_NINE
    ).label;
    const tenToTwentyNineLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      TEN_TO_TWENTY_NINE
    ).label;
    const thirtyToFortyNineLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      THIRTY_TO_FORTY_NINE
    ).label;
    const fiftyToSixtyNineLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      FIFTY_TO_SIXTY_NINE
    ).label;
    const seventyToEightyNineLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      SEVENTY_TO_EIGHTY_NINE
    ).label;
    const nintyToHundredLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      NINTY_TO_HUNDRED
    ).label;

    const noVisiblyWrinkleLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      NO_VISIBLE_WRINKLE
    ).label;
    const shallowWrinkleLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      SHALLOW_WRINKLE
    ).label;
    const moderateWrinkleLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      MODERATE_WRINKLE
    ).label;
    const deepWrinkleLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      DEEP_WRINKLE
    ).label;
    const severeWrinkleLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      SEVERE_WRINKLE
    ).label;
    const someWrinkleLabel = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      SOME_WRINKLE
    ).label;
    const indexArray = [
      { range: zeroToNineLabel, color: "#239d60", description: noVisiblyWrinkleLabel },
      { range: tenToTwentyNineLabel, color: "#609d23", description: shallowWrinkleLabel },
      { range: thirtyToFortyNineLabel, color: "#ffb83e", description: someWrinkleLabel },
      { range: fiftyToSixtyNineLabel, color: "#f9e63a", description: moderateWrinkleLabel },
      { range: seventyToEightyNineLabel, color: "#ff6e6d", description: deepWrinkleLabel },
      { range: nintyToHundredLabel, color: "#ff0200", description: severeWrinkleLabel }
    ];
    return indexArray;
  }

  pruInfoWithRagModal = () => {
    const { BMIResponse, showWrinkleIndex } = this.props;
    const avatarUrl = {
      uri: `data:image/png;base64,${this.props.bmiImageData}`
    };
    const { attributes, ageNextBday, bmi } = BMIResponse.lifestyle;
    const bmiValue = _.floor(bmi);
    const wrinkleValue = attributes && _.floor(attributes.wrinkle);
    const wrinkleIndexTitle = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      WRINKLE_INDEX_YOUR_IS
    ).label;
    const bmiIndexTitle = metaHelpers.findElement(
      BMI_RESULTS,
      BMI_INDEX_YOUR_IS
    ).label;
    const wrinkleClassificationTitle = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      WRINKLE_CLASSIFICATION
    ).label;
    const bmiClassificationTitle = metaHelpers.findElement(
      BMI_RESULTS,
      BMI_CLASSIFICATION
    ).label;
    const valueTitle = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      VALUE_IN_PERCENTAGE
    ).label;
    const descriptionTitle = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      DESCRIPTION
    ).label;
    const classification = metaHelpers.findElement(
      WRINKLE_INDEX_RESULTS,
      CLASSIFICATION
    ).label;
    const age = metaHelpers.findElement(WRINKLE_INDEX_RESULTS, AGE).label;
    const resultArray = [
      {
        key: classification,
        value: showWrinkleIndex ? this.getWrinkleStatus(wrinkleValue) : this.getBmiStatus(bmiValue)
      },
      { key: age, value: ageNextBday }
    ];
    return (
      <Modal
        transparent={true}
        visible={this.props.showBmiWrinkleResult}
        animationType="slide"
        hideModalContentWhileAnimating
        onRequestClose={false}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.2)" }}>
          <View
            style={{
              flex: 1,
              marginTop: 210,
              backgroundColor: "#FFFF",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }}
          >
            <PruInfoWithRag
              onClose={this.closePruInfoWithRagModal.bind(this)}
              title={showWrinkleIndex ? wrinkleIndexTitle : bmiIndexTitle}
              value={showWrinkleIndex ? wrinkleValue : bmiValue}
              avatarUrl={avatarUrl}
              guideLineTitle={
                showWrinkleIndex
                  ? wrinkleClassificationTitle
                  : bmiClassificationTitle
              }
              fromWrinkleIndex={showWrinkleIndex}
              indexArray={
                showWrinkleIndex
                  ? this.getWrinkleIndexArray()
                  : this.getBMIIndexArray()
              }
              valueTitle={valueTitle}
              descriptionTitle={descriptionTitle}
              resultArray={resultArray}
            />
          </View>
        </View>
      </Modal>
    );
  };

  componentWillUnmount() {
    this.didFocusListener.remove();
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  render() {
    const {
      navigation,
      userProfile,
      termsConditions,
      gotoNavigatorScreen,
      userIcon
    } = this.props;

    let termsPrutopia, title, TERMSCONDITIONS_PULSE;
    const tagsStyles = {
      p: {
        fontFamily: CoreStyles.fontFamily.bold,
        marginVertical: 10,
        fontSize: 14
      },
      span: {
        fontFamily: CoreStyles.fontFamily.bold,
        marginVertical: 10,
        fontSize: 14
      },
      div: {
        fontFamily: CoreStyles.fontFamily.bold,
        marginVertical: 10,
        fontSize: 14
      },
      strong: {
        fontFamily: CoreStyles.fontFamily.bold,
        fontSize: 16
      },
      li: {
        fontFamily: CoreStyles.fontFamily.bold,
        fontSize: 14
      }
    };
    const metaTncVersion = metaHelpers.findCommon("PULSE_TnC_VERSION").value;
    const metaPrivacyVersion = metaHelpers.findCommon("PULSE_PP_VERSION").value;
    let version = termsConditions
      ? termsConditions.Prudential
        ? termsConditions.Prudential.version
        : ""
      : "";

    let privacyVersion = termsConditions
      ? termsConditions.Prudential
        ? termsConditions.Prudential.privacyVersion
        : ""
      : "";

    let versionVisible = false;

    if (!termsConditions) {
      versionVisible = false;
    } else if (!version) {
      versionVisible = true;
      TERMSCONDITIONS_PULSE = metaHelpers.findElement(
        NEW_TERMSCONDITIONS,
        NEW_TERMSCONDITIONS_PULSE
      ).label;
      title = metaHelpers.findScreen(NEW_TERMSCONDITIONS).label;
      termsPrutopia = metaHelpers.findCommon(COMMON_KEY_TERMS).label;
    } else if (!privacyVersion) {
      versionVisible = true;
      TERMSCONDITIONS_PULSE = metaHelpers.findElement(
        NEW_PRIVACYNOTICE,
        NEW_PRIVACYNOTICE_PULSE
      ).label;
      title = metaHelpers.findScreen(NEW_PRIVACYNOTICE).label;
      termsPrutopia = metaHelpers.findCommon(COMMON_KEY_PRIVACY).label;
    } else if (metaTncVersion != version) {
      versionVisible = true;
      TERMSCONDITIONS_PULSE = metaHelpers.findElement(
        NEW_TERMSCONDITIONS,
        NEW_TERMSCONDITIONS_PULSE
      ).label;
      title = metaHelpers.findScreen(NEW_TERMSCONDITIONS).label;
      termsPrutopia = metaHelpers.findCommon(COMMON_KEY_TERMS).label;
    } else if (metaPrivacyVersion != privacyVersion) {
      versionVisible = true;
      TERMSCONDITIONS_PULSE = metaHelpers.findElement(
        NEW_PRIVACYNOTICE,
        NEW_PRIVACYNOTICE_PULSE
      ).label;
      title = metaHelpers.findScreen(NEW_PRIVACYNOTICE).label;
      termsPrutopia = metaHelpers.findCommon(COMMON_KEY_PRIVACY).label;
    } else {
      versionVisible = false;
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          position: "relative"
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              style={{
                marginHorizontal: 0
              }}
            />
          }
        >
          <PulseAppHeader onPress={() => {this.props.gotoAccountsTab({params: { showBackButton: true }})}}/>
          <View style={{ margin: 2 }}></View>
          <View>{this.renderGrid()}</View>
          {this.props.takeSelfie && this.showCamera()}
          {this.props.BMIResponse &&
            this.props.showBmiWrinkleResult &&
            this.pruInfoWithRagModal()}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={false}
          visible={versionVisible}
        >
          <View style={styles.containers}>
            <View
              style={{
                width: "100%",
                height: 44,
                flexDirection: "row",
                justifyContent: "flex-end"
              }}
            ></View>
            <View style={styles.container}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.headingBox}>
                  <Text style={styles.TCheading}>{TERMSCONDITIONS_PULSE}</Text>
                  <Text style={styles.heading}>{title}</Text>
                </View>

                <HTML
                  html={termsPrutopia}
                  tagsStyles={tagsStyles}
                  ignoredTags={tags}
                  renderers={renderers}
                  baseFontStyle={baseFontStyle}
                />
              </ScrollView>
            </View>

            <TouchableOpacity
              style={{
                width: 220,
                height: 44,
                borderRadius: 22,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 38,
                marginRight: 77,
                flexShrink: 0,
                marginBottom: 32,
                backgroundColor: "#ED1B2E",
                marginTop: 20
              }}
              onPress={() => {
                this.updateTerms();
              }}
              accessibilityLabel="home"
              accesible
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#FFFFFF",
                  fontFamily: "Avenir",
                  fontWeight: "500",
                  lineHeight: 22
                }}
              >
                {
                  metaHelpers.findElement(SCREEN_KEY_CHAT_TERMS, KEY_AGREE)
                    .label
                }
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    regStatus: state.regAIME.registrationStatus,
    userCountryDetails: state.auth.countryInfo,
    isNotificationProcessed: state.userPreferences.notificationProcessed,
    notificationGranted: state.userPreferences.notificationGranted,
    userPreferences: state.userPreferences,
    userProfile: state.profile,
    token: state.auth.token,
    termsConditions: state.auth.termsConditions,
    healthScreenConfig: state.screenConfig.Health,
    takeSelfie: state.bmi.takeSelfie,
    showWrinkleIndex: state.bmi.showWrinkleIndex,
    showBmiWrinkleResult: state.bmi.showBmiWrinkleResult,
    BMIResponse: state.bmi.BMIResponse,
    bmiImageData: state.bmi.bmiImage,

    userIcon: state.profile.profilePicture
  };
};

export default connect(mapStateToProps, {
  setLoadTime,
  getHealthFlows: () => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.GET_HEALTH_FLOWS
  }),
  GET_CUSTOMER_DETAILS: payload => ({
    context: pageKeys.PROFILE,
    type: CoreActionTypes.GET_CUSTOMER_DETAILS
  }),
  sendFireBaseToken: fcmToken => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.UPDATE_CUSTOMER_DEVICE_1,
    payload: {
      fcmToken
    }
  }),
  getAllchallenges: payload => ({
    context: pageKeys.CHALLENGES,
    type: CoreActionTypes.GET_ALL_CHALLENGE,
    payload: payload
  }),
  getAllUserJoinChallenge: payload => ({
    context: pageKeys.CHALLENGES,
    type: CoreActionTypes.GET_ALL_USER_JOIN_CHALLENGE,
    payload: payload
  }),
  updateTermsAndTnc: payload => ({
    context: pageKeys.REGISTRATION,
    type: CoreActionTypes.UPDATE_TERMS_AND_CONDITIONS,
    payload: payload
  }),
  getInsanZoneList: payload => ({
    context: pageKeys.GET_INSAN,
    type: CoreActionTypes.GET_INSAN_ZONE_LIST,
    payload: payload
  }),
  gotoNotificationRequest,
  goto,
  calculateBmi: (sessionId, image, showWrinkleIndex) => ({
    context: pageKeys.MAIN_PAGE,
    type: CoreActionTypes.KEY_CALCULATE_BMI,
    payload: {
      sessionId,
      data: image,
      KEY_BMI_TITLE,
      bmiFeedbackCall: false,
      showWrinkleIndex
    }
  }),
  resetBMIError: () => ({
    type: CoreActionTypes.RESET_BMI_ERROR
  }),
  resetBMIWrinkleModal: () => ({
    type: CoreActionTypes.RESET_BMI_WRINKLE_RESULT
  }),
  gotoHealthAssessment,
  gotoSymptomChecker,
  justDispatchAction,
  getScreenRenderingConfig,
  setNotificationProcessed,
  gotoNavigatorScreen: params => ({
    context: pageKeys.PULSE_HEALTH_PAGE,
    type: CoreActionTypes.GO_TO_NAVIGATOR,
    navigateTo: pageKeys.NAVIGATOR_MAIN_SCREEN,
    payload: params
  }),
  sendFireBaseToken: fcmToken => ({
    context: pageKeys.LOGIN,
    type: CoreActionTypes.UPDATE_CUSTOMER_DEVICE_1,
    payload: {
      fcmToken
    }
  }),
  gotoAccountsTab
})(PulseHealth);

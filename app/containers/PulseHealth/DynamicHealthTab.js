import React, { PureComponent } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Modal,
  Alert,
  Platform,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import VerticalGroupedLayout from "../../components/ScreenLayouts/VerticalGroupedLayout";
import XIcon from "../../components/XIcon";
import PulseAppHeader from "../../components/PulseAppHeader";
import { justDispatchAction, getScreenRenderingConfig } from "../../actions";
import FaceDetector from "../../features/faceDetection/components";
import PPGVitals from "../../features/ppgVitals";
import PPGVitalsResult from "../../features/ppgVitals/screens/VitalsContainer";
import { dispatchEvent, gotoAccountsTab } from "../../actions";
import PruInfoWithRag from "../../components/PruInfoWithRag";
import PruIcon from "../../components/PruIcon";
import {
  checkSymptoms,
  wellnessGoals,
  assessHealth,
  checkBmi,
  findHospital,
  menu_default
} from "../../config/images";
import { safeMetaLabelFinder, metaLabelFinder } from "../../utils/meta-utils";
import { path } from "ramda";
import {
  CoreUtils,
  CoreActionTypes,
  CoreSelectors,
  events
} from "@pru-rt-internal/pulse-common";
import ImagePicker from "react-native-image-crop-picker";
import OpenSettings from "react-native-open-settings";
import { CustomAlert } from "../../components";
import { registerEvent, sendEvent } from "../../utils/registerEvents/actions";
import { eventNames } from "../../utils/registerEvents/all-events";
import { pathOr } from "ramda";

import MetaConstants from "./meta";

const { isNilOrEmpty } = CoreUtils;
const KEY_BMI_TITLE = "uploadyourselfie";
const { AuthSelector } = CoreSelectors;

const { width: screenWidth } = Dimensions.get("window");

const screenName = "healthTab";

class DynamicHealthTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      reachedScrollEnd: false
    };
    this.isCameraOpen = false;
    this.MetaConstants = {
      ...MetaConstants.initializeScreenMeta()
    };
  }
  componentDidMount() {
    this.onRefresh();
    this.didFocusListener = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.onRefresh();
      }
    );
  }

  metaFinderHealthStickerMenu = key => {
    const result = safeMetaLabelFinder("HealthStickerMenu", key);
    return result !== key ? result : [];
  };

  getImageByName = name => {
    switch (name) {
      case "checkSymptoms":
        return checkSymptoms;
      case "wellnessGoals":
        return wellnessGoals;
      case "assessHealth":
        return assessHealth;
      case "checkBmi":
        return checkBmi;
      case "findHospital":
        return findHospital;
      default:
        return menu_default;
    }
  };

  onRefresh = () => {
    this.props.getScreenRenderingConfig({
      id: `m::ui::dynamicHealth_${this.props.userPreferences.language}`,
    });
  };

  componentWillUnmount() {
    this.didFocusListener.remove();
  }

  onPress = ({ context, type, navigateTo, params, eventName, eventDetails }) => {
    if (eventDetails) {
      this.props.sendEvent(eventDetails);
    } else {
      this.props.registerEvent(eventNames[eventName]);
    }
    this.props.dispatch({
      context,
      type,
      navigateTo,
      payload: {
        ...params,
      },
    });
  };

  renderMenu = ({ item }) => {
    // const menuIcons = this.metaFinderHealthStickerMenu("menuIcons");
    const { enabledHealthStickers } = this.props;
    const numIcons = enabledHealthStickers.length;
    const iconSize = 52;
    const margin = (screenWidth - numIcons * iconSize) / (2 * numIcons);
    const menuFirstLabel = safeMetaLabelFinder(screenName, item.firstKey);
    const menuSecondLabel = safeMetaLabelFinder(screenName, item.secondKey);
    return (
      <View style={{ marginLeft: margin, marginRight: margin }}>
        <XIcon
          width={36.7}
          height={36.7}
          colors={item.colors}
          img={this.getImageByName(item.img)}
          imgUrl={item.img_uri}
          country={this.props.userCountryDetails.simCountry}
          containerStyle={{
            borderRadius: 36.7 / 2,
          }}
          outContainerStyle={{ width: iconSize }}
          firstLabel={menuFirstLabel}
          secondLabel={menuSecondLabel}
          onPress={() =>
            this.onPress({
              type: item.type,
              context: item.context,
              navigateTo: item.navigateTo,
              params: item.params,
              eventName: item.eventName,
              eventDetails: item.eventDetails
            })
          }
          // onPress={}
          imgStyle={item.imageStyle}
        />
      </View>
    );
  };

  renderMenuIcons = () => {
    const { enabledHealthStickers = [] } = this.props;
    const menuIcons = this.metaFinderHealthStickerMenu("menuIcons");
    if (enabledHealthStickers.length === 0) {
      return null;
    }

    const menuIconsArr = [];

    enabledHealthStickers.forEach(item => {
      const icon = menuIcons.find(x => x.id === item);
      icon && menuIconsArr.push(icon);
    });

    return (
      <View
        style={{
          // flex: 1,
          width: screenWidth,
          height: 90,
          marginTop: 12,
        }}
      >
        <FlatList
          data={menuIconsArr}
          renderItem={this.renderMenu}
          horizontal={true}
        />
      </View>
    );
  };

  renderHeader = () => {
    return <PulseAppHeader onPress={() => { this.props.gotoAccountsTab({ params: { showBackButton: true } }) }} />;
  };

  renderGrid = () => {
    const { gridConfig } = this.props;
    return <VerticalGroupedLayout config={gridConfig} transform={true} />;
  };

  showThatsAll = () => {
    if (this.MetaConstants.thatsAllConfig == "enable")
      return (
        <View style={{ justifyContent: 'center', alignItem: 'center', padding: 10 }}>
          <Text style={JSON.parse(this.MetaConstants.thatsAllStyle)}>{this.MetaConstants.thatsAllText}</Text>
        </View>
      )
    return null
  }

  render() {
    this.props.showErrorMsgOnTileClick && this.showMealPlannerError();
    const { enabledHealthStickers } = this.props;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {enabledHealthStickers.length > 0 ? this.renderMenuIcons() : null}
        <ScrollView
          style={{
            marginHorizontal: 0,
          }}
          refreshControl={
            <RefreshControl
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
            />
          }
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={() => this.setState({ reachedScrollEnd: true })}
        >
          {this.renderGrid()}
          {this.state.reachedScrollEnd && this.showThatsAll()}
          {this.props.takeSelfie && this.showCamera()}
          {this.props.BMIResponse &&
            this.props.showBmiWrinkleResult &&
            this.pruInfoWithRagModal()}
        </ScrollView>
      </View>
    );
  }

  closePruInfoWithRagModal() {
    const eventPayload = path(["showWrinkleIndex"], this.props) ? events.WrinkleIndexResultEvent : events.BMIResultEvent;
    eventPayload.attributes.appVersion = path(["auth", "userAgent", "appVersion"], this.props);
    this.props.dispatchEvent(eventPayload);
    this.props.resetBMIWrinkleModal();
  }

  closeHealthAIModal() {
    this.props.resetHealthAIModal();
  }

  showMealPlannerError = () => {
    CustomAlert.show("", safeMetaLabelFinder("mealPlan", "alertFailure"), {
      positiveText: safeMetaLabelFinder("mealPlan", "okay"),
      onPositivePress: () => {
        this.props.resetMealPlannerErrorMsg();
      },
    });
  };

  getBmiStatus(bmiValue) {
    const underWeight = this.getBMIResultsLabel("bmiUnderWeight");
    const normal = this.getBMIResultsLabel("bmiNormal");
    const overWeight = this.getBMIResultsLabel("bmiOverWeight");
    const obese = this.getBMIResultsLabel("bmiObese");
    if (isNaN(bmiValue)) {
      return "";
    }
    if (bmiValue < 18.5) {
      return underWeight;
    } else if (bmiValue < 25) {
      return normal;
    } else if (bmiValue < 30) {
      return overWeight;
    }
    return obese;
  }

  getWrinkleStatus(wrinklePercentage) {
    const noVisiblyWrinkleLabel = this.getWrinkleLabel("noVisiblyWrinkle");
    const shallowWrinkleLabel = this.getWrinkleLabel("shallowWrinkle");
    const moderateWrinkleLabel = this.getWrinkleLabel("moderateWrinkle");
    const deepWrinkleLabel = this.getWrinkleLabel("deepWrinkle");
    const severeWrinkleLabel = this.getWrinkleLabel("severeWrinkle");
    const someWrinkleLabel = this.getWrinkleLabel("someWrinkle");
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
    }
    return severeWrinkleLabel;
  }
  getBMIIndexArray() {
    const lessThanEighteenPointFiveLabel = this.getBMIResultsLabel(
      "lessThanEighteenPointFive"
    );
    const eighteenPointFiveToTwentyFiveLabel = this.getBMIResultsLabel(
      "eighteenPointFiveToTwentyFive"
    );
    const fromTwentyFiveTOThirtyLabel = this.getBMIResultsLabel(
      "fromTwentyFiveTOThirty"
    );
    const overThirtyLabel = this.getBMIResultsLabel("overThirty");

    const bmiUnderWeightLabel = this.getBMIResultsLabel("bmiUnderWeight");
    const bmiNormalLabel = this.getBMIResultsLabel("bmiNormal");
    const bmiOverWeightLabel = this.getBMIResultsLabel("bmiOverWeight");
    const bmiObeseLabel = this.getBMIResultsLabel("bmiObese");
    const indexArray = [
      {
        range: lessThanEighteenPointFiveLabel,
        color: "#f1f864",
        description: bmiUnderWeightLabel,
      },
      {
        range: eighteenPointFiveToTwentyFiveLabel,
        color: "#239d60",
        description: bmiNormalLabel,
      },
      {
        range: fromTwentyFiveTOThirtyLabel,
        color: "#ff9f68",
        description: bmiOverWeightLabel,
      },
      { range: overThirtyLabel, color: "#ff0200", description: bmiObeseLabel },
    ];
    return indexArray;
  }
  getWrinkleLabel = key => {
    return metaLabelFinder("WrinkleIndexResults", key);
  };
  getBMIResultsLabel = key => {
    return metaLabelFinder("BMIResults", key);
  };

  getWrinkleIndexArray() {
    const zeroToNineLabel = this.getWrinkleLabel("zeroToNine");
    const tenToTwentyNineLabel = this.getWrinkleLabel("tenToTwentyNine");
    const thirtyToFortyNineLabel = this.getWrinkleLabel("thirtyToFortyNine");
    const fiftyToSixtyNineLabel = this.getWrinkleLabel("fiftyToSixtyNine");
    const seventyToEightyNineLabel = this.getWrinkleLabel(
      "seventyToEightyNine"
    );
    const nintyToHundredLabel = this.getWrinkleLabel("nintyToHundred");

    const noVisiblyWrinkleLabel = this.getWrinkleLabel("noVisiblyWrinkle");
    const shallowWrinkleLabel = this.getWrinkleLabel("shallowWrinkle");
    const moderateWrinkleLabel = this.getWrinkleLabel("moderateWrinkle");
    const deepWrinkleLabel = this.getWrinkleLabel("deepWrinkle");
    const severeWrinkleLabel = this.getWrinkleLabel("severeWrinkle");
    const someWrinkleLabel = this.getWrinkleLabel("someWrinkle");
    const indexArray = [
      {
        range: zeroToNineLabel,
        color: "#239d60",
        description: noVisiblyWrinkleLabel,
      },
      {
        range: tenToTwentyNineLabel,
        color: "#609d23",
        description: shallowWrinkleLabel,
      },
      {
        range: thirtyToFortyNineLabel,
        color: "#ffb83e",
        description: someWrinkleLabel,
      },
      {
        range: fiftyToSixtyNineLabel,
        color: "#f9e63a",
        description: moderateWrinkleLabel,
      },
      {
        range: seventyToEightyNineLabel,
        color: "#ff6e6d",
        description: deepWrinkleLabel,
      },
      {
        range: nintyToHundredLabel,
        color: "#ff0200",
        description: severeWrinkleLabel,
      },
    ];
    return indexArray;
  }
  pruInfoWithRagModal = () => {
    const { BMIResponse, showWrinkleIndex } = this.props;
    const avatarUrl = {
      uri: `data:image/png;base64,${this.props.bmiImageData}`,
    };
    const { attributes, ageNextBday, bmi } = BMIResponse.lifestyle;
    const bmiValue = Math.floor(bmi);
    const wrinkleValue = attributes && Math.floor(attributes.wrinkle);
    const wrinkleIndexTitle = this.getWrinkleLabel("wrinkleIndexYourIs");
    const bmiIndexTitle = this.getBMIResultsLabel("bmiIndexYourIs");
    const wrinkleClassificationTitle = this.getWrinkleLabel(
      "wrinkleClassification"
    );
    const bmiClassificationTitle = this.getBMIResultsLabel("bmiClassification");
    const valueTitle = this.getWrinkleLabel("valueInPercentage");
    const descriptionTitle = this.getWrinkleLabel("description");
    const classification = this.getWrinkleLabel("classification");
    const age = this.getWrinkleLabel("age");
    const resultArray = [
      {
        key: classification,
        value: showWrinkleIndex
          ? this.getWrinkleStatus(wrinkleValue)
          : this.getBmiStatus(bmiValue),
      },
      { key: age, value: ageNextBday },
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
              borderTopRightRadius: 10,
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

  showCamera = () => {
    if (this.isCameraOpen) return;
    const {
      token,
      calculateBmi,
      justDispatchAction,
      showWrinkleIndex,
    } = this.props;
    const cameraPermission = metaLabelFinder(
      "manageprofile",
      "cameraPermission"
    );
    // const ok = metaLabelFinder(SCREEN_KEY_CHAT_REPORT, KEY_OK);
    // const cancel = metaLabelFinder(
    //   SCREEN_KEY_MANAGE_PROFILE,
    //   KEY_CANCEL
    // );

    this.isCameraOpen = true;

    ImagePicker.openCamera({
      width: 200,
      height: 200,
      compressImageMaxWidth: 200,
      compressImageMaxHeight: 200,
      includeBase64: true,
      useFrontCamera: true,
      compressImageQuality: 0.8,
      photo: "photo",
    })
      .then(image => {
        this.isCameraOpen = false;
        justDispatchAction(CoreActionTypes.PULSE_RESET_BMI);
        if (!isNilOrEmpty(token)) {
          calculateBmi(token, image.data, showWrinkleIndex);
        }
      })
      .catch(error => {
        this.isCameraOpen = false;
        justDispatchAction(CoreActionTypes.PULSE_RESET_BMI);
        if (error.code !== "E_PICKER_CANCELLED" && Platform.OS === "ios") {
          CustomAlert.show(
            "",
            cameraPermission,
            {
              positiveText: "Ok",
              onPositivePress: () => {
                OpenSettings.openSettings();
              },
            },
            {
              negativeText: "Cancel",
              onNegativePress: () => { },
            }
          );
        }
      });
  };
}

DynamicHealthTab.propTypes = {
  gridConfig: PropTypes.object,
  getScreenRenderingConfig: PropTypes.func,
  userPreferences: PropTypes.object,
  dispatch: PropTypes.func,
  registerEvent: PropTypes.func,
  enabledHealthStickers: PropTypes.array,
  resetMealPlannerErrorMsg: PropTypes.func,
  showErrorMsgOnTileClick: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f6",
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#ec1c2e",
    flex: 1,
  },
});
const mapStateToProps = state => {
  return {
    token: state.auth.token,
    profilePicture: state.profile.profilePicture,
    userCountryDetails: state.auth.countryInfo,
    isNotificationProcessed: state.userPreferences.notificationProcessed,
    notificationGranted: state.userPreferences.notificationGranted,
    userPreferences: state.userPreferences,
    userProfile: state.profile,
    termsConditions: state.auth.termsConditions,
    gridConfig: state.screenConfig.dynamicHealth,
    takeSelfie: state.bmi.takeSelfie,
    showWrinkleIndex: state.bmi.showWrinkleIndex,
    showBmiWrinkleResult: state.bmi.showBmiWrinkleResult,
    BMIResponse: state.bmi.BMIResponse,
    bmiImageData: state.bmi.bmiImage,

    meta: state.meta,
    language: state.userPreferences.language,
    commonMeta: state.meta.commonMeta,
    auth: state.auth,
    safeMetaLabelFinder,
    babylonToken: AuthSelector.getBabylonToken(state),
    babylonUserLoggedIn: state.babylonAuth.babylonUserLoggedIn,
    enabledHealthStickers: pathOr(
      ["health", "checkSymptoms", "wellnessGoals", "findHospital", "checkBMI"],
      ["meta", "countryCommonMeta", "enabledHealthStickers"],
      state
    ),
    showErrorMsgOnTileClick: pathOr(
      false,
      ["mealPlanner", "showErrorMsgOnTileClick"],
      state
    ),
  };
};
export default connect(mapStateToProps, {
  getScreenRenderingConfig,
  registerEvent,
  sendEvent,
  calculateBmi: (sessionId, image, showWrinkleIndex) => ({
    context: "MainPage",
    type: CoreActionTypes.KEY_CALCULATE_BMI,
    payload: {
      sessionId,
      data: image,
      KEY_BMI_TITLE,
      bmiFeedbackCall: false,
      showWrinkleIndex,
    },
  }),
  resetBMIError: () => ({
    type: CoreActionTypes.RESET_BMI_ERROR,
  }),
  resetBMIWrinkleModal: () => ({
    type: CoreActionTypes.RESET_BMI_WRINKLE_RESULT,
  }),
  resetHealthAIModal: () => ({
    type: "faceDetection/resetFaceDetection",
    context: "FACE_DETECTION",
    payload: false,
  }),
  resetMealPlannerErrorMsg: () => ({
    type: "mealPlanner/resetMealPlannerLaunchError",
    context: "MealPlanner",
  }),
  dispatchEvent,
  justDispatchAction,
  gotoAccountsTab,
})(DynamicHealthTab);

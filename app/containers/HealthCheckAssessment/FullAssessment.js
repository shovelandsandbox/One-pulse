import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  NativeModules,
  DeviceEventEmitter,
  NativeEventEmitter,
  Platform,
  ActivityIndicator,
  Modal,
  BackHandler,
  requireNativeComponent,
} from "react-native";

import { connect } from "react-redux";
import moment from "moment";
import { OfflineImage } from "react-native-image-offline";
import RNShake from "react-native-shake";
import PropTypes from "prop-types";
import { dispatchEvent } from "../../actions";
import { path, pathOr } from "ramda";
import {configureLineHeight} from "../../utils/lineHeightsUtils";

import {
  colors,
  metaHelpers,
  CoreConstants,
  CoreConfig,
  CoreUtils,
  CoreComponents,
  EventUtils,
  CoreActionTypes,
  CoreSelectors,
  CoreServices,
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
const { NavigationService } = CoreServices;

import { activeTheme } from "../../themes";
import nutritionStyle from "./NutritionStyle";
import fastyles from "./FullAssessmentStyle";
import {
  ACTIVITY,
  NUTRITION,
  MOOD,
  ASSESSMENT,
  CLOSE,
  CLOSE_PAGE,
  BABYLON_LOGO_BLUE,
} from "../../config/images";
import DiseaseRisk from "../../components/DiseaseRisk/DiseaseRisk";
import DTModal from "../../components/DTModal/DTModal";
import ItemBar from "../../components/ItemBar/ItemBar";
import MakeChange from "../../components/MakeChange/MakeChange";

import {
  healthCategoriesDataSelector,
  healthMetricsSelector,
  categoriesDataStatusSelector,
  genderSelector,
} from "../../selectors/HASelectors";

const { pageKeys } = CoreConfig;
const { AppButton } = CoreComponents;

const RNDigitalTwinView = requireNativeComponent("RNDigitalTwinView");
const { isNilOrEmpty } = CoreUtils;
const { AppStatusBar } = CoreComponents;

const {
  COMMON_KEY_CROSS_ICON,
  SCREEN_KEY_DIGITAL_TWIN,
  SCREEN_KEY_HEALTH_CHECK_GET_STARTED,
} = CoreConstants;

const { width, height } = CoreConfig;
const { BridgeEmitter } = NativeModules;
// const chatBridgeEmitter = new NativeEventEmitter(BridgeEmitter);
const KEY_DISEASE_RISK = "diseasaerisk";
const KEY_MAKE_CHANGE = "makechange";
const KEY_KEEP_IT_UP = "keepitup";
const KEY_MINUTE = "minute";
const KEY_FOOTER_TEXT = "footerText";
const KEY_START_ASSESSMENT = "startassessment";
const KEY_RETAKE_ASSESSMENT = "reTakeAssessment";
const KEY_INITIAL_FLOW_FULL_ASSESSMENT = "fullassessmentbody";
const KEY_FOOTER_END_TEXT = "footerTextEnd";
const KEY_ABOUT = "healthcheckgetstartedaboutlabel";
const HEALTH_CHECK_TAB_TITLE = "healthchecktabtitle";

// const isIOS = Platform.OS === "ios";
// const eventEmitter = isIOS ? chatBridgeEmitter : DeviceEventEmitter;

// eslint-disable-next-line react/require-optimization
class FullAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      modalVisible: false,
      organDetailsModalFullScreen: false,
    };
    this.refreshData = true;
    this.onClose = this.onClose.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onOkay = this.onOkay.bind(this);
    this.handleDigitalTwinCategory = this.handleDigitalTwinCategory.bind(this);
    this.getStatusDot = this.getStatusDot.bind(this);
    this.loadOrganDetailsCliked = this.loadOrganDetailsCliked.bind(this);
    this.loadOrganDetails = false;
    this.diseaseDetailsCliked = false;
    this.startAssessment = this.startAssessment.bind(this);
    this.didFocus = this.didFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.eventHandlersAttached = false;
    this.digitalTwinShakedEventHandler = this.digitalTwinShakedEventHandler.bind(
      this
    );
    this.listeners = [];
  }

  static navigationOptions = ({ navigation }) => {
    // test params since will be undefined until componentDidMount:
    const tabBarLabel =
      navigation.state.params && navigation.state.params.tabBarLabel
        ? navigation.state.params.tabBarLabel
        : "";

    return {
      tabBarLabel,
    };
  };

  translateTabBarLabels = () => {
    const {
      navigation: { setParams },
    } = this.props;
    const label = metaHelpers.findElement(
      SCREEN_KEY_DIGITAL_TWIN,
      HEALTH_CHECK_TAB_TITLE
    ).label;
    // update dynamically tabBarLabel
    setParams({
      tabBarLabel: label,
    });
  };

  attachEventListeners = () => {
    this.listeners.push(
      // eventEmitter.addListener(
      //   "DigitalTwinCategoryKey",
      //   this.handleDigitalTwinCategory
      // )
    );
    if (isIOS) {
      RNShake.addEventListener(
        "ShakeEvent",
        this.digitalTwinShakedEventHandler
      );
    }
  };

  digitalTwinShakedEventHandler = () => {
    const { updateDigitalTwinResponse } = this.props;

    const data = {
      digitalTwinShaked: true,
    };
    updateDigitalTwinResponse(data);
  };

  removeEventListeners = () => {
    EventUtils.removeListeners(this.listeners);
    this.listeners = [];
    if (isIOS) {
      RNShake.removeEventListener("ShakeEvent");
    }
  };

  componentDidMount() {
    const { getHealthCategories, navigation } = this.props;
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackPress
    );
    navigation.addListener("willBlur", this.onBlur);
    navigation.addListener("didFocus", this.didFocus);
    this.props.getHealthCheckInitialFlows();
    if (
      navigation.state.params != null &&
      navigation.state.params.fromNutrition === undefined &&
      this.refreshData
    ) {
      this.props.showLoader();
      getHealthCategories();
    }
    if (
      navigation.state.params &&
      !navigation.state.params.fromHealthCheckHome
    ) {
      this.getStatus();
    }
    if (!this.eventHandlersAttached) {
      this.attachEventListeners();
      this.eventHandlersAttached = true;
    }
  }

  handleBackPress = () => {
    const fromHealthAIScreen = pathOr(
      false,
      ["navigation", "state", "params", "fromHealthAIScreen"],
      this.props
    );
    if (fromHealthAIScreen) {
      NavigationService.goBack();
    } else {
      this.props.navigation.popToTop();
    }
    return true;
  };

  logScreenEvent = () => {
    const { auth } = this.props;
    const appVersion = path(["userAgent", "appVersion"], auth);
    const eventData = {
      type: "ScreenEvent",
      tags: ["healthassessment", "babylon", "health", "DigitalTwin"],
      name: "pulse.babylon.digitalTwin",
      source: "pulse",
      attributes: {
        appVersion,
      },
    };
    this.props.dispatchEvent(eventData);
  };

  didFocus() {
    if (!this.eventHandlersAttached) {
      this.attachEventListeners();
      this.eventHandlersAttached = true;
    }
    this.logScreenEvent();
  }

  componentWillUnmount() {
    if (this.eventHandlersAttached) {
      this.removeEventListeners();
      this.eventHandlersAttached = false;
    }
    this.backHandler.remove();
  }
  onBlur() {
    if (this.eventHandlersAttached) {
      this.removeEventListeners();
      this.eventHandlersAttached = false;
    }
  }

  componentWillReceiveProps(nextProps) {
    const { getHealthCategoriesById } = this.props;
    if (nextProps.language !== this.props.language) {
      this.props.getInitialFlows();
      this.translateTabBarLabels();
    }
    this.loadOrganDetails = this.props.modalResponse;
    if (
      this.loadOrganDetails &&
      nextProps.getHealthCategoriesData.categoriesDetails != null
    ) {
      this.setState({ modalVisible: true });
      this.loadOrganDetails = false;
    }
    if (nextProps.healthCategoryName !== this.props.healthCategoryName) {
      getHealthCategoriesById(nextProps.healthCategoryName);
    }
    if (
      nextProps.navigation.state.params &&
      !nextProps.navigation.state.params.fromHealthCheckHome
    ) {
      if (this.props.navigation.state.params != null) {
        if (
          nextProps.navigation.state.params.healthCategory !==
          this.props.navigation.state.params.healthCategory
        ) {
          const healthCategory =
            nextProps.navigation.state.params.healthCategory;
          getHealthCategoriesById(healthCategory);
        }
      }
    }
  }

  loadOrganDetailsCliked() {
    this.loadOrganDetails = false;
    this.setState({ modalVisible: false });
  }

  onClose() {
    this.props.hideDigitalTwinDialog();
  }

  onSelect(layer) {
    const { selectedLayer } = this.props;
    selectedLayer(layer);
  }

  onOkay() {
    const {
      updateDigitalTwinLayer,
      userSelectedLayer,
      hideDigitalTwinDialog,
    } = this.props;
    hideDigitalTwinDialog();
    updateDigitalTwinLayer(userSelectedLayer);
  }

  horizontalLine() {
    return <View style={fastyles.horizontalLine} />;
  }

  findElement = (elementKey) =>
    metaHelpers.findElement(SCREEN_KEY_DIGITAL_TWIN, elementKey);

  handleIconPress(data) {
    let name = "";
    const bodyLabel = this.findElement(KEY_INITIAL_FLOW_FULL_ASSESSMENT).label;

    if (data.flowId.includes("initial_superflow")) {
      name = bodyLabel;
    } else {
      name = data.name;
    }
    this.refreshData = false;
    this.props.goToNutrition({
      screenTitle: name,
      flowId: data.flowId,
      value: data,
    });
  }

  renderIcon(icon) {
    this.icon = icon;
    if (
      icon.includes("activity_onboarding") ||
      icon.includes("activity_on_boarding")
    ) {
      return ACTIVITY;
    } else if (
      icon.includes("nutrition_onboarding") ||
      icon.includes("nutrition_on_boarding")
    ) {
      return NUTRITION;
    } else if (
      icon.includes("mood_onboarding") ||
      icon.includes("mood_on_boarding")
    ) {
      return MOOD;
    } else if (icon.includes("initial_superflow")) {
      return ASSESSMENT;
    }
    return null;
  }

  getStatusFromCategoriesDetails = (category) => {
    const { healthCategoriesData } = this.props;
    if (healthCategoriesData && healthCategoriesData.id === category) {
      return healthCategoriesData.status;
    }
  };

  getStatusDot(flowId) {
    const {
      categoriesDataStatus,
      healthCategoriesData,
      getHealthCategoriesData,
    } = this.props;
    const { marginLeft, status } = CoreUtils.getHealthFlowStatusDotInfo(
      flowId,
      categoriesDataStatus,
      healthCategoriesData,
      getHealthCategoriesData
    );
    const dimension = 10;
    const dotStyle = {
      position: "absolute",
      width: dimension,
      height: dimension,
      borderRadius: dimension / 2,
      zIndex: 15,
      marginLeft: marginLeft,
    };
    return {
      ...dotStyle,
      backgroundColor: CoreUtils.getStatusDotColor(status),
    };
  }

  getStatus() {
    const { navigation } = this.props;
    const categoryDetails = navigation.state.params.categoryDetails;
    if (categoryDetails != null) {
      const status = categoryDetails.status;
      switch (status) {
        case "OK":
          return fastyles.greenCircle;
        case "MODERATE":
          return fastyles.orangeCircle;
        case "ALERT":
          return fastyles.redCircle;
        case "CRITICAL":
          return fastyles.redCircle;
        case "PREVIOUSLY DIAGNOSED":
          return fastyles.blueCircle;
        case "CURRENTLY DIAGNOSED":
          return fastyles.blueCircle;
        default:
          return fastyles.defaultCircle;
      }
    }
  }

  moveDTViewToTop = () => {
    if (this.digitalTwinContainer) {
      this.digitalTwinContainer.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  handleDigitalTwinCategory(e) {
    const {
      updateDigitalTwinResponse,
      getHealthCategoriesResponse,
      getHealthCategoriesById,
    } = this.props;
    updateDigitalTwinResponse(e);
    const isHealthCategoryIdEvent = e.hasOwnProperty("healthCategoryID");
    if (isHealthCategoryIdEvent) {
      getHealthCategoriesResponse([]);
      this.setState({ modalVisible: true });
      this.setState({ organDetailsModalFullScreen: false });
      getHealthCategoriesById(e.healthCategoryName);
    } else {
      this.moveDTViewToTop();
    }
  }

  renderMenuItem(data, index) {
    const { categoriesDataStatus, healthCategoriesData } = this.props;
    let opacityValue = 1;
    if (
      !CoreUtils.isDataAvailableForFlow(
        data.flowId,
        categoriesDataStatus,
        healthCategoriesData
      )
    ) {
      opacityValue = 0.5;
    }

    const bodyLabel = this.findElement(KEY_INITIAL_FLOW_FULL_ASSESSMENT).label;

    return (
      <View key={index} style={fastyles.menuIconWrapper}>
        <TouchableOpacity onPress={this.handleIconPress.bind(this, data)}>
          <View style={{ width: 30 }}>
            <View style={this.getStatusDot(data.flowId)} />
            <Image
              source={this.renderIcon(data.flowId)}
              opacity={opacityValue}
              style={fastyles.menuIcon}
              resizeMode="contain"
            />
          </View>
          <Text style={{
            ...fastyles.menuText,
            ...configureLineHeight("12")
            }}>
            {data.flowId.includes("initial_superflow") ? bodyLabel : data.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  Capitalize(str) {
    const capital = str.charAt(0).toUpperCase() + str.slice(1);
    return capital;
  }
  renderCellComponent() {
    const { navigation } = this.props;
    return (
      <View>
        <Text style={{
          ...fastyles.organ,
          ...configureLineHeight("18")
          }}>{navigation.state.params.name}</Text>
        <Text style={{
          ...fastyles.reportText,
          ...configureLineHeight("14")
          }}>
          {categoryDetails.categoriesDetails}
        </Text>
      </View>
    );
  }

  increaseSize() {
    this.setState({ organDetailsModalFullScreen: true });
    this.setModalVisible(true);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  formatDate(date) {
    if (isNilOrEmpty(date)) {
      return "";
    }
    const formattedDate = moment(date, "YYYY-MM-DD hh:mm:ss Z").format(
      "DD-MM-YYYY hh:mm A"
    );
    return formattedDate;
  }

  startAssessment(skipPreviouslyAnswered, retakeAssessment) {
    const {
      healthCategoriesData,
      babylonChatInitialisation,
      openHealthCheckConversation,
    } = this.props;
    this.setState({ modalVisible: false });
    babylonChatInitialisation(false);
    openHealthCheckConversation(
      healthCategoriesData.flowId,
      skipPreviouslyAnswered
    );
    this.props.goToChatScreen({
      fromHealthAssesment: true,
      organDetailsPage: true,
      fromInitialFlow: false,
      retakeAssessment: retakeAssessment,
    });
  }

  onReAssesment() {
    const { healthCategoriesData } = this.props;
    this.startAssessment(
      healthCategoriesData.dataAvailability === "OUTDATED",
      true
    );
  }

  renderFooterView() {
    const startassessmentLabel = this.findElement(KEY_START_ASSESSMENT).label;
    const reTakeAssessmentLabel = this.findElement(KEY_RETAKE_ASSESSMENT).label;
    let footerTextLabel = this.findElement(KEY_FOOTER_TEXT).label;
    const footerEndTextLabel = this.findElement(KEY_FOOTER_END_TEXT).label;

    const minuteLabel = this.findElement(KEY_MINUTE).label;
    let buttonTitle = "";

    const { healthCategoriesData } = this.props;
    const category = healthCategoriesData.name
      ? healthCategoriesData.name.toLowerCase()
      : "";
    footerTextLabel = footerTextLabel.replace("${0}", category);
    if (healthCategoriesData.dataAvailability !== "MISSING") {
      buttonTitle = reTakeAssessmentLabel;
    } else {
      buttonTitle = startassessmentLabel;
    }
    return (
      <View>
        {healthCategoriesData.dataAvailability === "MISSING" && (
          <View style={nutritionStyle.footerView}>
            <View style={nutritionStyle.footerContainerView}>
              <Image
                style={[
                  nutritionStyle.imgStyle,
                  nutritionStyle.healthCheckIcon,
                ]}
                resizeMode="contain"
                source={this.renderIcon("Full Assessment")}
              />
              <Text style={{
                ...nutritionStyle.footertext,
                ...configureLineHeight("15")
                }}>
                {footerTextLabel}
                {footerEndTextLabel}
              </Text>
            </View>
            <View style={nutritionStyle.footerTime}>
              <Text style={{
                ...nutritionStyle.minText,
                ...configureLineHeight("14")
                }}>
                {healthCategoriesData.duration}
                {minuteLabel}
              </Text>
            </View>
            <AppButton
              type={[nutritionStyle.btn, nutritionStyle.primary]}
              title={buttonTitle}
              press={() => this.startAssessment(true)}
            />
          </View>
        )}
        {healthCategoriesData.dataAvailability !== "MISSING" && (
          <View>
            <AppButton
              type={[nutritionStyle.btn, nutritionStyle.primary]}
              title={buttonTitle}
              press={() => this.onReAssesment(healthCategoriesData)}
            />
          </View>
        )}
      </View>
    );
  }

  renderOrganDetailsModalHeader() {
    return (
      <View style={fastyles.backIcnWrapper1}>
        {/* <TouchableOpacity style={fastyles.swipeableArea} /> */}
        <TouchableOpacity
          style={fastyles.backIcnWrapper}
          onPress={() => this.setState({ modalVisible: false })}
        >
          <OfflineImage
            fallbackSource={CLOSE}
            accessibilityLabel="close"
            accesible
            key={COMMON_KEY_CROSS_ICON}
            style={fastyles.closeBtn}
            source={{
              uri: "",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderOrganDetailsReportSummary() {
    const { healthCategoriesData } = this.props;
    return (
      <View>
        <Text style={{
          ...fastyles.organ,
          ...configureLineHeight("18")
          }}>
          {this.Capitalize(healthCategoriesData.name)}
        </Text>
        {healthCategoriesData.dataAvailability != "MISSING" && (
          <Text style={{
            ...fastyles.reportText,
            ...configureLineHeight("14")
            }}>
            {healthCategoriesData.overview}
          </Text>
        )}
      </View>
    );
  }

  renderHealthMetricsSelfAccessInfo() {
    const { healthMetrics } = this.props;
    if (healthMetrics && healthMetrics.selfAccess) {
      return (
        <View>
          {healthMetrics.selfAccess.items.map((res) => (
            // eslint-disable-next-line react/jsx-key
            <View>
              <ItemBar items={res} />
            </View>
          ))}
        </View>
      );
    }
    return null;
  }

  renderRecommendation(shouldRender, label) {
    if (!shouldRender) {
      return null;
    }
    return (
      <Text
        style={{
          fontFamily: Platform.OS === "ios" ? "PruSansNormal-Demi" : "pru-bold",
          color: "#A9A9A9",
          fontSize: 20,
          textAlign: "center",
          ...configureLineHeight("20")
        }}
      >
        {label}
      </Text>
    );
  }

  renderDiseaseRisk() {
    const diseasaeriskLabel = this.findElement(KEY_DISEASE_RISK).label;
    const { healthCategoriesData, healthMetrics } = this.props;
    const hasDiseaseRisk = healthMetrics && !!healthMetrics.diseaseRisk;
    if (healthCategoriesData.dataAvailability === "MISSING") {
      return null;
    }
    return (
      <React.Fragment>
        <View
          style={[
            fastyles.rowFlexMt,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            },
          ]}
        >
          <Text style={{
            ...fastyles.reportDescTitle,
            ...configureLineHeight("15")
            }}>
            {hasDiseaseRisk ? diseasaeriskLabel : ""}
          </Text>
          <Text style={{
            ...fastyles.reportTime,
            ...configureLineHeight("15")
            }}>
            {hasDiseaseRisk
              ? this.formatDate(healthMetrics.diseaseRisk.calculationDateTime)
              : ""}
          </Text>
        </View>
        <View style={fastyles.mg_tp19}>
          {hasDiseaseRisk &&
            healthMetrics.diseaseRisk.items.map((res, index) => (
              <View key={index}>
                <DiseaseRisk
                  loadOrganDetailsCliked={this.loadOrganDetailsCliked}
                  fullAssessment="fullAssessment"
                  risks={res}
                  {...this.props}
                />
              </View>
            ))}
        </View>
      </React.Fragment>
    );
  }

  renderActions() {
    const { healthCategoriesData } = this.props;
    healthCategoriesData.action &&
      healthCategoriesData.action.map((action) =>
        action.compoenent3 === "IMPROVE" ? (
          <MakeChange actions={action} />
        ) : null
      );
    healthCategoriesData.action &&
      healthCategoriesData.action.map((action) =>
        action.compoenent3 === "MAINTAIN" ? (
          <MakeChange actions={action} />
        ) : null
      );
  }

  renderModalView() {
    const keepitupLabel = this.findElement(KEY_KEEP_IT_UP).label;
    const makechangeLabel = this.findElement(KEY_MAKE_CHANGE).label;
    const aboutLabel = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_GET_STARTED,
      KEY_ABOUT
    ).label;
    const { healthCategoriesData, healthMetrics } = this.props;
    const { makeAChange, keepItUp } = CoreUtils.parseRecommendations(
      healthCategoriesData
    );
    return (
      <View style={{ backgroundColor: "#FFFFFF" }}>
        {this.state.organDetailsModalFullScreen && <AppStatusBar />}
        <ScrollView>
          {healthCategoriesData && (
            <View style={[activeTheme.whiteBackground, fastyles.reportWrapper]}>
              {this.renderOrganDetailsModalHeader()}
              {this.renderOrganDetailsReportSummary()}
              <View>{this.renderHealthMetricsSelfAccessInfo()}</View>
              {this.renderDiseaseRisk()}
              <View style={{ flex: 1, marginTop: 5, marginBottom: 5 }}>
                {this.renderFooterView()}
              </View>
              <View style={fastyles.mg_tp19} />
              <View>
                {this.renderRecommendation(keepItUp, keepitupLabel)}
                {this.renderRecommendation(makeAChange, makechangeLabel)}
                {this.renderActions(healthCategoriesData.action)}
              </View>
              <View style={fastyles.mg_tp17}>
                {healthCategoriesData.dataAvailability.toString() !==
                  "MISSING" && <Text style={{
                    ...fastyles.about,
                    ...configureLineHeight("15")
                    }}>{aboutLabel}</Text>}
                {healthCategoriesData.dataAvailability.toString() !==
                  "MISSING" && (
                  <Text style={{
                    ...fastyles.aboutDesc,
                    ...configureLineHeight("14")
                    }}>
                    {healthCategoriesData.description}
                  </Text>
                )}
              </View>
            </View>
          )}
          {!healthCategoriesData && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={colors.grey63} />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  renderOrganDetailsView() {
    const { organDetailsModalFullScreen } = this.state;

    return (
      <Modal
        transparent={!organDetailsModalFullScreen}
        visible={this.state.modalVisible}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            marginTop: organDetailsModalFullScreen ? 1 : 300,
          }}
        >
          {!organDetailsModalFullScreen && (
            <TouchableOpacity
              onPress={() => {
                this.increaseSize();
              }}
            >
              {this.renderModalView()}
            </TouchableOpacity>
          )}
          {organDetailsModalFullScreen && <View>{this.renderModalView()}</View>}
        </View>
      </Modal>
    );
  }

  renderDTLayerSelectorMenu() {
    return (
      <DTModal
        visible={this.props.visible}
        onClose={this.onClose}
        onSelect={this.onSelect}
        onOkay={this.onOkay}
        {...this.props}
      />
    );
  }

  renderHealthFlowsMenu() {
    const { healthFlows } = this.props;
    return (
      <View style={fastyles.wrapper}>
        {healthFlows.initialFlows &&
          healthFlows.initialFlows.map((data, index) =>
            this.renderMenuItem(data, index)
          )}
      </View>
    );
  }

  renderDT() {
    const { gender } = this.props;
    return (
      <View
        style={{
          zIndex: 999,
          width: width,
          height: height * 0.8,
          backgroundColor: "#fff",
        }}
      >
        {!isNilOrEmpty(gender) && (
          <RNDigitalTwinView gender={gender} style={fastyles.twinImage} />
        )}
      </View>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        {this.renderHealthFlowsMenu()}
        <ScrollView
          ref={(ref) => {
            this.digitalTwinContainer = ref;
          }}
          scrollEnabled={false}
        >
          {this.renderDTLayerSelectorMenu()}
          {this.renderDT()}
          {this.renderOrganDetailsView()}
        </ScrollView>
      </View>
    );
  }
}

FullAssessment.propTypes = {
  healthCategoriesData: PropTypes.object,
  categoriesDataStatus: PropTypes.object,
  dispatchEvent: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  healthFlows: state.healthCheck.healthFlows,
  getHealthCategoriesData: state.healthCheck.healthCategories,
  healthCategoriesData: healthCategoriesDataSelector(
    state.healthCheck.healthCategories
  ),
  healthMetrics: healthMetricsSelector(state.healthCheck.healthCategories),
  unityStartupComplete: state.digitalTwin.unityStartupComplete,
  healthCategoryName: state.digitalTwin.healthCategoryName,
  healthCategoryID: state.digitalTwin.healthCategoryID,
  visible: state.digitalTwin.visible,
  userSelectedLayer: state.digitalTwin.selectedLayer,
  categoriesDataStatus: categoriesDataStatusSelector(state.healthCheck),
  gender: genderSelector(state.profile),
  modalResponse: state.healthCheck.modalResponse,
  meta: state.meta,
  babylonToken: AuthSelector.getBabylonToken(state),
  language: state.userPreferences.language,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  updateDigitalTwinResponse: data => {
    if (data.hasOwnProperty("unityStartupComplete")) {
      return { type: CoreActionTypes.UNITY_STARTUP_COMPLETED };
    }
    if (data.hasOwnProperty("digitalTwinLayerType")) {
      return {
        type: CoreActionTypes.DIGITAL_TWIN_LAYER_TYPE_CHANGED,
        payload: data.digitalTwinLayerType,
      };
    }
    if (data.hasOwnProperty("healthCategoryID")) {
      return {
        type: CoreActionTypes.HEALTH_CATEGORY_CHANGED,
        payload: {
          healthCategoryName: data.healthCategoryName,
          healthCategoryID: data.healthCategoryID,
        },
      };
    }
    if (data.hasOwnProperty("digitalTwinShaked")) {
      return {
        context: pageKeys.FULL_ASSESSMENT,
        type: CoreActionTypes.DIGITAL_TWIN_SHAKED,
      };
    }
    return {
      context: pageKeys.FULL_ASSESSMENT,
      type: CoreActionTypes.REFRESH_DIGITAL_TWIN,
    };
  },
  digitalTwinShaked: () => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.DIGITAL_TWIN_SHAKED,
  }),
  getHealthCategories: () => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.FETCH_HEALTH_CATEGORIES,
  }),
  getHealthCategoriesResponse: payload => ({
    type: CoreActionTypes.HEALTH_CATEGORIES_SUCCESS,
    payload,
  }),
  getHealthCategoriesById: healthCategory => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.FETCH_HEALTH_CATEGORIES_BY_ID,
    payload: {
      healthCategory,
    },
  }),
  hideDigitalTwinDialog: () => ({
    type: CoreActionTypes.HIDE_DIGITAL_TWIN_LAYER_DIALOG,
  }),
  updateDigitalTwinLayer: digitalTwinLayerType => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.UPDATE_DIGITAL_TWIN_LAYER,
    payload: {
      digitalTwinLayerType,
    },
  }),
  selectedLayer: payload => ({
    type: CoreActionTypes.SELECTED_LAYER,
    payload,
  }),
  babylonChatInitialisation: () => ({
    context: pageKeys.HA_GET_STARTED,
    type: CoreActionTypes.INIT_BABYLON_CHAT,
    payload: {
      startConversation: false,
    },
  }),
  getHealthCheckInitialFlows: () => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.GET_HEALTH_FLOWS,
  }),
  getInitialFlows: () => ({
    context: pageKeys.HA_GET_STARTED,
    type: CoreActionTypes.GET_HEALTH_FLOWS,
  }),
  openHealthCheckConversation: (flowId, skipPreviouslyAnswered) => ({
    context: pageKeys.HA_GET_STARTED,
    type: CoreActionTypes.OPEN_HEALTH_CHECK_CONVERSATION,
    payload: {
      flowId,
      skipPreviouslyAnswered,
    },
  }),
  goToChatScreen: params => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.GO_TO_CHAT_SCREEN,
    payload: params,
  }),
  goToNutrition: params => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.GO_TO_NUTRITION,
    payload: {
      params,
    },
  }),
  showLoader: () => ({
    type: CoreActionTypes.TOGGLE_LOADER,
    value: true,
  }),
  dispatchEvent,
})(FullAssessment);

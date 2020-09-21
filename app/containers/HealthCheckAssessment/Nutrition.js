import React from "react";
import { Text, View, ScrollView, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  CoreConstants,
  EventUtils,
  events,
} from "@pru-rt-internal/pulse-common";
import styles from "./NutritionStyle";
import BodyOrganList from "./BodyOrgansList";
import CategoryDetails from "./CategoryDetails";
import { Header } from "../../components/ChatComponent/Header";
import { dispatchEvent } from "../../actions";
import moment from "moment";
import { path } from "ramda";
import { configureLineHeight } from "../../utils/lineHeightsUtils";

const { pageKeys } = CoreConfig;
const {
  COMMON_ERROR_KEY_UNABLE_TO_START_CHAT,
  SCREEN_KEY_DIGITAL_TWIN,
} = CoreConstants;
const KEY_INITIAL_FLOW_FULL_ASSESSMENT = "fullassessmentbody";

class Nutrition extends React.Component {
  constructor(props) {
    super(props);
    this.startAssessment = this.startAssessment.bind(this);
    this.retakeAssesment = this.retakeAssesment.bind(this);
    this.state = {
      refreshData: false,
      currentHealthCategory: "full_assessment",
    };
    this.goBack = this.goBack.bind(this);
    this.listeners = [];
    if (props.addCustomBackHandler) {
      props.addCustomBackHandler(this.goBack);
    }
  }
  componentDidMount() {
    const {
      navigation,
      getHealthCategories,
      getHealthCategoriesById,
    } = this.props;
    const healthCategotyFlowID = navigation.state.params.flowId;
    let healthCategory;
    const currDateTime = moment()
      .utc()
      .format("YYYY-MM-DDTHH:mm:ss");
    if (
      healthCategotyFlowID.includes("activity_onboarding") ||
      healthCategotyFlowID.includes("activity_on_boarding")
    ) {
      healthCategory = "activity";
      this.setState({
        currentHealthCategory: healthCategory,
      });
    } else if (
      healthCategotyFlowID.includes("nutrition_onboarding") ||
      healthCategotyFlowID.includes("nutrition_on_boarding")
    ) {
      healthCategory = "nutrition";
      this.setState({
        currentHealthCategory: healthCategory,
      });
    } else if (
      healthCategotyFlowID.includes("mood_onboarding") ||
      healthCategotyFlowID.includes("mood_on_boarding")
    ) {
      healthCategory = "mood";
      this.setState({
        currentHealthCategory: healthCategory,
      });
    }
    if (navigation.state.params.flowId.includes("initial_superflow")) {
      getHealthCategories();
    } else {
      getHealthCategoriesById(healthCategory);
    }
  }

  goBack() {
    this.props.goToFullAssessment();
  }

  componentWillUnmount() {
    EventUtils.removeListeners(this.listeners);
  }

  // eslint-disable-next-line complexity
  componentWillReceiveProps(nextProps) {
    const {
      navigation,
      getHealthCategoriesById,
      getHealthCategoriesResponse,
      getHealthCategories,
      language,
    } = this.props;
    let healthCategory;

    const healthCategotyFlowID = navigation.state.params.flowId;
    if (
      healthCategotyFlowID.includes("activity_onboarding") ||
      healthCategotyFlowID.includes("activity_on_boarding")
    ) {
      healthCategory = "activity";
      this.setState({
        currentHealthCategory: healthCategory,
      });
    } else if (
      healthCategotyFlowID.includes("nutrition_onboarding") ||
      healthCategotyFlowID.includes("nutrition_on_boarding")
    ) {
      healthCategory = "nutrition";
      this.setState({
        currentHealthCategory: healthCategory,
      });
    } else if (
      healthCategotyFlowID.includes("mood_onboarding") ||
      healthCategotyFlowID.includes("mood_on_boarding")
    ) {
      healthCategory = "mood";
      this.setState({
        currentHealthCategory: healthCategory,
      });
    }
    if (!navigation.state.params.flowId.includes("initial_superflow")) {
      if (
        nextProps.navigation.state.params.refreshCategoriesDetails &&
        !this.state.refreshData
      ) {
        this.setState({ refreshData: true });
        getHealthCategoriesResponse([]);
        getHealthCategoriesById(healthCategory);
      }
    }
    if (nextProps.language !== language) {
      getHealthCategoriesResponse([]);
      if (navigation.state.params.flowId.includes("initial_superflow")) {
        getHealthCategories();
      } else {
        getHealthCategoriesById(healthCategory);
      }
    }
  }

  componentWillMount() {
    const { getHealthCategoriesResponse } = this.props;
    getHealthCategoriesResponse([]);
  }

  Capitalize(str) {
    const capital = str.charAt(0).toUpperCase() + str.slice(1);
    return capital;
  }

  logClickEvent = (name, screenTitle) => {
    const { auth } = this.props;
    const appVersion = path(["userAgent", "appVersion"], auth);
    const eventData = {
      type: "ClickEvent",
      tags: ["healthassessment", "babylon", "health"],
      name,
      source: "pulse",
      attributes: {
        appVersion,
        screenTitle,
      },
    };
    this.props.dispatchEvent(eventData);
  };

  startAssessment() {
    const { getHealthCategoriesData, navigation } = this.props;
    this.props.babylonChatInitialisation(false);
    this.setState({ refreshData: false });
    this.props.openHealthCheckConversation(
      getHealthCategoriesData.categoriesDetails[0].flowId,
      true
    );
    this.logClickEvent(
      "pulse.babylon.healthAssessment.startAssessment",
      navigation.state.params.screenTitle
    );
    this.props.goToChatScreen({
      fromHealthAssesment: true,
      fromNutrition: true,
      flowId: navigation.state.params.flowId,
      screenTitle: navigation.state.params.screenTitle,
      fromInitialFlow: false,
      category: this.state.currentHealthCategory,
      organDetailsPage: false,
      healthCategory: null,
    });
  }

  retakeAssesment() {
    const { getHealthCategoriesData, navigation } = this.props;
    const unableToStart = metaHelpers.findCommon(
      COMMON_ERROR_KEY_UNABLE_TO_START_CHAT
    ).label;
    this.props.babylonChatInitialisation(false);
    this.setState({ refreshData: false });
    if (getHealthCategoriesData.categoriesDetails != null) {
      if (getHealthCategoriesData.categoriesDetails[0] != null) {
        let skipPreviouslyAnswered = false;
        if (
          getHealthCategoriesData.categoriesDetails[0].dataAvailability ===
            "MISSING" ||
          getHealthCategoriesData.categoriesDetails[0].dataAvailability ===
            "OUTDATED"
        ) {
          skipPreviouslyAnswered = true;
        }
        //alert(skipPreviouslyAnswered)
        this.props.openHealthCheckConversation(
          getHealthCategoriesData.categoriesDetails[0].flowId,
          skipPreviouslyAnswered
        );
        this.logClickEvent(
          "pulse.babylon.healthAssessment.retakeAssessment",
          navigation.state.params.screenTitle
        );
        this.props.goToChatScreen({
          fromHealthAssesment: true,
          fromNutrition: true,
          screenTitle: navigation.state.params.screenTitle,
          flowId: navigation.state.params.flowId,
          fromInitialFlow: false,
          category: this.state.currentHealthCategory,
          retakeAssessment: true,
          organDetailsPage: false,
          healthCategory: null,
        });
      } else {
        alert(unableToStart);
      }
    }
  }

  // eslint-disable-next-line complexity
  render() {
    const { navigation, getHealthCategoriesData } = this.props;
    let loadList = true;
    if (navigation.state.params.organDetailsPage != undefined) {
      loadList = false;
    } else {
      loadList = true;
    }
    const bodyLabel = metaHelpers.findElement(
      SCREEN_KEY_DIGITAL_TWIN,
      KEY_INITIAL_FLOW_FULL_ASSESSMENT
    ).label;
    let screenTitle = "";
    if (navigation.state.params.flowId.includes("initial_superflow")) {
      screenTitle = bodyLabel;
    } else {
      if (getHealthCategoriesData.categoriesDetails != undefined) {
        screenTitle = getHealthCategoriesData.categoriesDetails[0].name;
      }
    }
    return getHealthCategoriesData.categoriesDetails ? (
      <View style={styles.container}>
        <Header
          leftIconType="back"
          onLeftPress={e => {
            e.preventDefault();
            this.props.navigation.goBack();
            this.props.showLoader();
            this.props.getHealthCategories();
          }}
          onRightPress={() => {}}
          showRightIcon={false}
          showRightLogo={true}
        />
        <Text style={{
          ...styles.headerText,
          ...configureLineHeight("22")
          }}>{screenTitle}</Text>
        {loadList &&
          (navigation.state.params.flowId.includes("initial_superflow") ||
            navigation.state.params.organDetailsPage) && (
            <BodyOrganList
              organList={getHealthCategoriesData}
              navigation={navigation}
            />
          )}
        {navigation.state.params.organDetailsPage && (
          <BodyOrganList
            organList={getHealthCategoriesData}
            navigation={navigation}
          />
        )}
        {!navigation.state.params.flowId.includes("initial_superflow") &&
          !navigation.state.params.organDetailsPage &&
          getHealthCategoriesData !== undefined && (
            <ScrollView>
              <CategoryDetails
                organDetails={getHealthCategoriesData.categoriesDetails}
                startAssessment={this.startAssessment}
                navigation={navigation}
                retakeAssesment={this.retakeAssesment}
              />
            </ScrollView>
          )}
      </View>
    ) : (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 10,
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
}

Nutrition.propTypes = {
  auth: PropTypes.object,
  dispatchEvent: PropTypes.func,
  navigation: PropTypes.object,
};

const mapStateToProps = state => ({
  nutritionData: state.healthCheck.nutritionData,
  getHealthCategoriesData: state.healthCheck.healthCategories,
  meta: state.meta,
  language: state.userPreferences.language,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  showLoader: () => ({
    type: CoreActionTypes.TOGGLE_LOADER,
    value: true,
  }),
  getHealthCategories: () => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.FETCH_HEALTH_CATEGORIES,
  }),
  getHealthCategoriesResponse: payload => ({
    type: CoreActionTypes.HEALTH_CATEGORIES_SUCCESS,
    payload,
  }),
  openHealthCheckConversation: (flowId, skipPreviouslyAnswered) => ({
    context: pageKeys.HA_GET_STARTED,
    type: CoreActionTypes.OPEN_HEALTH_CHECK_CONVERSATION,
    payload: {
      flowId,
      skipPreviouslyAnswered,
    },
  }),
  getHealthCategoriesById: healthCategory => ({
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.FETCH_HEALTH_CATEGORIES_BY_ID,
    payload: {
      healthCategory,
    },
  }),
  babylonChatInitialisation: () => ({
    context: pageKeys.HA_GET_STARTED,
    type: CoreActionTypes.INIT_BABYLON_CHAT,
    payload: {
      startConversation: false,
    },
  }),
  goToChatScreen: params => ({
    context: pageKeys.NUTRITION,
    type: CoreActionTypes.GO_TO_CHAT_SCREEN,
    payload: params,
  }),
  goToFullAssessment: () => ({
    context: pageKeys.NUTRITION,
    type: CoreActionTypes.GO_TO_FULL_ASSESSMENT,
  }),
  dispatchEvent,
})(Nutrition);

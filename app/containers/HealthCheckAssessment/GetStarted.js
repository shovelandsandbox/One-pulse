/* eslint-disable */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { connect } from "react-redux";
import { OfflineImage } from "react-native-image-offline";
import {
  CoreConstants,
  metaHelpers,
  CoreConfig,
  CoreActionTypes,
  events,
  CoreSelectors,
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
import styles from "./GetStartedStyle";
import { dispatchEvent } from "../../actions";
import moment from "moment";
import {
  ARROW,
  ACTIVITY,
  NUTRITION,
  MOOD,
  ASSESSMENT,
  BABYLON_LOGO_BLUE,
} from "../../config/images";
import { CustomAlert } from "../../components";
const { pageKeys } = CoreConfig;

const {
  LOAD_CHAT_HOME_PAGE_STATUS,
  FETCH_HEALTH_CATEGORIES,
  OPEN_HEALTH_CHECK_CONVERSATION,
  FROM_CHAT_HISTORY,
  OPEN_CONVERSATION,
  INIT_BABYLON_CHAT,
  GET_HEALTH_FLOWS,
} = CoreActionTypes;

const {
  HEALTH_GET_STARTED,
  SCREEN_KEY_HEALTH_CHECK_GET_STARTED,
  COMMON_KEY_BABYLON_LOGO,
} = CoreConstants;

const KEY_SCREEN_DESCRIPTION = "healthcheckgetstarteddescription";
const KEY_FOOTER_DESCRIPTION = "healthcheckgetstartedfooterdescription";
const KEY_ABOUT_LABEL = "healthcheckgetstartedaboutlabel";
const KEY_MINUTES_LABEL = "healthcheckgetstartedminuteslabel";
const KEY_ICON_ACTIVITY = "healthcheckgetstartedactivityicon";
const KEY_ICON_NUTRITION = "healthcheckgetstartednutritionicon";
const KEY_ICON_MOOD = "healthcheckgetstartedmoodicon";
const KEY_ICON_ASSESSMENT = "healthcheckgetstartedassessmenticon";
const KEY_ICON_ARROW = "healthcheckgetstartedarrowicon";
const KEY_CONVERSATION_NOT_COMPLETE = "conversationnotcomplete";
const KEY_OK = "ok";
const kEY_CANCEL = "cancel";
const KEY_ALERT = "alert";
import AssesHealthBar from "../../components/AssesHealthBar";
class GetStarted extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    // this.onSelect = this.onSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { meta, getHealthCheckInitialFlows } = this.props;
    if (nextProps.meta !== meta) {
      getHealthCheckInitialFlows();
    }
  }

  componentDidMount() {
    const { getHealthCheckInitialFlows, setHealthCheckPageStatus } = this.props;
    setHealthCheckPageStatus(false);
    getHealthCheckInitialFlows();
  }

  onButtonClick(screen, screenTitle, value) {
    const { data } = this.props;
    return data.navigation.navigate(screen, { screenTitle, value });
  }

  renderFallbackIcon(icon) {
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

  renderSourceIcon(icon) {
    const healthCheckGetStartedPage = metaHelpers.findScreen(
      SCREEN_KEY_HEALTH_CHECK_GET_STARTED
    );

    if (
      icon.includes("activity_onboarding") ||
      icon.includes("activity_on_boarding")
    ) {
      return metaHelpers.findElementWithScreen(
        healthCheckGetStartedPage,
        KEY_ICON_ACTIVITY
      ).image;
    } else if (
      icon.includes("nutrition_onboarding") ||
      icon.includes("nutrition_on_boarding")
    ) {
      return metaHelpers.findElementWithScreen(
        healthCheckGetStartedPage,
        KEY_ICON_NUTRITION
      ).image;
    } else if (
      icon.includes("mood_onboarding") ||
      icon.includes("mood_on_boarding")
    ) {
      return metaHelpers.findElementWithScreen(
        healthCheckGetStartedPage,
        KEY_ICON_MOOD
      ).image;
    } else if (icon.includes("initial_superflow")) {
      return metaHelpers.findElementWithScreen(
        healthCheckGetStartedPage,
        KEY_ICON_ASSESSMENT
      ).image;
    }
  }

  logActivityStarEvent(type) {
    const startDate = moment()
      .utc()
      .format("YYYY-MM-DDTHH:mm:ss");
    let activityStartEvent = null;
    switch (type) {
      case "mood":
        activityStartEvent = events.BabylonMoodAssessmentStart;
        activityStartEvent.startDate = startDate;
        this.props.dispatchEvent(activityStartEvent);
        break;
      case "full_assessment":
        activityStartEvent = events.BabylonFullAssessmentStart;
        activityStartEvent.startDate = startDate;
        this.props.dispatchEvent(activityStartEvent);

        break;
      case "activity":
        activityStartEvent = events.BabylonActivityAssessmentStart;
        activityStartEvent.startDate = startDate;
        this.props.dispatchEvent(activityStartEvent);

        break;
      case "nutrition":
        activityStartEvent = events.BabylonNutritionAssessmentStart;
        activityStartEvent.startDate = startDate;
        this.props.dispatchEvent(activityStartEvent);

        break;
      default:
    }
  }

  startConversation = data => {
    const { flowId, conversationId, name } = data;
    let healthCategory = "full_assessment";
    const healthCategotyFlowID = flowId;
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
    if (this.props.navigation) {
      var {
        data: { navigation },
        token,
        fromChatHistory,
        babylonChatInitialisation,
        openHealthCheckConversation,
        openConversation,
      } = this.props;
    } else {
      var {
        token,
        fromChatHistory,
        babylonChatInitialisation,
        openHealthCheckConversation,
        openConversation,
      } = this.props;
      var data = this.props.data.navigation;
    }

    babylonChatInitialisation(false);
    if (data.status) {
      // chat is in progress, get previous chat by passing data.conversationId
      fromChatHistory();
      openConversation(conversationId);
    } else {
      // start new chat
      openHealthCheckConversation(flowId, false);
    }
    data.conversationId === "0" && this.logActivityStarEvent(healthCategory);
    this.props.goToChatScreen({
      fromHealthAssesment: true,
      fromInitialFlow: true,
      conversationId: conversationId,
      type: healthCategory,
    });
  };

  onSelect = data => {
    const message = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_GET_STARTED,
      KEY_CONVERSATION_NOT_COMPLETE
    ).label;
    const ok = metaHelpers
      .findElement(SCREEN_KEY_HEALTH_CHECK_GET_STARTED, KEY_OK)
      .label.toUpperCase();
    const cancel = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_GET_STARTED,
      kEY_CANCEL
    ).label;
    const alert = metaHelpers.findElement(
      SCREEN_KEY_HEALTH_CHECK_GET_STARTED,
      KEY_ALERT
    ).label;
    if (data.conversationId != 0) {
      CustomAlert.show("", message, {
        positiveText: "Ok",
        onPositivePress: () => {
          this.startConversation(data);
        },
        negativeText: "Cancel",
      });
    } else {
      this.startConversation(data);
    }
  };

  renderCellComponent = data => {
    return (
      <View style={styles.contentView} key={Math.random()}>
        <AssesHealthBar
          onPress={e => {
            this.onSelect(data);
          }}
          Info={data.name}
          Numeral={data.durationMinutes}
        />
      </View>
    );
  };

  render() {
    const { meta } = this.props;
    const healthCheckGetStartedPage = metaHelpers.findScreen(
      SCREEN_KEY_HEALTH_CHECK_GET_STARTED
    );

    const { healthFlowsData } = this.props;
    return healthFlowsData.initialFlows ? (
      <View
        style={{
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        {healthFlowsData.initialFlows.map(data =>
          this.renderCellComponent(data)
        )}
      </View>
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
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

const mapStateToProps = state => ({
  meta: state.meta,
  refreshImage: state.meta.refreshImage,
  token: state.auth.token,

  babylonToken: AuthSelector.getBabylonToken(state),
  babylonStatus: state.auth.babylonStatus,
  healthFlowsData: state.healthCheck.healthFlows,
  babylonScStatus: state.register.babylonScStatus,
  babylonHaStatus: state.register.babylonHaStatus,
  babylonUserLoggedIn: state.babylonAuth.babylonUserLoggedIn,
  isNewUser: state.auth.isNewUser,
});

export default connect(mapStateToProps, {
  getHealthCheckInitialFlows: () => ({
    context: pageKeys.HA_GET_STARTED,
    type: GET_HEALTH_FLOWS,
  }),
  openHealthCheckConversation: (flowId, skipPreviouslyAnswered) => ({
    context: pageKeys.HA_GET_STARTED,
    type: OPEN_HEALTH_CHECK_CONVERSATION,
    payload: {
      flowId,
      skipPreviouslyAnswered,
    },
  }),
  babylonChatInitialisation: () => ({
    context: pageKeys.HA_GET_STARTED,
    type: INIT_BABYLON_CHAT,
    payload: {
      startConversation: false,
    },
  }),
  openConversation: conversationId => ({
    context: pageKeys.HA_GET_STARTED,
    type: OPEN_CONVERSATION,
    payload: {
      id: conversationId,
    },
  }),
  getHealthCategories: () => ({
    context: pageKeys.HA_GET_STARTED,
    type: FETCH_HEALTH_CATEGORIES,
  }),
  setHealthCheckPageStatus: payload => ({
    type: LOAD_CHAT_HOME_PAGE_STATUS,
    payload,
  }),
  fromChatHistory: () => ({
    type: FROM_CHAT_HISTORY,
    payload: true,
  }),
  goToChatScreen: params => ({
    context: pageKeys.HA_GET_STARTED,
    type: CoreActionTypes.GO_TO_CHAT_SCREEN,
    payload: {
      params,
    },
  }),
  dispatchEvent,
})(GetStarted);

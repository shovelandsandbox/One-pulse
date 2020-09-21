import React, { Component } from "react";
import { ScrollView, View, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./NutritionStyle";
import { CoreConfig, CoreActionTypes } from "@pru-rt-internal/pulse-common";
import CategoryDetails from "./CategoryDetails";
import { Header } from "../../components/ChatComponent/Header";
import PropTypes from "prop-types";
import { dispatchEvent } from "../../actions";

import { pathOr, path } from "ramda";
import { configureLineHeight } from "../../utils/lineHeightsUtils";

const { pageKeys } = CoreConfig;

class OrganDetails extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.startAssessment = this.startAssessment.bind(this);
    this.retakeAssesment = this.retakeAssesment.bind(this);
  }


  logClickEvent = (name, attributes) => {
    const { auth } = this.props;
    const appVersion = path(["userAgent", "appVersion"], auth);
    const eventData = {
      type: "ClickEvent",
      tags: ["healthassessment", "babylon", "health"],
      name,
      source: "pulse",
      attributes: {
        appVersion,
        ...attributes,
      },
    };
    this.props.dispatchEvent(eventData);
  };

  startAssessment() {
    const { navigation } = this.props;
    if (navigation.state.params.organDetails.dataAvailability === "MISSING") {
      this.props.babylonChatInitialisation();
      this.props.openHealthCheckConversation(
        navigation.state.params.organDetails.flowId,
        true
      );
      const screenTitle = pathOr("", ["state", "params", "name"], navigation);
      const healthCategory = pathOr(
        "",
        ["state", "params", "healthCategory"],
        navigation
      );
      this.logClickEvent("pulse.babylon.healthAssessment.startAssessment", {
        screenTitle,
        organ: healthCategory,
      });
      this.props.goToChatScreen({
        fromHealthAssesment: true,
        screenTitle: screenTitle,
        organDetailsPage: true,
        fromInitialFlow: false,
        healthCategory: healthCategory,
      });
    } else {
      this.retakeAssesment();
    }
  }

  retakeAssesment() {
    const { navigation } = this.props;
    let skipPreviouslyAnswered = false;
    if (navigation.state.params.organDetails.dataAvailability === "OUTDATED") {
      skipPreviouslyAnswered = true;
    }
    this.props.babylonChatInitialisation();
    this.props.openHealthCheckConversation(
      this.props.navigation.state.params.organDetails.flowId,
      skipPreviouslyAnswered
    );
    const screenTitle = pathOr("", ["state", "params", "name"], navigation);
    const healthCategory = pathOr(
      "",
      ["state", "params", "healthCategory"],
      navigation
    );
    this.logClickEvent("pulse.babylon.healthAssessment.retakeAssessment", {
      screenTitle,
      organ: healthCategory,
    });
    this.props.goToChatScreen({
      fromHealthAssesment: true,
      screenTitle: screenTitle,
      organDetailsPage: true,
      fromInitialFlow: false,
      retakeAssessment: true,
      healthCategory: healthCategory,
    });
  }
  render() {
    let { navigation, organDetails } = this.props;
    if (organDetails == null) {
      organDetails = [];
      organDetails[0] = navigation.state.params.organDetails;
    }
    const type = "ORGAN";
    return (
      <View style={{ flex: 1 }}>
        <Header
          leftIconType="back"
          onLeftPress={e => {
            e.preventDefault();
            this.props.navigation.goBack();
          }}
          onRightPress={() => {}}
          showRightIcon={false}
          showRightLogo={true}
          style={styles.organsDetailsHeader}
        />
        <Text style={{
          ...styles.headerText,
          ...configureLineHeight("24")
          }}>{navigation.state.params.name}</Text>
        {navigation.state.params.flowId == undefined && (
          <ScrollView>
            <CategoryDetails
              organDetails={organDetails}
              navigation={navigation}
              type={type}
              startAssessment={this.startAssessment}
              retakeAssesment={this.retakeAssesment}
            />
          </ScrollView>
        )}
      </View>
    );
  }
}

OrganDetails.propTypes = {
  auth: PropTypes.object,
  dispatchEvent: PropTypes.func,
};

const mapStateToProps = state => ({
  nutritionData: state.healthCheck.nutritionData,
  getHealthCategoriesData: state.healthCheck.healthCategories,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  openHealthCheckConversation: (flowId, skipPreviouslyAnswered) => ({
    context: pageKeys.HA_GET_STARTED,
    type: CoreActionTypes.OPEN_HEALTH_CHECK_CONVERSATION,
    payload: {
      flowId,
      skipPreviouslyAnswered,
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
    context: pageKeys.FULL_ASSESSMENT,
    type: CoreActionTypes.GO_TO_CHAT_SCREEN,
    payload: params,
  }),
  dispatchEvent,
})(OrganDetails);

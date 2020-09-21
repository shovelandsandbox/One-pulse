import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import { pathOr } from "ramda";

import { getScreenRenderingConfig } from "../../actions";
import VerticalGroupedLayout from "../../components/ScreenLayouts/VerticalGroupedLayout";

class TryPremiumSubscripton extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isUpdating: true,
      showMorePremium: false,
    };
  }

  componentDidMount() {
    const { success_redirect_screen,set_journey_type } = this.props;
    const onSuccess = pathOr("", ["state", "params", "redirectScreen"],this.props.navigation);
    const subscriptionCategory = pathOr(onSuccess, ["state", "params", "subscriptionCategory"],this.props.navigation);
    const journeyType = pathOr(onSuccess, ["state", "params", "journey"],this.props.navigation);

    set_journey_type(journeyType);
    success_redirect_screen(onSuccess);
    this.props &&
      this.props.getSubscriptions &&
      this.props.getSubscriptions(
        this.props.countryCode,
        this.props.appVersion,
        subscriptionCategory,
        this.props.appOs
      );
    this.onRefresh();
  }

  onRefresh = () => {
    this.props.getScreenRenderingConfig({
      id: `m::ui::pulsePlusSubscribe_${this.props.userPreferences.language}`,
    });
  };

  renderGrid = () => {
    const { pulsePlusSubscribe } = this.props;
    return (
      <VerticalGroupedLayout config={pulsePlusSubscribe} transform={true} />
    );
  };

  renderLoader = () => {
    return (
      <ActivityIndicator
        style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}
        size={28}
        color="#EF182B"
      />
    );
  };

  render() {
    const { pulsePlusSubscribe } = this.props;
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          position: "relative",
        }}
      >
        {pulsePlusSubscribe ? this.renderGrid() : this.renderLoader()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userPreferences: state.userPreferences,
    pulsePlusSubscribe: state.screenConfig.PulsePlusSubscribe, // rename and use
    countryCode: state.profile.countryCode,
    appVersion: state.auth.userAgent.appVersion,
    appOs: state.auth.userAgent.os
  };
};

export default connect(mapStateToProps, {
  getScreenRenderingConfig,
  goToScreen: (screen, payload) => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: screen,
    payload,
  }),
  getSubscriptions: (countryCode, appVersion, category,appOs,criteria = null) => ({
    context: "SUBSCRIPTION",
    type: "GET_ALL_SUBSCRIPTIONS",
    payload: {
      criteria: criteria,
      countryCode: countryCode,
      category,
      appVersion: appVersion,
      appOs: appOs
    },
  }),
  success_redirect_screen: (screenName) => ({
    context: "SUBSCRIPTION",
    type: "SUBSCRIPTION_PAYMENT_SUCCESS",
    payload: {
      screen: screenName
    },
  }),
  set_journey_type: (journey) => ({
    context: "SUBSCRIPTION",
    type: "SET_SUBSCRIPTION_JOURNEY_TYPE",
    payload: {
      journey_type: journey
    },
  }),
})(TryPremiumSubscripton);

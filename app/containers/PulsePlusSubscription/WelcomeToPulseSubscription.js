import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, ActivityIndicator, BackHandler } from "react-native";

import { getScreenRenderingConfig } from "../../actions";
import VerticalGroupedLayout from "../../components/ScreenLayouts/VerticalGroupedLayout";
import { CoreActionTypes, CoreServices } from "@pru-rt-internal/pulse-common";
const { NavigationService } = CoreServices;

class WelcomeToPulse extends PureComponent {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    this.onRefresh();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    NavigationService.resetStack("MainTab");
    return true;
  };

  onRefresh = () => {
    this.props.getScreenRenderingConfig({
      id: `m::ui::pulsePlusWelcome_${this.props.userPreferences.language}`,
    });
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

  renderGrid = () => {
    const { pulsePlusWelcome } = this.props;
    return <VerticalGroupedLayout config={pulsePlusWelcome} transform={true} />;
  };

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          flex: 1,
          position: "relative",
        }}
      >
        {this.props.pulsePlusWelcome ? this.renderGrid() : this.renderLoader()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    userPreferences: state.userPreferences,
    pulsePlusWelcome: state.screenConfig.PulsePlusWelcome,
    countryCode: state.profile.countryCode,
  };
};

export default connect(mapStateToProps, {
  getScreenRenderingConfig,
  goToScreen: (screen, payload) => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: screen,
    payload,
  }),
})(WelcomeToPulse);

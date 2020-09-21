/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/require-optimization */
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { pathOr } from "ramda";
import WearablesStatistics from "./WearablesStatistics";
import WearablesList from "./wearablesList";
import { createStackNavigator } from "react-navigation";
import { ActivityIndicator, View } from "react-native";
import StackActions from "react-navigation/src/routers/StackActions";
import NavigationActions from "react-navigation/src/NavigationActions";
import screenNames from "../configs/screenNames";

class WearablesContainerScreen extends Component {
  componentDidMount() {
    let resetAction = null;
    if ((this.props.customerConnectedWearables || []).length) {
      resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: screenNames.WEARABLES_STATISTICS,
          }),
        ],
      });
    } else {
      resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: screenNames.WEARABLE_LIST }),
        ],
      });
    }

    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    customerConnectedWearables: pathOr(
      [],
      ["FitnessTrackersReducer", "customerConnectedWearables"],
      state
    ),
    userCountryDetails: state.auth.countryInfo,
  };
};

const WearablesContainer = connect(mapStateToProps)(WearablesContainerScreen);

WearablesContainer.propTypes = {
  userCountryDetails: PropTypes.object,
  customerConnectedWearables: PropTypes.object,
  navigation: PropTypes.object,
};

const WearablesContainerNavigator = createStackNavigator(
  {
    WearablesList,
    WearablesStatistics,
    container: WearablesContainer,
  },
  {
    initialRouteName: "container",
    navigationOptions: {
      header: null, // this will hide the header
      gesturesEnabled: false,
    },
  }
);

export default WearablesContainerNavigator;

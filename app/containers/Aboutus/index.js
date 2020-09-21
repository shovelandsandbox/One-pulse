import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";

import styles from "./styles";

const { pageKeys, SCREEN_KEY_ABOUT_US } = CoreConfig;
const helpers = metaHelpers;
const { GO_TO_TERMSANDCOND, GO_TO_PRIVACY_POLICY } = CoreActionTypes;
const KEY_TERMS = "termsandconditions";
const KEY_PRIVACY = "privacy";

class Aboutus extends React.Component {
  render() {
    const title = helpers.findScreen(SCREEN_KEY_ABOUT_US).label;
    const terms = helpers.findElement(SCREEN_KEY_ABOUT_US, KEY_TERMS).label;
    const privacy = helpers.findElement(SCREEN_KEY_ABOUT_US, KEY_PRIVACY).label;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={styles.contentViewItems}
          onPress={() => this.props.goToTnC()}
        >
          <Text style={styles.text}>{terms}</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={styles.contentViewItems}
          onPress={() => this.props.goToPrivacyPolicy()}
        >
          <Text style={styles.text}>{privacy}</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
      </View>
    );
  }
}

export default connect(
  null,
  {
    goToTnC: () => ({
      context: pageKeys.ABOUT_US_SCREEN,
      type: GO_TO_TERMSANDCOND,
    }),
    goToPrivacyPolicy: () => ({
      context: pageKeys.ABOUT_US_SCREEN,
      type: GO_TO_PRIVACY_POLICY,
    }),
  }
)(Aboutus);

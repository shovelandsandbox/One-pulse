import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
} from "@pru-rt-internal/pulse-common";
import styles from "./styles";

const { GO_TO_COMMON } = CoreActionTypes;
const helpers = metaHelpers;

const {
  COMMON_KEY_PRIVACY_BABYLON,
  COMMON_KEY_PRIVACY,
  SCREEN_KEY_PRIVACY_POLICY,
  COMMON_KEY_PRIVACY_MY_DOC,
  pageKeys,
} = CoreConfig;
const KEY_PRUTOPIA = "prutopia";
const KEY_BABYLON = "babylon";
const KEY_DOC_ON_CALL = "docservice";

class Privacy extends React.Component {
  render() {
    const title = helpers.findScreen(SCREEN_KEY_PRIVACY_POLICY).label;
    const prutopia = helpers.findElement(
      SCREEN_KEY_PRIVACY_POLICY,
      KEY_PRUTOPIA
    ).label;
    const babylon = helpers.findElement(SCREEN_KEY_PRIVACY_POLICY, KEY_BABYLON)
      .label;
    const docOnCall = helpers.findElement(
      SCREEN_KEY_PRIVACY_POLICY,
      KEY_DOC_ON_CALL
    ).label;
    const termsBabylon = helpers.findCommon(COMMON_KEY_PRIVACY_BABYLON).label;
    const termsPrutopia = helpers.findCommon(COMMON_KEY_PRIVACY).label;
    const privacyPolicyMyDoc = helpers.findCommon(COMMON_KEY_PRIVACY_MY_DOC)
      .label;
    const termsPrutopiaHeader = helpers.findCommon(COMMON_KEY_PRIVACY).header;
    const privacyBabylonHeader = helpers.findCommon(COMMON_KEY_PRIVACY_BABYLON)
      .header;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={styles.contentViewItems}
          onPress={() => {
            this.props.goToCommon(termsPrutopia, termsPrutopiaHeader,"Pulse");
          }}
        >
          <Text style={styles.text}>{prutopia}</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={styles.contentViewItems}
          onPress={() => {
            this.props.goToCommon(termsBabylon, privacyBabylonHeader,"Babylon");
          }}
        >
          <Text style={styles.text}>{babylon}</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <TouchableOpacity
          style={styles.contentViewItems}
          onPress={() => {
            this.props.goToCommon(privacyPolicyMyDoc, title,"DocCall");
          }}
        >
          <Text style={styles.text}>{docOnCall}</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
      </View>
    );
  }
}

export default connect(
  null,
  {
    goToCommon: (content, screenTitle, page) => ({
      context: pageKeys.PRIVACY_POLICY,
      type: GO_TO_COMMON,
      payload: {
        params: {
          content,
          screenTitle,
          page,
        },
      },
    }),
  }
)(Privacy);

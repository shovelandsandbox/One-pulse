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
  pageKeys,
  SCREEN_KEY_TERMS_AND_CONDITIONS,
  COMMON_KEY_TERMS_BABYLON,
  COMMON_KEY_TERMS,
  COMMON_KEY_TERMS_MY_DOC,
  COMMON_KEY_TERMS_AIME
} = CoreConfig;

const KEY_PRUTOPIA = "prutopia";
const KEY_BABYLON = "babylon";
const KEY_DOC_ON_CALL = "docservice";
const KEY_AIME = "AIME";

export class TermsAndConditions extends React.Component {
  getDoctorTnC() {
    const doconCallTnCHeader = metaHelpers.findCommon(COMMON_KEY_TERMS_MY_DOC)
      .header;
    const termsDOC = metaHelpers.findCommon(COMMON_KEY_TERMS_MY_DOC).label;
    const doctorOnCall = metaHelpers.findElement(
      SCREEN_KEY_TERMS_AND_CONDITIONS,
      KEY_DOC_ON_CALL
    ).label;
    return (
      <View>
        <TouchableOpacity
          style={styles.contentViewItems}
          onPress={() => {
            this.props.goToCommon({
              content: termsDOC,
              screenTitle: doconCallTnCHeader,
              page: "DocCall",
            });
          }}
        >
          <Text style={styles.text}>{doctorOnCall}</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
      </View>
    );
  }

  getBabylonTnC() {
    const babylonTnCHeader = metaHelpers.findCommon(COMMON_KEY_TERMS_BABYLON)
      .header;
    const babylon = metaHelpers.findElement(
      SCREEN_KEY_TERMS_AND_CONDITIONS,
      KEY_BABYLON
    ).label;
    const termsBabylon = metaHelpers.findCommon(COMMON_KEY_TERMS_BABYLON).label;
    return (
      <View>
        <TouchableOpacity
          style={styles.contentViewItems}
          onPress={() => {
            this.props.goToCommon({
              content: termsBabylon,
              screenTitle: babylonTnCHeader,
              page: "Babylon",
            });
          }}
        >
          <Text style={styles.text}>{babylon}</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
      </View>
    );
  }

  getAIMETnC() {
    const aimeTnCHeader = metaHelpers.findCommon(COMMON_KEY_TERMS_AIME)
      .header;
    const aime = metaHelpers.findElement(
      SCREEN_KEY_TERMS_AND_CONDITIONS,
      KEY_AIME
    ).label;
    const termsAime = metaHelpers.findCommon(COMMON_KEY_TERMS_AIME).label;
    return (
      <View>
        <TouchableOpacity
          style={styles.contentViewItems}
          onPress={() => {
            this.props.goToCommon({
              content: termsAime,
              screenTitle: aimeTnCHeader,
              page: "Aime",
            });
          }}
        >
          <Text style={styles.text}>{aime}</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
      </View>
    );
  }

  getPrutopiaTnC() {
    const prutopia = metaHelpers.findElement(
      SCREEN_KEY_TERMS_AND_CONDITIONS,
      KEY_PRUTOPIA
    ).label;
    const prutopiaTnCHeader = metaHelpers.findCommon(COMMON_KEY_TERMS).header;
    const termsPrutopia = metaHelpers.findCommon(COMMON_KEY_TERMS).label;
    return (
      <View>
        <TouchableOpacity
          style={styles.contentViewItems}
          onPress={() => {
            this.props.goToCommon({
              content: termsPrutopia,
              screenTitle: prutopiaTnCHeader,
              page: "Pulse",
            });
          }}
        >
          <Text style={styles.text}>{prutopia}</Text>
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
      </View>
    );
  }

  render() {
    const title = metaHelpers.findScreen(SCREEN_KEY_TERMS_AND_CONDITIONS).label;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <View style={styles.horizontalLine} />
        {this.getPrutopiaTnC()}
        {this.getBabylonTnC()}
        {this.getAIMETnC()}
        {this.getDoctorTnC()}
      </View>
    );
  }
}

export default connect(
  null,
  {
    goToCommon: params => ({
      context: pageKeys.ABOUT_TERMS,
      type: GO_TO_COMMON,
      payload: {
        params,
      },
    }),
  }
)(TermsAndConditions);

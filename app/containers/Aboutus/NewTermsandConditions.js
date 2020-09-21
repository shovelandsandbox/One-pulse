/* eslint-disable react/require-optimization */
import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";
import PruDetailArrowCell from "../../components/PruDetailArrowCell";
import { PruHeaderText } from "../../components";

import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  CoreSelectors,
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
import styles from "./styles";
import { gotoNewCommon } from "../../actions";
const { GO_TO_COMMON } = CoreActionTypes;
const helpers = metaHelpers;
import _ from "lodash";

const {
  pageKeys,
  SCREEN_KEY_TERMS_AND_CONDITIONS,
  COMMON_KEY_TERMS_BABYLON,
  COMMON_KEY_TERMS,
  COMMON_KEY_TERMS_AIME,
  COMMON_KEY_TERMS_MY_DOC,
  NEW_TERMSCONDITIONS,
  NEW_TERMSCONDITIONS_PULSE,
  NEW_TERMSCONDITIONS_DOCONCALL,
  NEW_TERMSCONDITIONS_BABYLON,
  NEW_TERMSCONDITIONS_AIME,
} = CoreConfig;

const KEY_PRUTOPIA = "prutopia";
const KEY_BABYLON = "babylon";

export class TermsAndConditions extends React.Component {
  whichAction(action) {
    const termsBabylon = helpers.findCommon(COMMON_KEY_TERMS_BABYLON).label;
    const termsPrutopia = helpers.findCommon(COMMON_KEY_TERMS).label;
    const title = helpers.findScreen(NEW_TERMSCONDITIONS).label;
    const termsMyDoc = helpers.findCommon(COMMON_KEY_TERMS_MY_DOC).label;
    const termsAime = helpers.findCommon(COMMON_KEY_TERMS_AIME).label;
    const TERMSCONDITIONS_PULSE = helpers.findElement(
      NEW_TERMSCONDITIONS,
      NEW_TERMSCONDITIONS_PULSE
    ).label;
    const TERMSCONDITIONS_BABYLON = helpers.findElement(
      NEW_TERMSCONDITIONS,
      NEW_TERMSCONDITIONS_BABYLON
    ).label;
    const TERMSCONDITIONS_DOCONCALL = helpers.findElement(
      NEW_TERMSCONDITIONS,
      NEW_TERMSCONDITIONS_DOCONCALL
    ).label;
    const TERMSCONDITIONS_AIME = helpers.findElement(
      NEW_TERMSCONDITIONS,
      NEW_TERMSCONDITIONS_AIME
    ).label;

    switch (action) {
      case "terms":
        return this.props.gotoNewCommon({
          termsPrutopia,
          title,
          message: TERMSCONDITIONS_PULSE,
        });
      case "babylon":
        return this.props.gotoNewCommon({
          termsBabylon,
          title,
          message: TERMSCONDITIONS_BABYLON,
        });
      case "con":
        return this.props.gotoNewCommon({
          termsMyDoc,
          title,
          message: TERMSCONDITIONS_DOCONCALL,
        });
      case "register":
        return this.props.gotoNewCommon({
          termsAime,
          title,
          message: TERMSCONDITIONS_AIME,
        });
    }
  }

  render() {
    const title = helpers.findScreen(NEW_TERMSCONDITIONS).label;
    const TERMSCONDITIONS_PULSE = helpers.findElement(
      NEW_TERMSCONDITIONS,
      NEW_TERMSCONDITIONS_PULSE
    ).label;
    const TERMSCONDITIONS_BABYLON = helpers.findElement(
      NEW_TERMSCONDITIONS,
      NEW_TERMSCONDITIONS_BABYLON
    ).label;
    const TERMSCONDITIONS_DOCONCALL = helpers.findElement(
      NEW_TERMSCONDITIONS,
      NEW_TERMSCONDITIONS_DOCONCALL
    ).label;
    const TERMSCONDITIONS_AIME = helpers.findElement(
      NEW_TERMSCONDITIONS,
      NEW_TERMSCONDITIONS_AIME
    ).label;

    const columns = [
      {
        cellName: TERMSCONDITIONS_PULSE,
        thirdColumn: true,
        isSwitch: false,
        actionType: "terms",
        thirdComponent: "arrow",
        visibility: true,
      },
      {
        cellName: TERMSCONDITIONS_BABYLON,
        thirdColumn: true,
        isSwitch: false,
        actionType: "babylon",
        thirdComponent: "arrow",
        visibility: !_.isEmpty(this.props.babylonToken),
      },
      {
        cellName: TERMSCONDITIONS_DOCONCALL,
        thirdColumn: true,
        isSwitch: false,
        actionType: "con",
        thirdComponent: "arrow",
        visibility: !_.isEmpty(this.props.auth.docServiceToken) || !_.isEmpty(this.props.auth.haloDocAccessToken),
      },
      {
        cellName: TERMSCONDITIONS_AIME,
        thirdColumn: true,
        isSwitch: false,
        actionType: "register",
        thirdComponent: "arrow",
        visibility: this.props.regStatus === "REGISTERED",
      },
    ];

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <PruHeaderText text={title} />
        <View style={{ width: "100%" }}>
          {columns.map(
            column =>
              column.visibility && (
                <PruDetailArrowCell
                  {...column}
                  key={column.actionType}
                  onclick={() =>
                    this.props.loadTermsAndCondition(sourceForColumn(column))
                  }
                />
              )
          )}
        </View>
      </ScrollView>
    );
  }
}

const sourceForColumn = column => {
  if ("terms" === column.actionType) {
    return "Pulse";
  }
  if ("babylon" === column.actionType) {
    return "Babylon";
  }
  if ("con" === column.actionType) {
    return "Mydoc";
  }
  if ("register" === column.actionType) {
    return "Aime";
  }

};

const mapStateToProps = state => ({
  auth: state.auth,
  regStatus: state.regAIME.registrationStatus,
  babylonToken: AuthSelector.getBabylonToken(state),
});
export default connect(mapStateToProps, {
  goToCommon: params => ({
    context: pageKeys.ABOUT_TERMS,
    type: GO_TO_COMMON,
    payload: {
      params: params,
    },
  }),
  gotoNewCommon,
  loadTermsAndCondition: source => ({
    context: "LOAD_TNC_AND_PRIVACY_POLICY",
    type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
    payload: {
      source,
      value: "TermAndConditions",
    },
  }),
})(TermsAndConditions);

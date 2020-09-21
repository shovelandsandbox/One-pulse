/* eslint-disable react/require-optimization */
import React from "react";
import { View, ScrollView } from "react-native";
import { connect } from "react-redux";
import PruDetailArrowCell from "../../components/PruDetailArrowCell";
import { PruHeaderText } from "../../components";
import { gotoNewCommon } from "../../actions";
import {
  CoreActionTypes,
  CoreConfig,
  metaHelpers,
  CoreSelectors,
} from "@pru-rt-internal/pulse-common";
const { AuthSelector } = CoreSelectors;
import styles from "./styles";
import _ from "lodash";

const { GO_TO_COMMON } = CoreActionTypes;
const helpers = metaHelpers;

const {
  COMMON_KEY_PRIVACY_BABYLON,
  COMMON_KEY_PRIVACY,
  COMMON_KEY_PRIVACY_MY_DOC,
  pageKeys,
  NEW_PRIVACYNOTICE,
  NEW_PRIVACYNOTICE_PULSE,
  NEW_PRIVACYNOTICE_DOCONCALL,
  NEW_PRIVACYNOTICE_BABYLON,
  NEW_BABYLONPRIVACYPOLICY,
} = CoreConfig;

class NewPrivacy extends React.Component {
  whichAction(action) {
    const title = helpers.findScreen(NEW_PRIVACYNOTICE).label;
    const privacyBabylon = helpers.findCommon(COMMON_KEY_PRIVACY_BABYLON).label;
    const privacyPrutopia = helpers.findCommon(COMMON_KEY_PRIVACY).label;
    const privacyPolicyMyDoc = helpers.findCommon(COMMON_KEY_PRIVACY_MY_DOC)
      .label;
    const PRIVACYNOTICE_PULSE = helpers.findElement(
      NEW_PRIVACYNOTICE,
      NEW_PRIVACYNOTICE_PULSE
    ).label;
    const PRIVACYNOTICE_DOCONCALL = helpers.findElement(
      NEW_PRIVACYNOTICE,
      NEW_PRIVACYNOTICE_DOCONCALL
    ).label;
    const PRIVACYNOTICE_BABYLON = helpers.findElement(
      NEW_PRIVACYNOTICE,
      NEW_PRIVACYNOTICE_BABYLON
    ).label;
    const Babylontitle = helpers.findElement(
      NEW_PRIVACYNOTICE,
      NEW_BABYLONPRIVACYPOLICY
    ).label;

    switch (action) {
      case "pulse_privacy":
        return this.props.gotoNewCommon({
          privacyPrutopia,
          title,
          message: PRIVACYNOTICE_PULSE,
        });
      case "babylon_privacy":
        return this.props.gotoNewCommon({
          privacyBabylon,
          title: Babylontitle,
          message: PRIVACYNOTICE_BABYLON,
        });
      case "consul_privacy":
        return this.props.gotoNewCommon({
          privacyPolicyMyDoc,
          title,
          message: PRIVACYNOTICE_DOCONCALL,
        });
    }
  }

  loadPdfView = value => {
    this.props.loadPrivacypolicy(value);
  }

  render() {
    const PRIVACYNOTICE_PULSE = helpers.findElement(
      NEW_PRIVACYNOTICE,
      NEW_PRIVACYNOTICE_PULSE
    ).label;
    const PRIVACYNOTICE_DOCONCALL = helpers.findElement(
      NEW_PRIVACYNOTICE,
      NEW_PRIVACYNOTICE_DOCONCALL
    ).label;
    const PRIVACYNOTICE_BABYLON = helpers.findElement(
      NEW_PRIVACYNOTICE,
      NEW_PRIVACYNOTICE_BABYLON
    ).label;

    const title = helpers.findScreen(NEW_PRIVACYNOTICE).label;
    const columns = [
      {
        cellName: PRIVACYNOTICE_PULSE,
        thirdColumn: true,
        isSwitch: false,
        actionType: "pulse_privacy",
        thirdComponent: "arrow",
        visibility: true,
      },
      {
        cellName: PRIVACYNOTICE_BABYLON,
        thirdColumn: true,
        isSwitch: false,
        actionType: "babylon_privacy",
        thirdComponent: "arrow",
        visibility: !_.isEmpty(this.props.babylonToken),
      },
      {
        cellName: PRIVACYNOTICE_DOCONCALL,
        thirdColumn: true,
        isSwitch: false,
        actionType: "consul_privacy",
        thirdComponent: "arrow",
        visibility: !_.isEmpty(this.props.auth.docServiceToken) || !_.isEmpty(this.props.auth.haloDocAccessToken),
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
                  onclick={() => this.loadPdfView(sourceForColumn(column))}
                />
              )
          )}
        </View>
      </ScrollView>
    );
  }
}

const sourceForColumn = column => {
  if ("pulse_privacy" === column.actionType) {
    return "Pulse";
  }
  if ("babylon_privacy" === column.actionType) {
    return "Babylon";
  }
  if ("consul_privacy" === column.actionType) {
    return "Mydoc";
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  babylonToken: AuthSelector.getBabylonToken(state),
});
export default connect(mapStateToProps, {
  goToCommon: params => ({
    context: pageKeys.ABOUT_TERMS,
    type: GO_TO_COMMON,
    payload: {
      params,
    },
  }),
  gotoNewCommon,
  loadPrivacypolicy: source => ({
    context: "LOAD_TNC_AND_PRIVACY_POLICY",
    type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
    payload: {
      source,
      value: "PrivacyPolicy",
    },
  }),
})(NewPrivacy);

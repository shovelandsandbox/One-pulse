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

const { pageKeys, PRUSHOP_TERMS_PRIVACY, PRUSHOP_CLOUMN } = CoreConfig;

class PruShopTermsPrivacy extends React.Component {
  loadPdfView = column => {
    const { Prushoppe } = this.props.termsConditions;
    const { actionType, versionKey } = column;
    const docVersion = Prushoppe[versionKey] ? Prushoppe[versionKey] : "v1";
    const value = actionType + "_" + docVersion;
    this.props.loadPrivacypolicy(Prushoppe["org"], value);
  };

  render() {
    const title = helpers.findScreen(PRUSHOP_TERMS_PRIVACY).label;
    const columns = helpers.findElement(PRUSHOP_TERMS_PRIVACY, PRUSHOP_CLOUMN)
      .columns;
    const columnDefaultObj = {
      thirdColumn: true,
      isSwitch: false,
      thirdComponent: "arrow",
    };
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <PruHeaderText text={title} />
        <View style={{ width: "100%" }}>
          {columns.map(column => (
            <PruDetailArrowCell
              {...columnDefaultObj}
              {...column}
              key={column.actionType}
              onclick={() => this.loadPdfView(column)}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  babylonToken: AuthSelector.getBabylonToken(state),
  termsConditions: state.profile.termsConditions,
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
  loadPrivacypolicy_old: source => ({
    type: "GO_TO_SCREEN",
    navigateTo: "PdfView",
    payload: {
      params: {
        source: {
          uri: source,
        },
      },
    },
  }),
  loadPrivacypolicy: (source, value) => ({
    context: "LOAD_TNC_AND_PRIVACY_POLICY",
    type: "TncandPrivacyPolicy/getTnCandPrivacyPolicy",
    payload: { source, value },
  }),
})(PruShopTermsPrivacy);

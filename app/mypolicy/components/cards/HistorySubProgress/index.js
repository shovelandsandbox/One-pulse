/* eslint-disable max-params */
/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextS } from "../../derivatives/Text";
import { HistoryProgressBlinker as HistoryProgressBlinkerCard } from "../index";

const { pageKeys } = CoreConfig;

const stepConst = {
  VERTICAL_UPLOAD_DOCUMENT: {
    ID: "Unggah Dokumen Tambahan",
    EN: "Upload Additional Documents",
  },
  NEED_ADDITIONAL_DOCUMENT: {
    ID: "Membutuhkan Dokumen Tambahan",
    EN: "Need Additional Document",
  },
};

class HistorySubProgress extends Component {
  renderAdditionalAction(action = null) {
    const { document, language, subSubmissionId } = this.props;
    switch (action) {
      case "MANUAL_DOCUMENT_SUBMISSION":
        return (
          <View style={Styles.additionalAction.container}>
            <TextS color={Colors.main.baseGray}>
              Dokumen harus diterima Prudential dalam jangka waktu 60 hari
              kerja.
            </TextS>

            <TextS
              color={Colors.main.baseGray}
              style={Styles.additionalAction.manualDocumentSubmission.point}
            >
              1. Tagihan rumah sakit
            </TextS>
            <TextS
              color={Colors.main.baseGray}
              style={Styles.additionalAction.manualDocumentSubmission.point}
            >
              2. Surat keterangan dokter
            </TextS>

            <TextS
              color={Colors.main.baseRed}
              onPress={() => this.props.loadAddDocument()}
              style={Styles.additionalAction.manualDocumentSubmission.point}
            >
              Surat keterangan dokter
            </TextS>
          </View>
        );

      case "VERTICAL_UPLOAD_DOCUMENT":
      case "HORIZONTAL_DOCUMENT_UPLOAD":
        return (
          <View style={Styles.additionalAction.container}>
            <TextS color={Colors.main.baseGray}>
              {language === "ID"
                ? "Dokumen harus diterima Prudential dalam jangka waktu 23 hari kerja."
                : "Documents must be received by Prudential within 23 working days"}
            </TextS>

            <TextS
              color={Colors.main.baseRed}
              onPress={() =>
                this.props.loadAddDocument({ document, subSubmissionId })
              }
              style={Styles.additionalAction.documentUpload.point}
            >
              {language === "ID" ? "Unggah" : "Upload"}
            </TextS>
          </View>
        );

      default:
        return null;
    }
  }

  renderProgressStepItem(color, step, isLast = false, isActive = false, index) {
    const { language } = this.props;
    return (
      <View style={Styles.step.parentStep} key={index}>
        <View
          style={[
            Styles.step.leftStep,
            { borderColor: !isLast ? color : Colors.main.transparent },
          ]}
        />
        <View style={Styles.step.container} key={index}>
          <TextS color={Colors.main.baseGray} style={Styles.step.title}>
            {stepConst[step.additional_action][language]}
          </TextS>

          {this.renderAdditionalAction(step.additional_action)}

          <HistoryProgressBlinkerCard
            color={color}
            top={1}
            left={2}
            size={6}
            maxSize={16}
            isActive={isLast && isActive}
          />

          <View style={[Styles.step.circle, { backgroundColor: color }]} />
        </View>
      </View>
    );
  }

  render() {
    const { language } = this.props;
    const steps = this.props.steps ? this.props.steps : [];

    let color = this.props.color;
    if (this.props.needAdditionalAction) {
      color = Colors.main.errorRed;
    }

    let subBranchCornerRender = null;
    if (steps.length > 0) {
      subBranchCornerRender = (
        <View style={[Styles.title.branchRounder, { borderColor: color }]} />
      );
    }

    return (
      <View style={Styles.title.parentContainer}>
        <View
          style={[
            Styles.title.parent,
            {
              borderColor: !this.props.isLast ? color : Colors.main.borderGray,
            },
          ]}
        />
        <View style={Styles.container}>
          <View style={Styles.innerContainer}>
            <View
              style={[
                Styles.title.leftTitle,
                {
                  backgroundColor: color,
                },
              ]}
            />
            <View
              style={[
                Styles.title.container,
                { borderColor: color },
                steps.length == 0 ? { borderLeftWidth: 0 } : {},
              ]}
            >
              <TextS style={Styles.title.text}>
                {stepConst[this.props.title][language]}
              </TextS>

              {/* {subBranchCornerRender} */}
            </View>

            {steps.map((step, stepIndex) => {
              return this.renderProgressStepItem(
                color,
                step,
                stepIndex == steps.length - 1,
                this.props.isActive,
                stepIndex
              );
            })}
          </View>

          <HistoryProgressBlinkerCard
            color={color}
            top={0}
            left={-6}
            size={10}
            maxSize={20}
            isActive={steps.length == 0 && this.props.isActive}
          />

          <View style={[Styles.circle, { backgroundColor: color }]} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  loadAddDocument: payload => {
    dispatch({
      context: pageKeys.CLAIM_HISTORY_ADD_DOCUMENT_SCREEN,
      type: CoreActionTypes.CLAIM_ADD_DOCUMENT_LOAD,
      payload,
    });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistorySubProgress);

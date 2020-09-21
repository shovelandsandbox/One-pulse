/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import { TextM } from "../../components/derivatives/Text";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";
import { Colors } from "../../configs";

export default class QuickAdmissionSuccess extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={this.props.title}
        image={"quick_admission_success"}
        message={
          <TextM color={Colors.main.baseGray}>
            {this.props.desc1}{" "}
            <TextM color={Colors.main.baseGray} bold>
              {this.props.desc2} {this.props.admissionId}
            </TextM>{" "}
            {this.props.desc3}
          </TextM>
        }
        buttonLabel={this.props.buttonLabel}
        onConfirm={() => this.onConfirm()}
        onClosePress={() => this.props.onClose()}
      />
    );
  }
}

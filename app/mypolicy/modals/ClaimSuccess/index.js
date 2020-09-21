/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import { Colors } from "../../configs";
import { TextM } from "../../components/derivatives/Text";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_SUCCESS = "claim_success_title";
const KEY_CLAIM_SUCCESS_DESC1 = "claim_success_desc_1";
const KEY_CLAIM_SUCCESS_DESC2 = "claim_success_desc_2";
const KEY_CLAIM_NUMBER = "claim_success_number";
const KEY_CLAIM_HISTORY_BUTTON = "see_claim_history_button";

export default class ClaimSuccess extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        onClosePress={() => this.props.onClosePress()}
        title={claimMeta(KEY_CLAIM_SUCCESS).label}
        image={"claim_success"}
        message={
          <TextM color={Colors.main.baseGray}>
            {claimMeta(KEY_CLAIM_SUCCESS_DESC1).label}{" "}
            <TextM color={Colors.main.baseGray} bold>
              {claimMeta(KEY_CLAIM_NUMBER).label + " " + this.props.number}
            </TextM>{" "}
            {claimMeta(KEY_CLAIM_SUCCESS_DESC2).label}
          </TextM>
        }
        buttonLabel={claimMeta(KEY_CLAIM_HISTORY_BUTTON).label}
        onConfirm={() => this.onConfirm()}
        floatingHeader
      />
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

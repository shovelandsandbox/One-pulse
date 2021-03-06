/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import { Colors } from "../../configs";
import { TextM } from "../../components/derivatives/Text";

import { SuccessModal as SuccessModalContainer } from "../../components/containers";

import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_BANK_EDIT_SUCCESS = "step_3_edit_success_title";
const KEY_CLAIM_BANK_EDIT_DESC1 = "step_3_edit_desc_1";
const KEY_CLAIM_BANK_EDIT_DESC2 = "step_3_create_edit_desc_2";
const KEY_CLAIM_BANK_EDIT_DESC3 = "step_3_create_edit_desc_3";
const KEY_CLAIM_BANK_EDIT_DESC4 = "step_3_create_edit_desc_4";
const KEY_CLAIM_BANK_EDIT_DONE = "claim_done";

export default class EditBankAccountSuccess extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={claimMeta(KEY_CLAIM_BANK_EDIT_SUCCESS).label}
        image={"bank_account_update_success"}
        message={
          <TextM color={Colors.main.baseGray}>
            {claimMeta(KEY_CLAIM_BANK_EDIT_DESC1).label}{" "}
            <TextM bold>{this.props.bank}</TextM>{" "}
            {claimMeta(KEY_CLAIM_BANK_EDIT_DESC2).label}{" "}
            <TextM bold>
              {claimMeta(KEY_CLAIM_BANK_EDIT_DESC4).label} {this.props.number}
            </TextM>
            , {claimMeta(KEY_CLAIM_BANK_EDIT_DESC3).label + " "}
            <TextM bold> {this.props.owner}</TextM>.
          </TextM>
        }
        buttonLabel={claimMeta(KEY_CLAIM_BANK_EDIT_DONE).label}
        onConfirm={() => this.onConfirm()}
        floatingHeader
      />
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

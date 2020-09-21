import React, { Component } from "react";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";

import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_BANK_DELETE_CONFIRM_TITLE =
  "step_3_delete_bank_account_confirmation_title";
const KEY_CLAIM_BANK_DELETE_CONFIRM_DESC =
  "step_3_delete_bank_account_confirmation_desc";
const KEY_CLAIM_BANK_DELETE_CONTINUE = "step_1_datepicker_continue";
const KEY_CLAIM_BANK_DELETE_CANCEL = "claim_cancel";

export default class DeleteBankAccountConfirmation extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={claimMeta(KEY_CLAIM_BANK_DELETE_CONFIRM_TITLE).label}
        image={"bank_account_delete_confirmation"}
        // message={ (<TextM color={ Colors.main.baseGray }>Kamu akan menghapus rekening <TextM bold> { this.props.bank } </TextM> dengan <TextM bold>no. akun { this.props.number }</TextM>, atas nama <TextM bold> { this.props.owner }</TextM>.</TextM>) }
        message={claimMeta(KEY_CLAIM_BANK_DELETE_CONFIRM_DESC).label}
        buttonLabel={claimMeta(KEY_CLAIM_BANK_DELETE_CONTINUE).label}
        cancelLabel={claimMeta(KEY_CLAIM_BANK_DELETE_CANCEL).label}
        onConfirm={() => this.onConfirm()}
        onCancel={() => this.onCancel()}
        floatingHeader
      />
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

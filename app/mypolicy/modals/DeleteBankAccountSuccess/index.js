import React, { Component } from "react";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_BANK_DELETE_SUCCESS =
  "step_3_delete_bank_account_success_title";
const KEY_CLAIM_BANK_DELETE_SUCCESS_DESC =
  "step_3_delete_bank_account_success_desc";
const KEY_CLAIM_BANK_DELETE_DONE = "claim_done";

export default class DeleteBankAccountSuccess extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={claimMeta(KEY_CLAIM_BANK_DELETE_SUCCESS).label}
        image={"bank_account_delete_success"}
        // message={ (<TextM color={ Colors.main.baseGray }>Kamu telah menghapus rekening <TextM bold> { this.props.bank } </TextM> dengan <TextM bold>no. akun { this.props.number }</TextM>, atas nama <TextM bold> { this.props.owner }</TextM>.</TextM>) }
        message={claimMeta(KEY_CLAIM_BANK_DELETE_SUCCESS_DESC).label}
        buttonLabel={claimMeta(KEY_CLAIM_BANK_DELETE_DONE).label}
        onConfirm={() => this.onConfirm()}
        floatingHeader
      />
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

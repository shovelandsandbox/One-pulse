import React, { Component } from "react";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_HISTORY_UPLOAD_TITLE = "step_4_add_document";
const KEY_CLAIM_HISTORY_UPLOAD_MESSAGE = "modal_claim_history_message";
const KEY_CLAIM_HISTORY_UPLOAD_BUTTON_LABEL = "modal_claim_history_button_label";
const KEY_CLAIM_HISTORY_UPLOAD_CANCEL_LABEL = "modal_claim_history_cancel_label";

export default class ClaimHistoryUploadConfirmation extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={claimMeta(KEY_CLAIM_HISTORY_UPLOAD_TITLE).label}
        image={"bank_account_added_partial"}
        message={claimMeta(KEY_CLAIM_HISTORY_UPLOAD_MESSAGE).label}
        buttonLabel={claimMeta(KEY_CLAIM_HISTORY_UPLOAD_BUTTON_LABEL).label}
        onConfirm={() => this.onConfirm()}
        cancelLabel={claimMeta(KEY_CLAIM_HISTORY_UPLOAD_CANCEL_LABEL).label}
        onCancel={() => this.props.onClose()}
        floatingHeader
      />
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

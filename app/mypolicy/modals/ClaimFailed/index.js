import React, { Component } from "react";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_FAILED = "claim_failed_title";
const KEY_CLAIM_FAILED_DESC = "claim_failed_desc";
const KEY_CLAIM_CUSTOMER_LINE = "claim_customer_line"

export default class ClaimFailed extends Component {
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
        title={claimMeta(KEY_CLAIM_FAILED).label}
        image={"claim_error"}
        message={claimMeta(KEY_CLAIM_FAILED_DESC).label}
        buttonLabel={claimMeta(KEY_CLAIM_CUSTOMER_LINE).label}
        onConfirm={() => this.onConfirm()}
        floatingHeader
      />
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

import React, { Component } from "react";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_COMINGSOON = "coming_soon_title";
const KEY_CLAIM_COMINGSOON_DESC = "coming_soon_desc";
const KEY_CLAIM_COMINGSOON_BUTTON = "understood_button";

export default class ComingSoonClaim extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={claimMeta(KEY_CLAIM_COMINGSOON).label}
        image={"coming_soon_claim_fitur"}
        message={claimMeta(KEY_CLAIM_COMINGSOON_DESC).label}
        buttonLabel={claimMeta(KEY_CLAIM_COMINGSOON_BUTTON).label}
        onConfirm={() => this.onConfirm()}
      />
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

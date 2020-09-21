import React, { Component } from "react";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_KEY = "mpolicyClaim";
const KEY_MODAL_TITLE = "modal_download_failed_title";
const KEY_MODAL_DESC = "modal_download_failed_desc";
const KEY_MODAL_BUTTON = "modal_download_failed_button";

export default class DownloadFailed extends Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={modalMeta(KEY_MODAL_TITLE).label}
        image={"epolicy_download_error"}
        message={modalMeta(KEY_MODAL_DESC).label}
        buttonLabel={modalMeta(KEY_MODAL_BUTTON).label}
        onConfirm={() => this.onConfirm()}
        floatingHeader
      />
    );
  }
}

const modalMeta = key => {
  return metaHelpers.findElement(TYPE_KEY, key);
};

//#region IMPORTS

// PACKAGE IMPORTS
import React, { Component } from "react";
import PropTypes from "prop-types";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

// COMPONENT IMPORTS
import { SuccessModal as SuccessModalContainer } from "../../components/containers";

const TYPE_KEY = "myPolicy";
const KEY_MODAL_TITLE = "modal_epolicy_failed_title";
const KEY_MODAL_DESC = "modal_epolicy_failed_desc";
const KEY_MODAL_BUTTON = "modal_epolicy_failed_button";

// eslint-disable-next-line react/require-optimization
export default class EPolicyFailed extends Component {
  //#region CLASS FUNCTIONS

  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  //#endregion

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        onClosePress={this.props.onClosePress}
        title={modalMeta(KEY_MODAL_TITLE).value}
        image={"epolicy_failed"}
        message={modalMeta(KEY_MODAL_DESC).value}
        buttonLabel={modalMeta(KEY_MODAL_BUTTON).value}
        onConfirm={() => this.onConfirm()}
        floatingHeader
      />
    );
  }
}

EPolicyFailed.propTypes = {
  onConfirm: PropTypes.func,
  isActive: PropTypes.bool,
  onClosePress: PropTypes.func,
};

const modalMeta = key => {
  return metaHelpers.findElement(TYPE_KEY, key) || {};
};

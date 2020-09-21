//#region IMPORTS

// PACKAGE IMPORTS
// If something weird happens, change from PureComponent to regular component
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

// COMPONENT IMPORTS
import { SuccessModal as SuccessModalContainer } from "../../components/containers";

//#endregion
const TYPE_KEY = "myPolicy";
const KEY_MODAL_TITLE = "modal_epolicy_success_title";
const KEY_MODAL_DESC = "modal_epolicy_success_desc";
const KEY_MODAL_BUTTON = "modal_epolicy_success_button";

export default class EPolicySuccess extends PureComponent {
  //#region PROPTYPES, CONSTRUCTOR, AND LIFECYCLE HOOKS

  static propTypes = {
    onConfirm: PropTypes.func,
    isActive: PropTypes.bool,
    onClosePress: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onConfirm = this.onConfirm.bind(this);
  }

  //#endregion

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
        image={"epolicy_download_success"}
        message={modalMeta(KEY_MODAL_DESC).value}
        buttonLabel={modalMeta(KEY_MODAL_BUTTON).value}
        onConfirm={this.onConfirm}
        floatingHeader
      />
    );
  }

  // ----------------------------------------
}

const modalMeta = key => {
  return metaHelpers.findElement(TYPE_KEY, key) || {};
};

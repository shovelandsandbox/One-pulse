//#region IMPORTS

// PACKAGE IMPORTS
import React, { Component } from "react";
import PropTypes from "prop-types";

// LOCAL & CONFIG IMPORTS
import { Colors } from "../../configs";

// COMPONENT IMPORTS
import { TextM } from "../../components/derivatives/Text";
import { SuccessModal as SuccessModalContainer } from "../../components/containers";

//#endregion

export default class GrantConfirmation extends Component {
  //#region PROP TYPES

  static propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    isActive: PropTypes.bool,
    name: PropTypes.string,
  };

  //#endregion

  //#region CLASS FUNCTIONS

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

  //#endregion

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={"Apa Anda Yakin?"}
        image={"grant_confirmation"}
        message={
          <TextM color={Colors.main.baseGray}>
            Dengan memberi akses, semua polis terkait{" "}
            <TextM color={Colors.main.baseBlack} bold>
              {this.props.name}
            </TextM>{" "}
            dapat diakses melalui aplikasi PRUAccess Plus.
          </TextM>
        }
        buttonLabel={"Lanjutkan"}
        cancelLabel={"Batalkan"}
        onConfirm={() => this.onConfirm()}
        onCancel={() => this.onCancel()}
        floatingHeader
      />
    );
  }
}

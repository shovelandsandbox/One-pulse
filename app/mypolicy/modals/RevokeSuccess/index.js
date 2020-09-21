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

export default class RevokeSuccess extends Component {
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
        title={"Akses Ditutup!"}
        image={"revoke_success"}
        message={
          <TextM color={Colors.main.baseGray}>
            <TextM color={Colors.main.baseBlack} bold>
              {this.props.name}
            </TextM>
            , akses kamu sudah ditutup oleh{" "}
            <TextM color={Colors.main.baseBlack} bold>
              {this.props.name}
            </TextM>
            . Kamu tidak dapat lagi mengakses polis melalui aplikasi PRUAccess
            Plus.
          </TextM>
        }
        buttonLabel={"Selesai"}
        onConfirm={() => this.onConfirm()}
      />
    );
  }
}

RevokeSuccess.propTypes = {
  onConfirm: PropTypes.func,
  isActive: PropTypes.bool,
  name: PropTypes.string,
};

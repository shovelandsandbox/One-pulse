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

export default class GrantSuccess extends Component {
  //#region PROP TYPES

  static propTypes = {
    onConfirm: PropTypes.func,
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

  //#endregion

  render() {
    return (
      <SuccessModalContainer
        isActive={this.props.isActive}
        title={"Akses Berhasil!"}
        image={"grant_success"}
        message={
          <TextM color={Colors.main.baseGray}>
            <TextM color={Colors.main.baseBlack} bold>
              {this.props.name}
            </TextM>{" "}
            kini kamu dapat mengakses polis atas namanya dengan menggunakan
            aplikasi PRUAccess Plus.
          </TextM>
        }
        buttonLabel={"Selesai"}
        onConfirm={() => this.onConfirm()}
      />
    );
  }

  // ----------------------------------------
}

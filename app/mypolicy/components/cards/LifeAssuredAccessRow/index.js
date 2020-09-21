//#region IMPORTS

// PACKAGE IMPORTS
import React, { Component } from "react";
import PropTypes from "prop-types";

// LOCAL & CONFIG IMPORTS
import { Colors } from "../../../configs";

// COMPONENT IMPORTS
import { TextXS } from "../../derivatives/Text";
import { ButtonSmall } from "../../derivatives/Button";
import { LifeAssuredRow } from "../../cards";

//#endregion

export default class LifeAssuredAccessRow extends Component {
  //#region PROP TYPES AND LIFE CYCLES
  static propTypes = {
    isUnderAge: PropTypes.bool,
    hasPaid: PropTypes.bool,
    onRevokePress: PropTypes.func,
    hasAccess: PropTypes.bool,
    onGrantPress: PropTypes.func,
    name: PropTypes.string,
    phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onPress: PropTypes.func,
    isHolder: PropTypes.bool,
    image: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  //#endregion

  //#region RENDERS

  _renderRightContent() {
    if (this.props.isUnderAge) {
      return <TextXS color={Colors.main.inactiveGray}>Dibawah Umur</TextXS>;
    }

    if (!this.props.hasPaid) {
      return (
        <TextXS color={Colors.main.inactiveGray}>Polis Belum Dibayar</TextXS>
      );
    }

    if (this.props.isHolder) {
      return null;
    }

    let onPress = this.props.onRevokePress
      ? () => this.props.onRevokePress()
      : () => {};

    if (!this.props.hasAccess) {
      onPress = this.props.onGrantPress
        ? () => this.props.onGrantPress()
        : () => {};
    }

    return (
      <ButtonSmall inverse onPress={() => onPress()}>
        {!this.props.hasAccess ? "Beri Akses" : "Cabut"}
      </ButtonSmall>
    );
  }

  //#endregion

  render() {
    return (
      <LifeAssuredRow
        name={this.props.name}
        hasAccess={this.props.hasAccess}
        isUnderAge={this.props.isUnderAge}
        subInfo={this.props.hasAccess ? this.props.phoneNumber : null}
        hasProblem={!this.props.hasPaid}
        rightContentRender={this._renderRightContent()}
        onPress={this.props.onPress}
        label={this.props.isHolder ? "Tertanggung Utama" : null}
        image={this.props.image}
      />
    );
  }

  // ----------------------------------------
}

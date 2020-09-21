//#region IMPORTS

// PACKAGE IMPORTS
import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

// LOCAL STYLING AND IMPORTS
import { Colors } from "../../../configs";
import Styles from "./style";
import Default from "../../../configs/default";

// COMPONENT IMPORTS
import { TextLX, TextM, TextS } from "../../derivatives/Text";
import { ImageBase64 } from "../../derivatives/Image";
import Icon from "../../generics/Icon";

//#endregion

export default class ProfileHead extends Component {
  //#region PROP TYPES AND LIFECYCLE HOOKS
  static propTypes = {
    onEditPress: PropTypes.func,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
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

  renderEditButton() {
    if (!this.props.onEditPress) {
      return null;
    }

    return (
      <TouchableOpacity
        style={Styles.image.editButton.container}
        onPress={() => this.props.onEditPress()}
      >
        <Icon name="edit" color={Colors.main.baseWhite} />
      </TouchableOpacity>
    );
  }

  renderName() {
    if (!this.props.name) {
      return null;
    }

    const centeredText = { textAlign: "center" };

    return <TextLX style={centeredText}>{this.props.name}</TextLX>;
  }

  renderInfo() {
    if (!this.props.phoneNumber && !this.props.email) {
      return null;
    }

    let phoneNumberRender = null;
    let emailRender = null;

    if (this.props.phoneNumber) {
      phoneNumberRender = (
        <TextM color={Colors.main.baseGray}>{this.props.phoneNumber}</TextM>
      );
    }

    if (this.props.email) {
      emailRender = (
        <TextS color={Colors.main.baseGray}>{this.props.email}</TextS>
      );
    }

    return (
      <View style={Styles.info.container}>
        {phoneNumberRender}

        {emailRender}
      </View>
    );
  }

  //#endregion

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.image.outerContainer}>
          <View style={Styles.image.container}>
            <ImageBase64
              data={this.props.image}
              default={Default.image.profile}
            />
          </View>

          {this.renderEditButton()}
        </View>

        {this.renderName()}

        {this.renderInfo()}
      </View>
    );
  }
}

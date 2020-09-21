//#region IMPORTS

// PACKAGE IMPORTS
import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

// LOCAL & CONFIG IMPORTS
import { Colors } from "../../../configs";
import Styles from "./style";

// COMPONENT IMPORTS
import RText from "../Text";

//#endregion

export default class Text extends Component {
  //#region CONSTRUCTOR AND LIFE CYCLES
  static propTypes = {
    color: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any
  };

  shouldComponentUpdate(nextProps) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  //#endregion

  // ----------------------------------------
  // ----------------------------------------
  // MAIN METHODS
  // ----------------------------------------

  getComposedStyle() {
    const composedStyle = [Styles.main];
    const newStyle = {};

    if (this.props.color) {
      newStyle.backgroundColor = this.props.color;
    }

    composedStyle.push(newStyle);
    composedStyle.push(this.props.style);

    return composedStyle;
  }

  // ----------------------------------------
  // ----------------------------------------
  // MAIN RENDER
  // ----------------------------------------

  render() {
    return (
      <View style={Styles.container}>
        <View {...this.props} style={this.getComposedStyle()}>
          <RText size={11} line={13} color={Colors.main.baseWhite}>
            {this.props.children}
          </RText>
        </View>
      </View>
    );
  }

  // ----------------------------------------
}

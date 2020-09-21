/* eslint-disable complexity */
import React, { Component } from "react";
import { TouchableOpacity as RButton } from "react-native";
import { Colors } from "../../../configs";
import Styles from "./style";

export default class Button extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  getComposedStyle() {
    const composedStyle = [Styles.main];
    const newStyle = {};

    if (this.props.color) {
      newStyle.backgroundColor = this.props.color;
      newStyle.borderColor = this.props.color;
    }

    if (this.props.inverse) {
      newStyle.backgroundColor = "transparent";
      newStyle.borderColor = this.props.color
        ? this.props.color
        : Colors.main.baseRed;
    }

    if (this.props.borderColor) {
      newStyle.borderColor = this.props.borderColor;
    }

    if (this.props.height) {
      newStyle.height = this.props.height;
    }

    if (this.props.width) {
      newStyle.width = this.props.width;
    }

    if (this.props.paddingHorizontal) {
      newStyle.paddingHorizontal = this.props.paddingHorizontal;
    }

    if (this.props.backgroundColor) {
      newStyle.backgroundColor = this.props.backgroundColor;
    }

    if (this.props.radius !== undefined && this.props.radius !== null) {
      newStyle.borderRadius = this.props.radius;
    }
    if(this.props.paddingVertical){
      newStyle.height = this.props.paddingVertical;
    }

    composedStyle.push(newStyle);
    if(this.props.hideBorder){
      composedStyle.push({borderWidth:0});
    }
   
    return composedStyle;
  }

  render() {
    return (
      <RButton
        {...this.props}
        style={this.getComposedStyle()}
        onPress={this.props.onPress ? () => this.props.onPress() : () => {}}
      >
        {this.props.children}
      </RButton>
    );
  }
}

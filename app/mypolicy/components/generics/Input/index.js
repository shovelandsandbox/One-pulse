import React, { Component } from "react";
import { TextInput as RTextInput } from "react-native";
import { Colors } from "../../../configs";
import Styles from "./style";

export default class Input extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  componentDidMount() {
    if (this.props.ref) {
      this.props.ref(this.ref);
    }
  }

  getComposedStyle() {
    const composedStyle = [Styles.main];
    const newStyle = {};

    if (this.props.color) {
      newStyle.color = this.props.color;
    }

    if (this.props.size) {
      newStyle.fontSize = this.props.size;
    }

    if (this.props.line) {
      newStyle.lineHeight = this.props.line;
    }

    if (this.props.align) {
      newStyle.textAlign = this.props.align;
    }

    if (this.props.bold) {
      newStyle.fontWeight = "bold";
    }

    if (this.props.light) {
      newStyle.fontWeight = "300";
    }

    composedStyle.push(newStyle);
    composedStyle.push(this.props.style);

    return composedStyle;
  }

  render() {
    return (
      <RTextInput
        placeholderTextColor={Colors.main.inactiveGray}
        autoCorrect={false}
        underlineColorAndroid={"transparent"}
        {...this.props}
        style={this.getComposedStyle()}
        autoCapitalize={
          this.props.autoCapitalize
            ? this.props.autoCapitalize
            : this.props.keyboardType != "email-address"
            ? this.props.autoCapitalize
            : "none"
        }
        ref={r => (this.ref = r)}
      />
    );
  }
}

import React, { Component } from "react";
import { Text as RText, Animated } from "react-native";
import Styles from "./style";

export default class Text extends Component {
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
      newStyle.fontWeight = "900";
    }

    if (this.props.light) {
      newStyle.fontWeight = "300";
    }

    composedStyle.push(newStyle);
    composedStyle.push(this.props.style);

    return composedStyle;
  }

  render() {
    if (this.props.animated) {
      return (
        <Animated.Text {...this.props} style={this.getComposedStyle()}>
          {this.props.children}
        </Animated.Text>
      );
    }

    return (
      <RText {...this.props} style={this.getComposedStyle()}>
        {this.props.children}
      </RText>
    );
  }
}

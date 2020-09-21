import React, { Component } from "react";
import { Image as RImage } from "react-native";
import Styles from "./style";

export default class Image extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  getComposedStyle() {
    const composedStyle = [Styles.main];
    const newStyle = {};

    composedStyle.push(newStyle);
    composedStyle.push(this.props.style);

    return composedStyle;
  }

  render() {
    return (
      <RImage
        resizeMode={"cover"}
        {...this.props}
        style={this.getComposedStyle()}
        source={this.props.source ? this.props.source : this.props.default}
      />
    );
  }
}

import React, { Component } from "react";
import { Animated } from "react-native";
import { createIconSetFromFontello } from "react-native-vector-icons";
import PulseIconConfig from "../../../configs/pulse-icon-config.json";
import Styles from "./style";
import { isEmpty, isNil } from "ramda";

const PulseIcon = createIconSetFromFontello(PulseIconConfig);
const AnimatedPulseIcon = Animated.createAnimatedComponent(PulseIcon);

export default class Icon extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  getComposedStyle() {
    const composedStyle = [Styles.main];
    const newStyle = {};

    if (!isNil(this.props.color)) {
      newStyle.color = this.props.color;
    }

    if (!isNil(this.props.size)) {
      newStyle.fontSize = this.props.size;
    }

    if (!isNil(this.props.align)) {
      newStyle.textAlign = this.props.align;
    }

    if (!isEmpty(newStyle)) composedStyle.push(newStyle);
    if (!isNil(this.props.style)) composedStyle.push(this.props.style);

    return composedStyle;
  }

  render() {
    if (this.props.animated) {
      return (
        <AnimatedPulseIcon {...this.props} style={this.getComposedStyle()}>
          {this.props.children}
        </AnimatedPulseIcon>
      );
    }

    return (
      <PulseIcon {...this.props} style={this.getComposedStyle()}>
        {this.props.children}
      </PulseIcon>
    );
  }
}

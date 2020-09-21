import React, { Component } from "react";
import Text from "../../../generics/Text";

export default class TextS extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <Text size={14} line={20} {...this.props}>
        {this.props.children}
      </Text>
    );
  }
}

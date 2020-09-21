import React, { Component } from "react";
import Text from "../../../generics/Text";

export default class TextXS extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <Text size={12} line={16} {...this.props}>
        {this.props.children}
      </Text>
    );
  }
}

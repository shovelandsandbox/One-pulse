import React, { Component } from "react";
import Text from "../../../generics/Text";

export default class TextM extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <Text size={16} line={24} {...this.props}>
        {this.props.children}
      </Text>
    );
  }
}

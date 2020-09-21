import React, { Component } from "react";
import Text from "../../../generics/Text";

export default class TextLX extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <Text size={26} line={32} bold {...this.props}>
        {this.props.children}
      </Text>
    );
  }
}

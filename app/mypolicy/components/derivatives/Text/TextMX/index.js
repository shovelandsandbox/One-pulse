import React, { Component } from "react";
import Text from "../../../generics/Text";

export default class TextMX extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    console.log("size", this.props.size);
    if (this.props.size && this.props.size < 18) {
      return (
        <Text size={this.props.size} line={24} bold {...this.props}>
          {this.props.children}
        </Text>
      );
    }
    return (
      <Text size={18} line={24} bold {...this.props}>
        {this.props.children}
      </Text>
    );
  }
}

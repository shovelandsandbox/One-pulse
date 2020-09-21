import React, { Component } from "react";
import Image from "../../../generics/Image";

export default class ImageBase64 extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <Image
        {...this.props}
        source={this.props.data ? { uri: this.props.data } : null}
        default={this.props.default ? { uri: this.props.default } : null}
      />
    );
  }
}

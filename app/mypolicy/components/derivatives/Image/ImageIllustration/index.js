import React, { Component } from "react";
import { Images } from "../../../../configs";
import Image from "../../../generics/Image";

export default class ImageIllustration extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    let data = null;
    let base = Images.illustration;

    if (this.props.name) {
      let splitNames = this.props.name.split(".");

      for (x in splitNames) {
        if (!base[splitNames[x].trim()]) {
          base = null;
          break;
        }

        base = base[splitNames[x].trim()];
      }

      data = base;
    }

    return (
      <Image
        resizeMode={"contain"}
        {...this.props}
        source={data ? data : {}}
        default={this.props.default}
      />
    );
  }
}

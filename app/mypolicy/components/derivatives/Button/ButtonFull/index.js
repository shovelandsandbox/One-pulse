/* eslint-disable complexity */
/* eslint-disable import/default */
import React, { Component } from "react";
import { Colors } from "../../../../configs";
import Text from "../../../generics/Text";
import Button from "../../../generics/Button";

export default class ButtonFull extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    let color = null;

    if (this.props.color) {
      color = this.props.color;
    }

    if (this.props.borderColor) {
      color = this.props.borderColor;
    }

    return (
      <Button
        {...this.props}
        onPress={this.props.onPress}
        height={this.props.height ? this.props.height : 48}
        width={this.props.width}
        paddingHorizontal={this.props.padding ? this.props.padding : 16}
        inverse={this.props.inverse}
        backgroundColor={this.props.backgroundColor}
        borderColor={
          this.props.borderColor
            ? this.props.borderColor
            : Colors.main.transparent
        }
      >
        <Text
          size={14}
          line={24}
          bold
          color={
            this.props.inverse || this.props.borderColor
              ? color
                ? color
                : Colors.main.baseRed
              : Colors.main.baseWhite
          }
        >
          {this.props.children ? this.props.children : null}
        </Text>
      </Button>
    );
  }
}

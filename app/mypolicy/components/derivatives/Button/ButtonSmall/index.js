/* eslint-disable import/default */
import React, { Component } from "react";
import { View } from "react-native";
import { Colors } from "../../../../configs";
import Styles from "./style";
import Text from "../../../generics/Text";
import Button from "../../../generics/Button";

export default class ButtonSmall extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {
    return (
      <View style={[Styles.container, this.props.style]}>
        <Button
          {...this.props}
          onPress={this.props.onPress}
          height={this.props.height ? this.props.height : 32}
          width={this.props.width}
          paddingHorizontal={this.props.padding ? this.props.padding : 18}
          inverse={this.props.inverse}
          backgroundColor={this.props.backgroundColor}
          radius={this.props.paddingVertical ? 59 :16}
          hideBorder = {this.props.hideBorder}
          paddingVertical = {this.props.paddingVertical}
        >
          <Text
            size={14}
            line={16}
            color={
              this.props.inverse
                ? this.props.color
                  ? this.props.color
                  : Colors.main.baseRed
                : Colors.main.baseWhite
            }
          >
            {this.props.children}
          </Text>
        </Button>
      </View>
    );
  }
}

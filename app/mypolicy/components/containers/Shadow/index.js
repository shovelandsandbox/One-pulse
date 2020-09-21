import React, { Component } from "react";
import { View } from "react-native";
import CardView from "react-native-cardview";

export default class Shadow extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  render() {

    return (
      <CardView
        cornerRadius={10}
        {...this.props}>
        <View>{this.props.children}</View>
      </CardView>
    );
  }
}

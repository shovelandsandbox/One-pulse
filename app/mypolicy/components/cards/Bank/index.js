import React, { PureComponent } from "react";
import { View } from "react-native";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextMX, TextM, TextS } from "../../derivatives/Text";

export default class Bank extends PureComponent {
  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.detail.container}>
          <TextMX>{this.props.name}</TextMX>

          <TextM color={Colors.main.baseGray} style={Styles.detail.number}>
            {this.props.number}
          </TextM>

          <TextS color={Colors.main.baseGray}>{this.props.owner}</TextS>
        </View>

        {this.props.rightRender}
      </View>
    );
  }
}

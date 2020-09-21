import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextM } from "../../derivatives/Text";
import Icon from "../../generics/Icon";

export default class ClaimStep extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  renderStepNumber() {
    const status = !this.props.disabled ? this.props.status : "DISABLED";
    let circleColor = Colors.main.softGray;

    switch (status) {
      case "COMPLETED":
        circleColor = Colors.main.successGreen;
        break;

      case "ON_GOING":
        circleColor = Colors.main.checkCream;
        break;

      case "ERROR":
        circleColor = Colors.main.errorRed;
        break;

      default:
      case "DISABLED":
        circleColor = Colors.main.softGray;
        break;
    }

    return (
      <View style={[Styles.circle.container, { backgroundColor: circleColor }]}>
        <TextM
          bold={false}
          color={
            !this.props.disabled ? Colors.main.baseWhite : Colors.main.borderGray
          }
        >
          {this.props.stepNumber}
        </TextM>
      </View>
    );
  }

  renderMain() {
    return (
      <View style={Styles.container}>
        {this.renderStepNumber()}

        <View style={Styles.label.container}>
          <TextM
            color={
              !this.props.disabled
                ? Colors.main.fontGray
                : Colors.main.inactiveGray
            }
          >
            {this.props.label}
          </TextM>
        </View>

        <Icon
          name={!this.props.disabled ? "edit" : "password"}
          color={
            !this.props.disabled
              ? Colors.main.baseRed
              : Colors.main.inactiveGray
          }
        />
      </View>
    );
  }

  render() {
    if (this.props.disabled) {
      return <View>{this.renderMain()}</View>;
    }

    return (
      <TouchableOpacity
        onPress={this.props.onPress ? () => this.props.onPress() : () => {}}
      >
        {this.renderMain()}
      </TouchableOpacity>
    );
  }
}

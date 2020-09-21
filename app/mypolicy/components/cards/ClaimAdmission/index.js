/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextMX, TextS, TextXS } from "../../derivatives/Text";

export default class ClaimAdmission extends Component {
  renderStatusItem(number = 0, status) {
    if (number < 1) {
      return null;
    }

    switch (status) {
      case "APPROVED":
        statusText = "diterima";
        statusColor = Colors.main.successGreen;
        break;

      case "DECLINED":
        statusText = "ditolak";
        statusColor = Colors.main.errorRed;
        break;

      case "ON_PROCESS":
      default:
        statusText = "diproses";
        statusColor = Colors.main.warningYellow;
        break;
    }

    return (
      <View style={Styles.status.container}>
        <View
          style={[Styles.status.circle, { backgroundColor: statusColor }]}
        />
        <TextS color={Colors.main.baseGray}>
          {number} {statusText}
        </TextS>
      </View>
    );
  }

  renderStatus(onProcess = 0, approved = 0, declined = 0) {
    return (
      <View style={Styles.status.grouper}>
        {this.renderStatusItem(this.props.onProcess, "ON_PROCESS")}
        {this.renderStatusItem(this.props.approved, "APPROVED")}
        {this.renderStatusItem(this.props.declined, "DECLINED")}
      </View>
    );
  }

  renderWarningMarker() {
    if (!this.props.needAction) {
      return null;
    }

    return (
      <View style={Styles.warningMarker.outerContainer}>
        <View style={Styles.warningMarker.container} />

        <View style={Styles.warningMarker.exclamation.container}>
          <TextXS color={Colors.main.baseWhite}>!!</TextXS>
        </View>
      </View>
    );
  }

  render() {
    const { titleText } = this.props;
    return (
      <TouchableOpacity
        style={Styles.container}
        onPress={this.props.onPress ? () => this.props.onPress() : () => {}}
      >
        <TextXS color={Colors.main.inactiveGray}>
          {titleText} {this.props.number}
        </TextXS>
        <TextMX>{this.props.claim}</TextMX>
        <TextS color={Colors.main.baseGray}>{this.props.name}</TextS>

        {this.renderStatus()}

        {this.renderWarningMarker()}
      </TouchableOpacity>
    );
  }
}

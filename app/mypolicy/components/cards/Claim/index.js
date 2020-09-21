/* eslint-disable react-native/no-raw-text */
import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextMX, TextS, TextXS } from "../../derivatives/Text";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_KEY = "mpolicyClaim";
const KEY_CLAIM_CARD_APPROVED = "claimcardapproved";
const KEY_CLAIM_CARD_DECLINED = "claimcarddeclined";
const KEY_CLAIM_CARD_ONPROCESS = "claimcardonprocess";
const KEY_CLAIM_CARD_SUBMITTED = "claimcardsubmitted";

const findMeta = key => {
  return metaHelpers.findElement(TYPE_KEY, key);
};

export default class Claim extends Component {
  renderStatusItem(number = 0, status) {
    if (number < 1) {
      return null;
    }

    switch (status) {
      case "APPROVED":
        statusText = findMeta(KEY_CLAIM_CARD_APPROVED).label;
        statusColor = Colors.main.successGreen;
        break;

      case "DECLINED":
        statusText = findMeta(KEY_CLAIM_CARD_DECLINED).label;
        statusColor = Colors.main.errorRed;
        break;

      case "ON_PROCESS":
      default:
        statusText = findMeta(KEY_CLAIM_CARD_ONPROCESS).label;
        statusColor = Colors.main.warningYellow;
        break;

      case "SUBMITTED":
        statusText = findMeta(KEY_CLAIM_CARD_SUBMITTED).label;
        statusColor = Colors.main.successGreen;
        break;
    }

    return (
      <View style={Styles.status.container}>
        <View
          style={[Styles.status.circle, { backgroundColor: statusColor }]}
        />
        <TextS color={Colors.main.baseGray}>
          {/* {number} {statusText} */}
          {statusText}
        </TextS>
      </View>
    );
  }

  renderStatus(status) {
    return (
      <View style={Styles.status.grouper}>
        {status === "ON_PROCESS" &&
          this.renderStatusItem(this.props.onProcess, "ON_PROCESS")}
        {status === "APPROVED" &&
          this.renderStatusItem(this.props.approved, "APPROVED")}
        {status === "DECLINED" &&
          this.renderStatusItem(this.props.declined, "DECLINED")}
        {status === "SUBMITTED" &&
          this.renderStatusItem(this.props.submitted, "SUBMITTED")}
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
    const { titleText, status } = this.props;
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

        {this.renderStatus(status)}

        {this.renderWarningMarker()}
      </TouchableOpacity>
    );
  }
}

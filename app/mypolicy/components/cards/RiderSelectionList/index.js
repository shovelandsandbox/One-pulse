import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Colors } from "../../../configs";
import Styles from "./style";
import { TextMX, TextM } from "../../derivatives/Text";
import Toggle from "../../generics/Toggle";
import Icon from "../../generics/Icon";
import { metaHelpers } from "@pru-rt-internal/pulse-common";

const TYPE_CLAIM = "mpolicyClaim";
const KEY_CLAIM_POLICY_NUMBER = "step_2_policy_number";

export default class RiderSelectionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndexes: props.selectedIndexes ? props.selectedIndexes : []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    }

    if (this.props != nextProps) {
      if (this.props.selectedIndexes != nextProps.selectedIndexes) {
        this.setState({ selectedIndexes: nextProps.selectedIndexes });
      }

      return true;
    }

    return false;
  }

  toggleSelections(index, value, rider) {
    let selectedIndexes = this.state.selectedIndexes;
    selectedIndexes = selectedIndexes.filter(item => item != index);
    const data = {
      index: index,
      value: value,
      rider: rider
    };
    selectedIndexes.push(data);
    this.setState({ selectedIndexes });

    if (this.props.onToggle) {
      this.props.onToggle(selectedIndexes);
    }
  }

  renderTitle() {
    return (
      <View style={Styles.title.container}>
        <TextMX>{this.props.name}</TextMX>
        <TextM color={Colors.main.baseGray}>
          {claimMeta(KEY_CLAIM_POLICY_NUMBER).label +
            " " +
            this.props.policyNumber}
        </TextM>
      </View>
    );
  }

  renderRider(name, index, rider) {
    return (
      <View
        // key={index}
        style={Styles.rider.container}
        // onPress={() =>
        //   this.toggleSelections(
        //     index,
        //     this.state.selectedIndexes.indexOf(index) == -1,
        //     rider
        //   )
        // }
      >
        <View style={Styles.rider.name.container}>
          <TextM>{name}</TextM>
        </View>

        <Toggle
          isActive={this.state.selectedIndexes.indexOf(index) != -1}
          onToggle={value => this.toggleSelections(index, value, rider)}
        />
      </View>
    );
  }

  render() {
    const riders = this.props.riders ? this.props.riders : [];

    return (
      <View style={Styles.container}>
        <Icon name="info-policy" color={Colors.main.baseRed} />

        <View style={Styles.innerContainer}>
          {this.renderTitle()}

          {riders.map((rider, index) => {
            return this.renderRider(rider.riderName, index, rider);
          })}
        </View>
      </View>
    );
  }
}

const claimMeta = key => {
  return metaHelpers.findElement(TYPE_CLAIM, key);
};

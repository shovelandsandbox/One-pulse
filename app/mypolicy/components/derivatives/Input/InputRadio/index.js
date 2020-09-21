import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import Styles from "./style";
import { TextM } from "../../Text";
import Toggle from "../../../generics/Toggle";

export default class InputRadio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: this.props.isActive === true ? true : false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    }

    if (this.props != nextProps) {
      return true;
    }

    return false;
  }

  updateValue(value = true) {
    if (this.state.isActive != value) {
      this.setState({ isActive: value });

      if (this.props.onToggle) {
        this.props.onToggle(value);
      }
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={[Styles.container, this.props.style]}
        onPress={() => this.updateValue(!this.state.isActive)}
       
      >
        <Toggle
          isActive={this.state.isActive}
          onToggle={value => this.updateValue(value)}
          rounded
        />

        <View style={Styles.label.container}>
          <TextM>{this.props.label}</TextM>
        </View>
      </TouchableOpacity>
    );
  }
}

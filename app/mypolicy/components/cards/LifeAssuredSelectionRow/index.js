import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import Styles from "./style";
import Toggle from "../../generics/Toggle";
import { LifeAssuredRow } from "../index";

export default class LifeAssuredSelectionRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: this.props.isSelected ? this.props.isSelected : false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    }

    if (this.props != nextProps) {
      if (this.props.isSelected != nextProps.isSelected) {
        this.updateValue(nextProps.isSelected);
      }

      return true;
    }

    return false;
  }

  updateValue(value = true) {
    this.setState({ isActive: value });

    if (this.props.onToggle) {
      this.props.onToggle(value);
    }
  }

  renderButton() {
    if (this.props.isDisabled) {
      return null;
    }

    return (
      <Toggle
        isActive={this.state.isActive}
        onToggle={value => this.updateValue(value)}
        shouldPersist={this.state.isActive}
        rounded
      />
    );
  }

  renderMain() {
    return (
      <LifeAssuredRow
        name={this.props.name}
        image={this.props.image}
        hasProblem={this.props.note}
        subInfo={this.props.note}
        rightContentRender={this.renderButton()}
        noPadding={this.props.noPadding}
        noImage={this.props.noImage}
      />
    );
  }

  render() {
    if (this.props.isDisabled) {
      return <View style={Styles.disabledContainer}>{this.renderMain()}</View>;
    }

    return (
      <TouchableOpacity onPress={() => this.updateValue(true)}>
        {this.renderMain()}
      </TouchableOpacity>
    );
  }
}

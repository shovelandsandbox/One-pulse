import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Colors } from "../../../../configs";
import Styles from "./style";
import { TextMX } from "../../Text";
import { ButtonSmall } from "../../Button";
import Icon from "../../../generics/Icon";

export default class InputFilterCheckButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      values: this.props.values ? this.props.values : []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state != nextState) {
      return true;
    }

    if (this.props != nextProps) {
      if (
        nextProps.values != this.state.values &&
        (nextProps.values !== null || nextProps.values !== undefined)
      ) {
        this.setState({ values: nextProps.values });
      }

      return true;
    }

    return false;
  }

  updateValues(value) {
    let values = this.state.values;

    if (values.indexOf(value) === -1) {
      values.push(value);
    } else {
      values = values.filter(itemValue => itemValue != value);
    }

    this.setState({ values });

    if (this.props.onSelect) {
      this.props.onSelect(values);
    }
  }

  renderTooltipButton() {
    if (!this.props.onTooltipPress) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() => this.props.onTooltipPress()}
        style={Styles.tooltipButton.container}
      >
        <Icon name="question" color={Colors.main.baseWhite} size={10} />
      </TouchableOpacity>
    );
  }

  renderButton(label, value, isActive = false, index) {
    return (
      <ButtonSmall
        inverse={!isActive}
        key={index}
        style={Styles.option.container}
        onPress={() => this.updateValues(value)}
        color={Colors.main.baseRed}
      >
        {label}
      </ButtonSmall>
    );
  }

  render() {
    return (
      <View style={Styles.container}>
        <View style={Styles.label.container}>
          <TextMX>{this.props.label}</TextMX>

          {this.renderTooltipButton()}
        </View>

        <View style={Styles.option.grouper}>
          {this.props.options.map((option, index) => {
            return this.renderButton(
              option.label,
              option.value,
              this.state.values &&
                this.state.values.indexOf(option.value) !== -1,
              index
            );
          })}
        </View>
      </View>
    );
  }
}

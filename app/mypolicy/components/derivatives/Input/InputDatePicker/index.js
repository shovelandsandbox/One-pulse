/* eslint-disable import/named */
import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import { InputString } from "../index";
import { DatePicker as DatePickerModal } from "../../../../modals";

export default class InputDatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDatePickerModalVisible: false,

      value: this.props.value ? this.props.value : "",
    };

    this._dayScroll = null;
  }

  updateValue(value) {
    this.setState({
      value,
      isDatePickerModalVisible: false,
    });

    if (this.props.onChangeText) {
      this.props.onChangeText(value);
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ isDatePickerModalVisible: true })}
        >
          <InputString
            {...this.props}
            value={this.state.value}
            onChangeText={value => this.updateValue(value)}
            pointerEvents={"none"}
            editable={false}
            paddingTop={this.state.value === "" ? 5 : 0}
            rightIcon={"calendar"}
          />
        </TouchableOpacity>

        <DatePickerModal
          isActive={this.state.isDatePickerModalVisible}
          onClose={() => this.setState({ isDatePickerModalVisible: false })}
          value={this.state.value}
          onSubmit={value => this.updateValue(value)}
          label={
            this.props.placeholder ? this.props.placeholder : this.props.label
          }
          labelOut={this.props.labelOut}
          range={this.props.range}
          lang={this.props.lang}
        />
      </View>
    );
  }
}

InputDatePicker.propTypes = {
  value: PropTypes.any,
  lang: PropTypes.string,
  range: PropTypes.any,
  placeholder: PropTypes.string,
  label: PropTypes.string,
};

InputDatePicker.defaultProps = {
  lang: "EN",
};

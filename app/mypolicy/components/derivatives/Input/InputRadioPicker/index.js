import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Colors } from "../../../../configs";
import { InputString } from "../index";
import { RadioPicker as RadioPickerModal } from "../../../../modals";

export default class InputRadioPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPickerModalVisible: false,

      value: this.props.value ? this.props.value : "",
    };

    this._dayScroll = null;
  }

  updateValue(value) {
    this.setState({
      value,
      isPickerModalVisible: false,
    });

    if (this.props.onChangeText) {
      this.props.onChangeText(value);
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.setState({ isPickerModalVisible: true })}
        >
          <InputString
            {...this.props}
            value={this.state.value}
            onChangeText={value => this.updateValue(value)}
            pointerEvents={"none"}
            paddingTop={this.state.value === "" ? 5 : 0}
            editable={false}
            rightIcon={"down"}
            rightIconColor={Colors.main.inactiveGray}
          />
        </TouchableOpacity>

        <RadioPickerModal
          isActive={this.state.isPickerModalVisible}
          onClose={() => this.setState({ isPickerModalVisible: false })}
          value={this.state.value}
          onSubmit={value => this.updateValue(value)}
          options={this.props.options ? this.props.options : []}
          title={this.props.modalTitle}
          searchablePlaceholder={this.props.modalSearchablePlaceholder}
          imageMapper={this.props.modalImageMapper}
        />
      </View>
    );
  }
}

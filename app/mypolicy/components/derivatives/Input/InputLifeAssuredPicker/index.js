import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Colors } from "../../../../configs";
import { InputString } from "../../Input";
import LifeAssuredPickerModal from "../../../../modals/LifeAssuredPicker";
import { convertToCapitalCase } from "../../../../utils";

export default class InputLifeAssuredPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLifeAssuredPickerModalVisible: false,

      name: this.props.value ? this.props.value : "",
    };

    this._dayScroll = null;
  }

  updateValue(value) {
    this.setState({
      name: convertToCapitalCase(value.name, false),
      isLifeAssuredPickerModalVisible: false,
    });

    if (this.props.onChangeText) {
      this.props.onChangeText(value);
    }
  }

  render() {
    const { option } = this.props;
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.setState({ isLifeAssuredPickerModalVisible: true })
          }
        >
          <InputString
            {...this.props}
            value={this.state.name}
            onChangeText={value => this.updateValue(value)}
            pointerEvents={"none"}
            paddingTop={this.state.name === "" ? 5 : 0}
            error={this.props.error}
            editable={false}
            rightIcon={"down"}
            rightIconColor={Colors.main.inactiveGray}
          />
        </TouchableOpacity>

        <LifeAssuredPickerModal
          isActive={this.state.isLifeAssuredPickerModalVisible}
          onClose={() =>
            this.setState({ isLifeAssuredPickerModalVisible: false })
          }
          option={option}
          value={this.state.name}
          onSubmit={value => this.updateValue(value)}
          options={this.props.lifeAssureds ? this.props.lifeAssureds : []}
          meta={this.props.meta}
        />
      </View>
    );
  }
}

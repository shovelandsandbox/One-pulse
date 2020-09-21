/* eslint-disable */
import React, { Component } from "react";
import { Text, View, Switch, Platform } from "react-native";
import PropTypes from "prop-types";

export default class SwitchCell extends Component {
  render() {
    const { labelText, onToggle, isOn } = this.props;
    return (
      <View style={{ width: "100%" }}>
        {/* <TouchableOpacity onPress={onPress}> */}
        <View
          style={{
            flexDirection: "row",
            height: 64,
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              flex: 1,
              height: 22,
              color: "#515B61",
              fontFamily: "Avenir",
              fontSize: 16,
              fontWeight: "900",
              lineHeight: 22
            }}
          >
            {labelText}
          </Text>
          <Switch
            thumbColor={Platform.OS == "ios" ? undefined : "#fff"}
            value={isOn}
            onValueChange={() => {
              onToggle && onToggle();
            }}
            onTintColor={"#ED1B2E"}
          />
          {/* <Image style={{ height: 16, }} source={DETAIL_ARROW} /> */}
        </View>
        {/* </TouchableOpacity> */}
        <View
          style={{
            backgroundColor: "#d9dcde",
            height: 1
          }}
        />
      </View>
    );
  }
}

SwitchCell.PropTypes = {
  labelText: PropTypes.string,
  onToggle: PropTypes.func,
  isOn: PropTypes.bool
};

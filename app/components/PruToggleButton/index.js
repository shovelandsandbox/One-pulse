/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Theme } from "../../themes";
const { Colors } = Theme;

class PruToggleButton extends React.PureComponent {
  state = {
    toggle: true,
  };

  toggle = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  // eslint-disable-next-line complexity
  render() {
    const leftLabel = this.props.leftLabel ? this.props.leftLabel : "LeftLabel";
    const rightLabel = this.props.rightLabel
      ? this.props.rightLabel
      : "RightLabel";
    const onColor = this.props.onColor ? this.props.onColor : Colors.pulseRed;
    const offColor = this.props.offColor ? this.props.offColor : Colors.white;
    const onTextColor = this.props.onTextColor
      ? this.props.onTextColor
      : Colors.white;
    const offTextColor = this.props.offTextColor
      ? this.props.offTextColor
      : Colors.black222529;
    const height = this.props.height ? this.props.height : 60;
    const internalHeight = height - 2;
    return (
      <View style={{ flex: 1, height: height }}>
        <View
          style={{
            borderWidth: 1,
            marginLeft: 70,
            marginRight: 70,
            borderColor: onColor,
            borderRadius: height / 2
          }}
        >
          <View
            style={{
              flexDirection: "row",
              backgroundColor: offColor,
              borderRadius: height / 2,
              height: internalHeight,
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor:
                  this.props.viewMode == "leftMode"
                    ? onColor
                    : offColor,
                height: internalHeight,
                borderRadius: height / 2,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 1
              }}
              onPress={() => {
                if (this.props.viewMode != "leftMode") {
                  this.props.leftPress();
                  this.toggle();
                }
              }}
            >
              <Text
                style={{
                  color: this.props.viewMode == "leftMode" ? onTextColor : offTextColor
                }}
              >
                {leftLabel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: this.props.viewMode == "rightMode" && !this.props.toggle ? onColor : offColor,
                height: internalHeight,
                borderRadius: height / 2,
                justifyContent: "center",
                alignItems: "center"
              }}
              onPress={() => {
                if (this.props.viewMode != "rightMode") {
                  this.props.rightPress();
                  this.toggle();
                }
              }}
            >
              <Text
                style={{
                  color: this.props.viewMode == "rightMode" ? onTextColor : offTextColor
                }}
              >
                {rightLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default PruToggleButton;

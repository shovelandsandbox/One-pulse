import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../styles";
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from "react-native-popover-view";

export class BarChartColumn extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPopover: false,
    };
  }

  setShowPopover = val => {
    this.setState({ showPopover: val });
  };

  render() {
    const { showPopover } = this.state;
    const { value, height = 0, width, active, label } = this.props;
    return (
      <View style={compStyles.barContainer}>
        <View style={compStyles.bar}>
          {active ? (
            <Popover
              placement={PopoverPlacement.TOP}
              isVisible={showPopover}
              animationConfig={{ duration: 0 }}
              backgroundStyle={compStyles.popoverBackground}
              onRequestClose={() => this.setShowPopover(false)}
              from={
                <TouchableOpacity
                  onPress={() => this.setShowPopover(true)}
                  style={{ ...compStyles.barVertical(height, active, width) }}
                ></TouchableOpacity>
              }
            >
              <View style={compStyles.popover}>
                <Text style={compStyles.popoverText}>{label}</Text>
                <Text style={compStyles.popoverText}>{value}</Text>
              </View>
            </Popover>
          ) : (
            <View
              style={{ ...compStyles.barVertical(height, active, width) }}
            ></View>
          )}
        </View>
      </View>
    );
  }
}

BarChartColumn.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  active: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
};

const compStyles = StyleSheet.create({
  bar: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginRight: 10,
  },
  barContainer: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
    height: 140,
  },
  barVertical: (height, active, width) => ({
    backgroundColor: active ? colors.pulseRed : colors.chablisDark,
    borderRadius: 5,
    width: width,
    minHeight: height || 0,
  }),
  popover: {
    borderColor: colors.lightSlateGrey,
    borderWidth: 0.3,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  popoverBackground: {
    opacity: 0,
  },
  popoverText: {
    fontSize: 12,
    fontWeight: "bold",
    lineHeight: 14,
    marginBottom: 2,
    textAlign: "center",
  },
});

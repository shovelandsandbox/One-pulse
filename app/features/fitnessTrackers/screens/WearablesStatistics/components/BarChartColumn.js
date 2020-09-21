import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import styles, { fontSize, colors } from "../styles";

export const BarChartColumn = ({ label, value, height }) => {
  return (
    <View style={compStyles.barContainer}>
      <View style={compStyles.bar}>
        <Text style={{ ...styles.TEXT, fontSize: fontSize.tiny }}>{value}</Text>
        <View style={{ ...compStyles.barVertical(height) }}></View>
        <Text style={{ ...styles.TEXT, ...compStyles.barLabel }}>{label}</Text>
      </View>
    </View>
  );
};

BarChartColumn.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  height: PropTypes.number,
};

const compStyles = StyleSheet.create({
  bar: {
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginLeft: 5,
  },
  barContainer: {
    flex: 1,
    flexDirection: "row",
    flexGrow: 1,
    height: 140,
  },
  barLabel: {
    color: colors.unitTextColor,
    fontSize: fontSize.tiny,
  },
  barVertical: height => ({
    backgroundColor: colors.pulseRed,
    borderRadius: 5,
    width: 10,
    minHeight: height || 0,
  }),
});

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { string, func } from "prop-types";
import { colors } from "@pru-rt-internal/pulse-common";

export default function ActionButton({ actionButtonConfig }) {
  if (!actionButtonConfig) {
    return null;
  }
  return (
    <TouchableOpacity onPress={actionButtonConfig.onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonContainerText}>
          {actionButtonConfig.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

ActionButton.propTypes = {
  actionButtonConfig: {
    text: string,
    onPress: func,
  },
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.red,
    borderColor: colors.solidGray,
    borderRadius: 6,
    borderWidth: 0.4,
    color: colors.white,
    height: 24,
    marginBottom: -4,
    padding: 4,
    width: 90,
  },
  buttonContainerText: {
    color: colors.white,
    flexDirection: "row",
    flex: 1,
    fontSize: 10,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
});

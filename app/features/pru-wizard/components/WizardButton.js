import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export default WizardButton = props => (
  <View style={styles.continueButtonContainer}>
    <TouchableOpacity
      style={styles.continueButton}
      onPress={props.onNextPressed}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#ed1b2e", "#f76e3a"]}
        style={styles.buttonStyle}
      >
        <Text style={styles.continueButtonText}>
          {props.text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>);

const styles = StyleSheet.create({
  continueButtonContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  continueButton: {
    backgroundColor: "transparent",
    borderRadius: 22,
    width: "90%",
  },
  buttonStyle: {
    alignItems: "center",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 1,
  },
});

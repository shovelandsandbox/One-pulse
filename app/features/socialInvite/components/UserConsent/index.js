/* eslint-disable react/display-name */
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

export default UserConsent = ({
  title,
  message,
  skip,
  allowAccess,
  onSkipPress,
  onAllowAccessPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtext}>{message}</Text>
      <View style={styles.buttonView}>
        <TouchableOpacity
          onPress={() => onSkipPress()}
          style={styles.skipButton}
        >
          <Text style={styles.skipButtonText}>{skip}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => onAllowAccessPress()}
        >
          <Text style={styles.continueButtonText}>{allowAccess}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

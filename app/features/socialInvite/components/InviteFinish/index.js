/* eslint-disable react/display-name */
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import styles from "./styles";

export default InviteFinish = ({
  icon,
  title,
  subtext,
  midImage,
  skipButtonText,
  continueButtonText,
  onSkipPress,
  onContinuePress,
  backgroundImage,
}) => {
  return (
    <ImageBackground
      style={styles.container}
      source={backgroundImage}
      resizeMode={"cover"}
    >
      <View style={styles.headerContainer}>
        {icon && <Image source={icon} style={styles.icon} />}
        <Text style={icon ? styles.title1 : styles.title2}>{title}</Text>
      </View>
      {subtext && <Text style={styles.subtext}>{subtext}</Text>}
      <Image
        source={midImage}
        style={skipButtonText ? styles.midImage1 : styles.midImage2}
      />

      {skipButtonText && (
        <TouchableOpacity
          onPress={() => onSkipPress()}
          style={styles.skipButton}
        >
          <Text style={styles.skipButtonText}>{skipButtonText}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => onContinuePress()}
      >
        <Text style={styles.continueButtonText}>{continueButtonText}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

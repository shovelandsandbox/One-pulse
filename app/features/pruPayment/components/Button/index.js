import React from "react";
import { Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";

const CustomButton = ({ text, colors, onTextPress }) => {
  return (
    <TouchableOpacity onPress={onTextPress}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={colors}
        style={styles.continueButton}
      >
        <Text style={styles.continueText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string,
  onTextPress: PropTypes.func,
  colors: PropTypes.array,
};

export default CustomButton;

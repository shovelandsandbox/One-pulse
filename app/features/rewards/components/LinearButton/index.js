import React from "react";
import { Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";

const LinearButton = ({ text, colors, onTextPress, isDisabled = false }) => {
  return (
    <TouchableOpacity onPress={onTextPress} disabled={isDisabled}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={colors}
        style={styles.button}
      >
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

LinearButton.propTypes = {
  text: PropTypes.string,
  onTextPress: PropTypes.func,
  colors: PropTypes.array,
  isDisabled: PropTypes.bool,
};

export default LinearButton;

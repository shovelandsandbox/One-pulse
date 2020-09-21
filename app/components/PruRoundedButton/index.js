import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

import styles from "./styles";

export default PruRoundedButton = props => {
  const {
    onPress,
    buttonTitle,
    textStyling,
    style,
    disabled,
    supportText,
    supportIcon,
    linearGradient,
  } = props;

  const color = disabled ? ["#70707090", "#70707090"] : ["#ec1c2e", "#a21421"];
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <LinearGradient
        colors={linearGradient ? linearGradient : color}
        style={{ ...styles.linearGradient, ...style }}
      >
        <Text style={{ ...styles.buttonText, ...textStyling }}>
          {buttonTitle}
        </Text>
        { supportText && (
          <View style={styles.supportTextView}>
              <Image source={supportIcon} style={styles.supportIcon} />
              <Text style={styles.supportText}>{supportText}</Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

PruRoundedButton.PropTypes = {
  buttonTitle: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
  textStyling: PropTypes.object,
  enableSupportText: PropTypes.bool,
  supportText: PropTypes.string,
  supportIcon: PropTypes.object,
  linearGradient: PropTypes.object
};

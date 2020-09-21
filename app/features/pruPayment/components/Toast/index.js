import React from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const Toast = ({ description, onClosePress, closeIcon }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{description}</Text>
      <TouchableOpacity onPress={onClosePress}>
        <Image style={styles.closeImage} source={closeIcon} />
      </TouchableOpacity>
    </View>
  );
};

Toast.propTypes = {
  description: PropTypes.string,
  onClosePress: PropTypes.func,
};

export default Toast;

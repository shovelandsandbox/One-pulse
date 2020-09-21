import React from "react";
import { Text, View, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import { DISCOUNT_LOGO } from "../../../../config/images";

const NoDiscount = ({ message }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={DISCOUNT_LOGO} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

NoDiscount.propTypes = {
  message: PropTypes.string,
};

export default NoDiscount;

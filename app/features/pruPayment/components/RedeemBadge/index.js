import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const RedeemBadge = ({ description, isRadioSelected, radioButtonPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.radioView} onPress={radioButtonPress}>
        <View style={isRadioSelected ? styles.redView : styles.whiteView} />
      </TouchableOpacity>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

RedeemBadge.propTypes = {
  description: PropTypes.string,
  isRadioSelected: PropTypes.bool,
  radioButtonPress: PropTypes.func,
};

export default RedeemBadge;

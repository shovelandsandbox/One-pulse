import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const NoDiscount = ({ item, radioButtonPress, isSelected }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={item.logo} resizeMode={"contain"} />
      <Text style={styles.text}>{item.name}</Text>
      <TouchableOpacity style={styles.radioView} onPress={() => {
        radioButtonPress(item);
      }}>
        <View
          style={isSelected ? styles.redView : styles.whiteView}
        />
      </TouchableOpacity>
    </View>
  );
};

NoDiscount.propTypes = {
  item: PropTypes.string,
  radioButtonPress: PropTypes.func,
};

export default NoDiscount;

import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const WPCard = props => {
  return (
    <TouchableOpacity
      activeOpacity={props.onPress ? 0.3 : 1}
      style={[styles.wrapper, props.style ? props.style : null]}
      onPress={props.onPress ? props.onPress : null}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default WPCard;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 5,
    shadowColor: "#000000",
    shadowRadius: 10,
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 3 }
  }
});

import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

import { path } from "ramda";

const setBGColor = color => {
  return {
    backgroundColor: color,
  };
};

const TabComponent = ({ items, onPress }) => {
  const sourceUri = path(["icon"], items);
  const name = path(["name"], items);
  const color = path(["color"], items);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress(items.name != "All" ? items.name : "");
      }}
    >
      <View style={styles.contentViewimage}>
        <Image style={styles.actionImage} source={sourceUri} />
      </View>
      <View style={styles.contentView}>
        <Text style={styles.contentTitle}>{name}</Text>
      </View>
      <View style={[styles.underline, setBGColor(color)]}></View>
    </TouchableOpacity>
  );
};

export default TabComponent;

/* eslint-disable react/display-name */
import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

const getIconStyle = image => {
  return {
    height: image.height,
    width: image.width,
  };
};

export default RewardRowItem = ({ item, onTilePress }) => {
  return (
    <View style={styles.container}>
      <Image
        source={item.image.source}
        resizeMode="contain"
        style={getIconStyle(item.image)}
      />
      <Text style={styles.countText}>{item.count}</Text>
      <Text style={styles.nameText}>{item.name}</Text>
    </View>
  );
};

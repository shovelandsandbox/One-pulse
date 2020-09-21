/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import React from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";

const getIconStyle = image => {
  return {
    height: image.height,
    width: image.width,
  };
};
const getTextColor = titleColor => {
  return {
    color: titleColor,
  };
};

const getShadowColor = titleColor => {
  return {
    shadowColor: titleColor,
  };
};

export default SocialAppTile = ({ item, onTilePress }) => {
  return (
    <TouchableOpacity
      style={[styles.container, getShadowColor(item.titleColor)]}
      onPress={e => {
        e.preventDefault();
        onTilePress(item.id);
      }}
    >
      <Image
        source={item.image.source}
        resizeMode="contain"
        style={getIconStyle(item.image)}
      />
      <Text style={[styles.titleText, getTextColor(item.titleColor)]}>
        {item.title}
      </Text>
      <Text style={styles.contentText} numberOfLines={2}>{item.content}</Text>
    </TouchableOpacity>
  );
};

import React from "react";
import { View, Text, Image } from "react-native";
import { object, string } from "prop-types";

import { WELLNESS_REWARD } from "../../../../config/images";

import styles from "./styles";

export default WPBadgesWithText = ({
  title,
  customStyle = {},
  customTitleStyle = {},
  customIcon = {}
}) => {
  return (
    <View style={[styles.container, customStyle]}>
      <Image source={WELLNESS_REWARD} style={[styles.icon, customIcon]} />
      <Text style={[styles.title, customTitleStyle]}>{title}</Text>
    </View>
  );
};

WPBadgesWithText.PropTypes = {
  customIcon: object,
  customStyle: object,
  customTitleStyle: object,
  title: string,
};

import React from "react";
import PropTypes from "prop-types";
import { colors } from "../styles";
import { Text, StyleSheet, Image, TouchableOpacity, View } from "react-native";

export const ActivitySelector = ({
  title,
  selected,
  image,
  activeImage,
  onPress,
}) => {
  const style = [compStyles.toggleText];
  const icon = selected ? activeImage : image;
  const backgroundColor = selected
    ? { backgroundColor: "#ed1b2e" }
    : { backgroundColor: "#f9f9f9" };

  if (selected) {
    style.push({ color: colors.pulseRed });
  }

  return (
    <TouchableOpacity style={compStyles.activityBar} onPress={() => onPress()}>
      <View style={[compStyles.iconContainer, backgroundColor]}>
        <Image source={icon} style={compStyles.icon} resizeMode="contain" />
      </View>
      <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );
};

ActivitySelector.propTypes = {
  title: PropTypes.string,
  selected: PropTypes.bool,
  image: PropTypes.any,
  onPress: PropTypes.func,
  activeImage: PropTypes.string,
};

const compStyles = StyleSheet.create({
  activityBar: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  icon: {
    height: 30,
    width: 30,
  },
  iconContainer: {
    alignContent: "center",
    alignItems: "center",
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    width: 50,
  },
  toggleText: {
    color: colors.black,
    fontSize: 14,
    paddingVertical: 10,
    textAlign: "center",
  },
});

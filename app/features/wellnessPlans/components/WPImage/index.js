import React from "react";
import {
  ImageBackground,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import {
  HABIT_LOCK,
  WELLNESS_HABIT_COMPLETED,
} from "../../../../config/images";

const WPImage = props => {
  const { mainImage, status, forHabits, level } = props;
  let subImage =
    status === "COMPLETED"
      ? WELLNESS_HABIT_COMPLETED
      : status === "LOCKED"
      ? HABIT_LOCK
      : null;
  const progress = status === "ACTIVE" ? true : false;

  const getColor = () => {
    switch (level) {
      case "_0":
        return ["#c8c8c8", "#000000"];
      case "_1":
        return ["#e84c5a", "#9a2f39"];
      case "_2":
        return ["#564ce8", "#37309f"];
      default:
        return ["#ad89f9", "#7357af"];
    }
  };
  return (
    <ImageBackground
      source={{ uri: mainImage }}
      resizeMode={"stretch"}
      style={forHabits ? Styles.smallImage : Styles.bigImage}
    >
      {subImage && (
        <View style={Styles.unlockRedIconContainer}>
          <Image
            style={Styles.unlockRedIcon}
            resizeMode="contain"
            source={subImage}
          />
        </View>
      )}
      {progress && level && (
        <LinearGradient
          colors={getColor()}
          style={[Styles.countBlueGradient, {borderColor: getColor()[0]}]}
        >
          <TouchableOpacity
            // onPress={() => props.onPress && props.onPress()}
            style={{ zIndex: 999 }}
          >
            <Text style={Styles.countValue}>{level.substring(1)}</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </ImageBackground>
  );
};

const Styles = StyleSheet.create({
  countBlueGradient: {
    position: "absolute",
    right: 6.7,
    top: 6.7,
    borderRadius: 20,
    width: 26,
    borderWidth: 3,
    borderColor: "#968eff",
  },
  countValue: {
    flex: 0.2,
    textAlign: "center",
    color: "white",
  },
  bigImage: {
    height: 183,
    width: "100%",
  },
  smallImage: {
    height: 110,
    width: "100%",
    overflow: "hidden",
    borderWidth: 0.5,
    borderColor: "#eeeeee",
  },
  unlockRedIconContainer: {
    position: "absolute",
    right: 6.7,
    top: 6.7,
    zIndex: 999,
  },
  unlockRedIcon: {
    height: 20,
    width: 20,
  },
});

export default WPImage;

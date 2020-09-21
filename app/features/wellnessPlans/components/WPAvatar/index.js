import React from "react";
import { View, StyleSheet, Image } from "react-native";

const WPAvatar = props => {
  const getSource = () => {
    if (props.uri) {
      return {
        uri: props.uri,
      };
    } else if (props.source) {
      return props.source;
    }
  };

  return (
    <View
      style={[
        styles.imageWrapper,
        props.size === "large" ? styles.largeWrapper : null,
        props.style ? props.style : null,
      ]}
    >
      <Image
        style={[
          styles.image,
          props.size === "large" ? styles.largeImage : null,
          props.imageStyle ? props.imageStyle : null,
        ]}
        resizeMode={"cover"}
        source={getSource()}
      ></Image>
    </View>
  );
};

export default WPAvatar;

const styles = StyleSheet.create({
  largeWrapper: {
    borderStyle: "solid",
    borderWidth: 2.3,
    borderColor: "#ffffff",
    width: 50,
    height: 50,
    elevation: 5,
  },
  imageWrapper: {
    width: 34,
    height: 34,
    overflow: "hidden",
    borderRadius: 25,
    elevation: 1,
  },
  largeImage: {
    width: 50,
    height: 50,
  },
  image: {
    width: 34,
    height: 34,
  },
});

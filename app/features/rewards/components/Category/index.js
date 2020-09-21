import React from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

import styles from "./style";

const Category = props => {
  const {
    headerText,
    BodyComponent,
    BGImage,
    supportText,
    alignBGImageInCenter,
    enableBGImage = true,
    enablesupportText = false,
    onSupportTextPress,
  } = props;

  return (
    <View style={styles.whiteContainer}>
      <View style={styles.whiteHeaderContainer}>
        <Text style={styles.whiteHeader}>{headerText}</Text>
      </View>
      <View style={styles.whiteContainerBody}>{BodyComponent}</View>
      {enableBGImage && (
        <Image
          source={BGImage}
          style={
            alignBGImageInCenter
              ? styles.imgBackgroundInCenter
              : styles.imgBackground
          }
        />
      )}
      {enablesupportText && (
        <TouchableOpacity onPress={onSupportTextPress}>
          <Text style={styles.whiteSupport}>{supportText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Category;

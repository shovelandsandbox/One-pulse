import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { ccaImages } from "../../images"
import { HeaderStyles as styles } from "./styles";

const Header = props => {
  return (
    <View style={styles.headerContainer}>

      <TouchableOpacity onPress={props.onPressIcon}>
        <View style={styles.headerContentView}>
          <Image style={styles.headerLeftImage} source={{ uri: ccaImages.headerBack }} />
          <Text style={styles.headerLeftTitleText}>{props.headerLeftTitle}</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.headerMainTitleText}>{props.headerMainTitle}</Text>

      <TouchableOpacity onPress={props.onRightTitlePress}>
        <View style={styles.headerContentView}>
          <Text style={styles.headerRightTitleText}>{props.headerRightTitle}</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};

export { Header };

import React from "react";
import { Text, View, Image } from "react-native";

import { WELLNESS_SHARE_RED } from "../../../../config";

import styles from "./styles";

const ShareComponent = props => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image source={WELLNESS_SHARE_RED} style={styles.icon} />
      </View>
      <View>
        <Text style={styles.buttonText}>Share</Text>
      </View>
    </View>
  );
};

export default ShareComponent;

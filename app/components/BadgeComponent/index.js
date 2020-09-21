import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const BadgeComponent = props => {
  const { count } = props;
  return (
    <View style={styles.fabSubContainer}>
      <Text style={styles.badgeCount}>{count}</Text>
    </View>
  );
};

export default BadgeComponent;

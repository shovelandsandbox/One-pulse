import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import styles from "./styles";

import { DISCOUNT } from "../../../../config/images";

export default BonusTag = ({ bonusRewarded, onPressHandle }) => (
  <TouchableOpacity style={styles.bonusTagContainer} onPress={onPressHandle}>
    <Image source={DISCOUNT} style={styles.discountIcon} />
    <Text style={styles.bonusText}>{bonusRewarded}</Text>
  </TouchableOpacity>
);

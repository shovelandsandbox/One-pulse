import React from "react";
import { View, Image, Text } from "react-native";
import styles from "./styles";

import { WINNER_ICON, COMPETITION_ICON, HEALTHY_BADGE } from "../../../../config/images";

export default Medal = ({ trophyCount, medalCount }) => (
  <View style={styles.badgeContainer}>
    {
      trophyCount !== 0 &&
      (<View style={styles.winnerContainer}>
        <Image source={HEALTHY_BADGE} style={styles.winnerIcon} />
        <Text style={styles.countText}>{trophyCount}</Text>
      </View>)
    }
    <View style={styles.medalContainer}>
      <Image source={HEALTHY_BADGE} style={styles.medalIcon} />
      <Text style={styles.countText}>{medalCount}</Text>
    </View>
  </View>
);

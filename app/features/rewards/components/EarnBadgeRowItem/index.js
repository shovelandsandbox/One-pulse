import React from "react";
import { View, Text, Image } from "react-native";
import PropTypes from "prop-types";
import { SR_ICON } from "../../../../config/images";
import styles from "./styles";
import LinearButton from "../LinearButton";
import { metaFinderRewards } from "../../configs/meta-utils";
import { GO_TEXT } from "../../configs/metaConstant";

const EarnBadgeRowItem = ({ item, onGoPress }) => {
  const redGradient = ["#ec1c2e", "#a21421"];
  const goText = metaFinderRewards(GO_TEXT);
  return (
    <View style={styles.container}>
      <View style={styles.badgeView}>
        <Image source={SR_ICON} style={styles.imageIcon} />
        <Text style={styles.countText}>{item.badgeCount}</Text>
      </View>
      <Text style={styles.activityText}>{item.activityName}</Text>
      <LinearButton
        colors={redGradient}
        text={goText}
        onTextPress={() => {
          onGoPress(item);
        }}
      />
    </View>
  );
};

EarnBadgeRowItem.propTypes = {
  item: PropTypes.object,
  onGoPress: PropTypes.func,
};

export default EarnBadgeRowItem;

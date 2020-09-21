import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { pathOr } from "ramda";

import styles from "./styles";
import { WPImage, WPTitle, WPDescription } from "../../components";

import { WELLNESS_REWARD } from "../../../../config";
import MetaConstants from "../../meta";
const width = Dimensions.get("window").width;

const WPDetailsModal = props => {
  const { habit } = props;
  const imageUrl = pathOr("", ["icons", "badge", "tags", "600*600"], habit);
  const metaConstants = { ...MetaConstants.screenMeta() };
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 3.3,
        height: "auto",
        width: width * 0.9
      }}
    >
      <WPImage mainImage={imageUrl} />
      <View style={{ padding: 23.3 }}>
        <WPTitle title={habit.title} />
        <View style={{ marginTop: 8 }}>
          <WPDescription
            description={habit.longDescription}
            numberOfLines={null}
            action={() => {}}
            habits={[]}
          />
        </View>
        <View>
          <View style={styles.rewardTextContainer}>
            <Text style={styles.rewardText}>
              {metaConstants.wellness_reward}
            </Text>
            <View style={styles.badgeSubContainer}>
              <Image
                source={WELLNESS_REWARD}
                style={styles.badge}
                resizeMode={"contain"}
              />
              <View>
                <Text
                  style={[styles.badgeCompletionText, { color: "#000000" }]}
                >
                  {metaConstants.get}{" "}
                  {habit.earnReward ? habit.earnReward.units : 0}{" "}
                  {metaConstants.badge_upon_completion}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.mileStoneContainer}>
            <Text style={styles.duration}>
              {metaConstants.wellness_duration}
            </Text>
            <Text style={[styles.days, , { color: "#000000" }]}>
              {habit.milestoneCount || 7} {metaConstants.wellness_days}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WPDetailsModal;

import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import Styles from "./styles";
import WPDarkModal from "../WPDarkModal";

import { WELLNESS_REWARD } from "../../../../config/images";

import MetaConstants from "../../meta";
const WPEarnBadges = ({ availableBadges = 0, forHabit = false }) => {
  const metaConstants = { ...MetaConstants.screenMeta() };
  const rewardList = [
    {
      label: metaConstants.complete_health_assess,
      reward: metaConstants.fifteen_x
    },
    {
      label: metaConstants.complete_your_current,
      reward: metaConstants.ten_x
    },
    {
      label: metaConstants.refer_five_friends,
      reward: metaConstants.ten_x
    }
  ];
  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Text style={Styles.headerText}>{metaConstants.oops}</Text>
      </View>
      <View style={Styles.descriptionContainer}>
        <View style={Styles.descriptionContainerHeader}>
          <Text style={[Styles.descriptionContainerText, { color: "#000000" }]}>
            {metaConstants.you_need_for} {availableBadges}{" "}
            {metaConstants.more_badges_to_unlock}{" "}
            {forHabit ? metaConstants.habit : metaConstants.goal}.
            {metaConstants.cheat_sheet}
          </Text>
        </View>
        <View style={Styles.descriptionContainerList}>
          {rewardList.map((reward, index) => (
            <View style={[Styles.row, Styles.listItem]} key={index}>
              <View style={Styles.listItemFirstBlock}>
                <Text
                  style={[
                    Styles.descriptionContainerText,
                    { color: "#000000" }
                  ]}
                >
                  {reward.label}
                </Text>
              </View>
              <View style={Styles.row}>
                <Text
                  style={[
                    Styles.descriptionContainerText,
                    { color: "#000000" }
                  ]}
                >
                  {reward.reward}
                </Text>
                <Image source={WELLNESS_REWARD} style={Styles.rewardImage} />
              </View>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={Styles.actionBlock} onPress={WPDarkModal.hide}>
        <Text style={Styles.actionBlockText}>{metaConstants.okay}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WPEarnBadges;

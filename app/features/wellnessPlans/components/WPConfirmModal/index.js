import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Styles from "./style";
import { pathOr } from "ramda";
import { BADAGE_ICON } from "../../../../config";
import MetaConstants from "../../meta";

const BoldText = props => {
  return (
    <Text style={{ fontWeight: "bold", color: "#000000", width: 20 }}>
      {props.children}
    </Text>
  );
};

const WPConfirmUnlockModal = props => {
  const { habit, badges, isItHabit } = props;
  const uri = pathOr("", ["icons", "badge", "tags", "600*600"], habit);
  const metaConstants = { ...MetaConstants.screenMeta() };

  return (
    <View style={[Styles.subContainer, { backgroundColor: "#FFFFFF" }]}>
      <View style={Styles.textContainer}>
        <View style={{ flex: 1 }}>
          <Text style={[Styles.title, { color: "#000000" }]}>
            {metaConstants.confirm_unlock}
          </Text>
        </View>

        <View style={Styles.descriptionContainer}>
          <View style={{ paddingLeft: 3 }}>
            <Text style={[Styles.descriptionText, { color: "#000000" }]}>
              {metaConstants.you_have}
            </Text>
          </View>
          <View style={Styles.badgeContainer}>
            <Image
              source={BADAGE_ICON}
              style={Styles.badgeImage}
              resizeMode={"contain"}
            />
          </View>
          <View style={Styles.badgeCountContainer}>
            <Text style={[Styles.badgeCountText, { color: "#000000" }]}>
              {badges}
            </Text>
          </View>
        </View>
      </View>
      <View style={Styles.imageContainer}>
        <View style={Styles.imageSubContainer}>
          <Image
            source={{ uri }}
            style={Styles.imageStyle}
            resizeMode={"contain"}
          />
          <Text style={Styles.imageText}>{habit.title || habit.name}</Text>
        </View>
        <View style={Styles.redeemTextContainer}>
          {habit.unlockReward.units < habit.badges ? (
            <Text style={[Styles.redeemText, { color: "#292929" }]}>
              {metaConstants.wellness_dont_have_badges}
              {` `}
              {`${isItHabit ? metaConstants.habit : metaConstants.goal}`}
            </Text>
          ) : (
            <Text style={Styles.redeemText}>
              {metaConstants.you_need_for}
              <BoldText>{` ${habit.unlockReward.units} `}</BoldText>
              {metaConstants.badges_to_unlock_this}
              {` `}
              {`${isItHabit ? metaConstants.habit : metaConstants.goal}`}.{` `}
              {metaConstants.you_have}
              <BoldText>{` ${badges}`}</BoldText>{" "}
              {metaConstants.do_you_want_unlock}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default WPConfirmUnlockModal;

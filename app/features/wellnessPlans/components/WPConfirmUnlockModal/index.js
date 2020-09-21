import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import Styles from "./styles";
import { pathOr } from "ramda";
import { BADAGE_ICON } from "../../../../config";
import MetaConstants from "../../meta";

const BoldText = props => (
  <Text style={{ fontWeight: "bold", color: "#ffffff", width: 20 }}>
    {props.children}
  </Text>
);

const WPConfirmUnlockModal = ({ props }) => {
  const uri = pathOr("", ["icons", "badge", "tags", "600*600"], props);
  const metaConstants = { ...MetaConstants.screenMeta() };

  return (
    <View style={Styles.subContainer}>
      <View style={Styles.textContainer}>
        <View>
          <Text style={Styles.title}>{metaConstants.confirm_unlock}</Text>
        </View>

        <View style={Styles.descriptionContainer}>
          <View style={{ paddingLeft: 3 }}>
            <Text style={Styles.descriptionText}>{metaConstants.you_have}</Text>
          </View>
          <View style={Styles.badgeContainer}>
            <Image
              source={BADAGE_ICON}
              style={Styles.badgeImage}
              resizeMode={"contain"}
            />
          </View>
          <View style={Styles.badgeCountContainer}>
            <Text style={Styles.badgeCountText}>{props.badges}</Text>
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
          <Text style={Styles.imageText}>{props.title || props.name}</Text>
        </View>
        <View style={Styles.redeemTextContainer}>
          {props.unlockReward.units < props.badges ? (
            <Text style={Styles.redeemText}>
              {metaConstants.dont_have_badges_unlock_habit}
            </Text>
          ) : (
            <Text style={Styles.redeemText}>
              {metaConstants.redeem}
              <BoldText>{props.unlockReward.units}</BoldText>
              {metaConstants.out_of} <BoldText>{props.badges}</BoldText>
              {metaConstants.badges_to_unlock_this_goal}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default WPConfirmUnlockModal;

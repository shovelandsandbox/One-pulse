import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import { WPDarkModal } from "../../components";
import Styles from "./styles";

import { AWARD_CUP, BADAGE_ICON } from "../../../../config";
import MetaConstants from "../../meta";

const WPCongratulationModal = ({ rewards }) => {
  const metaConstants = { ...MetaConstants.screenMeta() };

  return (
    <View style={[Styles.subContainer, { backgroundColor: "#FFFFFF" }]}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={AWARD_CUP}
          style={{ height: 83, width: 79.3 }}
          resizeMode={"contain"}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 13
        }}
      >
        <Text style={{ fontSize: 14, color: "#000000", fontWeight: "bold" }}>
          {metaConstants.wellness_congratulation}
        </Text>
      </View>

      <View style={{ top: 10 }}>
        <Text style={{ color: "#000000", fontSize: 10.7, lineHeight: 16.7 }}>
          {metaConstants.congrats_reward_desc}
        </Text>
      </View>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          top: 18.3
        }}
      >
        <View style={Styles.badgeContainer}>
          <View>
            <Image
              source={BADAGE_ICON}
              style={Styles.badgeImage}
              resizeMode={"contain"}
            />
          </View>
          <View style={{ top: 10 }}>
            <Text style={Styles.badgeText}>
              {rewards || 0} {metaConstants.badges}
            </Text>
          </View>
        </View>
      </View>
      {/* button */}

      <View style={Styles.letsgoButtonContainer}>
        <TouchableOpacity
          style={Styles.letsgoButton}
          onPress={WPDarkModal.hide}
        >
          <Text style={{ color: "#ffffff" }}>
            {metaConstants.collect_reward}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WPCongratulationModal;

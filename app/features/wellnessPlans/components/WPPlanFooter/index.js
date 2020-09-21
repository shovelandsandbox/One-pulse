import React from "react";
import { Dimensions, View, Text, Image, StyleSheet } from "react-native";

import { WELLNESS_REWARD } from "../../../../config/images";
import MetaConstants from "../../meta";
import { PruRoundedButton } from "../../../../components";

const Width = Dimensions.get('window').width;

const DetailView = props => {
  const { inModal, unlockRewards, status, badges } = props;
  const metaConstants = { ...MetaConstants.screenMeta() };

  if (status === "COMPLETED") {
    return (
      <View style={{ marginTop: -4, justifyContent: "center" }}>
        <Text style={[Styles.badgeText, Styles.verticalCenter]}>
          Congrats, you have earned 100 badges!
        </Text>
      </View>
    )
  }

  if (inModal & status === "LOCKED") {
    return (
      <View style={{ marginTop: 4 }}>
        <Text style={[Styles.badgeText, Styles.verticalCenter]}>
          Need {unlockRewards} Badges
        </Text>
        <Text style={Styles.badgeText}>
          to unlock
        </Text>
      </View>
    )
  }
  
  return (
    <View style={{ marginTop: 4, width: Width*0.34 }}>
      <Text style={[Styles.badgeText, Styles.verticalCenter]}>
        {metaConstants.get} {badges} {metaConstants.badges}
      </Text>
      <Text style={Styles.badgeText}>
        {metaConstants.upon_completion}
      </Text>
    </View>
  )
}

const WPPlanFooter = props => {
  const { status, action, } = props;
  const metaConstants = { ...MetaConstants.screenMeta() };
  return (
    <View style={[Styles.container, Styles.row]}>
      <View>
        <View style={Styles.row}>
          <Image
            source={WELLNESS_REWARD}
            style={Styles.image}
            resizeMode={"contain"}
          />
          <DetailView {...props} />
        </View>
      </View>
      {status !== "COMPLETED" && (
        <PruRoundedButton buttonTitle= {status === "LOCKED"
        ? metaConstants.wellness_unlock
        : status === "ACTIVE"
        ? metaConstants.continue
        : metaConstants.join} style={Styles.buttonContainer} onPress={action} />
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  badgeText: {
    color: "#2d2d2d",
    fontSize: 10.7,
    lineHeight: 12.7,
  },
  buttonContainer: {
    borderRadius: 6.7,
    height: 40,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 34.5,
    textAlign: "center",
  },
  container: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  image: {
    height: 40,
    marginLeft: -10,
    width: 40,
  },
  reduceSpace: {
    marginLeft: 30,
    marginTop: -10,
  },
  row: {
    flexDirection: "row",
  },
  verticalCenter: {
    textAlignVertical: "center",
  },
});

export default WPPlanFooter;

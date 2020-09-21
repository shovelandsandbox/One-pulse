import React from "react";
import { View, Image, Text } from "react-native";
import Styles from "./styles";
import { pathOr } from "ramda";
import { RIGHT_ARROW } from "../../../../config";
import MetaConstants from "../../meta";

const WPChangeHabitModal = props => {
  const firstHabitImage = pathOr(
    "",
    ["habit", "icons", "badge", "tags", "600*600"],
    props.firstHabit
  );
  const firstHabitName = pathOr("", ["habit", "title"], props.firstHabit);

  const secondHabitImage = pathOr(
    "",
    ["icons", "badge", "tags", "600*600"],
    props.newHabit
  );
  const secondHabitName = pathOr("", ["newHabit", "title"], props);
  const metaConstants = { ...MetaConstants.screenMeta() };

  return (
    <View style={[Styles.subContainer, { backgroundColor: "#FFFFFF" }]}>
      <View style={{ marginTop: 14.7 }}>
        <Text style={{ fontSize: 14, color: "#000000", lineHeight: 16.3 }}>
          {metaConstants.confirm_habit_change}
        </Text>
      </View>
      <View style={{ justifyContent: "flex-start", marginTop: 10 }}>
        <Text style={{ color: "#000000", fontSize: 10.7, lineHeight: 16.7 }}>
          {metaConstants.habit_change_desc}
        </Text>
      </View>
      <View style={Styles.imageContainer}>
        <View>
          <Image
            source={{ uri: firstHabitImage }}
            style={Styles.imageStyle}
            resizeMode={"contain"}
          />
          <Text style={Styles.imageText}>{firstHabitName}</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image source={RIGHT_ARROW} style={{ width: 20, height: 14 }} />
        </View>
        <View>
          <Image
            source={{ uri: secondHabitImage }}
            style={Styles.imageStyle}
            resizeMode={"contain"}
          />

          <Text style={[Styles.imageText, { color: "#000000" }]}>
            {secondHabitName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WPChangeHabitModal;

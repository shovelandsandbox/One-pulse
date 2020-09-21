import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import InProgressHabitFooter from "./inProgressHabitFooter";
import MetaConstants from "../../meta";
const WPHabitTileFooter = props => {
  const { habit, unlockHabit, showDetails, markDone } = props;
  const isLocked = habit.status === "LOCKED";
  const isCompleted = habit.status === "COMPLETED";
  const isInProgress = habit.status === "ACTIVE";
  const metaConstants = { ...MetaConstants.screenMeta() };

  if (isInProgress) {
    return <InProgressHabitFooter habit={habit} action={markDone} />;
  }

  return (
    <View style={Styles.footer}>
      <TouchableOpacity
        style={Styles.detailTextContainer}
        onPress={() => showDetails(habit)}
      >
        <Text style={[Styles.detailText, Styles.footerText]}>
          {metaConstants.wellness_details}
        </Text>
      </TouchableOpacity>
      {isLocked && (
        <TouchableOpacity
          style={Styles.unlockContainer}
          onPress={() => unlockHabit(habit)}
        >
          <Text style={[Styles.unlockText, Styles.footerText]}>
            {metaConstants.wellness_unlock}
          </Text>
        </TouchableOpacity>)
      }
    </View>
  );
};

const Styles = StyleSheet.create({
  completedText: {
    color: "green",
    fontWeight: "900",
  },
  detailText: {
    color: "#979797",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4.3,
  },
  footerText: {
    fontSize: 9.3,
    lineHeight: 14,
  },
  unlockText: {
    color: "#e84c5a",
    fontWeight: "900",
    textDecorationLine: "underline",
  },
});

export default WPHabitTileFooter;

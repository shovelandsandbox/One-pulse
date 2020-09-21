import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

import { ACTION_PLAN_LOCK } from "../../../../config/images";
import MetaConstants from "../../meta";
const WPTitle = props => {
  const { locked, title, inProgress, isCompleted } = props;
  const metaConstants = { ...MetaConstants.screenMeta() };
  return (
    <View style={[Styles.container, Styles.row]}>
      <View style={Styles.row}>
        {locked && (
          <View style={Styles.unlockIconContainer}>
            <Image style={Styles.unlockIcon} source={ACTION_PLAN_LOCK} />
          </View>
        )}
        <Text style={[Styles.title, { color: "#000000" }]}>{title}</Text>
      </View>
      {inProgress && (
        <View>
          <Text style={Styles.status}>{metaConstants.in_progress}</Text>
        </View>
      )}
      {isCompleted && (
        <View>
          <Text style={Styles.statusCompleted}>
            {metaConstants.wellness_completed}
          </Text>
        </View>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    paddingVertical: 6
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  status: {
    color: "#ffa200",
    fontSize: 10,
    lineHeight: 22.7
  },
  statusCompleted: {
    color: "green",
    fontSize: 10,
    lineHeight: 22.7
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold"
  },
  unlockIcon: {
    height: 12.6,
    width: 9.7
  },
  unlockIconContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 6.7
  }
});

export default WPTitle;

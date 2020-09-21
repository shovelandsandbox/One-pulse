import React from "react";
import { Text, View } from "react-native";

import Styles from "./styles";
import { ProgressBar } from "react-native-paper";
import colors from "../../utils/colors";
import { styles as levelStyles } from "../../screens/EBLandingScreen/styles";
const active = {
  Beginner: colors.beginner,
  Intermediate: colors.intermediate,
  Advanced: colors.advanced,
};
export const Description = ({
  description,
  level,
  sets,
  progress,
  whichFooter,
}) => {
  return (
    <View style={Styles.descriptionContainer}>
      {!whichFooter && !progress && description && (
        <Text style={Styles.descriptionText} numberOfLines={2}>
          {description}
        </Text>
      )}
      {whichFooter && returnLevelBar(level, sets, whichFooter)}
      {progress && returnProgressBar(level, sets)}
    </View>
  );
};
const returnLevelBar = (level, sets, whichFooter) => {
  let total = 1,
    level1,
    level2,
    level3,
    text;
  const levelHeading = [levelStyles.levelHeading];
  switch (level) {
    case "_0":
      text = "Beginner";
      total = 1;
      level1 = { ...levelStyles.levelBoxActiveBeginnerFilled };
      level2 = { ...levelStyles.levelBoxActiveBeginnerOutline };
      level3 = level2;
      break;
    case "_1":
      text = "Intermediate";
      total = 2;
      level1 = { ...levelStyles.levelBoxActiveInterFilled };
      level2 = level1;
      level3 = { ...levelStyles.levelBoxActiveInterOutline };
      break;
    case "_2":
      text = "Advanced";
      total = 3;
      level1 = { ...levelStyles.levelBoxActiveAdvanced };
      level2 = level1;
      level3 = level1;
      break;
  }
  levelHeading.push({ color: active[text], fontSize: 12 });
  return (
    <View style={Styles.levelDescriptionContainer}>
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={levelHeading}>{text}</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={level1} />
          <View style={[Styles.marginOne, level2]} />
          <View style={[Styles.marginOne, level3]} />
        </View>
      </View>
      {whichFooter === "paused" && (
        <Text style={Styles.repsStatusText}>
          {sets}
          {"/"}
          {total}
          {" sets completed"}
        </Text>
      )}
    </View>
  );
};

const returnProgressBar = (level, sets) => {
  const total = parseInt(level.substring(1, level.length)) + 1;
  const progress = sets / total;
  return (
    <View>
      <ProgressBar
        progress={progress}
        color={colors.red}
        style={Styles.progressContainer}
      />
      <Text style={Styles.repsStatusText}>
        {total - sets}
        {"/"}
        {total}
        {" reps remaining"}
      </Text>
    </View>
  );
};

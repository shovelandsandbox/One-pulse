import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import WPProgressTile from "../WPProgressTile";
import MetaConstants from "../../meta";
import Styles from "./styles";
const WPDescription = props => {
  const {
    action,
    description,
    numberOfLines,
    habits,
    inModal,
    totalHabits,
    badges,
    continueAction,
    textStyle
  } = props;
  const metaConstants = { ...MetaConstants.screenMeta() };

  if (habits.length > 0 && !inModal) {
    return (
      <WPProgressTile
        habits={habits}
        totalHabits={totalHabits}
        badges={badges}
        continueAction={continueAction}
      />
    );
  }

  return (
    <View style={Styles.container}>
      <Text
        style={{...Styles.descriptionText , ...textStyle}}
        numberOfLines={numberOfLines}
        ellipsizeMode="tail"
      >
        {description}
      </Text>
      {numberOfLines && (
        <TouchableOpacity onPress={action} style={Styles.moreInfoContainer}>
          <Text style={Styles.moreInfo}>{metaConstants.learn_more}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default WPDescription;

import React, { PureComponent } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import { pathOr } from "ramda";
import {getHabitDetails} from "../../utils";

import { WPImage, WPHabitTileFooter } from "../../components";

export default class WPHabitTile extends PureComponent {
  render() {
    const {
      habit,
      showDetails,
      selectHabit,
      unlockHabit,
      inProgress,
      markDone,
      onPress
    } = this.props;
    const realHabit = inProgress ? habit.habit : habit;
    const imageUrl = pathOr(
      "",
      ["icons", "badge", "tags", "200*200"],
      realHabit
    );
    const Wrapper = inProgress ? View : TouchableOpacity;

    return (
      <Wrapper
        style={Styles.habitsImageTile}
        onPress={() => selectHabit(habit)}
      >
        <WPImage
          mainImage={imageUrl}
          forHabits={true}
          status={habit.status}
          // level={habit.level}
          onPress={() => {
            onPress && onPress();
          }}
        />
        <View
          style={[Styles.descriptionContainer, { backgroundColor: "#FFFFFF" }]}
        >
          <View style={Styles.habitTitleContainer}>
            <Text
              style={[Styles.habitTitle, { color: "#000000" }]}
              numberOfLines={1}
            >
              {getHabitDetails(realHabit, "name")}
            </Text>
          </View>
          <WPHabitTileFooter
            habit={habit}
            showDetails={showDetails}
            unlockHabit={unlockHabit}
            markDone={markDone}
          />
        </View>
      </Wrapper>
    );
  }
}

const Width = Dimensions.get("window").width;

const Styles = StyleSheet.create({
  habitsImageTile: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: "auto",
    paddingRight: 4,
    paddingTop: 7,
    width: Width * 0.32
  },
  descriptionContainer: {
    backgroundColor: "#000000",
    height: "auto",
    padding: 6.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3
  },
  habitTitle: {
    fontSize: 11,
    lineHeight: 14,
    color: "#ffffff"
  }
});

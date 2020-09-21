import React from "react";
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import * as Progress from "react-native-progress";
import moment from "moment";
import MetaConstants from "../../meta";
import { getHabitDetails } from "../../utils";
import {
  WELLNESS_INPROGRESS,
  WELLNESS_COMPLETED,
  WELLNESS_REWARD
} from "../../../../config/images";
import { PruRoundedButton } from "../../../../components";

const calculatePercentage = (habits, totalHabits) => {
  const actionPlanCompletion = totalHabits * 7;
  let currentProgress = 0;

  habits.map(habit => {
    if (habit.completedMilestoneCount > 0) {
      currentProgress = currentProgress + habit.completedMilestoneCount;
    }
  });

  return currentProgress / actionPlanCompletion;
};

export default WPProgressTile = ({
  habits,
  totalHabits,
  badges,
  continueAction
}) => {
  const metaConstants = { ...MetaConstants.screenMeta() };
  const completionPercentage = calculatePercentage(habits, totalHabits);
  habits = habits.filter(habit => habit.status !== "COMPLETED");

  return (
    <View style={[Styles.container, { backgroundColor: "#FFFFFF" }]}>
      <View style={Styles.subContainer}>
        <Progress.Bar
          progress={completionPercentage}
          width={165}
          height={12.7}
          color={"#ec1c2e"}
          unfilledColor={"#c9c9c9"}
          style={Styles.progressBar}
          borderColor={"#c9c9c9"}
        />
        <Text style={Styles.percentageText}>
          {Math.round(completionPercentage * 100)}%
        </Text>
      </View>
      <Text style={Styles.currentHabitText}>
        {metaConstants.habits_in_progress}
      </Text>
      <View style={{ flexDirection: "row", marginTop: 8.3, height: "auto" }}>
        <View
          style={{
            justifyContent: habits.length > 2 ? "space-between" : "flex-start",
            flex: 1
          }}
        >
          {habits.map((habit, index) => {
            const habitMilestone = habit.habitMilestones;
            let userHabitCompleted = false;
            const extraStyles = [Styles.listItem];

            habit.completedMilestoneCount > 0 &&
              habitMilestone.map(milestone => {
                if (
                  moment().diff(moment(milestone.reportedDate), "days") === 0
                ) {
                  userHabitCompleted = true;
                }
              });

            if (index !== 0) {
              extraStyles.push(Styles.extraMargin);
            }

            return (
              <View style={extraStyles} key={habit.id}>
                <Image
                  source={
                    userHabitCompleted
                      ? WELLNESS_COMPLETED
                      : WELLNESS_INPROGRESS
                  }
                  style={Styles.icon}
                />
                <Text style={Styles.habitsText}>
                  {getHabitDetails(habit.habit, "name")}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ alignSelf: "flex-end" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={WELLNESS_REWARD}
                style={{ width: 40, height: 40, marginTop: 8 }}
              />
              <View>
                <Text
                  style={{ fontSize: 10.7, lineHeight: 17.3, color: "#2d2d2d" }}
                >
                  {metaConstants.get} {badges} {metaConstants.badges}
                </Text>
                <Text
                  style={{ fontSize: 10.7, lineHeight: 17.3, color: "#2d2d2d" }}
                >
                  {metaConstants.badge_upon_small}
                </Text>
              </View>
            </View>
          </View>
          <PruRoundedButton buttonTitle= {metaConstants.continue} style={Styles.actionContainer}
            onPress={continueAction}  />
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  actionContainer: {
    alignSelf: "flex-end",
    borderRadius: 6.7,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 9.3,
    width: 140,
  },
  actionContainerText: {
    color: "#ffffff",
    fontSize: 12,
    lineHeight: 22,
    textAlign: "center",
    textAlignVertical: "center"
  },
  container: {
    backgroundColor: "#000",
    height: "auto"
  },
  currentHabitText: {
    color: "#ffffff",
    fontSize: 12.7,
    lineHeight: 21.3,
    marginTop: 20
  },
  extraMargin: {
    marginTop: 11
  },
  flexStart: {
    justifyContent: "flex-start"
  },
  habitsContainer: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start"
  },
  habitsText: {
    alignItems: "flex-start",
    alignSelf: "flex-start",
    color: "#2d2d2d",
    flexWrap: "wrap",
    fontSize: 11.3,
    marginLeft: 5
  },
  icon: {
    height: 9.3,
    width: 9.3
  },
  inProgressText: {
    color: "#ffa200",
    fontSize: 10,
    lineHeight: 23
  },
  listItem: {
    alignItems: "center",
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.32
  },
  multiHabitsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4.3
  },
  percentageText: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 10
  },
  subContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start"
  }
});

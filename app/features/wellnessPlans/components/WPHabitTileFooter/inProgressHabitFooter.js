import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import MetaConstants from "../../meta";
const width = Dimensions.get("window").width;

const InProgressHabitFooter = props => {
  const { habit, action } = props;
  const milestones = Array.from(Array(habit.milestoneCount || 7).keys());
  const metaConstants = { ...MetaConstants.screenMeta() };

  if (!habit.completedMilestoneCount && habit.completedMilestoneCount !== 0) {
    return null;
  }

  return (
    <View style={Styles.inProgressFooter}>
      <View style={[Styles.flexRow, Styles.durationMarkings]}>
        <View style={[Styles.flexRow, Styles.markingsContainer]}>
          {milestones.map((milestone, index) => {
            const styles = [Styles.blackMarking];

            if (index + 1 <= habit.completedMilestoneCount) {
              styles.push(Styles.markingGreen);
            }
            return <View style={styles} key={index} />;
          })}
        </View>
        <Text style={[Styles.duration, { color: "#000000" }]}>
          {`${habit.completedMilestoneCount}/${
            habit.habit ? habit.habit.milestoneCount : 7
          } ${metaConstants.wellness_days}`}
        </Text>
      </View>
      <View style={Styles.markingActionContainer}>
        <TouchableOpacity
          style={Styles.actionButton}
          onPress={() => action && action(habit)}
        >
          <Text style={Styles.actionButtonText}>
            {metaConstants.wellness_mark_complete}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    backgroundColor: "#e84c5a",
    borderRadius: 6,
    height: 27,
    justifyContent: "center"
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 11,
    lineHeight: 22.7
  },
  duration: {
    color: "#fff",
    fontSize: 9,
    fontWeight: "bold",
    lineHeight: 14,
    width: width * 0.1
  },
  durationMarkings: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  flexRow: {
    flexDirection: "row"
  },
  inProgressFooter: {
    marginTop: 10
  },
  marking: {
    backgroundColor: "#ffffff",
    borderRadius: 4 / 2,
    height: 4,
    marginRight: 2,
    width: 4
  },
  markingActionContainer: {
    marginVertical: 5.7,
    width: "100%"
  },
  markingGreen: {
    backgroundColor: "#129f35"
  },
  blackMarking: {
    backgroundColor: "#000000",
    borderRadius: 4 / 2,
    height: 4,
    marginRight: 2,
    width: 4
  },
  whiteMarking: {
    backgroundColor: "#ffffff",
    borderRadius: 4 / 2,
    height: 4,
    marginRight: 2,
    width: 4
  }
});

export default InProgressHabitFooter;

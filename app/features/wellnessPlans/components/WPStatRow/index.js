import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WPAvatar from "../WPAvatar";

export const WPStatRow = props => {
  const { item, status } = props;
  const milestones = Array.from(Array(item.milestoneCount || 7).keys());
  const completedCount = 3;
  return (
    <>
      <View style={styles.container}>
        {status === "allTime" && <Text style={styles.rank}>{item.rank}</Text>}
        <View style={styles.image}>
          <WPAvatar uri={item.image} />
        </View>
        <Text
          style={[
            styles.username,
            status === "allTime" ? null : { marginLeft: 14 },
          ]}
        >
          {item.username}
        </Text>
        {status === "allTime" ? (
          <Text style={styles.count}>{item.habitsCount} Habits</Text>
        ) : (
          <View style={styles.currentProgress}>
            <View style={styles.milestoneWrapper}>
              {milestones.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={[
                      styles.milestoneItem,
                      index >= completedCount
                        ? styles.mileStoneUnselected
                        : styles.milestoneSelected,
                    ]}
                  ></View>
                );
              })}
            </View>
            <Text style={styles.currentCount}>3/7</Text>
          </View>
        )}
      </View>
      <View
        style={[
          styles.border,
          status === "current" ? styles.currentBorder : null,
        ]}
      ></View>
    </>
  );
};

const styles = StyleSheet.create({
  currentBorder: {
    width: "75%",
  },
  currentCount: {
    flex: 1,
    fontSize: 11,
    color: "#393939",
  },
  currentProgress: {
    alignItems: "center",
    flexDirection: "row",
    flex: 0.7,
    justifyContent: "flex-end",
  },
  mileStoneUnselected: {
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: 0.3,
    borderColor: "#000000",
  },
  milestoneSelected: {
    backgroundColor: "#129f35",
  },
  milestoneItem: {
    borderRadius: 4,
    height: 4,
    marginHorizontal: 6,
    width: 4,
  },
  milestoneWrapper: {
    flexDirection: "row",
    marginRight: 20,
  },
  border: {
    height: 1,
    backgroundColor: "#707070",
    width: "65%",
    opacity: 0.2,
    marginRight: 20,
    alignSelf: "flex-end",
  },
  count: {
    flex: 0.15,
    fontSize: 11,
    color: "#393939",
  },
  username: {
    fontSize: 12,
    color: "#393939",
    flex: 0.55,
  },
  image: {
    flex: 0.2,
  },
  rank: {
    flex: 0.1,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

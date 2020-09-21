import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { WPAvatar } from "../";

const WPGroupRankCard = () => {
  //TODO: swap the 1st rank to second object
  const data = [
    { username: "Kathryn Garrett", habitsCount: 31, rank: 2 },
    { username: "Alice Pierce", habitsCount: 32, rank: 1 },
    { username: "My name", habitsCount: 28, rank: 3 },
  ];

  const myRank = 3;

  const getRank = rank => {
    return (
      <View
        style={[
          styles.rankWrapper,
          {
            backgroundColor:
              rank == 1
                ? "#fdcd11"
                : rank === 2
                ? "#a7f160"
                : rank === 3
                ? "#d5aeff"
                : null,
          },
        ]}
      >
        <Text style={styles.rankValue}>{rank}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={3}
        renderItem={({ item, index }) => {
          return (
            <View
              style={[
                styles.item,
                index % 2 == 1 ? styles.itemTopAlign : styles.itemBottomAlign,
              ]}
            >
              <WPAvatar
                uri={
                  "http://www.veethi.com/images/people/fullsize/A._Harsha_20150825050811.jpeg"
                }
                style={[
                  styles.avatarImageWrapper,
                  myRank === item.rank ? styles.userAvatar : null,
                ]}
                imageStyle={styles.avatarImageStyle}
              />
              {getRank(item.rank)}
              <Text
                style={[
                  styles.userName,
                  (item.rank === myRank || item.rank === 1) &&
                    styles.usernameBold,
                  item.rank === myRank && styles.myName,
                ]}
              >
                {item.rank === myRank ? "You" : item.username}
              </Text>
              <Text
                style={[
                  styles.habitsCount,
                  item.rank === myRank && styles.myHabitsCount,
                ]}
              >
                {item.habitsCount} habits
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default WPGroupRankCard;

const styles = StyleSheet.create({
  avatarImageStyle: {
    height: 64,
    width: 64,
  },
  avatarImageWrapper: {
    borderRadius: 32,
    height: 64,
    width: 64,
  },
  container: {
    backgroundColor: "#FFF",
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  habitsCount: {
    color: "#3a3a3a",
    fontSize: 9,
    lineHeight: 12,
    textAlign: "center",
  },
  item: {
    alignItems: "center",
    flex: 1,
    height: 160,
  },
  itemBottomAlign: {
    justifyContent: "flex-end",
  },
  itemTopAlign: {
    justifyContent: "flex-start",
  },
  myHabitsCount: {
    color: "#ec1c2e",
  },
  myName: {
    color: "#ec1c2e",
  },
  rankValue: {
    color: "#393939",
    fontSize: 10,
    fontWeight: "900",
  },
  rankWrapper: {
    alignItems: "center",
    borderRadius: 12,
    elevation: 5,
    height: 24,
    justifyContent: "center",
    marginBottom: 4,
    marginTop: -12,
    width: 24,
    zIndex: 10,
  },
  userAvatar: {
    borderColor: "#ec1c2e",
    borderWidth: 4,
  },
  userName: {
    color: "#3a3a3a",
    fontSize: 12,
    textAlign: "center",
  },
  usernameBold: {
    fontWeight: "900",
  },
});

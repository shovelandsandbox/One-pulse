import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { medal1, medal2, medal3 } from "../../../../config/images";
import { WPAvatar } from "../../components";
//TODO: Handle current user case

const WPLeaderboardRow = props => {
  const getRank = () => {
    switch (props.rank) {
      case 1:
        return (
          <Image
            source={medal1}
            style={styles.trophy}
            resizeMode={"contain"}
          ></Image>
        );
      case 2:
        return (
          <Image
            source={medal2}
            style={styles.trophy}
            resizeMode={"contain"}
          ></Image>
        );
      case 3:
        return (
          <Image
            source={medal3}
            style={styles.trophy}
            resizeMode={"contain"}
          ></Image>
        );
      default:
        return <Text style={styles.rank}>{props.rank}</Text>;
    }
  };

  const getRankStyle = () => {
    switch (props.rank) {
      case 1:
        return {
          backgroundColor: "#fdfaf2"
        };
      case 2:
        return {
          backgroundColor: "#f8f9fd"
        };
      case 3:
        return {
          backgroundColor: "#fef5f3"
        };
      default:
        return {
          backgroundColor: "#ffffff"
        };
    }
  };

  const getUserName = () => {
    return (
      <>
        <WPAvatar uri={props.image} />
        <Text style={styles.username}>
          {props.username}
        </Text>
      </>
    );
  };
  return (
    <View style={[styles.container, getRankStyle()]}>
      <View style={styles.rankWrapper}>{getRank()}</View>
      <View style={styles.userNameWrapper}>{getUserName()}</View>
      <Text style={styles.value}>{props.mastered}</Text>
      <Text style={styles.value}>{props.professional}</Text>
      <Text style={styles.value}>{props.healthy}</Text>
    </View>
  );
};

export default WPLeaderboardRow;

const styles = StyleSheet.create({
  trophy: { width: 24, height: 30 },
  rankWrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.1
  },
  userNameWrapper: {
    flex: 0.5,
    marginLeft: 6,
    flexDirection: "row",
    alignItems: "center"
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  rank: { flex: 0.1 },
  username: {
    fontSize: 12,
    lineHeight: 13.3,
    letterSpacing: 0,
    textAlign: "left",
    color: "#393939",
    marginLeft: 8
  },
  value: {
    flex: 0.2,
    fontSize: 12,
    lineHeight: 25,
    textAlign: "center",
    color: "#393939"
  }
});

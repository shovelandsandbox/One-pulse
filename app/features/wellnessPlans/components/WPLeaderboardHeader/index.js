import React from "react";
import { View, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const WPLeaderboardHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.rank}>#</Text>
      <Text style={styles.username}>User</Text>
      <View style={styles.countWrapper}>
        <LinearGradient
          colors={["#ad89f9", "#7357af"]}
          style={styles.countPurpleGradient}
        >
          <Text style={styles.countValue}>3</Text>
        </LinearGradient>
      </View>
      <View style={styles.countWrapper}>
        <LinearGradient
          colors={["#564ce8", "#37309f"]}
          style={styles.countBlueGradient}
        >
          <Text style={styles.countValue}>2</Text>
        </LinearGradient>
      </View>
      <View style={styles.countWrapper}>
        <LinearGradient
          colors={["#e84c5a", "#9a2f39"]}
          style={styles.countRedGradient}
        >
          <Text style={styles.countValue}>1</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default WPLeaderboardHeader;

const styles = StyleSheet.create({
  countPurpleGradient: {
    borderRadius: 20,
    width: 26,
    borderWidth: 3,
    borderColor: "#968eff"
  },
  countBlueGradient: {
    borderRadius: 20,
    width: 26,
    borderWidth: 3,
    borderColor: "#968eff"
  },
  countRedGradient: {
    borderRadius: 20,
    width: 26,
    borderWidth: 3,
    borderColor: "#ff2a59"
  },
  countValue: {
    flex: 0.2,
    textAlign: "center",
    color: "white"
  },
  countWrapper: {
    flex: 0.2,
    alignItems: "center"
  },
  username: {
    flex: 0.4,
    color: "#606060"
  },
  rank: {
    flex: 0.2
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 6,
    marginHorizontal: 20
  }
});

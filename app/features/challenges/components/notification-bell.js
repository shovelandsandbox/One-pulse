import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { NOTIFICATION_BELL } from "../../../../assets/images/challenges";
import { number, func } from "prop-types";

export default function NotificationBell({ unreadCount = 0, onPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <Image source={NOTIFICATION_BELL} style={styles.icon} />
        {unreadCount != 0 && (
          <View style={styles.notificationCount}>
            <Text style={styles.notificationCountText}>{unreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

NotificationBell.propTypes = {
  unreadCount: number,
  onPress: func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 5,
  },
  icon: {
    height: 24,
    width: 22,
  },
  iconContainer: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  notificationCount: {
    backgroundColor: "red",
    borderRadius: 22,
    height: 16,
    position: "absolute",
    right: -4,
    top: -8,
    width: 16,
  },
  notificationCountText: {
    color: "white",
    fontFamily: "Avenir-Regular",
    lineHeight: 16,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

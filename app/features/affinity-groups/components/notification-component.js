import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Colors from "../utils/colors";
import { NOTIFICATION_TYPE } from "../utils/type-helper";
import * as affinityType from "../types";
import DateUtils from "../utils/date";
import { colors as baseColors } from "@pru-rt-internal/pulse-common";
import { metaFinderAG } from "../utils/meta-utils";

const getNotificationMessage = (postAttributes, postTitle) => {
  let leadingText = metaFinderAG("thereIs");
  let postText = "";
  let endText = metaFinderAG("on") + postTitle + "'";
  const notificationText = Object.keys(NOTIFICATION_TYPE).reduce(
    (acc, attr) => {
      const type = NOTIFICATION_TYPE[attr];
      if (postAttributes[type] < 1) {
        return acc;
      }
      if (type === NOTIFICATION_TYPE.POST) {
        postText = metaFinderAG("newPostTitled") + postTitle + "'. ";
        endText = metaFinderAG("onThisPost");
        return acc;
      }
      if (acc.trim()) {
        acc += metaFinderAG("and");
        leadingText = metaFinderAG("thereAre");
      }
      if (postAttributes[type] === 1) {
        acc += "a";
      } else {
        acc += postAttributes[type];
      }
      acc += " new " + type;

      if (postAttributes[type] > 1) {
        acc += metaFinderAG("s");
        leadingText = metaFinderAG("thereAre");
      }
      return acc;
    },
    ""
  );
  let returnText = postText;
  if (notificationText.trim()) {
    returnText += leadingText + notificationText + endText;
  }
  return returnText;
};

const NotificationTile = ({ notification, onPress }) => {
  const duration = DateUtils.getTimeSince(notification.timestamp);

  return (
    <TouchableOpacity
      onPress={() => onPress(notification)}
      style={[
        Styles.notificationBase,
        notification.read ? Styles.readNotification : Styles.unReadNotification,
      ]}
    >
      <View style={Styles.notificationData}>
        <Text style={Styles.notificationMessage} numberOfLines={2}>
          {getNotificationMessage(
            notification.attributes,
            notification.title || notification.message
          )}
        </Text>
      </View>
      <View style={Styles.bottomContainer}>
        <View style={Styles.dateContainer}>
          <Text style={[Styles.dateTextStyle, { fontWeight: "bold" }]}>
            {metaFinderAG("Received")}
          </Text>
          <Text style={Styles.dateTextStyle}>{`${duration} ${metaFinderAG(
            "ago"
          )}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

NotificationTile.propTypes = {
  notification: affinityType.notification,
  onPress: PropTypes.func,
};

const Styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  dateTextStyle: {
    color: Colors.boldText,
    fontFamily: "Avenir-Regular",
    fontSize: 9.3,
  },
  notificationBase: {
    alignItems: "flex-start",
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 0.3,
    elevation: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: 10,
    marginHorizontal: 10,
    marginTop: 2,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  notificationData: {
    flexDirection: "row",
    height: 50,
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  notificationMessage: {
    alignItems: "center",
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 14,
  },
  readNotification: {
    borderColor: Colors.tileBorder,
  },
  unReadNotification: {
    borderBottomColor: Colors.tileBorder,
    borderBottomWidth: 0.3,
    borderLeftColor: baseColors.crimson,
    borderLeftWidth: 3.3,
    borderRightColor: Colors.tileBorder,
    borderRightWidth: 0.3,
    borderTopColor: Colors.tileBorder,
    borderTopWidth: 0.3,
    elevation: 1,
  },
});

export default NotificationTile;

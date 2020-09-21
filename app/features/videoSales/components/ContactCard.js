import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const momentTZ = require("moment-timezone");
import { pathOr } from "ramda";

import {
  INCOMING_CALL,
  OUTGOING_CALL,
  MISSED_CALL,
  AVATAR,
  SALE_CHAT_ARROW,
} from "../../../config/images";
import ProfileImage from "../components/ProfileImage";
import { configureLineHeight } from "../../../utils/lineHeightsUtils";

const secondsToHms = duration => {
  const d = Number(duration);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  const mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
  const sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
  return hDisplay + mDisplay + sDisplay;
};

const DecideDate = date => {
  const currentUserTimeZone = momentTZ.tz.guess();
  const todayDate = momentTZ().tz(currentUserTimeZone);
  const convDate = date.tz(currentUserTimeZone);
  const daysDifference = todayDate.diff(convDate, "days");

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "Yesterday";
  }

  return date.format("DD MMM");
};

const ContactCard = ({ contact, onSelection, type }) => {
  const momentTzTime = momentTZ(contact.item.convDate);
  const currentUserTimeZone = momentTZ.tz.guess();
  const date = DecideDate(momentTzTime);
  const time = momentTzTime.tz(currentUserTimeZone).format("hh:mm a");
  const isItOutGoingCall = pathOr(true, ["item", "outgoingCall"], contact);
  const duration = pathOr(0, ["item", "duration"], contact);
  let callIcon = isItOutGoingCall ? OUTGOING_CALL : INCOMING_CALL;
  const joinedCall = pathOr("false", ["item", "isJoined"], contact);
  const name = pathOr("", ["item", "fullName"], contact);
  const email = pathOr("", ["item", "email"], contact);
  const image = pathOr("", ["item", "profilePic"], contact);
  const contactType = pathOr("", ["item", "type"], contact);
  if (joinedCall === "false" && !isItOutGoingCall) {
    callIcon = MISSED_CALL;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerTouch}
        onPress={() => onSelection(contact.item)}
      >
        {type !== "chat" && contactType !== "contact" ? (
          <Image
            source={callIcon}
            style={[styles.callStatus, styles.indicator]}
            resizeMode={"contain"}
          />
        ) : (
            <View style={{ paddingLeft: 8 }} />
          )}
        <ProfileImage userInfo={name} profilePicture={image} contact={true} />
        <View style={styles.contactDetails}>
          <Text style={{...styles.contactEmail, ...configureLineHeight("13")}}>{email}</Text>
          <Text style={{...styles.contactName, ...configureLineHeight("11")}}>{name}</Text>
        </View>
        {contactType !== "contact" && (
          <View style={styles.callDetails}>
            <Text style={{...styles.callTime, ...configureLineHeight("11")}}>{date}</Text>
            <Text style={{...styles.callTime, ...configureLineHeight("11")}}>{time}</Text>
          </View>
        )}
        {type === "chat" && (
          <Image
            source={SALE_CHAT_ARROW}
            style={[styles.chatIcon, styles.indicator]}
            resizeMode={"contain"}
          />
        )}
      </TouchableOpacity>
      <View style={styles.durationRow}>
        <Text style={{...styles.duration, ...configureLineHeight("11")}}>{secondsToHms(duration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  callDetails: {
    alignItems: "flex-end",
    flex: 5.5,
    justifyContent: "center",
  },
  callStatus: {
    height: 14,
    width: 14,
  },
  callTime: {
    color: "#858c94",
    fontSize: 10,
    lineHeight: 15,
    marginVertical: 2,
  },
  duration: {
    color: "#858c94",
    fontSize: 10,
    lineHeight: 15,
  },
  chatIcon: {
    height: 20,
    width: 20,
  },
  contactDetails: {
    alignItems: "flex-start",
    flex: 24,
    justifyContent: "center",
  },
  contactEmail: {
    color: "#707070",
    fontSize: 13,
    lineHeight: 18,
  },
  contactName: {
    color: "#9aa2ac",
    fontSize: 11,
    lineHeight: 15,
  },
  container: {
    alignSelf: "center",
    borderBottomColor: "#f4f7fc",
    borderBottomWidth: 1,
    paddingBottom: 20,
    paddingLeft: 1,
    paddingRight: 8,
    paddingVertical: 12,
  },
  indicator: {
    alignSelf: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  initialStyle: {
    color: "#fff",
    textAlign: "center",
  },
  profile: {
    borderRadius: 42 / 2,
    flex: 4,
    height: 42,
    overflow: "hidden",
    width: 42,
  },
  profileContainer: {
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#ec1c2e",
    borderColor: "#FFFF",
    borderRadius: 40 / 2,
    borderWidth: 0.7,
    height: 40,
    justifyContent: "center",
    marginRight: 8,
    width: 40,
  },
  containerTouch: {
    alignSelf: "center",
    flexDirection: "row",
    paddingLeft: 1,
    paddingRight: 8,
  },
  durationRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 8,
  },
});

export default ContactCard;

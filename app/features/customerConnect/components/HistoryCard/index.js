import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import CustomAvatar from "../CustomAvatar";
import { AVATAR } from "../../../../config/images";
import { scale } from "../../../../utils/Scale";
import { metaFinderCustomerConnect } from "../../meta";

class HistoryCard extends PureComponent {
  getDateTime = () => {
    const { convDate } = this.props;
    const today = moment();
    const yesterday = moment().subtract(1, "day");
    const conversationDate = moment(convDate);

    if (today.diff(conversationDate, "minutes") === 0) {
      return metaFinderCustomerConnect("now");
    } else if (conversationDate.isSame(today, "day")) {
      return conversationDate.format("hh:mm a");
    } else if (conversationDate.isSame(yesterday, "day")) {
      return metaFinderCustomerConnect("yesterday");
    }
    return conversationDate.format("DD/MM/YY");
  };

  getName = () => {
    const { name, participants } = this.props;
    if (participants.length === 1) {
      return name ?.trim() ? name : "User";
    } else if (participants.length > 1) {
      return name ?.trim() ? name : "User" + ",";
    }
    return "";
  };

  getNameCount = () => {
    const { participants } = this.props;
    if (participants.length <= 1) {
      return null;
    }
    return (
      <Text style={styles.moreText}>{` +${participants.length -
        1} ${metaFinderCustomerConnect("more")}`}</Text>
    );
  };

  renderThumbnail() {
    const { unreadCount, thumbnail, name } = this.props;

    return (
      <CustomAvatar
        unreadCount={unreadCount}
        thumbnail={thumbnail}
        name={name}
      />
    );
  }

  secondsToHms = duration => {
    const d = Number(duration);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);

    const hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? " sec" : " secs") : "";
    return hDisplay + mDisplay + sDisplay;
  };

  render() {
    const {
      unreadCount,
      isOutgoing,
      isMissed,
      canShowCallStatus,
      onPress,
      participants,
      name,
      duration,
      item,
    } = this.props;
    if (participants.length === 0) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          onPress ? onPress() : () => { };
        }}
        style={styles.container}
      >
        {this.renderThumbnail()}
        <View style={{ flex: 1 }}>
          <Text style={styles.nameText}>
            {this.getName()}
            {this.getNameCount()}
            {"  "}
            {canShowCallStatus && isOutgoing ? (
              <Icon name="phone-outgoing" color={"#707070"} size={13} />
            ) : (
                canShowCallStatus && (
                  <Icon name="phone-incoming" color={"#707070"} size={13} />
                )
              )}
            {canShowCallStatus && isMissed ? (
              <Icon name="phone-missed" color={"#ec1c2e"} size={13} />
            ) : null}
          </Text>
          {canShowCallStatus && (
            <Text style={{ marginHorizontal: 14 }}>
              {this.secondsToHms(duration)}
            </Text>
          )}
        </View>

        <Text
          style={[styles.timeText, unreadCount > 0 ? styles.unreadDate : null]}
        >
          {this.getDateTime()}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default HistoryCard;

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    borderRadius: 17 / 2,
    height: 17,
    justifyContent: "center",
    position: "absolute",
    right: -8,
    top: 0,
    width: 17,
  },
  badgeCount: {
    color: "#FFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  container: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#cccccc99",
    flexDirection: "row",
    marginHorizontal: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  moreText: {
    fontSize: 13,
    fontWeight: "normal",
  },
  nameText: {
    color: "#2f2f2f",
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 14,
  },
  nameThumbnail: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  nameThumbnailWrapper: {
    alignItems: "center",
    backgroundColor: "#ec1c2e",
    justifyContent: "center",
    overflow: "hidden",
  },
  thumbnail: {
    borderRadius: 23,
    height: 46,
    width: 46,
  },
  timeText: {
    color: "#707070",
    fontSize: 11,
  },
  unreadDate: { color: "#ec1c2e" },
});

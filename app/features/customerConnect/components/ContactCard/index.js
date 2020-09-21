import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { AVATAR } from "../../../../config/images";
import { metaFinderCustomerConnect } from "../../meta";

class ContactCard extends PureComponent {
  getNameCount = () => {
    const { contacts } = this.props;
    if (contacts.length === 1) {
      return null;
    }
    return (
      <Text style={styles.moreText}>{` +${contacts.length -
        1} ${metaFinderCustomerConnect("more")}`}</Text>
    );
  };

  renderThumbnail() {
    const { thumbnail, name } = this.props;
    const base64Type = "data:image/jpeg;base64,";
    return (
      <View>
        {thumbnail ? (
          <Image
            source={{ uri: `${base64Type}${thumbnail}` }}
            style={styles.thumbnail}
          />
        ) : name ? (
          <View style={[styles.thumbnail, styles.nameThumbnailWrapper]}>
            <Text style={styles.nameThumbnail}>{name?.substring(0, 2)}</Text>
          </View>
        ) : (
          <Image
            source={AVATAR}
            style={[
              styles.thumbnail,
              {
                transform: [
                  {
                    scale: 1.2,
                  },
                ],
              },
            ]}
          />
        )}
      </View>
    );
  }

  render() {
    const { name, email, phone, isSelected, onContactSelect } = this.props;
    const getName = () => {
      if (name.length > 0) {
        return name;
      }
      return email || phone;
    };
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          onContactSelect();
        }}
      >
        {this.renderThumbnail()}
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={styles.nameText}>{getName()}</Text>
          <Text
            style={{
              color: "#707070",
              marginHorizontal: 14,
              fontSize: 13,
            }}
          >
            {email || phone}
          </Text>
        </View>
        <Icon
          name={isSelected ? "checkbox-intermediate" : "checkbox-blank-outline"}
          size={18}
          color={isSelected ? "#ec1c2e" : "#707070"}
        />
      </TouchableOpacity>
    );
  }
}

export default ContactCard;

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

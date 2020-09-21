import React, { PureComponent } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { AVATAR } from "../../../config/images";
export default class ProfileImage extends PureComponent {
  buildName = name => {
    const nameSplit = name ? name.split(" ") : "";
    const firstName = nameSplit && nameSplit[0] ? nameSplit[0][0] : "";
    const lastName = nameSplit && nameSplit[1] ? nameSplit[1][0] : "";
    const finalName = `${firstName}${lastName}`;

    return finalName.toUpperCase();
  };

  getProfilePic = (name, imgContent) => {
    const base64Type = "data:image/jpeg;base64,";

    if (imgContent) {
      return (<Image
        source={{ uri: `${base64Type}${imgContent}` }}
        style={styles.profile}
      />);
    } else if (name) {
      return <Text style={[styles.initialStyle], { color: this.props.contact ? "#FFFFFF" : "#ec1c2e" }}>{name}</Text>;
    }
    return (<Image
      source={AVATAR}
      style={styles.profile}
    />);

  };

  render() {
    const { userInfo, profilePicture, contact, fromGroup } = this.props;
    const userName = this.buildName(
      userInfo.participantName || userInfo.caller || userInfo
    );

    return (
      <View
        style={[
          styles.profileContainer,
          { backgroundColor: contact ? "#ec1c2e" : "#FFFFFF" },
          {marginRight: fromGroup ? 0 : 8}
        ]}
      >
        {this.getProfilePic(userName, profilePicture)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  initialStyle: {
    textAlign: "center",
    color: "#ec1c2e",
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
    borderColor: "#FFFFFF",
    borderRadius: 40 / 2,
    borderWidth: 0.7,
    height: 40,
    justifyContent: "center",
    marginRight: 8,
    width: 40,
  },
});

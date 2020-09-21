import React from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as AffinityPropType from "../../types";
import Colors from "../../utils/colors";
import { USERS, CHECK } from "../../../../../assets/images/affinityGroup";
import { string, func, bool } from "prop-types";
import PopUpMenu from "./pop-up-menu";
import { metaFinderAG } from "../../utils/meta-utils";

export default function Footer(props) {
  const {
    group: {
      joined,
      attributes: { membersCount = 0 },
    },
    showJoinOption = true,
  } = props;

  return (
    <View style={styles.groupDataStyle}>
      <View style={styles.joinContainer}>
        <View style={StyleSheet.flatten(styles.iconContainer)}>
          <View style={styles.userIconView}>
            <Image source={USERS} style={styles.userIcon} />
          </View>
          <Text style={styles.groupDataText}>
            {membersCount} {metaFinderAG("membersJoined")}
          </Text>
        </View>
        {showJoinOption && (
          <View style={styles.buttonStyle}>
            {joined ? (
              <Joined />
            ) : (
              <JoinButton
                title={metaFinderAG("Join")}
                onPress={() => props.joinGroup(props.group)}
              />
            )}
          </View>
        )}

        <ViewTheWall
          title={metaFinderAG("viewTheWall")}
          onPress={props.groupPress}
          fromMyCommunity={!showJoinOption}
        />

        {!showJoinOption && (
          <View style={styles.buttonStyle}>
            <PopUpMenu
              config={{ onPress: () => props.leaveGroup(props.group) }}
            />
          </View>
        )}
      </View>
    </View>
  );
}

Footer.propTypes = {
  group: AffinityPropType.group,
  joinGroup: func,
  leaveGroup: func,
  showJoinOption: bool,
  groupPress: func,
};

const JoinButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonTitle}>{title}</Text>
  </TouchableOpacity>
);

JoinButton.propTypes = {
  title: string,
  onPress: func,
};

const ViewTheWall = ({ title, onPress, fromMyCommunity }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.viewTheWallButton,
      fromMyCommunity ? styles.extendedButtonStyle : {},
    ]}
  >
    <Text style={styles.viewTheWallTitle}>{title}</Text>
  </TouchableOpacity>
);

ViewTheWall.propTypes = {
  title: string,
  onPress: func,
  fromMyCommunity: bool,
};

export const Joined = ({ size }) => {
  const joinedIcon =
    size === "small"
      ? { ...styles.joinedIcon, ...styles.joinedIconSmall }
      : styles.joinedIcon;
  const joinedText =
    size === "small"
      ? { ...styles.joinedText, ...styles.joinedTextSmall }
      : styles.joinedText;

  return (
    <View style={styles.joinedGroup}>
      <Image source={CHECK} style={joinedIcon} />
      <Text style={joinedText}>{metaFinderAG("Joined")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: Colors.groupButton,
    borderRadius: 5,
    height: 25,
    justifyContent: "center",
    width: 90,
  },
  buttonStyle: {
    justifyContent: "flex-end",
  },
  buttonTitle: {
    color: Colors.white,
    fontFamily: "Avenir-Regular",
    fontSize: 12,
    textTransform: "uppercase",
  },
  groupDataStyle: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 5,
  },
  groupDataText: {
    color: Colors.titleText,
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    paddingLeft: 5,
  },
  iconContainer: {
    alignContent: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 5,
  },
  joinContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  joinedGroup: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
  },
  joinedIcon: {
    height: 18,
    width: 18,
  },
  joinedIconSmall: {
    height: 13,
    width: 13,
  },
  joinedText: {
    color: Colors.greenText,
    fontFamily: "Avenir-Regular",
    fontSize: 14,
    paddingLeft: 7,
  },
  joinedTextSmall: {
    fontSize: 12,
  },
  menuStyle: {
    width: 100,
  },
  userIcon: {
    height: 10,
    width: 12,
  },
  userIconView: {
    alignItems: "center",
    backgroundColor: Colors.iconBackground,
    borderRadius: 28,
    height: 28,
    justifyContent: "center",
    width: 28,
  },
  viewTheWallButton: {
    alignItems: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.groupButton,
    borderWidth: 1,
    borderRadius: 5,
    height: 25,
    justifyContent: "center",
    width: "auto",
  },
  viewTheWallTitle: {
    color: Colors.groupButton,
    fontSize: 12,
    marginHorizontal: 10,
  },
  extendedButtonStyle: {
    marginLeft: 80,
  },
});

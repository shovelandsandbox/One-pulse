import React from "react";
import { Colors } from "../styles";

import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";

import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { LEFT_ARROW } from "./../../../../assets/images/affinityGroup";
import { shape, number, string, bool, func, object } from "prop-types";
import Stats from "../../affinity-groups/components/header/stats";
import { metaFinderChallenges } from "../utils/meta-utils";
import screens from "../../../utils/configs/screen-names";
import { goto } from "../../../actions";

import NotificationBell from "./notification-bell";

const Header = props => {
  const {
    title,
    options: { showNotificationBell = true } = {},
    stats,
    onTabPress,
    buttonTitle,
    containerStyle = {},
    showHeaderRight = true,
  } = props;
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <View style={styles.headerTitleContainer}>
        <TouchableOpacity
          onPress={props.goBack}
          style={styles.iconContainerLeft}
        >
          <Image source={LEFT_ARROW} style={styles.backIcon} />
        </TouchableOpacity>
        <Text numberOfLines={1} style={styles.headerText}>
          {title}
        </Text>
      </View>
      {showHeaderRight && (
        <View style={styles.iconContainerRight}>
          <TouchableOpacity
            onPress={() => onTabPress(buttonTitle)}
            style={styles.buttonContainer}
          >
            <Text numberOfLines={1} style={styles.buttonText}>
              {metaFinderChallenges(buttonTitle)}
            </Text>
          </TouchableOpacity>
          {showNotificationBell && (
            <NotificationBell
              unreadCount={props.unreadCount}
              onPress={props.goToNotificationScreen}
            />
          )}
          {stats && <Stats stats={stats} />}
        </View>
      )}
    </View>
  );
};

Header.propTypes = {
  title: string,
  options: shape({
    showNotificationBell: bool,
    showCreatePostIcon: bool,
  }),
  //connected props - not required to send
  unreadCount: number,
  goBack: func,
  showHeaderRight: bool,
  goToNotificationScreen: func,
  stats: object,
  onTabPress: func,
  buttonTitle: string,
  containerStyle: object,
};

const mapDispatchToProps = {
  goToNotificationScreen: () => {
    return goto(screens.NotificationScreen);
  },
  goBack: () => ({
    type: CoreActionTypes.GO_BACK_TO_PREVIOUS_SCREEN,
  }),
};

export default connect(null, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  backIcon: {
    height: 12,
    width: 15,
  },
  buttonContainer: {
    backgroundColor: Colors.pulseRed,
    borderRadius: 3,
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 11,
    lineHeight: 11,
    paddingHorizontal: 11,
    textAlign: "center",
  },
  headerContainer: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lightGrey,
    borderRadius: 2,
    borderWidth: 0.1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 13,
    width: "100%",
    zIndex: 1,
  },
  headerText: {
    color: "rgba(47, 47, 47, 1)",
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 18,
    paddingLeft: 15,
    paddingTop: 2,
  },
  headerTitleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  iconContainerLeft: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
  },
  iconContainerRight: {
    flexDirection: "row",
  },
});

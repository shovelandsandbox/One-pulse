import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { connect } from "react-redux";

import { goto } from "../../../../actions";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { unreadCountSelector } from "../../selectors";
import screens from "../../../../utils/configs/screen-names";

import { LEFT_ARROW } from "../../../../../assets/images/affinityGroup";
import Colors from "../../utils/colors";

//components
import Stats from "./stats";
import NotificationBell from "./notification-bell";
import CreatePost from "./create-post";

//types
import { shape, bool, number, func, string, object } from "prop-types";
import { stats as statsType } from "../../types";

const Header = props => {
  const {
    title,
    options: { showNotificationBell = true, showCreatePostIcon = false } = {},
    stats,
    containerStyle = {},
  } = props;
  return (
    <View style={{ ...styles.headerContainer, ...containerStyle }}>
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
      <View style={styles.iconContainerRight}>
        {showCreatePostIcon && (
          <CreatePost onPress={props.goToCreatePostScreen} />
        )}
        {showNotificationBell && (
          <NotificationBell
            unreadCount={props.unreadCount}
            onPress={props.goToNotificationScreen}
          />
        )}
        {stats && <Stats stats={stats} />}
      </View>
    </View>
  );
};

Header.propTypes = {
  title: string,
  options: shape({
    showNotificationBell: bool,
    showCreatePostIcon: bool,
  }),
  stats: statsType,
  containerStyle: object,
  //connected props - not required to send
  unreadCount: number,
  goToNotificationScreen: func,
  goToCreatePostScreen: func,
  goBack: func,
};

//redux
const mapStateToProps = state => ({
  unreadCount: unreadCountSelector(state),
});

const mapDispatchToProps = {
  goToNotificationScreen: () => {
    return goto(screens.NotificationScreen);
  },
  goToCreatePostScreen: () => {
    return goto(screens.createPostScreen);
  },
  goBack: () => ({
    type: CoreActionTypes.GO_BACK_TO_PREVIOUS_SCREEN,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({
  backIcon: {
    height: 12,
    width: 15,
  },
  headerContainer: {
    borderBottomColor: Colors.lightGrey,
    borderRadius: 2,
    borderWidth: 0.1,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 13,
  },
  headerText: {
    color: Colors.darkGrey,
    fontFamily: "Avenir-Regular",
    fontSize: 16,
    paddingLeft: 15,
    width: "80%",
  },
  headerTitleContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start",
  },
  iconContainerLeft: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
  },
  iconContainerRight: {
    alignItems: "center",
    flexDirection: "row",
  },
});

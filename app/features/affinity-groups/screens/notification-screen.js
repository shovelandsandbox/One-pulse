import React, { PureComponent } from "react";
import { View, FlatList } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Styles from "./styles";
import { gotoWithParams } from "../../../actions";
import NotificationComponent from "../components/notification-component";
import Header from "../components/header";
import screens from "../../../utils/configs/screen-names";
import { affinityGroupActions } from "../configs/affinity-group-actions";
import * as affinityType from "../types";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { eventNames } from "../events";
import { metaFinderAG } from "../utils/meta-utils";

const extractKey = item => {
  return `PruNotificationItem: ${item.timestamp}`;
};

class NotificationScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.notificationsViewed();
  }
  componentDidMount() {
    this.props.registerEvent(eventNames.viewNotification, {});
  }

  onNotificationPressed = notification => {
    const { postId, groupId, type } = notification;
    this.props.registerEvent(eventNames.viewNotificationClick, {
      communityId: groupId,
    });
    if (type === "post") {
      this.props.gotoWithParams(screens.affinityGroupWallScreen, {
        groupId,
      });
    } else {
      //type == "comment/like"
      this.props.gotoWithParams(screens.affinityGroupPostScreen, {
        postId,
      });
    }
    //mark notification as read
    this.props.notificationOpened(postId);
  };

  renderHeader = () => {
    return (
      <View style={Styles.postHeaderContainer}>
        <Header title={metaFinderAG("notifications")} />
      </View>
    );
  };

  renderNotification = ({ item }) => {
    return (
      <NotificationComponent
        notification={item}
        onPress={this.onNotificationPressed}
      />
    );
  };

  renderNotificationList = () => {
    return (
      <FlatList
        data={this.props.notificationList}
        renderItem={this.renderNotification}
        keyExtractor={extractKey}
      />
    );
  };

  render() {
    return (
      <View style={Styles.baseContainer}>
        <View style={Styles.notificationList}>
          {this.renderHeader()}
          {this.renderNotificationList()}
        </View>
      </View>
    );
  }
}

NotificationScreen.propTypes = {
  gotoWithParams: PropTypes.func,
  notificationOpened: PropTypes.func,
  notificationsViewed: PropTypes.func,
  registerEvent: PropTypes.func,
  notificationList: PropTypes.arrayOf(affinityType.notification),
};

const mapStateToProps = state => ({
  notificationList: state.affinityGroup.notifications.notificationList || [],
});

const mapDispatchToProps = {
  gotoWithParams,
  registerEvent,
  notificationsViewed: () => ({
    type: affinityGroupActions.notificationsViewed,
  }),
  notificationOpened: payload => ({
    type: affinityGroupActions.notificationOpened,
    payload,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);

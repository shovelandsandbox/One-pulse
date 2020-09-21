/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import NotificationIcon from "../NotificationIcon";
import { connect } from "react-redux";
import { gotoNotificationCentre } from "../../actions";

const mapStateToProps = state => {
  return {
    count: state.notifications.unreadNotificationCount,
  };
};

const mapDispatchToProps = {
  onPress: gotoNotificationCentre,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationIcon);

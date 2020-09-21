import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { object, func } from "prop-types";
import { path, pathOr } from "ramda";

import { PruNotification } from "../../components";
import actions from "./actions";
import ActionButton from "../../features/appNotification/components/actionButton";

const { recordNotificationActioned, changeNotificationStatus } = actions;

const getFooter = props => {
  const {
    notification,
    handleAction,
    recordNotificationActioned,
    changeNotificationStatus,
  } = props;

  const clickAction = path(["actions", "click"], notification);
  if (!clickAction) return null;
  const actionTitle = pathOr(
    "Continue",
    ["actions", "click", "actionTitle"],
    notification
  );

  const actionButtonConfig = {
    text: actionTitle,
    onPress: () => {
      handleAction();
      changeNotificationStatus({ id: notification.id, status: "ACTIONED" });
      recordNotificationActioned(notification, true);
    },
  };

  return (
    <View>
      <ActionButton actionButtonConfig={actionButtonConfig} />
    </View>
  );
};

const UserNotification = props => {
  const {
    notification,
    handleAction,
    recordNotificationActioned,
    changeNotificationStatus,
    ShortNotification,
    removeNotification,
  } = props;

  const content = pathOr("", ["template", "content"], notification);

  const footer = ShortNotification ? null : getFooter(props);

  return (
    <PruNotification
      htmlContent={content}
      shortHeight={content.indexOf("swipeableHeight") > -1}
      action={() => {
        handleAction();
        changeNotificationStatus({ id: notification.id, status: "ACTIONED" });
        recordNotificationActioned(notification, true);
      }}
      dismissNotification={removeNotification}
      footer={footer}
    />
  );
};

UserNotification.propTypes = {
  notification: object,
  handleAction: func,
};

const mapDispatchToProps = {
  recordNotificationActioned,
  changeNotificationStatus,
};

export default connect(null, mapDispatchToProps)(UserNotification);

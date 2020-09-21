import React, { PureComponent } from "react";
import { View, Text, Image, TouchableOpacity, Platform, Alert } from "react-native";
import { connect } from "react-redux";
import { head, pathOr } from "ramda";
import { array, func, bool } from "prop-types";

import { CoreActionTypes, CoreConfig, metaHelpers as helpers, } from "@pru-rt-internal/pulse-common";
import { Swipeable, PruNotification } from "../../components";
import { removeNotification } from "./actions";

//supported notifications
import UserNotification from "../notificationCentre/userNotification";
import actionCreators from "../notificationCentre/actions";
import TimeoutNotification from "./components/timeoutNotification";
import NotificationModal from "./components/notificationModal";

const {
  HALODOC_SERVICE,
  MED_MEDDELIVERY,
  MED_CONTINUE
} = CoreConfig;
const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

class AppNotification extends PureComponent {
  constructor(props) {
    super(props);
  }

  getNotificationComponent = props => {
    const { type, ...rest } = props;

    return <UserNotification {...rest} />;
  };

  getSwipeableHeight = ({ template: { content } = {} } = {}) => {
    if (!content) return 400;

    const swipeHeight = content.indexOf("newSwipeableHeight") > 0
      ? content.substr(content.indexOf("newSwipeableHeight") + 18, 3)
      : (content.indexOf("swipeableHeight") > 0 ?
        content.substr(content.indexOf("swipeableHeight") + 15, 3) :
        350
      );

    if (content.indexOf("newSwipeableHeight") > 0 && Platform.OS === "ios") {
      return parseInt(swipeHeight) + 10;
    }

    return swipeHeight;
  };

  handleOldNotificationFormat = (notification, payload = {}) => {
    const clickAction = pathOr({}, ["actions", "click"], notification);
    const { dispatchAction, goTo } = this.props;

    if (clickAction.screenId) {
      goTo(clickAction.screenId, clickAction.screenParams);
    } else if (clickAction.clickUrl) {
      goTo("WebView", {
        sourceType: "URI",
        uri: clickAction.clickUrl,
      });
    } else {
      const actionType = clickAction.actionType || clickAction.ationType;
      try {
        const clickActionParsed = JSON.parse(actionType);
        //'{"context":"PulseHealth","clickAction":"dispatch_action","actionType":"BABYLON_GOTO_HEALTHASSESSMENT"}';
        if (clickActionParsed.clickAction === "dispatch_action") {
          let action = {
            context: clickActionParsed.context,
            type: clickActionParsed.actionType,
          };
          // eslint-disable-next-line max-depth
          if (clickActionParsed.payload) {
            action = { ...action, payload: clickActionParsed.payload };
          }
          dispatchAction(action);
        }
      } catch (e) {
        console.log(e); // error in the above string (in this case, yes)!
      }
    }
  };

  handleClickAction = (notification, payload = {}) => {
    const { dispatchAction, goTo } = this.props;
    const notificationActionDef = pathOr(
      {},
      ["actions", "click"],
      notification
    );
    const { clickAction } = notificationActionDef;
    if (clickAction === "open_webview") {
      goTo("WebView", {
        sourceType: "URI",
        uri: notificationActionDef.clickUrl,
      });
    } else if (clickAction === "open_screen") {
      goTo(notificationActionDef.screenId, notificationActionDef.screenParams);
    } else if (clickAction === "dispatch_action") {
      let action = {
        context: notificationActionDef.context,
        type: notificationActionDef.actionType,
      };
      if (notificationActionDef.payload) {
        action = { ...action, payload: notificationActionDef.payload };
      }
      dispatchAction(action);
    } else {
      this.handleOldNotificationFormat(notification, payload);
    }
  };

  handleAction = notification => payload => {
    const { removeNotification } = this.props;
    this.handleClickAction(notification, payload);
    removeNotification();
  };

  markItRead(id) {
    const { changeNotificationStatus } = this.props;
    changeNotificationStatus({ id, status: "READ" });
  }

  getShortNotification = notification => {
    let content = pathOr("", ["template", "content"], notification);
    content = content.match(new RegExp("shortNotificationStarts" + "(.*)" + "shortNotificationEnds"));
    if (!content) return null;

    return (
      <PruNotification 
        htmlContent={content[1]} 
        dismissNotification={this.props.removeNotification}
      />
    )
  }

  onSwipeHorizontal = () => {
    const { queue, removeNotification, dismissNotificationStatus } = this.props;
    if (!queue.length) {
      return null;
    }
    const message = head(queue);
    const { notification } = message;
    
    removeNotification();
    dismissNotificationStatus(notification);
  }

  render() {
    const { queue, removeNotification } = this.props;
    if (!queue.length) {
      return null;
    }
    const message = head(queue);
    const  { notification }  = message;
    //TODO : This should come from the response of getCommById
    const ShortNotification = this.getShortNotification(notification)
    //TODO : it should come from the configuration
    const swipeableHeight = this.getSwipeableHeight(notification);
    const Notification = this.getNotificationComponent({
      type: message.type,
      notification: notification,
      handleAction: this.handleAction(notification),
      ShortNotification,
      removeNotification,
    });

    let content = pathOr("", ["template", "content"], notification);
    let shortMessage = pathOr("", ["shortMessage"], notification);
    const newScreenId = 
      pathOr(undefined, ["actions", "notification", "screenParams", "screenId"], notification);

    if (newScreenId) {
      NotificationModal.show({
        notification: notification,
        handleAction: this.handleAction(notification),
        ShortNotification,
        removeNotification,
      });
  
      return null;
    }

    if (message.type === "error") {
      setTimeout(removeNotification, 3000);
      return (
        <TimeoutNotification removeNotification={removeNotification} />
      );
    }

    if (content) {
      return (
        <Swipeable
          ShortComponent={ShortNotification}
          Component={Notification}
          disable={!queue.length}
          swipeHeight={message.swipeHeight || 300}
          onSwipeHorizontal={this.onSwipeHorizontal}
          onSwipeUp={
            notification.status === "UNREAD"
              ? () => this.markItRead(notification.id)
              : null
          }
          shortHeight={swipeableHeight} //temporary fix to show shorter notification
        />
      );
    }
    else {
      if (notification.attributes.Type == "text" ||
        notification.attributes.Type == "application/hd.consultation.call_start" ||
        notification.attributes.Type == "file_attachment" ||
        notification.attributes.Type == "application/hd.consulation.complete" ||
        notification.attributes.Type == "consultation_completed") {
          this.props.acceptCallFromDoctor(notification.attributes);
          this.props.removeNotification()
      }
      else {
        var shortMetaMessage = fetchLabel(
          helpers.findElement(HALODOC_SERVICE, notification.attributes.Type),
          shortMessage
        )
        var metaContinue = fetchLabel(
          helpers.findElement(MED_MEDDELIVERY, MED_CONTINUE),
          "Continue"
        )

        Alert.alert(
          "",
          shortMetaMessage,
          [
            {
              text: metaContinue,
              onPress: () => {
                this.props.acceptCallFromDoctor(notification.attributes);
                this.props.removeNotification();
              },
            },
          ],
          { cancelable: false }
        );
      }
      return null;
    }
  }
}

AppNotification.propTypes = {
  queue: array,
  removeNotification: func,
  goTo: func,
  dispatchAction: func,
  recordNotificationActioned: func,
  changeNotificationStatus: func,
  isLoggedIn: bool,
};

const mapStateToProps = state => ({
  queue: state.appNotifications.queue,
});

const mapDispatchToProps = {
  goTo: (screenId, params) => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: screenId,
    payload: {
      params,
    },
  }),
  acceptCallFromDoctor: payload => ({
    context: "HALODOC_FOREGROUND",
    type: "HALODOC_CHAT_LOAD_DOC_MESSAGE",
    payload,
  }),
  dispatchAction: action => action,
  removeNotification,
  changeNotificationStatus: actionCreators.changeNotificationStatus,
  dismissNotificationStatus: actionCreators.recordNotificationDismissed,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNotification);

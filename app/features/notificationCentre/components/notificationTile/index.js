import React, { PureComponent } from "react";
import {
  Image,
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import PropTypes from "prop-types";

import HTML from "react-native-render-html";
import { connect } from "react-redux";
import moment from "moment";
import { pathOr, isEmpty } from "ramda";

import actionCreators from "../../actions";
import Styles from "./styles";
import {
  NOTIFICATION_UP_ARROW,
  NOTIFICATION_DOWN_ARROW,
} from "../../../../config/images";
import {
  CoreConstants,
  metaHelpers,
  CoreActionTypes,
} from "@pru-rt-internal/pulse-common";

import { PruNotification } from "../../../../components";
const { MY_NOTIFICATION_CENTER, RECEIVED_ON } = CoreConstants;

const formatDate = date => {
  return moment(date).format("MMMM D, YYYY");
};

const classesStyles = {
  stepButtonConatiner: {
    top: 20,
  },
  setpbuttonStyle: {
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#fff2cf",
    width: 190,
    height: 100,
    borderRadius: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "26px 33px 13px -15px rgba(0,0,0,1)",
    elevation: 1,
  },
};

class NotificationTile extends PureComponent {
  constructor(props) {
    super(props);

    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      expanded: false,
      status: pathOr("UNREAD", ["notification", "status"], props),
    };
  }

  getSpecificNotification(commId) {
    this.props.getNotification({ commId });
  }

  updateLayout = id => {
    const { expanded } = this.state;
    const { notificationContentLinkWithId } = this.props;

    this.setState(
      {
        expanded: !expanded,
      },
      () => {
        if (!expanded && !notificationContentLinkWithId[id]) {
          this.getSpecificNotification(id);
        }
      }
    );
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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

  onActionButton(notificationWithDetails) {
    const { dispatchAction, goTo } = this.props;
    const notificationActionDef = pathOr(
      {},
      ["actions", "click"],
      notificationWithDetails
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
      this.handleOldNotificationFormat(notificationWithDetails);
    }
  }

  // eslint-disable-next-line complexity
  render() {
    const { expanded, status } = this.state;
    const { notification, notificationContentLinkWithId } = this.props;
    const { id, title, deliveryDate, shortMessage } = notification;

    const notificationWithDetails = pathOr(
      {},
      [id],
      notificationContentLinkWithId
    );

    
    const notificationActionDef = pathOr(
      {},
      ["actions", "click"],
      notificationWithDetails
    );
    
    const actionTitle = pathOr(null, ["actionTitle"], notificationActionDef);

    let htmlContent = pathOr(
      "",
      ["template", "content"],
      notificationWithDetails
    );
    const isNewTemplate = htmlContent.indexOf("newSwipeableHeight") > 0;
    const mainContainerStyle = [
      Styles.notificationTileContainer,
      status === "UNREAD" ? Styles.unReadStyles : Styles.readStyles,
      (expanded && isNewTemplate) ? { paddingBottom: 32 } : {}
    ];
    const receivedLabel = metaHelpers.findElement(
      MY_NOTIFICATION_CENTER,
      RECEIVED_ON
    ).label;

    let notificationContent = (
      <View style={Styles.titleContainer}>
        <Text style={Styles.titleContainerText}>
          {`${title}. ${shortMessage}`}
        </Text>
      </View>
    );

    if (expanded && htmlContent) {
      htmlContent = htmlContent.replace("Swipe to dismiss", "");
      if (status === "ACTIONED") {
        htmlContent = htmlContent.replace("<bluecircle></bluecircle>", "");
      }
      notificationContent = (
        <View
          style={[Styles.titleContainer, !isNewTemplate ? { flex: 1 } : {}]}
        >
          {isNewTemplate ? (
            <PruNotification
              htmlContent={htmlContent}
              actionTitle={actionTitle}
              action={() => {
                this.onActionButton(notificationWithDetails);
                const {
                  updateNotificationStatus,
                  recordNotificationActioned,
                  notification,
                } = this.props;
                updateNotificationStatus({
                  id: notification.id,
                  status: "ACTIONED",
                });
                recordNotificationActioned(notificationWithDetails, false);
              }}
            />
          ) : (
            <HTML
              style={Styles.instructions}
              containerStyle={Styles.htmlContainerStyle}
              baseFontStyle={"pru-regular"}
              html={htmlContent}
              classesStyles={classesStyles}
            />
          )}
        </View>
      );
    }

    let actionButton = () => <View />;

    if (
      expanded &&
      notificationActionDef &&
      !isEmpty(notificationActionDef) &&
      status !== "ACTIONED"
    ) {
      actionButton = (
        <TouchableOpacity
          onPress={() => {
            //handle the notification, new way first and then fallback to old way
            this.onActionButton(notificationWithDetails);
            const {
              updateNotificationStatus,
              recordNotificationActioned,
              notification,
            } = this.props;
            updateNotificationStatus({
              id: notification.id,
              status: "ACTIONED",
            });
            recordNotificationActioned(notificationWithDetails, false);
          }}
        >
          <View style={Styles.buttonContainer}>
            <Text style={Styles.buttonContainerText}>
              {actionTitle || "Continue"}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={mainContainerStyle}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => this.updateLayout(id)}
        >
          {notificationContent}
          <View style={Styles.bottomContainer}>
            <View style={Styles.dateContainer}>
              <Text style={[Styles.dateTextStyle, { fontWeight: "bold" }]}>
                {receivedLabel}
              </Text>
              <Text style={Styles.dateTextStyle}>
                {formatDate(deliveryDate)}
              </Text>
            </View>
            {isNewTemplate ? null : actionButton}
            <View style={Styles.arrowImageContainer}>
              <Image
                style={Styles.arrowImage}
                source={
                  expanded && htmlContent
                    ? NOTIFICATION_UP_ARROW
                    : NOTIFICATION_DOWN_ARROW
                }
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

NotificationTile.propTypes = {
  goTo: PropTypes.func,
  dispatchAction: PropTypes.func,
  getNotification: PropTypes.func,
  notificationContentLinkWithId: PropTypes.obj,
  updateNotificationStatus: PropTypes.func,
  recordNotificationActioned: PropTypes.func,
  notification: PropTypes.obj,
};

const mapStateToProps = state => {
  const { notifications } = state;
  const { notificationContentLinkWithId } = notifications;

  return {
    notificationContentLinkWithId,
  };
};

export default connect(mapStateToProps, {
  getNotification: actionCreators.getNotification,
  recordNotificationActioned: actionCreators.recordNotificationActioned,
  updateNotificationStatus: actionCreators.changeNotificationStatus,
  goTo: (screenId, params) => ({
    type: CoreActionTypes.GO_TO_SCREEN,
    navigateTo: screenId,
    payload: {
      params,
    },
  }),
  dispatchAction: action => action,
})(NotificationTile);

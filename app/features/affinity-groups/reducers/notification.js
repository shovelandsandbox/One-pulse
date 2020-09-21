import { affinityGroupActions as actions } from "../configs/affinity-group-actions";
import {
  NOTIFICATION_TYPE,
  getAttributesBasedOnType,
} from "../utils/type-helper";
import { pathOr } from "ramda";
const QUEUE_SIZE = 100;

export const INITIAL_STATE = {
  notifications: {
    notificationList: [],
    posts: {},
  },
};

export const notificationReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case actions.getPostForNotificationSuccess:
      return {
        ...state,
        notifications: postNotificationSuccessHandler(
          state.notifications,
          payload
        ),
      };
    case actions.foundPostInNotificationsCache:
      return {
        ...state,
        notifications: foundPostInNotificationsCache(
          state.notifications,
          payload
        ),
      };
    case actions.notificationsViewed:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          notificationList: readAllNotification(
            state.notifications.notificationList
          ),
        },
      };
    case actions.notificationOpened:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          notificationList: notificationOpened(
            state.notifications.notificationList,
            payload
          ),
        },
      };
  }
};

const notificationOpened = (state, payload) => {
  const postId = payload;

  //Mark all notifications for this postId as read.
  return state.map(notification => {
    if (notification.postId === postId) {
      notification = {
        ...notification,
        read: true,
      };
    }
    return notification;
  });
};

const readAllNotification = list => {
  return list.map(item => ({ ...item, read: true }));
};

const foundPostInNotificationsCache = (state, payload) => {
  const data = payload;
  const postId = data.parentGroupPostId || data.groupPostId;
  const type = NOTIFICATION_TYPE[data.type];
  const timestamp = Date.now();
  //Check if post is present in cache
  //First check for all notifications which are not for post
  let index = state.notificationList.findIndex(
    notification =>
      notification.postId === postId &&
      !notification.attributes[NOTIFICATION_TYPE.POST]
  );

  //If not found then check for rest of the posts
  if (index < 0) {
    index = state.notificationList.findIndex(
      notification => notification.postId === postId
    );
  }

  //get notification object from the notification list
  const notificationObject = { ...state.notificationList[index] };
  let notificationList = [];
  //If this is a post notification. We create a new attribute object as the post is a stand alone notification
  if (notificationObject.attributes[NOTIFICATION_TYPE.POST]) {
    notificationObject.attributes = getAttributesBasedOnType(type);
    notificationList = [
      {
        ...notificationObject,
        attributes: { ...notificationObject.attributes },
        read: false,
        timestamp,
      },
      ...state.notificationList.slice(0, QUEUE_SIZE - 1),
    ];
  } else {
    //Initialize if adding new keys
    if (!notificationObject.attributes[type]) {
      notificationObject.attributes[type] = 0;
    }

    //Increment type of unread notification.
    notificationObject.attributes[type] += 1;
    notificationList = [
      {
        ...notificationObject,
        attributes: { ...notificationObject.attributes },
        read: false,
        timestamp,
      },
      ...state.notificationList.slice(0, index),
      ...state.notificationList.slice(index + 1, QUEUE_SIZE),
    ];
  }

  return {
    ...state,
    //Add the new notification object to the beggining of the list.
    //Remove the existing notification from the notification list
    notificationList,
  };
};

//Triggered when post not found in cache.
const postNotificationSuccessHandler = (state, payload) => {
  const postType = payload.response.type;
  let postId = payload.response.id;
  const type = NOTIFICATION_TYPE[payload.type];
  const message = payload.response.message;

  if (postType === "COMMENT") {
    postId = pathOr(postId, ["response", "parent", "id"], payload);
  }
  const timestamp = Date.now();
  //Initiate new postObject
  const notificationObject = {
    attributes: getAttributesBasedOnType(type),
    postId,
  };

  return {
    //Always increment count by 1 as notification for this post is non-existing
    ...state,
    notificationList: [
      {
        postId,
        attributes: { ...notificationObject.attributes },
        title: payload.response.title,
        groupId: payload.response.group.id,
        read: false,
        timestamp,
        message,
        postType,
      },
      //Remove the last element if any
      ...state.notificationList.slice(0, QUEUE_SIZE - 1),
    ],
  };
};

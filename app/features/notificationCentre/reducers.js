import actions from "./configs/actionNames";
import { pathOr } from "ramda";

const INITIAL_STATE = {
  allNotifications: [],
  notificationContentLinkWithId: {},
  showNotification: false,
  unreadNotificationCount: 0,
  backgroundNotification: null,
};

// eslint-disable-next-line complexity
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.getCustomerCommsSuccess:
      return {
        ...state,
        allNotifications: pathOr([], ["payload", "response", "body"], action),
      };

    case actions.getCustomerCommById:
      return {
        ...state,
        showNotification: pathOr(
          false,
          ["payload", "showNotification"],
          action
        ),
      };
    case actions.getCustomerCommByIdSuccess: {
      const body = pathOr({}, ["payload", "response", "body"], action);
      if (body && body.id) {
        const notificationContentLinkWithId = {
          ...state.notificationContentLinkWithId,
          [body.id]: body,
        };

        return {
          ...state,
          notificationContentLinkWithId,
          activeNotificationId: body.id,
        };
      }
      return state;
    }
    case actions.updateCustomerCommSuccess: {
      return {
        ...state,
        unreadNotificationCount:
          state.unreadNotificationCount <= 0
            ? 0
            : --state.unreadNotificationCount,
      };
    }
    case actions.newNotificationReceived: {
      return {
        ...state,
        unreadNotificationCount: ++state.unreadNotificationCount,
      };
    }
    case actions.resetNotificationStatus: {
      return {
        ...state,
        showNotification: false,
        activeNotificationId: undefined,
      };
    }
    case actions.getNotificationSummarySuccess: {
      return {
        ...state,
        unreadNotificationCount: pathOr(
          0,
          ["payload", "response", "body", "unread"],
          action
        ),
      };
    }
    case actions.saveOfflineNotification: {
      return {
        ...state,
        backgroundNotification: action.payload,
      }
    }
    case actions.clearOfflineNotification: {
      return {
        ...state,
        backgroundNotification: null,
      }
    }
    default:
      return state;
  }
};

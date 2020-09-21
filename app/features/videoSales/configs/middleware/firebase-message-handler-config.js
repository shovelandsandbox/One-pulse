import actions from "../actionNames";
import screenNames from "../screenNames";
import { CoreConfig, CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { STATES } from "../../actions";
import { Alert } from "react-native";
import { isEmpty } from "ramda";

const { pageKeys } = CoreConfig;

const middlewareConfig = {
  FOREGROUND: {
    [actions.inviteReceived]: {
      successAction: actions.inviteAccepted,
      // showAlert: (state, payload) => {
      //   return foregroundNotificationHandler(state, payload, "FOREGROUND");
      // },
      postSuccessHook: payload => {
        return {
          callDetails: payload,
        };
      },
    },
  },
  BACKGROUND: {
    [actions.inviteReceived]: {
      successAction: state => {
        //if user is logged out
        if (!state.auth.isLoggedIn) {
          return actions.invitePending;
        }
        return actions.inviteAccepted;
      },
      postSuccessHook: payload => {
        return {
          callDetails: payload,
        };
      },
      showAlert: (state, payload) => {
        return backgroundNotificationHandler(state, payload, "BACKGROUND");
      },
    },
  },
  [pageKeys.LOGIN]: {
    [CoreActionTypes.checkVideoInvite]: {
      successAction: actions.inviteAccepted,
      postSuccessHook: (payload, state) => {
        return {
          callDetails: state.videoSales.callDetails,
        };
      },
      showAlert: state => {
        return new Promise((resolve, reject) => {
          //if there is a pending notification for video call - show alert
          if (
            state.videoSales.state === STATES.INVITE_PENDING &&
            !isEmpty(state.videoSales.callDetails)
          ) {
            const payload = {
              callDetails: state.videoSales.callDetails,
            };
            showNotificationAlert(resolve, reject, payload.callDetails);
          } else {
            reject();
          }
        });
      },
    },
  },
};

const backgroundNotificationHandler = (state, payload) => {
  return new Promise((resolve, reject) => {
    //if user is logged out
    if (!state.auth.isLoggedIn || !payload) {
      resolve();
      return;
    }
    showNotificationAlert(resolve, reject, payload);
  });
};

const foregroundNotificationHandler = (state, payload) => {
  return new Promise((resolve, reject) => {
    if (!state.auth.isLoggedIn || !payload) {
      reject();
      return;
    }
    //if user in already in the call - should we add it to notifications
    if (state.appNavigation.currentPage === screenNames.CHAT) {
      reject();
      return;
    }
    showNotificationAlert(resolve, reject, payload);
  });
};

const showNotificationAlert = (onOk, onCancel, payload) => {
  const options = [
    {
      text: "Cancel",
      onPress: () => {
        onCancel();
      },
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => {
        onOk();
      },
    },
  ];
  Alert.alert("", `${payload.caller} wants to connect with you.`, options, {
    cancelable: false,
  });
};

export default middlewareConfig;

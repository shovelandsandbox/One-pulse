/* eslint-disable complexity */
import { NativeModules } from "react-native";

import notificationScreens from "../features/notificationCentre/configs/screenNames";
import notificationActions from "../features/notificationCentre/configs/actionNames";
import videoSalesActions from "../features/videoSales/configs/actionNames";
import customerConnectActions from "../features/customerConnect/redux/actionNames";
import communityEvents from "../features/communityEvents/config/actions";
import screens from "../features/videoSales/configs/screenNames";
import screensCConnect from "../features/customerConnect/constants/screenNames";
import actionNames from "../features/videoSales/configs/actionNames";
import { affinityGroupActions } from "../features/affinity-groups/configs/affinity-group-actions";
import { events } from "@pru-rt-internal/pulse-common";
import { dispatchEvent } from "./../actions";
import { NOTIFICATION_TYPE } from "../features/affinity-groups/utils/type-helper";

const { RingToneModule } = NativeModules;

const pulseTvWebinarOrVideoCall = (store, payload, type, isLoggedIn, commId) => {
  if (type === "PULSE_TV_VIDEO_CALL") {
    RingToneModule.isRingtonePlaying().then(isRingtonePlaying => {
      if (!isRingtonePlaying) {
        RingToneModule.playRingTone();
      }
    });
    store.dispatch({
      type: communityEvents.enableIncomingCall,
      payload: {
        callerEmail: payload.callerEmail,
        channelId: payload.channelId,
        channelName: payload.channelName,
        chatToken: payload.chatToken,
        groupId: payload.channelName,
        callerId: payload.callerId,
      },
    });
  } else {
    store.dispatch({
      type: communityEvents.joinWebinar,
      payload: {
        callerEmail: payload.callerEmail,
        channelId: payload.channelId,
        channelName: payload.channelName,
        chatToken: payload.chatToken,
        groupId: payload.channelName,
        callerId: payload.callerId,
      },
    });
    if (isLoggedIn && commId) {
      const newPayload = {
        context: notificationScreens.PULSE_NOTIFICATION,
        type: notificationActions.getCustomerCommById,
        payload: {
          commId,
          showNotification: true,
        },
      };
      const newPayloadForNotification = {
        type: notificationActions.newNotificationReceived,
        payload: {
          commId,
        },
      };
      store.dispatch(newPayloadForNotification);
      store.dispatch(newPayload);
    }
  }
};

export const makeMessageReceivedHandler = store => payload => {
  const {
    commId,
    realm,
    platform,
    notificationTemplateId,
    screenId,
    channelId,
    channelName,
    chatToken,
    callerEmail,
    mode,
    identifier,
    ...data
  } = payload.payload;
  const {
    auth: { isLoggedIn },
    customerConnect,
  } = store.getState();
  const notificationContext = payload.context; // This will have forground or background value
  const notificationEventPayload = events[notificationContext];
  notificationEventPayload.attributes.notificationType = realm || platform;
  notificationEventPayload.attributes.appLoggedIn = isLoggedIn;
  notificationEventPayload.attributes.templateId = commId;
  notificationEventPayload.attributes.twilioMode = mode;
  store.dispatch(dispatchEvent(notificationEventPayload));
  if (realm === "doctor") {
    store.dispatch(payload);
  } else if (identifier === "ratingBooster") {
    store.dispatch({
      type: "SHOW_MODAL_FOR_APP_RATING",
      payload: {
        showModal: true
      },
    });
  } else if (platform === "twilio") {
    if (mode !== "text") {
      if (screenId && screenId === "PULSE_TV_VIDEO_CALL") {
        pulseTvWebinarOrVideoCall(
          store,
          payload.payload,
          "PULSE_TV_VIDEO_CALL",
          isLoggedIn,
          commId
        );
      } else if (screenId && screenId === "PULSE_TV_WEBINAR") {
        pulseTvWebinarOrVideoCall(store, payload.payload, "PULSE_TV_WEBINAR", isLoggedIn, commId);
      } else {
        RingToneModule.isRingtonePlaying().then(isRingtonePlaying => {
          if (!isRingtonePlaying) {
            RingToneModule.playRingTone();
          }
        });
        store.dispatch({
          type: customerConnectActions.enableIncomingCall,
          payload,
        });
      }
    } else {
      if (isLoggedIn) {
        store.dispatch({
          context: screensCConnect.CUSTOMER_CONNECT_LANDING,
          type: customerConnectActions.getCustomerByEmail,
          payload: {
            emailOrMobile: payload.payload.callerEmail,
            isMobileNo: false,
          },
        });
        // store.dispatch({
        //   context: screens.INITIATE_CALL_SCREEN,
        //   type: actionNames.getCustomerByEmail,
        //   payload: {
        //     emailOrMobile: payload.payload.callerEmail,
        //     isMobileNo: false,
        //   },
        // });
        store.dispatch({
          type: customerConnectActions.createCustomerChatRoom,
          payload: {
            textChatDetails: payload.payload,
            shouldOpenPopup: customerConnect.state !== "VIDEO_CALL_IN_PROGRESS",
          },
        });
      } else {
        const newPayload = {
          context: notificationScreens.PULSE_NOTIFICATION,
          type: notificationActions.saveOfflineNotification,
          payload: payload.payload,
        };

        store.dispatch(newPayload);
      }
    }
  } else if (isLoggedIn && commId) {
    const newPayload = {
      context: notificationScreens.PULSE_NOTIFICATION,
      type: notificationActions.getCustomerCommById,
      payload: {
        commId,
        showNotification: true,
      },
    };
    const newPayloadForNotification = {
      type: notificationActions.newNotificationReceived,
      payload: {
        commId,
      },
    };
    store.dispatch(newPayloadForNotification);
    store.dispatch(newPayload);
  } else if (NOTIFICATION_TYPE[data.type]) {
    //this is data only message - for firebase topic
    store.dispatch({
      payload: data,
      context: "FOREGROUND",
      type: affinityGroupActions.firebaseMessageReceived,
    });
  } else {
    const newPayload = {
      context: notificationScreens.PULSE_NOTIFICATION,
      type: notificationActions.saveOfflineNotification,
      payload,
    };

    store.dispatch(newPayload);
  }
};

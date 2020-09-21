import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { pathOr } from "ramda";

import screens from "../screenNames";
import actionNames from "../actionNames";

import { CustomAlert } from "../../../../components";
import { registerEvent } from "../../../../utils/registerEvents/actions";
import { eventNames } from "../../events";

const FailureAlert = msg =>
  CustomAlert.show("", msg, {
    positiveText: "Ok",
  });
const profilePicInLogs = (callLog, actions, type) => {
  if (callLog && callLog.length > 0) {
    callLog.forEach(i => {
      const docId = pathOr(
        "",
        ["participants", "0", "documents", "0", "id"],
        i
      );
      if (docId) {
        actions.push({
          context: screens.INITIATE_CALL_SCREEN,
          type: actionNames.getChatOrCallLogsProfilePic,
          payload: {
            id: docId,
            type: type,
          },
        });
      }
    });
  }
  return actions;
};
export default {
  [screens.INITIATE_CALL_SCREEN]: {
    [actionNames.getAllParticipants]: {
      successAction: actionNames.getAllParticipantsSuccess,
      failureAction: actionNames.getAllParticipantsFailure,
      postSuccessHook: payload => ({
        participants: pathOr({}, ["response", "body", "participants"], payload),
      }),
      toggleLoader: false,
    },
    [actionNames.createRoom]: {
      successAction: actionNames.createRoomSuccess,
      failureAction: actionNames.createRoomFailure,
      postSuccessHook: payload => {
        const callDetails = pathOr([], ["response", "body"], payload);
        const videoCallWith = pathOr(
          "",
          ["actionPayload", "participants", "0"],
          payload
        );
        const participantsList = pathOr(
          "",
          ["actionPayload", "participants"],
          payload
        );
        return {
          callDetails: {
            ...callDetails,
          },
          videoCallWith,
          participantsList,
        };
      },
      dispatchActions: (payload, state) => {
        const actions = [];
        actions.push(registerEvent(eventNames.initiateCallSuccess));
        actions.push(registerEvent(eventNames.videoCallStart));
        return actions;
      },
      failureHook: () => {
        FailureAlert(
          "We are facing some inconvenience, please try after some time"
        );
        return null;
      },
      dispatchFailureActions: (payload, state) => {
        const actions = [];
        actions.push(registerEvent(eventNames.initiateCallFailure));
        return actions;
      },
      toggleLoader: false,
    },
    [actionNames.createChatChannel]: {
      successAction: actionNames.createChatChannelSuccess,
      failureAction: actionNames.createChatChannelFailure,
      postSuccessHook: payload => {
        const chatDetails = pathOr([], ["response", "body"], payload);
        const initiatedWith = pathOr(
          "",
          ["actionPayload", "participants", "0", "email"],
          payload
        );
        const participantName = pathOr(
          "",
          ["actionPayload", "participants", "0", "fullName"],
          payload
        );

        return {
          chatDetails: {
            ...chatDetails,
            initiatedWith,
            participantName,
          },
        };
      },
      failureHook: () => {
        FailureAlert(
          "We are facing some inconvenience, please try after some time"
        );
        return null;
      },
      dispatchActions: payload => {
        const actions = [];

        actions.push({
          type: CoreActionTypes.GO_TO_SCREEN,
          navigateTo: screens.CHAT,
        });

        return actions;
      },
      toggleLoader: false,
    },
    [actionNames.getCustomerByEmail]: {
      successAction: actionNames.getCustomerByEmailSuccess,
      postSuccessHook: payload => {
        const responseBody = payload.response.body;
        const forSelf = payload.actionPayload.forSelf;

        if (!responseBody) {
          FailureAlert("User not found, please enter correct email address");
          return null;
        }
        if (forSelf) {
          return {
            responseBody,
            forSelf,
          };
        }
        return responseBody;
      },
      dispatchActions: (payload, state) => {
        const actions = [];
        actions.push(registerEvent(eventNames.searchForUserSuccess));
        return actions;
      },
      failureAction: actionNames.getCustomerByEmailFailure,
      dispatchFailureActions: (payload, state) => {
        const actions = [];
        actions.push(registerEvent(eventNames.searchForUserFailure));
        return actions;
      },
      toggleLoader: false,
    },

    [actionNames.getCallLogs]: {
      successAction: actionNames.getCallLogsSuccess,
      failureAction: actionNames.getCallLogsFailure,
      postSuccessHook: (payload, state) => {
        const { id } = state.profile;
        return {
          customerId: id,
          callLogs: pathOr([], ["response", "body"], payload),
        };
      },
      dispatchActions: payload => {
        const actions = [];
        const callLog = pathOr([], ["response", "body"], payload);
        return profilePicInLogs(callLog, actions, "Call");
      },
      toggleLoader: false,
    },
    [actionNames.getChatHistory]: {
      successAction: actionNames.getChatHistorySuccess,
      failureAction: actionNames.getChatHistoryFailure,
      postSuccessHook: (payload, state) => {
        const { id } = state.profile;
        return {
          customerId: id,
          chatLogs: pathOr([], ["response", "body"], payload),
        };
      },
      dispatchActions: payload => {
        const actions = [];
        const callLog = pathOr([], ["response", "body"], payload);
        return profilePicInLogs(callLog, actions, "Chat");
      },
      toggleLoader: false,
    },
    [actionNames.endChatSession]: {
      successAction: actionNames.endChatSessionSuccess,
      failureAction: actionNames.endChatSessionFailure,
    },
    [actionNames.getAllGroups]: {
      successAction: actionNames.getAllGroupsSuccess,
      failureAction: actionNames.getAllGroupsFailure,
      postSuccessHook: payload => pathOr([], ["response", "body"], payload),
      toggleLoader: false,
    },
    [actionNames.uploadDocument]: {
      successAction: actionNames.uploadDocumentSuccess,
      dispatchActions: (payload, state) => {
        const actions = [];
        actions.push(registerEvent(eventNames.uploadDocumentSuccess));
        return actions;
      },
      failureAction: actionNames.uploadDocumentFailure,
      dispatchFailureActions: (payload, state) => {
        const actions = [];
        actions.push(registerEvent(eventNames.uploadDocumentFailure));
        return actions;
      },
      postSuccessHook: payload => pathOr([], ["response", "body"], payload),

      toggleLoader: false,
    },
    [actionNames.getDocumentOrProfilePic]: {
      successAction: actionNames.getDocumentOrProfilePicSuccess,
      failureAction: actionNames.getDocumentOrProfilePicFailure,
      postSuccessHook: payload => {
        const docOrProfilepic = pathOr(
          "documentContent",
          ["actionPayload", "type"],
          payload
        );
        return {
          docOrProfilepic,
          content: pathOr([], ["response", "body"], payload),
        };
      },
      toggleLoader: false,
    },
    [actionNames.getChatSession]: {
      successAction: actionNames.getChatSessionSuccess,
      failureAction: actionNames.getChatSessionFailure,
      postSuccessHook: (payload, state) => {
        //const { chatDetails = {} } = state.videoSales;
        const email = pathOr("", ["actionPayload", "id"], payload);
        const name = pathOr("", ["actionPayload", "name"], payload);
        const textinitiator = pathOr(
          "",
          ["actionPayload", "textinitiator"],
          payload
        );
        const callerEmail = email || "";
        const caller = name || "";
        const responseData = pathOr({}, ["response", "body"], payload);
        return {
          response: responseData,
          email: callerEmail,
          name: caller,
          textinitiator,
        };
      },
      failureHook: () => {
        FailureAlert(
          "We are facing some inconvenience, please try after some time"
        );
        return null;
      },
      dispatchActions: payload => {
        const actions = [];

        actions.push({
          type: CoreActionTypes.GO_TO_SCREEN,
          navigateTo: screens.CHAT,
        });

        return actions;
      },
      toggleLoader: false,
    },
    [actionNames.getChatOrCallLogsProfilePic]: {
      successAction: actionNames.getChatOrCallLogsProfilePicSuccess,
      failureAction: actionNames.getChatOrCallLogsProfilePicFailure,
      postSuccessHook: payload => {
        return {
          type: pathOr("", ["actionPayload", "type"], payload),
          docId: pathOr("", ["response", "body", "id"], payload),
          content: pathOr("", ["response", "body"], payload),
        };
      },
      toggleLoader: false,
    },
    [actionNames.updateChatSession]: {
      successAction: actionNames.updateChatSessionSuccess,
      postSuccessHook: payload => {
        const email = pathOr("", ["actionPayload", "email", 0], payload);
        return {
          email,
        };
      },
      failureAction: actionNames.updateChatSessionFailure,
      failureHook: () => {
        FailureAlert(
          "We are facing some inconvenience, please try after some time"
        );
        return null;
      },
      toggleLoader: false,
    },
  },
};

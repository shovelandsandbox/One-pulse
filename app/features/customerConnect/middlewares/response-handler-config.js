import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { pathOr, path } from "ramda";

import screens from "../constants/screenNames";
import actionNames from "../redux/actionNames";

import { CustomAlert } from "../../../components";
import { registerEvent } from "../../../utils/registerEvents/actions";
import { eventNames } from "../events";

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
          context: screens.CUSTOMER_CONNECT_LANDING,
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
  [screens.CUSTOMER_CONNECT_LANDING]: {
    [actionNames.getCustomerContacts]: {
      successAction: actionNames.getCustomerContactsSuccess,
      failureAction: actionNames.getCustomerContactsFailure,
      postSuccessHook: payload => {
        return {
          contacts: pathOr([], ["response", "body"], payload),
          pageNo: payload.actionPayload.pageNo,
        };
      },
      failureHook: payload => {
        const errorCode = pathOr(-1, ["response", "status", "code"], payload);
        return { isContactsSynced: errorCode !== 3610 };
      },
      toggleLoader: false,
    },
    [actionNames.updateCustomersContact]: {
      successAction: actionNames.updateCustomersContactSuccess,
      failureAction: actionNames.updateCustomersContactFailure,
      toggleLoader: false,
      successHandler: (action, store) => {
        store.dispatch({
          context: screens.CUSTOMER_CONNECT_LANDING,
          type: actionNames.getCustomerContacts,
          payload: {
            pageNo: 0,
          },
        });
      },
    },
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
      failureHook: payload => {
        const errorCode = payload ?.response ?.status ?.code;

        if (errorCode === 7040) {
          FailureAlert("User is not available, please try after sometime");
        } else {
          FailureAlert(
            "We are facing some inconvenience, please try after some time"
          );
        }
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
          ["actionPayload", "participants", "0"],
          payload
        );
        const groupPeople = pathOr(
          [],
          ["actionPayload", "participants"],
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
            participantName,
          },
          initiatedWith,
          groupPeople,
        };
      },
      failureHook: payload => {
        const errorCode = payload ?.response ?.status ?.code;

        if (errorCode === 7040) {
          FailureAlert("User is not available, please try after sometime");
        } else {
          FailureAlert(
            "We are facing some inconvenience, please try after some time"
          );
        }
        return null;
      },
      dispatchActions: payload => {
        const actions = [];
        const initiatedWith = pathOr(
          "",
          ["actionPayload", "participants", "0"],
          payload
        );

        actions.push({
          context: screens.CUSTOMER_CONNECT_LANDING,
          type: actionNames.getCustomerByEmail,
          payload: {
            emailOrMobile: initiatedWith.value,
            isMobileNo: false,
          },
        });
        actions.push({
          type: CoreActionTypes.GO_TO_SCREEN,
          navigateTo: screens.CUSTOMER_CONNECT_CHAT,
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
          FailureAlert(
            "User not found, please enter correct email id / mobile number"
          );
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
    [actionNames.fetchCustomerDetails]: {
      successAction: actionNames.fetchCustomerDetailsSuccess,
      postSuccessHook: payload => {
        const responseBody = payload.response.body;
        if (!responseBody) {
          FailureAlert(
            "User not found, please enter correct email id / mobile number"
          );
          return null;
        }
        return responseBody;
      },
      dispatchActions: (payload, state) => {
        const actions = [];
        actions.push(registerEvent(eventNames.searchForUserSuccess));
        return actions;
      },
      failureAction: actionNames.fetchCustomerDetailsFailure,
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
        const name = pathOr("", ["actionPayload", "fullName"], payload);
        const textinitiator = pathOr(
          false,
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
          groupPeople: pathOr("", ["actionPayload", "emails"], payload),
        };
      },
      failureHook: payload => {
        const errorCode = payload ?.response ?.status ?.code;

        if (errorCode === 7040) {
          FailureAlert("User is not available, please try after sometime");
        } else {
          FailureAlert(
            "We are facing some inconvenience, please try after some time"
          );
        }
        return null;
      },
      dispatchActions: payload => {
        const actions = [];

        actions.push({
          type: CoreActionTypes.GO_TO_SCREEN,
          navigateTo: screens.CUSTOMER_CONNECT_CHAT,
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
      failureHook: payload => {
        const errorCode = payload ?.response ?.status ?.code;

        if (errorCode === 7040) {
          FailureAlert("User is not available, please try after sometime");
        } else {
          FailureAlert(
            "We are facing some inconvenience, please try after some time"
          );
        }
        return null;
      },
      toggleLoader: false,
    },
    [actionNames.createGroupMembers]: {
      successAction: actionNames.createGroupMembersSuccess,
      failureAction: actionNames.createGroupMembersFailure,
      toggleLoader: false,
      successHandler: (action, store) => {
        const groupId = pathOr(
          [],
          ["payload", "actionPayload", "groupId"],
          action
        );
        const participants = pathOr(
          [],
          ["payload", "actionPayload", "updateContact"],
          action
        );
        const mode = pathOr(
          "VIDEO",
          ["payload", "actionPayload", "mode"],
          action
        );
        if (groupId) {
          if (participants.length === 1) {
            store.dispatch({
              context: screens.CUSTOMER_CONNECT_LANDING,
              type: actionNames.updateChatSession,
              payload: {
                participants,
                roomId: groupId,
                mode,
              },
            });
          } else {
            store.dispatch({
              context: screens.CUSTOMER_CONNECT_LANDING,
              type: actionNames.createGroupChat,
              payload: {
                groupId,
              },
            });
          }
        }
      },
    },
    [actionNames.createGroup]: {
      successAction: actionNames.createGroupSuccess,
      failureAction: actionNames.createGroupFailure,
      toggleLoader: false,
      successHandler: (action, store) => {
        const groupId = pathOr(
          "",
          ["payload", "response", "body", "id"],
          action
        );
        const contacts = pathOr(
          [],
          ["payload", "actionPayload", "participants"],
          action
        );
        const participants = pathOr(
          [],
          ["payload", "actionPayload", "updateContact"],
          action
        );
        const mode = pathOr(
          "VIDEO",
          ["payload", "actionPayload", "mode"],
          action
        );
        if (groupId && contacts) {
          store.dispatch({
            context: screens.CUSTOMER_CONNECT_LANDING,
            type: actionNames.createGroupMembers,
            payload: {
              groupId,
              contacts,
              participants,
              mode,
            },
          });
        }
      },
    },
    [actionNames.createGroupChat]: {
      successAction: actionNames.createChatChannelSuccess,
      failureAction: actionNames.createChatChannelFailure,
      postSuccessHook: payload => {
        const chatDetails = pathOr([], ["response", "body"], payload);
        const initiatedWith = pathOr(
          "",
          ["actionPayload", "participants", "0"],
          payload
        );
        const groupPeople = pathOr(
          [],
          ["actionPayload", "participants"],
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
          groupPeople,
        };
      },
      failureHook: payload => {
        const errorCode = payload ?.response ?.status ?.code;

        if (errorCode === 7040) {
          FailureAlert("User is not available, please try after sometime");
        } else {
          FailureAlert(
            "We are facing some inconvenience, please try after some time"
          );
        }
        return null;
      },
      dispatchActions: payload => {
        const actions = [];

        actions.push({
          type: CoreActionTypes.GO_TO_SCREEN,
          navigateTo: screens.CUSTOMER_CONNECT_CHAT,
        });

        return actions;
      },
      toggleLoader: false,
    },
    [actionNames.getGroupMembers]: {
      successAction: actionNames.getGroupMembersSuccess,
      failureAction: actionNames.getGroupMembersFailure,
      toggleLoader: false,
      postSuccessHook: payload => {
        return {
          id: pathOr("", ["actionPayload", "groupId"], payload),
          logs: payload.response.body,
        };
      },
    },
    [actionNames.leaveGroupMember]: {
      successAction: actionNames.leaveGroupMemberSuccess,
      failureAction: actionNames.leaveGroupMemberFailure,
      toggleLoader: false,
    },
  },
};

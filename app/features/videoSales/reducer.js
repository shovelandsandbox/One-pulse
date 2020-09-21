import actions from "./configs/actionNames";
import { STATES } from "./actions";
import screenNames from "./configs/screenNames";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { pathOr } from "ramda";
import _ from "lodash";

const INITIAL_STATE = {
  allParticipants: [],
  callDetails: {},
  initiator: false,
  state: STATES.INIT,
  errors: {},
  contacts: [],
  filteredContacts: [],
  calllogList: [],
  chatDetails: {},
  videoSalesIncomingCall: false,
  incomingCallPayload: {},
  isCustomerNotificationArrived: false,
  myAccountId: null,
  chatHistory: [],
  isVideoResized: false,
  videoCallWith: null,
  chatGroups: {},
  uploadingDocument: false,
  documentId: "",
  documentContent: "",
  profilePictureId: "",
  profilePicture: "",
  uploadCancelled: false,
  textinitiator: false,
  callerList: [],
};

const allChatGroups = (state, action) => {
  switch (action.type) {
    case actions.getAllGroupsSuccess: {
      return {
        ...state,
        callDetails: action.payload,
        state: STATES.INVITE_ACCEPTED,
      };
    }
    case actions.getAllGroupsFailure: {
      return {
        ...state,
      };
    }
  }
};

const inviteReducer = (state, action) => {
  switch (action.type) {
    case actions.inviteAccepted: {
      return {
        ...state,
        callDetails: action.payload,
        state: STATES.INVITE_ACCEPTED,
      };
    }
    case actions.invitePending: {
      return {
        ...state,
        callDetails: action.payload.callDetails,
        state: STATES.INVITE_PENDING,
      };
    }
  }
};

const roomReducer = (state, action) => {
  switch (action.type) {
    case actions.createRoom: {
      return {
        ...state,
        callerList: [],
        initiator: true,
        state: STATES.CREATE_ROOM_INIT,
        errors: {},
      };
    }
    case actions.createRoomSuccess: {
      const { callDetails, videoCallWith, participantsList } = action.payload;

      return {
        ...state,
        callDetails: callDetails,
        state: STATES.CREATE_ROOM_SUCCESS,
        videoCallWith: videoCallWith,
        callerList: participantsList,
      };
    }
    case actions.createRoomFailure: {
      return {
        ...state,
        state: STATES.CREATE_ROOM_FAILURE,
        errors: {
          ...state.errors,
          room: action.payload.errorMsg,
        },
      };
    }
    case actions.endChatSessionSuccess: {
      return {
        ...state,
      };
    }
    case actions.endChatSessionFailure: {
      return {
        ...state,
      };
    }
  }
};

const chatChannelReducer = (state, action) => {
  switch (action.type) {
    case actions.createChatChannel: {
      return {
        ...state,
      };
    }
    case actions.createChatChannelSuccess: {
      const {
        payload: { chatDetails, participantName },
      } = action;

      return {
        ...state,
        textinitiator: true,
        chatDetails: {
          ...chatDetails,
          caller: participantName,
        },
      };
    }
    case actions.createChatChannelFailure: {
      return {
        ...state,
        textinitiator: false,
      };
    }
    case actions.videoResize: {
      const { isVideoResized } = action.payload;

      return {
        ...state,
        isVideoResized,
      };
    }
  }
};

const getChatCustomerObject = (state, action) => {
  switch (action.type) {
    case actions.createCustomerChatRoom: {
      return {
        ...state,
        chatDetails: pathOr({}, ["payload", "textChatDetails"], action),
        isCustomerNotificationArrived: pathOr(
          true,
          ["payload", "shouldOpenPopup"],
          action
        ),
      };
    }
    case actions.clearCreateCustomerChatRoom: {
      return {
        ...state,
        chatDetails: {},
        isCustomerNotificationArrived: false,
      };
    }
    case actions.closeNotification: {
      return {
        ...state,
        isCustomerNotificationArrived: false,
      };
    }
  }
};

const videoSalesReducer = (state, action) => {
  switch (action.type) {
    case actions.setCallStatus: {
      return {
        ...state,
        state: action.payload.state,
      };
    }
    case actions.emptyCallDetails: {
      return {
        ...state,
        callDetails: {},
        initiator: false,
      };
    }
    case CoreActionTypes.GO_TO_SCREEN: {
      if (action.payload.navigateTo === screenNames.INITIATE_CALL_SCREEN) {
        return INITIAL_STATE;
      }
      return state;
    }
    case CoreActionTypes.LOGOUT_DONE: {
      return INITIAL_STATE;
    }
  }
};

const searchCustomerReducer = (state, action) => {
  switch (action.type) {
    case actions.getCustomerByEmailSuccess: {
      if (action.payload.forSelf) {
        const { responseBody } = action.payload;
        return {
          ...state,
          myAccountId: responseBody[0].id,
        };
      }

      const responseBody = action.payload;

      if (responseBody[0]) {
        return {
          ...state,
          profilePictureId: pathOr("", ["documents", 0, "id"], responseBody[0]),
          contacts: [getContactObject(responseBody)],
          filteredContacts: [getContactObject(responseBody)],
          //chatDetails: getCallerDetails(responseBody),
        };
      }
      return {
        ...state,
      };
    }
    case actions.getCustomerByEmailFailure: {
      return {
        ...state,
      };
    }
  }
};

const transformCallLogs = (callLogHistory, customerId) => {
  const transformedCallLog = callLogHistory.map(callLogItem => {
    const participants = callLogItem.participants || [];
    const attributeFound = participants.find(item => item.id === customerId);
    const joinedCall = pathOr(
      "false",
      ["attributes", "joined"],
      attributeFound
    );
    _.remove(participants, item => {
      return item.id === customerId;
    });
    const contactObj =
      participants.length > 0 ? getContactObject(participants) : {};
    contactObj.isJoined = joinedCall;
    contactObj.convDate = callLogItem.startTime;
    contactObj.outgoingCall = callLogItem.isInitiator;
    contactObj.duration = callLogItem.duration;
    return contactObj;
  });
  return transformedCallLog;
};

const callLogsReducer = (state, action) => {
  switch (action.type) {
    case actions.getCallLogsSuccess: {
      const { callLogs, customerId } = action.payload;
      const callLogsForCurrentUser = transformCallLogs(callLogs, customerId);
      return {
        ...state,
        calllogList: callLogsForCurrentUser,
        // contacts: callLogsForCurrentUser,
        // filteredContacts: callLogsForCurrentUser
      };
    }
    case actions.getCallLogsFailure: {
      return {
        ...state,
      };
    }
  }
};

const chatHistoryReducer = (state, action) => {
  switch (action.type) {
    case actions.getChatHistorySuccess: {
      const { chatLogs, customerId } = action.payload;
      const chatLogsForCurrentUser = transformCallLogs(chatLogs, customerId);

      return {
        ...state,
        chatHistory: chatLogsForCurrentUser,
      };
    }
    case actions.getChatHistoryFailure: {
      return {
        ...state,
      };
    }
  }
};

getContactObject = responseBody => {
  const contactObj = responseBody[0];
  const email = pathOr("", ["contactDetails", "email"], contactObj);
  const phone = pathOr("", ["contactDetails", "phone"], contactObj);
  const firstName = contactObj.firstName ? contactObj.firstName : "";
  const lastName = contactObj.surName ? contactObj.surName : "";
  const docId = pathOr("", ["documents", "0", "id"], contactObj);
  return {
    fullName: `${firstName} ${lastName}`,
    customerNumber: contactObj.id,
    email: email ? email.value : "",
    dob: "",
    phoneNumber: phone ? phone.value : "",
    id: contactObj.id,
    documentId: docId,
  };
};
getCallerDetails = responseBody => {
  const contactObj = responseBody[0];
  const email = pathOr("", ["contactDetails", "email"], contactObj);
  const firstName = contactObj.firstName || "";
  const lastName = contactObj.surName || "";

  return {
    caller: `${firstName} ${lastName}`,
    callerEmail: email ? email.value : "",
  };
};

clearContactListReducer = (state, action) => {
  switch (action.type) {
    case actions.clearContactList: {
      return {
        ...state,
        contacts: [],
        filteredContacts: [],
      };
    }
  }
};

setSearchedCallLogsReducer = (state, action) => {
  switch (action.type) {
    case actions.setSearchedCallLogs: {
      const filterDataArray = [];
      filterDataArray.push(action.payload.filterData);
      return {
        ...state,
        filteredContacts: filterDataArray,
      };
    }
  }
};

resetContactCallLogsReducer = (state, action) => {
  switch (action.type) {
    case actions.resetContactCallLogs: {
      return {
        ...state,
        filteredContacts: [],
      };
    }
  }
};

const videoCallReducer = (state, action) => {
  switch (action.type) {
    case actions.enableIncomingCall: {
      return {
        ...state,
        videoSalesIncomingCall: true,
        incomingCallPayload: action.payload.payload,
        videoCallWith: action.payload.payload.callerEmail,
      };
    }
    case actions.disableIncomingCall: {
      return {
        ...state,
        videoSalesIncomingCall: false,
      };
    }
  }
};

const uploaddocument = (state, action) => {
  switch (action.type) {
    case actions.uploadDocumentSuccess: {
      return {
        ...state,
        uploadingDocument: true,
        documentId: action.payload.id,
      };
    }
    case actions.uploadDocumentFailure: {
      return {
        ...state,
        uploadingDocument: false,
        documentId: "",
      };
    }
    case actions.resetDocumentFlag: {
      return {
        ...state,
        uploadingDocument: false,
        documentId: "",
      };
    }
    case actions.uploadCancelled: {
      return {
        ...state,
        uploadCancelled: true,
      };
    }
    case actions.resetUploadCancelled: {
      return {
        ...state,
        uploadCancelled: false,
        uploadingDocument: false,
      };
    }
  }
};

const getdocument = (state, action) => {
  switch (action.type) {
    case actions.getDocumentOrProfilePic: {
      return {
        ...state,
        documentContent: "",
      };
    }
    case actions.getDocumentOrProfilePicSuccess: {
      const key = pathOr(
        "documentContent",
        ["payload", "docOrProfilepic"],
        action
      );
      const content = pathOr("", ["payload", "content", "content"], action);

      return {
        ...state,
        [key]: content,
      };
    }
    case actions.getDocumentOrProfilePicFailure: {
      return {
        ...state,
        documentContent: "",
        profilePicture: "",
      };
    }
    case actions.resetProfilePic: {
      return {
        ...state,
        profilePicture: "",
        documentContent: "",
        profilePictureId: "",
        textinitiator: false,
        callerList: [],
      };
    }
  }
};

const getSession = (state, action) => {
  switch (action.type) {
    case actions.getChatSessionSuccess: {
      const email = action.payload.email;
      const name = action.payload.name;
      const textinitiator = action.payload.textinitiator;
      return {
        ...state,
        textinitiator,
        chatDetails: {
          ...action.payload.response,
          callerEmail: email,
          caller: name,
        },
      };
    }
  }
};

const setPaymentLink = (state, action) => {
  switch (action.type) {
    case actions.setPaymentLinkDetails: {
      return {
        ...state,
        messageOnEntry: action.payload,
      };
    }
  }
};
const updateChatSession = (state, action) => {
  switch (action.type) {
    case actions.updateChatSessionSuccess: {
      const emailId = action.payload.email;
      return {
        ...state,
        callerList: [...state.callerList, emailId],
      };
    }
  }
};
const getChatOrCallLogsProfilePic = (state, action) => {
  switch (action.type) {
    case actions.getChatOrCallLogsProfilePic: {
      return {
        ...state,
        // documentContent: "",
      };
    }
    case actions.getChatOrCallLogsProfilePicSuccess: {
      const content = pathOr("", ["payload", "content", "content"], action);
      const docId = pathOr("", ["payload", "docId"], action);
      const type = pathOr("Chat", ["payload", "type"], action);
      if (type === "Chat") {
        return {
          ...state,
          chatHistory: mapProfileImageToChatCallLogs(state.chatHistory, docId, content),
        };
      }
      return {
        ...state,
        calllogList: mapProfileImageToChatCallLogs(state.calllogList, docId, content),
      };
    }
    case actions.getChatOrCallLogsProfilePicFailure: {
      return {
        ...state,
      };
    }
  }
};
mapProfileImageToChatCallLogs = (logs, docId, content) => {
  const history = logs.map(i => {
    if (i.documentId === docId) {
      i.profilePic = content;
    }
    return i;
  });
  return history;
};

export default (state = INITIAL_STATE, action) => {
  return (
    roomReducer(state, action) ||
    chatChannelReducer(state, action) ||
    chatHistoryReducer(state, action) ||
    getChatCustomerObject(state, action) ||
    inviteReducer(state, action) ||
    videoSalesReducer(state, action) ||
    searchCustomerReducer(state, action) ||
    callLogsReducer(state, action) ||
    clearContactListReducer(state, action) ||
    setSearchedCallLogsReducer(state, action) ||
    resetContactCallLogsReducer(state, action) ||
    videoCallReducer(state, action) ||
    allChatGroups(state, action) ||
    uploaddocument(state, action) ||
    getdocument(state, action) ||
    getSession(state, action) ||
    setPaymentLink(state, action) ||
    getChatOrCallLogsProfilePic(state, action) ||
    updateChatSession(state, action) ||
    state
  );
};

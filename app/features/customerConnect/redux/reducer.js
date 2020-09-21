/* eslint-disable complexity */
import actions from "./actionNames";
import { STATES } from "./actions";
import screenNames from "./../constants/screenNames";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { pathOr, path } from "ramda";
import _ from "lodash";

const INITIAL_STATE = {
  allParticipants: [],
  callDetails: {},
  initiator: false,
  state: STATES.INIT,
  errors: {},
  contacts: [],
  filteredContacts: [],
  chatDetails: {},
  videoSalesIncomingCall: false,
  incomingCallPayload: {},
  isCustomerNotificationArrived: false,
  myAccountId: null,
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
  groupPeople: [],
  customerContacts: [],
  nextPage: true,
  isContactsSynced: true,
  chatHistory: [],
  calllogList: [],
  selectedContacts: [],
  currentJourneyType: "AGENT", //"USER"
  isContactsLoading: true,
  groupMembers: [],
};
const PAGINATION_SIZE = 20;

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
        payload: { chatDetails, participantName, initiatedWith, groupPeople },
      } = action;

      return {
        ...state,
        textinitiator: true,
        chatDetails: {
          ...chatDetails,
          caller: participantName,
          initiatedWith,
        },
        groupPeople,
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
    case actions.fetchCustomerDetailsSuccess: {
      const responseBody = action.payload;

      if (responseBody[0]) {
        const selectedContact = getContactObject(responseBody);
        return {
          ...state,
          selectedContacts: addSelectedContact(
            selectedContact,
            state.selectedContacts
          ),
        };
      }
      return {
        ...state,
      };
    }
    case actions.fetchCustomerDetailsFailure: {
      return {
        ...state,
      };
    }
    case actions.clearSelectedContacts: {
      return {
        ...state,
        selectedContacts: [],
      };
    }
    case actions.removeContact: {
      return {
        ...state,
        selectedContacts: removeFromSelectedContact(
          action.payload?.id,
          state.selectedContacts
        ),
      };
    }
    case actions.addToSelectedContact: {
      return {
        ...state,
        selectedContacts: addSelectedContact(
          action.payload?.contact,
          state.selectedContacts
        ),
      };
    }
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
    contactObj.participants = participants;
    contactObj.detail = callLogItem.detail;
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
    case actions.setCurrentJourneyType: {
      return {
        ...state,
        currentJourneyType: action.payload?.type,
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

const contactsReducer = (state, action) => {
  switch (action.type) {
    case actions.resetCustomerContacts: {
      return {
        ...state,
        customerContacts: [],
        isContactsLoading: true,
        isContactsSynced: true,
      };
    }
    case actions.getCustomerContactsSuccess: {
      const { contacts, pageNo } = action.payload;
      let isContactsSynced = state.isContactsSynced;
      if (pageNo === 0) {
        isContactsSynced = contacts?.length > 0;
      }

      return {
        ...state,
        customerContacts: [
          ...state.customerContacts,
          ...parseCustomerContacts(contacts),
        ],
        nextPage: contacts?.length >= PAGINATION_SIZE,
        isContactsSynced: isContactsSynced,
        isContactsLoading: false,
      };
    }
    case actions.getCustomerContactsFailure: {
      const { isContactsSynced } = action.payload;
      return {
        ...state,
        nextPage: false,
        isContactsSynced: isContactsSynced,
        isContactsLoading: false,
      };
    }
    case actions.updateCustomersContactSuccess: {
      return {
        ...state,
        isContactsSynced: true,
      };
    }
  }
};

const parseCustomerContacts = contacts => {
  return contacts
    .filter(item => item.status === "ACTIVE")
    .map(item => {
      return {
        id: path(["customer", "id"], item),
        fullName:
          pathOr("", ["customer", "firstName"], item) +
          " " +
          pathOr("", ["customer", "surName"], item),
        email: pathOr(
          null,
          ["customer", "contactDetails", "email", "value"],
          item
        ),
        phone: pathOr(
          null,
          ["customer", "contactDetails", "phone", "value"],
          item
        ),
      };
    });
};

const getContactObject = responseBody => {
  const contactObj = responseBody[0];
  const email = pathOr("", ["contactDetails", "email"], contactObj);
  const phone = pathOr("", ["contactDetails", "phone"], contactObj);
  const firstName = contactObj.firstName ? contactObj.firstName : "";
  const lastName = contactObj.surName ? contactObj.surName : "";
  const docId = pathOr("", ["documents", "0", "id"], contactObj);
  return {
    fullName: `${firstName} ${lastName}`,
    email: email ? email.value : "",
    dob: "",
    phone: phone ? phone.value : "",
    id: contactObj.id,
    documentId: docId,
  };
};

const addSelectedContact = (contact, prevContacts) => {
  const selectedContacts = [...prevContacts];
  const index = selectedContacts.findIndex(item => item.id === contact.id);
  if (index === -1) {
    selectedContacts.push(contact);
  }
  return selectedContacts;
};

const removeFromSelectedContact = (id, prevContacts) => {
  const selectedContacts = [...prevContacts];
  return selectedContacts.filter(item => item.id !== id);
};

const getCallerDetails = responseBody => {
  const contactObj = responseBody[0];
  const email = pathOr("", ["contactDetails", "email"], contactObj);
  const firstName = contactObj.firstName || "";
  const lastName = contactObj.surName || "";

  return {
    caller: `${firstName} ${lastName}`,
    callerEmail: email ? email.value : "",
  };
};

const clearContactListReducer = (state, action) => {
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

const setSearchedCallLogsReducer = (state, action) => {
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

const resetContactCallLogsReducer = (state, action) => {
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
        groupPeople: [],
      };
    }
  }
};

const getSession = (state, action) => {
  switch (action.type) {
    case actions.getChatSessionSuccess: {
      const email = action.payload.email;
      const name = action.payload.name;
      const groupPeople = pathOr("", ["payload", "groupPeople"], action);
      const textinitiator = action.payload.textinitiator;
      return {
        ...state,
        textinitiator,
        chatDetails: {
          ...action.payload.response,
          callerEmail: email,
          initiatedWith: email,
          caller: name,
          participantName: name,
        },
        groupPeople,
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
        groupPeople: [...state.groupPeople, emailId],
      };
    }
  }
};

const getGroupMembers = (state, action) => {
  switch (action.type) {
    case actions.getGroupMembersSuccess: {
      const groupId = action.payload.id;
      const logs = action.payload.logs;
      const groupMembers = filterGroupMembers(logs, groupId);
      return {
        ...state,
        groupMembers,
        showGroupMembers: true,
      };
    }
    case actions.getGroupMembersFailure: {
      return {
        ...state,
        showGroupMembers: false,
      };
    }
    case actions.closeMemberWindow: {
      return {
        ...state,
        showGroupMembers: false,
      };
    }
    case actions.leaveGroupMember: {
      return {
        ...state,
        showGroupMembers: false,
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
          chatHistory: mapProfileImageToChatCallLogs(
            state.chatHistory,
            docId,
            content
          ),
        };
      }
      return {
        ...state,
        calllogList: mapProfileImageToChatCallLogs(
          state.calllogList,
          docId,
          content
        ),
      };
    }
    case actions.getChatOrCallLogsProfilePicFailure: {
      return {
        ...state,
      };
    }
  }
};

const filterGroupMembers = (list, groupId) => {
  const history = [];
  list.forEach(i => {
    if (i.detail === groupId) {
      const mappedParticipnants = i.participants.map(res => {
        const obj = {
          firstName: res.firstName,
          lastName: res.surName,
          email: res.contactDetails.email.value,
          groupId,
        };
        return obj;
      });
      history.push(mappedParticipnants);
    }
  });
  return history[0];
};

const mapProfileImageToChatCallLogs = (logs, docId, content) => {
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
    callLogsReducer(state, action) ||
    roomReducer(state, action) ||
    chatChannelReducer(state, action) ||
    chatHistoryReducer(state, action) ||
    getChatCustomerObject(state, action) ||
    inviteReducer(state, action) ||
    videoSalesReducer(state, action) ||
    searchCustomerReducer(state, action) ||
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
    contactsReducer(state, action) ||
    updateChatSession(state, action) ||
    getGroupMembers(state, action) ||
    state
  );
};

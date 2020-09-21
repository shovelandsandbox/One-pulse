import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

import screens from "./configs/screenNames";
import actions from "./configs/actionNames";

const STATES = {
  INIT: "INIT",
  CREATE_ROOM_INIT: "INIT_VIDEO_CALL",
  CREATE_ROOM_SUCCESS: "INIT_VIDEO_CALL_SUCCESS",
  CREATE_ROOM_FAILURE: "INIT_VIDEO_CALL_FAILURE",
  INVITE_ACCEPTED: "INVITE_ACCEPTED",
  INVITE_PENDING: "INVITE_PENDING",
  VIDEO_CALL_IN_PROGRESS: "VIDEO_CALL_IN_PROGRESS",
  VIDEO_CALL_DROPPED: "VIDEO_CALL_DROPPED",
  VIDEO_CALL_ENDED: "VIDEO_CALL_ENDED",
};

const createRoom = participants => ({
  context: screens.INITIATE_CALL_SCREEN,
  type: actions.createRoom,
  payload: {
    participants,
  },
});

const createChatChannel = (participant, email) => ({
  context: screens.INITIATE_CALL_SCREEN,
  type: actions.createChatChannel,
  payload: {
    participants: [participant],
    groupName: `${participant}${email}`,
  },
});

const getAllGroups = () => ({
  context: screens.INITIATE_CALL_SCREEN,
  type: actions.getAllGroups,
});

const clearTextChatSession = () => ({
  type: actions.clearCreateCustomerChatRoom,
});

const getChatHistory = () => ({
  context: screens.INITIATE_CALL_SCREEN,
  type: actions.getChatHistory,
});

const videoCallConnected = () => ({
  type: actions.setCallStatus,
  payload: {
    state: STATES.VIDEO_CALL_IN_PROGRESS,
  },
});

const videoCallEnded = () => ({
  context: screens.TWILIO_VIDEO_CALL,
  type: actions.setCallStatus,
  payload: {
    state: STATES.VIDEO_CALL_ENDED,
  },
});

const videoCallDropped = () => ({
  type: actions.setCallStatus,
  payload: {
    state: STATES.VIDEO_CALL_DROPPED,
  },
});

const endChatSession = channelId => ({
  context: screens.INITIATE_CALL_SCREEN,
  type: actions.endChatSession,
  payload: {
    channelId,
  },
});

const getCustomerByEmail = email => ({
  context: screens.INITIATE_CALL_SCREEN,
  type: actions.getCustomerByEmail,
  payload: {
    email: email,
  },
});

const getSelfDetails = email => ({
  context: screens.INITIATE_CALL_SCREEN,
  type: actions.getCustomerByEmail,
  payload: {
    email: email,
    forSelf: true,
  },
});

const videoResize = isVideoResized => ({
  type: actions.videoResize,
  payload: {
    isVideoResized,
  },
});

const fetchCallLogs = () => ({
  context: screens.INITIATE_CALL_SCREEN,
  type: actions.getCallLogs,
});

const clearContactList = () => ({
  type: actions.clearContactList,
});

const setSearchedCallLogs = filterData => ({
  type: actions.setSearchedCallLogs,
  payload: {
    filterData,
  },
});

const resetContactCallLogs = () => ({
  type: actions.resetContactCallLogs,
});

const uploadDocumentCall = (document, fileName, fileType) => ({
  context: screens.INITIATE_CALL_SCREEN,
  type: actions.uploadDocument,
  payload: {
    document,
    fileName,
    fileType,
  },
});

const setUploadCancelled = () => ({
  type: actions.uploadCancelled
});

const resetUploadCancelled = () => ({
  type: actions.resetUploadCancelled
});

const getDocumentOrProfilePic = (id, type) => ({
  context: screens.INITIATE_CALL_SCREEN,
  type: actions.getDocumentOrProfilePic,
  payload: {
    id,
    type,
  },
});

const goTo = screenId => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: screenId,
});

const gotoWithParams = (page, params) => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: page,
  payload: {
    params
  }
});

const resetDocumentFlag = () => ({
  type: actions.resetDocumentFlag,
});

const resetProfilePic = () => ({
  type: actions.resetProfilePic,
});

const getChatSession = (id, textinitiator) => ({
  context: screens.INITIATE_CALL_SCREEN,
  type: actions.getChatSession,
  payload: {
    id,
    textinitiator,
  },
});

const updatePaymentDetails = (payload) => ({
  type: actions.setPaymentLinkDetails,
  payload: payload
})

const updateChatSession = (email, roomId) => ({
  context: screens.INITIATE_CALL_SCREEN,
  type: actions.updateChatSession,
  payload: {
    email,
    roomId,
  },
});

export {
  STATES,
  createRoom,
  createChatChannel,
  clearTextChatSession,
  goTo,
  getSelfDetails,
  getChatHistory,
  getAllGroups,
  videoCallConnected,
  videoCallEnded,
  videoCallDropped,
  videoResize,
  getCustomerByEmail,
  fetchCallLogs,
  clearContactList,
  setSearchedCallLogs,
  resetContactCallLogs,
  endChatSession,
  uploadDocumentCall,
  setUploadCancelled,
  resetUploadCancelled,
  getDocumentOrProfilePic,
  getChatSession,
  resetDocumentFlag,
  resetProfilePic,
  updatePaymentDetails,
  gotoWithParams,
  updateChatSession,
};

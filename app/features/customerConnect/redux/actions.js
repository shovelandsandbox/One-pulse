import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

import screens from "../constants/screenNames";
import actions from "./actionNames";

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

const gotoCustomerConnectAgent = () => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.gotoCustomerConnectAgentLanding,
});

const gotoCustomerConnectUser = () => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.gotoCustomerConnectUserLanding,
});

const updateCustomersContact = contacts => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.updateCustomersContact,
  payload: {
    contacts,
  },
});

const resetCustomerContacts = () => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.resetCustomerContacts,
});

const createGroup = (participants, groupName, updateContact, mode) => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.createGroup,
  payload: {
    participants,
    groupName,
    updateContact,
    mode,
  },
});

const getCustomerContacts = pageNo => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.getCustomerContacts,
  payload: {
    pageNo: pageNo,
  },
});

const createRoom = participants => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.createRoom,
  payload: {
    participants,
  },
});

const createChatChannel = (participant, email) => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.createChatChannel,
  payload: {
    participants: participant,
    groupName: `${participant[0].value}${email}`,
  },
});

const getAllGroups = () => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.getAllGroups,
});

const clearTextChatSession = () => ({
  type: actions.clearCreateCustomerChatRoom,
});

const getChatHistory = () => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
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
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.endChatSession,
  payload: {
    channelId,
  },
});

const getCustomerByEmail = (email, isMobileNo) => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.getCustomerByEmail,
  payload: {
    emailOrMobile: email,
    isMobileNo: isMobileNo,
  },
});

const fetchCustomerDetails = (email, isMobileNo) => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.fetchCustomerDetails,
  payload: {
    emailOrMobile: email,
    isMobileNo: isMobileNo,
  },
});

const clearSelectedContacts = () => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.clearSelectedContacts,
});

const removeContact = id => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.removeContact,
  payload: {
    id,
  },
});

const addToSelectedContact = contact => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.addToSelectedContact,
  payload: {
    contact,
  },
});

const getSelfDetails = email => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.getCustomerByEmail,
  payload: {
    emailOrMobile: email,
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
  context: screens.CUSTOMER_CONNECT_LANDING,
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
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.uploadDocument,
  payload: {
    document,
    fileName,
    fileType,
  },
});

const setUploadCancelled = () => ({
  type: actions.uploadCancelled,
});

const resetUploadCancelled = () => ({
  type: actions.resetUploadCancelled,
});

const getDocumentOrProfilePic = (id, type) => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
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
    params,
  },
});

const resetDocumentFlag = () => ({
  type: actions.resetDocumentFlag,
});

const resetProfilePic = () => ({
  type: actions.resetProfilePic,
});

const getChatSession = (id, textinitiator, fullName, emails) => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.getChatSession,
  payload: {
    id,
    textinitiator,
    fullName,
    emails,
  },
});

const updatePaymentDetails = payload => ({
  type: actions.setPaymentLinkDetails,
  payload: payload,
});

const updateChatSession = (email, roomId, mode) => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.updateChatSession,
  payload: {
    email,
    roomId,
    mode,
  },
});
const fetchGroupMembers = groupId => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.getGroupMembers,
  payload: {
    groupId,
  },
});

const leaveGroup = (groupId, email) => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.leaveGroupMember,
  payload: {
    groupId,
    email,
  },
});
const closeMemberWindow = () => ({
  context: screens.CUSTOMER_CONNECT_LANDING,
  type: actions.closeMemberWindow,
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
  updateCustomersContact,
  getCustomerContacts,
  resetCustomerContacts,
  createGroup,
  fetchCustomerDetails,
  clearSelectedContacts,
  removeContact,
  addToSelectedContact,
  gotoCustomerConnectAgent,
  gotoCustomerConnectUser,
  fetchGroupMembers,
  leaveGroup,
  closeMemberWindow,
};

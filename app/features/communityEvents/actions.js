import screens from "./config/screens";
import actions from "./config/actions";

export const updateLikeDislike = payload => ({
  context: screens.COMMUNITY_EVENT_LANDING,
  type: actions.updateLikeDislike,
  payload,
});

export const createComment = payload => ({
  context: screens.COMMUNITY_EVENT_LANDING,
  type: actions.createComment,
  payload,
});

export const createCommunityEvent = payload => ({
  context: screens.CREATE_COMMUNITY_EVENT,
  type: actions.createCommunityEvent,
  payload,
});

export const updateCommunityEvent = payload => ({
  context: screens.CREATE_COMMUNITY_EVENT,
  type: actions.updateCommunityEvent,
  payload,
});

export const getCommunityEvents = pageNo => ({
  context: screens.COMMUNITY_EVENT_LANDING,
  type: actions.getCommunityEvents,
  payload: {
    pageNo: pageNo,
  },
});

export const resetAllCommunityEvents = () => ({
  context: screens.COMMUNITY_EVENT_LANDING,
  type: actions.resetAllCommunityEvents,
});

export const getCustomerGroups = isAllEvents => ({
  context: screens.COMMUNITY_EVENT_LANDING,
  type: actions.getCustomerGroups,
  payload: {
    isAllEvents: isAllEvents,
  },
});

export const getCustomerEventsForManager = () => ({
  context: screens.PULSE_TV_EVENT_MANAGER,
  type: actions.getCustomerGroupsForEventMgr,
});

export const getEventHistory = pageNo => ({
  context: screens.COMMUNITY_EVENT_LANDING,
  type: actions.getEventHistory,
  payload: {
    pageNo: pageNo,
  },
});
export const createGroupMembers = (contacts, groupId) => ({
  type: actions.createGroupMembers,
  payload: { contacts, groupId },
  context: screens.EVENT_INVITE,
});

export const joinGroup = (contacts, groupId) => ({
  context: screens.EVENT_INVITE,
  type: actions.joinGroup,
  payload: { contacts, groupId },
});

export const groupStatusUpdate = (groupId, status) => ({
  type: actions.groupStatusUpdate,
  payload: { groupId, status },
  context: screens.COMMUNITY_EVENT_LANDING,
});

export const goToWebinar = webinarCall => ({
  context: screens.COMMUNITY_EVENT_LANDING,
  type: actions.navigateToWebinar,
  payload: { webinarCall },
});

export const startWebinarOrVideoCall = (groupId, screenId, eventName) => ({
  context: screens.COMMUNITY_EVENT_LANDING,
  type: actions.startWebinarOrVideoCall,
  payload: { groupId, screenId, eventName },
});

export const getCustomerByEmail = payload => ({
  type: actions.getCustomerByEmail,
  payload,
  context: screens.EVENT_INVITE,
});

export const searchAndUpdateGroupMember = payload => ({
  type: actions.searchGroupMember,
  payload,
  context: screens.EVENT_INVITE,
});

export const setCurrentJourney = journey => ({
  type: actions.setCurrentJourney,
  context: screens.COMMUNITY_EVENT_LANDING,
  payload: {
    journey,
  },
});

export const setEditEvent = value => ({
  type: actions.setEditEvent,
  context: screens.PULSE_TV_EVENT_MANAGER,
  payload: {
    isEditEvent: value,
  },
});

export const leaveGroupMember = (email, eventId) => ({
  context: screens.EVENT_INVITE,
  type: actions.leaveGroupMember,
  payload: {
    email: email,
    eventId: eventId,
  },
});

export const getGroupMembers = groupId => ({
  context: screens.EVENT_INVITE,
  type: actions.getGroupMembers,
  payload: {
    groupId: groupId,
  },
});

export const resetEditEventMembers = () => ({
  context: screens.EVENT_INVITE,
  type: actions.resetEditEventMembers,
});

export const closeModal = () => ({
  type: actions.closeModal,
});

export const getVideoUrl = groupId => ({
  context: screens.COMMUNITY_EVENT_LANDING,
  type: actions.getVideoUrl,
  payload: {
    groupId,
  },
});

export const endChatSession = channelId => ({
  context: screens.COMMUNITY_EVENT_LANDING,
  type: actions.endChatSession,
  payload: {
    channelId,
  },
});

export const saveWebinarId = id => ({
  type: actions.saveWebinarId,
  payload: { id },
});

export const deleteEvent = id => ({
  context: screens.PULSE_TV_EVENT_MANAGER,
  type: actions.deleteEvent,
  payload: {
    id,
  },
});

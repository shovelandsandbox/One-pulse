import screens from "../config/screens";
import actions from "../config/actions";

import { pathOr } from "ramda";

import { CustomAlert } from "../../../components";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { metaFinderCommunityEventLanding } from "./../meta";

const FailureAlert = msg =>
  CustomAlert.show("", msg, {
    positiveText: "Ok",
  });

const getLikesShareComment = (callLog, action) => {
  if (callLog && callLog.length > 0) {
    callLog.forEach(i => {
      const docId = pathOr("", ["id"], i);
      if (docId) {
        action.push({
          context: screens.COMMUNITY_EVENT_LANDING,
          type: actions.getGroupPostStats,
          payload: {
            id: docId,
          },
        });
      }
    });
  }
  return action;
};

export default {
  [screens.COMMUNITY_EVENT_LANDING]: {
    [actions.updateLikeDislike]: {
      successAction: actions.updateLikeDislikeSuccess,
      failureAction: actions.updateLikeDislikeFailure,
      toggleLoader: false,
    },
    [actions.createComment]: {
      successAction: actions.createCommentSuccess,
      failureAction: actions.createCommentFailure,
      toggleLoader: false,
    },
    [actions.getCustomerGroups]: {
      successAction: actions.getCustomerGroupsSuccess,
      failureAction: actions.getCustomerGroupsFailure,
      toggleLoader: false,
      successHandler: (action, store) => {
        if (action.payload?.actionPayload?.isAllEvents) {
          store.dispatch({
            context: screens.COMMUNITY_EVENT_LANDING,
            type: actions.getCommunityEvents,
          });
        }
      },
    },
    [actions.getCommunityEvents]: {
      successAction: actions.getCommunityEventsSuccess,
      failureAction: actions.getCommunityEventsFailure,
      toggleLoader: false,
    },
    [actions.groupStatusUpdate]: {
      successAction: actions.groupStatusSuccess,
      failureAction: actions.groupStatusFailure,
      toggleLoader: false,
    },
    [actions.getEventHistory]: {
      successAction: actions.getEventHistorySuccess,
      postSuccessHook: payload => {
        const eventHistory = pathOr([], ["response", "body"], payload);
        const data = eventHistory;
        return {
          data,
        };
      },
      // dispatchActions: payload => {
      //   const actions = [];
      //   const eventHistory = pathOr([], ["response", "body"], payload);
      //   const data = eventHistory;
      //   return getLikesShareComment(data, actions);
      // },
      failureAction: actions.getEventHistoryFailure,
      toggleLoader: false,
    },
    [actions.getGroupPostStats]: {
      successAction: actions.getGroupPostStatsSuccess,
      postSuccessHook: payload => {
        const allCount = pathOr([], ["response", "body"], payload);
        const id = pathOr("", ["actionPayload", "id"], payload);
        return {
          likeCommentObj: {
            allCount,
            id,
          },
        };
      },
      failureAction: actions.getGroupPostStatsFailure,
      toggleLoader: false,
    },
    [actions.startWebinarOrVideoCall]: {
      successAction: actions.startWebinarOrVideoCallSuccess,
      failureAction: actions.startWebinarOrVideoCallFailure,
      postSuccessHook: payload => {
        const callDetails = pathOr([], ["response", "body"], payload);
        return {
          callDetails,
        };
      },
      dispatchActions: payload => {
        const screenId = pathOr("", ["actionPayload", "screenId"], payload);
        const actions = [];

        actions.push({
          type: "GO_TO_SCREEN",
          navigateTo: screenId,
        });

        return actions;
      },
      failureHook: () => {
        FailureAlert(
          metaFinderCommunityEventLanding("pulseTvFacingSomeInconvinence")
        );
        return null;
      },
      toggleLoader: false,
    },
    [actions.getVideoUrl]: {
      successAction: actions.getVideoUrlSuccess,
      postSuccessHook: payload => {
        const response = pathOr(
          "",
          ["response", "body", "0", "attributes"],
          payload
        );
        const isVideoAvailable = response.hasOwnProperty("videoPlaybackURL");
        if (!isVideoAvailable) {
          FailureAlert(
            metaFinderCommunityEventLanding("pulseTvVideoNotAvailable")
          );
          return null;
        }
        return {
          response,
        };
      },
      failureAction: actions.getVideoUrlFailure,
      toggleLoader: false,
      failureHook: () => {
        FailureAlert(metaFinderCommunityEventLanding("pulseTvCannotPlayThisVideo"));
        return null;
      },
    },
    [actions.endChatSession]: {
      successAction: actions.endChatSessionSuccess,
      failureAction: actions.endChatSessionFailure,
    },
  },
  [screens.CREATE_COMMUNITY_EVENT]: {
    [actions.createCommunityEvent]: {
      successAction: actions.createCommunityEventSuccess,
      failureAction: actions.createCommunityEventFailure,
      toggleLoader: false,
      successHandler: (action, store) => {
        CustomAlert.show(
          "",
          metaFinderCommunityEventLanding("pulseTvEventCreatedSuccessfully"),
          {
            positiveText: "OK",
            onPositivePress: () => {
              store.dispatch({
                type: CoreActionTypes.GO_TO_SCREEN,
                navigateTo: screens.EVENT_INVITE,
              });
            },
            modalConfig: {
              onBackButtonPress: () => null,
              onBackdropPress: () => null,
            },
          }
        );
      },
    },
    [actions.updateCommunityEvent]: {
      successAction: actions.updateCommunityEventSuccess,
      failureAction: actions.updateCommunityEventFailure,
      successHandler: (action, store) => {
        CustomAlert.show(
          "",
          metaFinderCommunityEventLanding("pulseTvEventSuccessfullyModified"),
          {
            positiveText: "OK",
            onPositivePress: () => {
              store.dispatch({
                context: screens.PULSE_TV_EVENT_MANAGER,
                type: actions.getCustomerGroupsForEventMgr,
              });
              store.dispatch({
                type: CoreActionTypes.GO_TO_SCREEN,
                navigateTo: screens.PULSE_TV_EVENT_MANAGER,
              });
            },
            modalConfig: {
              onBackButtonPress: () => null,
              onBackdropPress: () => null,
            },
          }
        );
      },
      toggleLoader: false,
    },
  },
  [screens.EVENT_INVITE]: {
    [actions.getCustomerByEmail]: {
      successAction: actions.getCustomerByEmailSuccess,
      postSuccessHook: payload => {
        const responseBody = payload.response.body;

        if (!responseBody) {
          FailureAlert(
            metaFinderCommunityEventLanding("pulseTvUserNotFoundEmailMobile") 
          );
          return null;
        }
        return responseBody;
      },
      successHandler: (action, store) => {
        const body = action.payload?.response?.body;
        const payload = action.payload?.actionPayload;
        const isEditEvent = store.getState()?.communityEvents.isEditEvent;
        if (body && payload?.hostName) {
          setTimeout(() => {
            store.dispatch({
              type: CoreActionTypes.TOGGLE_LOADER,
              value: true,
            });
          }, 5);
          store.dispatch({
            context: screens.CREATE_COMMUNITY_EVENT,
            type: isEditEvent
              ? actions.updateCommunityEvent
              : actions.createCommunityEvent,
            payload,
          });
        }
      },
      failureAction: actions.getCustomerByEmailFailure,
      toggleLoader: false,
    },
    [actions.searchGroupMember]: {
      successAction: actions.searchGroupMemberSuccess,
      postSuccessHook: payload => {
        const responseBody = payload.response.body;

        if (!responseBody) {
          FailureAlert(metaFinderCommunityEventLanding("pulseTvUserNotFound"));
          return null;
        }
        return responseBody;
      },
      successHandler: (action, store) => {
        const body = action.payload?.response?.body;
        const payload = action.payload?.actionPayload;
        if (body) {
          store.dispatch({
            context: screens.EVENT_INVITE,
            type: actions.addGroupMember,
            payload,
          });
        }
      },
      failureAction: actions.searchGroupMemberFailure,
      toggleLoader: false,
    },

    [actions.addGroupMember]: {
      successAction: actions.addGroupMemberSuccess,
      failureAction: actions.addGroupMemberFailure,
      toggleLoader: false,
      successHandler: (action, store) => {},
    },
    [actions.joinGroup]: {
      successAction: actions.joinGroupSuccess,
      failureAction: actions.joinGroupFailure,
      toggleLoader: true,
      successHandler: (action, store) => {
        const journey = store.getState()?.communityEvents?.currentJourney;

        if (journey === "EVENT_MANAGER") {
          store.dispatch({
            context: screens.PULSE_TV_EVENT_MANAGER,
            type: actions.getCustomerGroupsForEventMgr,
          });
          store.dispatch({
            type: "GO_TO_SCREEN",
            navigateTo: screens.PULSE_TV_EVENT_MANAGER,
          });
        } else {
          store.dispatch({
            context: screens.COMMUNITY_EVENT_LANDING,
            type: actions.getCustomerGroups,
            payload: {
              isAllEvents: true,
            },
          });
          store.dispatch({
            type: "GO_TO_SCREEN",
            navigateTo: screens.COMMUNITY_EVENT_LANDING,
          });
        }
      },
    },
    [actions.createGroupMembers]: {
      successAction: actions.createGroupMembersSuccess,
      failureAction: actions.createGroupMembersFailure,
      toggleLoader: true,
      successHandler: (action, store) => {
        const journey = store.getState()?.communityEvents?.currentJourney;

        if (journey === "EVENT_MANAGER") {
          store.dispatch({
            context: screens.PULSE_TV_EVENT_MANAGER,
            type: actions.getCustomerGroupsForEventMgr,
          });
          store.dispatch({
            type: "GO_TO_SCREEN",
            navigateTo: screens.PULSE_TV_EVENT_MANAGER,
          });
        } else {
          store.dispatch({
            context: screens.COMMUNITY_EVENT_LANDING,
            type: actions.getCustomerGroups,
            payload: {
              isAllEvents: true,
            },
          });
          store.dispatch({
            type: "GO_TO_SCREEN",
            navigateTo: screens.COMMUNITY_EVENT_LANDING,
          });
        }
      },
    },
    [actions.leaveGroupMember]: {
      successAction: actions.leaveGroupMemberSuccess,
      failureAction: actions.leaveGroupMemberFailure,
      toggleLoader: false,
    },
    [actions.getGroupMembers]: {
      successAction: actions.getGroupMembersSuccess,
      failureAction: actions.getGroupMembersFailure,
      toggleLoader: false,
      postSuccessHook: payload => {
        return payload.response;
      },
    },
    [actions.getProfilePic]: {
      successAction: actions.getProfilePicSuccess,
      failureAction: actions.getProfilePicFailure,
      postSuccessHook: payload => {
        return {
          type: pathOr("", ["actionPayload", "type"], payload),
          docId: pathOr("", ["response", "body", "id"], payload),
          content: pathOr("", ["response", "body"], payload),
        };
      },
      toggleLoader: false,
    },
  },
  [screens.PULSE_TV_EVENT_MANAGER]: {
    [actions.getCustomerGroupsForEventMgr]: {
      successAction: actions.getCustomerGroupsForEventMgrSuccess,
      failureAction: actions.getCustomerGroupsForEventMgrFailure,
      toggleLoader: false,
    },
    [actions.deleteEvent]: {
      successAction: actions.deleteEventSuccess,
      failureAction: actions.deleteEventFailure,
      toggleLoader: true,
      successHandler: (action, store) => {
        store.dispatch({
          context: screens.PULSE_TV_EVENT_MANAGER,
          type: actions.getCustomerGroupsForEventMgr,
        });
      },
    },
  },
};

/* eslint-disable complexity */
import actions from "./config/actions";
import { pathOr } from "ramda";
import moment from "moment";

const INITIAL_STATE = {
  group: null,
  hostEmail: null,
  communityEventsData: [],
  contacts: [],
  myEvents: [],
  eventHistory: [],
  formattedEventHistory: [],
  filteredAllEvent: [],
  webinarCall: [],
  joinWebinarCall: [],
  groupId: "",
  isInitiator: false,
  nextPage: true,
  pulseTvVideoCall: "",
  pulseTvIncomingCall: false,
  webinarTokens: [],
  isEditEvent: null,
  editEventMembers: [],
  videoStarted: false,
  videoUrl: "",
};

const PAGINATION_SIZE = 20;

const filterJoinedEventFromAllEvent = (filteredAllEvent, groupId) => {
  if (groupId) {
    return filteredAllEvent.filter(item => item.id !== groupId);
  }
  return filteredAllEvent;
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
    customerNumber: contactObj.id,
    email: email ? email.value : "",
    dob: "",
    phoneNumber: phone ? phone.value : "",
    id: contactObj.id,
    documentId: docId,
  };
};

const mapLikeCountToEvents = (logs, Id, obj) => {
  const response = logs.map(i => {
    i.data.map(j => {
      if (j.id === Id) {
        j.likeCommentObj = obj;
      }
      return j;
    });
    return i;
  });
  return response;
};
const changeStatusForEvent = (event, webinarToken) => {
  const response = event.map(i => {
    webinarToken.map(j => {
      if (i.id === j.groupId) {
        i.status = "STARTED";
        i.webinarCall = j;
      }
      return j;
    });
    return i;
  });
  return response;
};

const changeStatusForEventSingle = (event, webinarToken) => {
  if (event && webinarToken) {
    const response = event.map(i => {
      if (i.id === webinarToken.groupId) {
        i.status = "STARTED";
        i.webinarCall = webinarToken;
      }
      return i;
    });
    return response;
  }
};
const clearEventToken = (event, id) => {
  if (id) {
    const response = event.map(i => {
      if (i.id === id) {
        i.webinarCall = "";
      }
      return i;
    });
    return response;
  }
  return event;
};

const parseEventHistory = (eventHistory, data) => {
  const history = [...eventHistory, ...data];

  const reducer = (acc, cur) => {
    const item = acc.find(
      x =>
        new Date(x.date).toDateString() ===
        new Date(cur.groupActivity.startTime).toDateString()
    );
    if (item) {
      item.data.push(cur);
    } else {
      acc.push({
        date: cur.groupActivity.startTime,
        data: [cur],
      });
    }
    return acc;
  };
  return {
    eventHistory: history,
    formattedEventHistory: history
      .reduce(reducer, [])
      .sort((x, y) => moment(y.date) - moment(x.date)),
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.createCommunityEventSuccess: {
      return {
        ...state,
        group: action.payload?.response?.body,
        hostEmail: action.payload?.actionPayload?.hostName,
      };
    }
    case actions.createCommunityEventFailure: {
      return {
        ...state,
        group: null,
        hostEmail: null,
      };
    }
    case actions.updateCommunityEventSuccess: {
      return {
        ...state,
        hostEmail: action.payload?.actionPayload?.hostName,
      };
    }
    case actions.updateCommunityEventFailure: {
      return {
        ...state,
        hostEmail: null,
      };
    }
    case actions.getCommunityEventsSuccess: {
      const listOfEvents = pathOr([], ["response", "body"], action.payload);

      const filteredAllEvent = listOfEvents.filter(
        myEvent => !state.myEvents.some(event => event.id == myEvent.id)
      );

      return {
        ...state,
        communityEventsData: [...state.communityEventsData, ...listOfEvents],
        filteredAllEvent: [...state.filteredAllEvent, ...filteredAllEvent],
        nextPage: listOfEvents?.length >= PAGINATION_SIZE,
      };
    }
    case actions.getCommunityEventsFailure: {
      return {
        ...state,
        nextPage: false,
      };
    }
    case actions.resetAllCommunityEvents: {
      return {
        ...state,
        communityEventsData: [],
        filteredAllEvent: [],
        nextPage: true,
        eventHistory: [],
        formattedEventHistory: [],
      };
    }
    case actions.getCustomerGroupsSuccess: {
      let listOfEvents = pathOr([], ["response", "body"], action.payload);

      if (state.webinarTokens.length > 0) {
        listOfEvents = changeStatusForEvent(listOfEvents, state.webinarTokens);
      }
      return {
        ...state,
        myEvents: listOfEvents,
      };
    }
    case actions.getCustomerGroupsFailure: {
      return {
        ...state,
      };
    }
    case actions.getCustomerByEmailSuccess: {
      const responseBody = action.payload;

      if (responseBody[0]) {
        return {
          ...state,
          profilePictureId: pathOr("", ["documents", 0, "id"], responseBody[0]),
          contacts: [...state.contacts, getContactObject(responseBody)],
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
    case actions.clearEmailDetails: {
      return {
        ...state,
        contacts: [],
      };
    }
    case actions.createGroupMembersSuccess: {
      const groupId = action.payload?.actionPayload?.groupId;

      return {
        ...state,
        filteredAllEvent: filterJoinedEventFromAllEvent(
          state.filteredAllEvent,
          groupId
        ),
      };
    }
    case actions.createGroupMembersFailure: {
      return {
        ...state,
      };
    }
    case actions.joinGroupSuccess: {
      const groupId = action.payload?.actionPayload?.groupId;

      return {
        ...state,
        filteredAllEvent: filterJoinedEventFromAllEvent(
          state.filteredAllEvent,
          groupId
        ),
      };
    }
    case actions.joinGroupFailure: {
      return {
        ...state,
      };
    }
    case actions.removeParticularContact: {
      return {
        ...state,
        contacts: state.contacts.filter(
          item => item.email != action.payload.email
        ),
      };
    }
    case actions.getEventHistorySuccess: {
      const data = pathOr([], ["data"], action.payload);

      const parsedData = parseEventHistory(state.eventHistory, data);
      return {
        ...state,
        eventHistory: parsedData.eventHistory,
        formattedEventHistory: parsedData.formattedEventHistory,
        nextPage: data?.length >= 5, //For event history it is 6 to avoid multiple calls to fetch likes and comments
      };
    }
    case actions.getEventHistoryFailure: {
      return {
        ...state,
        nextPage: false,
      };
    }
    case actions.getGroupPostStatsSuccess: {
      const likeCommentObj = pathOr(
        [],
        ["likeCommentObj", "allCount"],
        action.payload
      );
      const id = pathOr("", ["likeCommentObj", "id"], action.payload);
      return {
        ...state,
        eventHistory: mapLikeCountToEvents(
          state.eventHistory,
          id,
          likeCommentObj
        ),
      };
    }
    case actions.getGroupPostStatsFailure: {
      return {
        ...state,
      };
    }
    case actions.startWebinarOrVideoCallSuccess: {
      return {
        ...state,
        isInitiator: true,
        webinarCall: action.payload.callDetails,
      };
    }
    case actions.startWebinarOrVideoCallFailure: {
      return {
        ...state,
        isInitiator: false,
        webinarCall: [],
      };
    }
    case actions.joinWebinar: {
      const listOfEvents = changeStatusForEventSingle(
        state.myEvents,
        action.payload
      );

      return {
        ...state,
        webinarTokens: [action.payload],
        myEvents: listOfEvents,
      };
    }
    case actions.getCustomerGroupsForEventMgrSuccess: {
      const listOfEvents = pathOr([], ["response", "body"], action.payload);

      return {
        ...state,
        eventsForEventMgr: listOfEvents,
      };
    }
    case actions.getCustomerGroupsForEventMgrFailure: {
      return {
        ...state,
      };
    }
    case actions.setCurrentJourney: {
      return {
        ...state,
        currentJourney: action.payload.journey,
      };
    }
    case actions.emptyCallDetails: {
      return {
        ...state,
        pulseTvVideoCall: {},
        pulseTvIncomingCall: false,
        isInitiator: false,
      };
    }
    case actions.saveWebinarId: {
      return {
        ...state,
        webinarId: action.payload.id,
      };
    }
    case actions.emptyWebinarDetails: {
      return {
        ...state,
        pulseTvVideoCall: {},
        pulseTvIncomingCall: false,
        isInitiator: false,
        webinarCall: clearEventToken(state.myEvents, state.webinarId),
      };
    }
    case actions.enableIncomingCall: {
      return {
        ...state,
        pulseTvIncomingCall: true,
        webinarCall: action.payload,
        // pulseTvVideoCallWith: action.payload.payload.callerEmail,
      };
    }
    case actions.disableIncomingCall: {
      return {
        ...state,
        pulseTvIncomingCall: false,
      };
    }
    case actions.setEditEvent: {
      return {
        ...state,
        isEditEvent: action.payload?.isEditEvent,
      };
    }
    case actions.getGroupMembersSuccess: {
      const eventMembers = action.payload?.body ? action.payload?.body : [];
      return {
        ...state,
        editEventMembers: [...eventMembers],
      };
    }
    case actions.resetEditEventMembers: {
      return {
        ...state,
        editEventMembers: [],
      };
    }
    case actions.getGroupMembersFailure: {
      return {
        ...state,
        editEventMembers: [],
      };
    }

    case actions.searchGroupMemberSuccess: {
      const response = pathOr(null, "0", action.payload);
      const member = response
        ? [
            {
              customer: response,
            },
          ]
        : [];
      return {
        ...state,
        editEventMembers: [...state.editEventMembers, ...member],
      };
    }
    case actions.leaveGroupMemberSuccess: {
      const email = action.payload?.actionPayload?.email;
      return {
        ...state,
        editEventMembers: state.editEventMembers.filter(
          item => item?.customer?.contactDetails?.email?.value !== email
        ),
      };
    }
    case actions.getVideoUrlSuccess: {
      const url = pathOr("", ["response", "videoPlaybackURL"], action.payload);
      return {
        ...state,
        videoStarted: url ? true : false,
        videoUrl: url,
      };
    }
    case actions.getVideoUrlFailure: {
      return {
        ...state,
        videoStarted: false,
        videoUrl: "",
      };
    }
    case actions.closeModal: {
      return {
        ...state,
        videoStarted: false,
        videoUrl: "",
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
    default:
      return state;
  }
};

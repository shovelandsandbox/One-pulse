import screens from "../config/screens";
import actions from "../config/actions";
import moment from "moment";
import { buildPayload } from "../../../utils/apiUtils";
import { pathOr } from "ramda";

const realm = "chat";

const getCommunityEventsPayload = () => {
  return {
    filter: {
      logicalExpression: {
        op: "AND",
        expressions: [
          {
            op: "EQ",
            lhs: ["classification"],
            value: {
              value: "Live TV broadcast",
            },
          },
          {
            op: "GT",
            lhs: ["groupActivity.endTime"],
            value: {
              value: moment.utc().format("YYYY-MM-DDTHH:mm:ss"),
            },
          },
          {
            op: "EQ",
            lhs: ["status"],
            value: {
              value: "UPCOMING",
            },
          },
          {
            op: "EQ",
            lhs: ["groupActivity.criteria.eventClassification"],
            value: {
              value: "public",
            },
          },
        ],
      },
    },
    orderBy: [
      {
        prop: "groupActivity.startTime",
        order: "DESC",
      },
    ],
  };
};
const getEventHistory = () => {
  return {
    filter: {
      logicalExpression: {
        op: "AND",
        expressions: [
          {
            op: "EQ",
            lhs: ["classification"],
            value: {
              value: "Live TV broadcast",
            },
          },
          {
            op: "LT",
            lhs: ["groupActivity.endTime"],
            value: {
              value: moment.utc().format("YYYY-MM-DDTHH:mm:ss"),
            },
          },
        ],
      },
    },
    orderBy: [
      {
        prop: "groupActivity.startTime",
        order: "DESC",
      },
    ],
  };
};

const getVideoUrl = groupId => {
  return {
    filter: {
      logicalExpression: {
        op: "AND",
        expressions: [
          {
            op: "EQ",
            lhs: ["id"],
            value: {
              value: groupId,
            },
          },
        ],
      },
    },
  };
};
export default {
  [screens.COMMUNITY_EVENT_LANDING]: {
    [actions.updateLikeDislike]: {
      payloadBuilder: (store, action) => {
        const group = pathOr({}, ["payload", "group"], action);
        const type = pathOr("", ["payload", "type"], action);
        //const parent = pathOr(undefined, ["payload", "parent"], action);
        //const id = pathOr("", ["id"], parent);
        const body = {
          group: {
            id: group,
          },
          type,
        };

        return buildPayload(store, "createGroupPost", null, body, null);
      },
      loader: false,
    },
    [actions.createComment]: {
      payloadBuilder: (store, action) => {
        const group = pathOr({}, ["payload", "group"], action);
        const type = pathOr("COMMENT", ["payload", "type"], action);
        const message = pathOr(null, ["payload", "message"], action);
        const parent = pathOr(undefined, ["payload", "parent"], action);
        const body = {
          group: {
            id: group,
          },
          type,
          message,
          parent,
        };
        return buildPayload(store, "createGroupPost", null, body, null);
      },
      loader: true,
    },
    [actions.getCommunityEvents]: {
      payloadBuilder: (store, action) => {
        const params = {
          page: action.payload?.pageNo || 0,
          pageSize: action.payload?.pageSize || 20,
        };

        const body = getCommunityEventsPayload();

        return buildPayload(store, "findGroupByCriteria", null, body, params);
      },
      loader: false,
    },
    [actions.getEventHistory]: {
      payloadBuilder: (store, action) => {
        const params = {
          page: action.payload?.pageNo || 0,
          pageSize: action.payload?.pageSize || 5,
        };
        const body = getEventHistory();
        return buildPayload(store, "findGroupByCriteria", null, body, params);
      },
      loader: false,
    },
    [actions.getCustomerGroups]: {
      payloadBuilder: store => {
        const params = {
          classification: "Live TV broadcast",
          status: "UPCOMING",
        };
        return buildPayload(store, "getAllCustomerGroup", null, null, params);
      },
      loader: true,
    },
    [actions.groupStatusUpdate]: {
      payloadBuilder: (store, action) => {
        const body = {
          status: action.payload?.status,
        };
        const params = {
          id: action.payload?.groupId,
        };
        return buildPayload(store, "updateGroup", null, body, params);
      },
      loader: false,
    },
    [actions.getGroupPostStats]: {
      payloadBuilder: (store, action) => {
        const id = pathOr("", ["payload", "id"], action);
        const params = {
          id,
        };
        return buildPayload(store, "getGroupPostStats", null, null, params);
      },
      loader: false,
    },
    [actions.startWebinarOrVideoCall]: {
      payloadBuilder: (store, action) => {
        const groupId = pathOr("", ["payload", "groupId"], action);
        const screenId = pathOr("", ["payload", "screenId"], action);
        const eventName = pathOr("", ["payload", "eventName"], action);

        const params = {
          realm,
          body: {
            group: {
              id: groupId,
            },
            mode: "VIDEO",
            attributes: {
              ringNotification: false,
              notificationTemplateId:
                screenId === "PULSE_TV_VIDEO_CALL"
                  ? "pulseTV"
                  : "pulseTVWebinar",
              screenId: screenId,
              playback: true,
              notificationAttr: {
                eventName,
              },
            },
          },
        };
        return buildPayload(store, "initiateChatSession", null, null, params);
      },
      loader: true,
    },
    [actions.getCustomerGroups]: {
      payloadBuilder: store => {
        const params = {
          classification: "Live TV broadcast",
          status: "UPCOMING",
        };
        return buildPayload(store, "getAllCustomerGroup", null, null, params);
      },
      loader: true,
    },
    [actions.groupStatusUpdate]: {
      payloadBuilder: (store, action) => {
        const body = {
          status: action.payload?.status,
        };
        const params = {
          id: action.payload?.groupId,
        };
        return buildPayload(store, "updateGroup", null, body, params);
      },
      loader: false,
    },
    [actions.getGroupPostStats]: {
      payloadBuilder: (store, action) => {
        const id = pathOr("", ["payload", "id"], action);
        const params = {
          id,
        };
        return buildPayload(store, "getGroupPostStats", null, null, params);
      },
      loader: false,
    },
    [actions.startWebinar]: {
      payloadBuilder: (store, action) => {
        const groupId = pathOr("", ["payload", "groupId"], action);

        const params = {
          realm,
          body: {
            group: {
              id: groupId,
            },
            mode: "VIDEO",
            attributes: {
              ringNotification: false,
              notificationTemplateId: "pulseTV",
            },
          },
        };
        return buildPayload(store, "initiateChatSession", null, null, params);
      },
      loader: true,
    },
    [actions.getVideoUrl]: {
      payloadBuilder: (store, action) => {
        const groupId = pathOr("", ["payload", "groupId"], action);
        const body = getVideoUrl(groupId);

        return buildPayload(store, "findGroupByCriteria", null, body, null);
      },
      loader: true,
    },
    [actions.endChatSession]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const { channelId } = action.payload;
        const params = {
          realm: "chat",
          access_token: state.auth.token,
        };
        const body = {
          channelId,
        };
        return buildPayload(store, "endChatSession", null, body, params);
      },
    },
  },
  [screens.CREATE_COMMUNITY_EVENT]: {
    [actions.createCommunityEvent]: {
      payloadBuilder: (store, action) => {
        const body = {
          ...action.payload,
          status: "UPCOMING",
        };
        return buildPayload(store, "createGroup", null, body, null);
      },
      loader: true,
    },
    [actions.updateCommunityEvent]: {
      payloadBuilder: (store, action) => {
        const event = store.getState()?.communityEvents?.isEditEvent;
        const body = {
          ...action.payload,
        };
        return buildPayload(store, "updateGroup", null, body, {
          id: event?.id,
        });
      },
      loader: true,
    },
  },
  [screens.EVENT_INVITE]: {
    [actions.getCustomerByEmail]: {
      payloadBuilder: (store, action) => {
        const { email, hostName } = action.payload;
        const body = {
          projs: ["firstName", "id", "surName", "documents", "contactDetails"],
          filter: {
            simpleExpression: {
              op: "EQ",
              lhs: ["emailId"],
              value: {
                value: email || hostName,
              },
            },
            logicalExpression: null,
          },
          limit: null,
          orderBy: null,
        };
        return buildPayload(store, "findCustomersByCriteria", null, body, null);
      },
      loader: true,
    },
    [actions.searchGroupMember]: {
      payloadBuilder: (store, action) => {
        const { email } = action.payload;
        const body = {
          projs: ["firstName", "id", "surName", "documents", "contactDetails"],
          filter: {
            simpleExpression: {
              op: "EQ",
              lhs: ["emailId"],
              value: {
                value: email,
              },
            },
            logicalExpression: null,
          },
          limit: null,
          orderBy: null,
        };
        return buildPayload(store, "findCustomersByCriteria", null, body, null);
      },
      loader: true,
    },
    [actions.addGroupMember]: {
      payloadBuilder: (store, action) => {
        const { email, groupId } = action.payload;

        const body = [
          {
            group: {
              id: groupId,
            },
            customer: {
              contactDetails: {
                email: {
                  channel: "EMAIL",
                  value: email,
                },
              },
            },
          },
        ];
        return buildPayload(store, "createGroupMembers", null, body, {
          id: groupId,
        });
      },
      loader: true,
    },
    [actions.createGroupMembers]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const { contacts, groupId } = action.payload;

        const eventGroupId = groupId || state.communityEvents?.group?.id;

        const body = contacts.map(item => {
          return {
            group: {
              id: eventGroupId,
            },
            customer: {
              contactDetails: {
                email: {
                  channel: "EMAIL",
                  value: item.email,
                },
              },
            },
          };
        });

        return buildPayload(store, "createGroupMembers", null, body, {
          id: eventGroupId,
        });
      },
      loader: true,
    },
    [actions.joinGroup]: {
      payloadBuilder: (store, action) => {
        const { groupId } = action.payload;
        const body = {
          id: groupId,
        };
        return buildPayload(store, "joinGroup", null, body, null);
      },
      loader: true,
    },
    [actions.leaveGroupMember]: {
      payloadBuilder: (store, action) => {
        const email = action.payload?.email;
        const eventId = action.payload?.eventId;
        const body = {
          id: eventId,
          attributes: {
            memberEmail: email,
          },
        };
        return buildPayload(store, "leaveGroup", null, body, null);
      },
      loader: true,
    },
    [actions.getGroupMembers]: {
      payloadBuilder: (store, action) => {
        const groupId = action.payload?.groupId;
        const body = {
          filter: {
            logicalExpression: {
              op: "AND",
              expressions: [
                {
                  op: "EQ",
                  lhs: ["group.id"],
                  value: {
                    value: groupId,
                  },
                },
              ],
            },
          },
        };
        return buildPayload(
          store,
          "findGroupMemberByCriteria",
          null,
          body,
          null
        );
      },
      loader: true,
    },
    [actions.getProfilePic]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const params = {
          id: action.payload.id,
          access_token: state.auth.token,
        };

        return buildPayload(store, "getDocumentById", null, null, params);
      },
      loader: true,
    },
  },
  [screens.PULSE_TV_EVENT_MANAGER]: {
    [actions.getCustomerGroupsForEventMgr]: {
      payloadBuilder: store => {
        const params = {
          classification: "Live TV broadcast",
          status: "UPCOMING",
        };
        return buildPayload(store, "getAllCustomerGroup", null, null, params);
      },
      loader: true,
    },
    [actions.deleteEvent]: {
      payloadBuilder: (store, action) => {
        const body = {
          status: "INACTIVE",
        };
        const params = {
          id: action.payload?.id,
        };
        return buildPayload(store, "updateGroup", null, body, params);
      },
      loader: true,
    },
  },
};

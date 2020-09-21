import screens from "../constants/screenNames";
import actions from "../redux/actionNames";
import { buildPayload } from "../../../utils/apiUtils";
import { pathOr } from "ramda";

const realm = "chat";

export default {
  [screens.CUSTOMER_CONNECT_LANDING]: {
    [actions.getCustomerContacts]: {
      payloadBuilder: (store, action) => {
        const email = store.getState() ?.profile ?.email;
        const body = {
          filter: {
            logicalExpression: {
              op: "AND",
              expressions: [
                {
                  op: "EQ",
                  lhs: ["group.classification"],
                  value: {
                    value: "ContactList",
                  },
                },
                {
                  op: "EQ",
                  lhs: ["group.createdBy.contactDetails.email"],
                  value: {
                    value: email,
                  },
                },
                {
                  op: "EQ",
                  lhs: ["groupMember.status"],
                  value: {
                    value: "ACTIVE",
                  },
                },
              ],
            },
          },
        };
        const params = {
          pageSize: 20,
          page: action.payload.pageNo,
          isRedirect: "true",
        };
        return buildPayload(
          store,
          "findGroupMemberByCriteria",
          null,
          body,
          params
        );
      },
      loader: false,
    },
    [actions.updateCustomersContact]: {
      payloadBuilder: (store, action) => {
        const body = pathOr([], ["payload", "contacts"], action);
        return buildPayload(
          store,
          "updateCustomerContactGroup",
          null,
          body,
          null
        );
      },
      loader: false,
    },
    [actions.getAllParticipants]: {
      payloadBuilder: store => {
        const state = store.getState();
        const userId = state.auth.userId;
        const params = {
          userId,
        };
        return buildPayload(store, "getAllParticipants", null, null, params);
      },
      loader: true,
    },
    [actions.createRoom]: {
      payloadBuilder: (store, action) => {
        const participants = pathOr([], ["payload", "participants"], action);
        const state = store.getState();

        const params = {
          realm,
          body: {
            participants: participants.map(participant => ({
              contactDetails: {
                [`${participant.type}`]: {
                  value: participant.value,
                },
              },
            })),
            mode: "VIDEO",
          },
        };
        return buildPayload(store, "initiateChatSession", null, null, params);
      },
      loader: true,
    },
    [actions.createChatChannel]: {
      payloadBuilder: (store, action) => {
        const participants = pathOr([], ["payload", "participants"], action);

        const params = {
          realm,
          body: {
            group: {
              name: "VideoSaleChat",
            },
            participants: participants.map(participant => ({
              contactDetails: {
                [`${participant.type}`]: {
                  value: participant.value,
                },
              },
            })),
            mode: "TEXT",
          },
        };
        return buildPayload(store, "initiateChatSession", null, null, params);
      },
      loader: true,
    },
    [actions.getCustomerByEmail]: {
      payloadBuilder: (store, action) => {
        const { emailOrMobile, isMobileNo } = action.payload;
        const mobileFilter = {
          simpleExpression: {
            op: "IN",
            lhs: ["contactDetails.phone.`value`"],
            value: {
              value: [emailOrMobile],
            },
          },
        };
        const emailFilter = {
          simpleExpression: {
            op: "EQ",
            lhs: ["emailId"],
            value: {
              value: emailOrMobile,
            },
          },
        };
        const body = {
          projs: ["firstName", "id", "surName", "documents", "contactDetails"],
          filter: isMobileNo ? mobileFilter : emailFilter,
          logicalExpression: null,
          limit: null,
          orderBy: null,
        };
        return buildPayload(store, "findCustomersByCriteria", null, body, null);
      },
      loader: true,
    },
    [actions.fetchCustomerDetails]: {
      payloadBuilder: (store, action) => {
        const { emailOrMobile, isMobileNo } = action.payload;
        const mobileFilter = {
          simpleExpression: {
            op: "IN",
            lhs: ["contactDetails.phone.`value`"],
            value: {
              value: [emailOrMobile],
            },
          },
        };
        const emailFilter = {
          simpleExpression: {
            op: "EQ",
            lhs: ["emailId"],
            value: {
              value: emailOrMobile,
            },
          },
        };
        const body = {
          projs: ["firstName", "id", "surName", "documents", "contactDetails"],
          filter: isMobileNo ? mobileFilter : emailFilter,
          logicalExpression: null,
          limit: null,
          orderBy: null,
        };
        return buildPayload(store, "findCustomersByCriteria", null, body, null);
      },
      loader: true,
    },
    [actions.getCallLogs]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const params = {
          name: "MyContacts",
          access_token: state.auth.token,
          mode: "VIDEOCHAT",
        };
        return buildPayload(
          store,
          "getCustomerConversations",
          null,
          null,
          params
        );
      },
      loader: true,
    },
    [actions.getChatHistory]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const params = {
          name: "MyContacts",
          access_token: state.auth.token,
          mode: "CHAT",
        };
        return buildPayload(
          store,
          "getCustomerConversations",
          null,
          null,
          params
        );
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
    [actions.getAllGroups]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const params = {
          realm: "chat",
          access_token: state.auth.token,
        };

        return buildPayload(store, "getAllCustomerGroup", null, null, params);
      },
      loader: true,
    },
    [actions.uploadDocument]: {
      payloadBuilder: (store, action) => {
        const { fileType, fileName, document } = action.payload;
        const docType = fileType === "pdf" ? "application/pdf" : "image/jpg";
        const body = {
          id: "",
          name: "",
          type: "",
          desc: "",
          comments: "",
          filename: fileName,
          contentType: docType,
          content: document,
          version: "1.0",
          language: "en",
          category: fileType,
        };

        return buildPayload(store, "createDocument", null, body, null);
      },
      loader: true,
    },
    [actions.getDocumentOrProfilePic]: {
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
    [actions.getChatOrCallLogsProfilePic]: {
      payloadBuilder: (store, action) => {
        const params = {
          id: action.payload.id,
        };
        return buildPayload(store, "getDocumentById", null, null, params);
      },
      loader: true,
    },
    [actions.getChatSession]: {
      payloadBuilder: (store, action) => {
        const memberId = action.payload.id || "";
        const textinitiator = action.payload.textinitiator || "";
        const state = store.getState();
        const params = {
          realm: "chat",
          access_token: state.auth.token,
          groupName: "VideoSaleChat",
          mode: "TEXT",
          id: textinitiator,
        };
        if (memberId) {
          params.memberId = memberId;
        }

        return buildPayload(store, "getChatSession", null, null, params);
      },
      loader: true,
    },
    [actions.updateChatSession]: {
      payloadBuilder: (store, action) => {
        const participants = pathOr([], ["payload", "email"], action);
        const roomId = pathOr("", ["payload", "roomId"], action);
        const mode = pathOr("VIDEO", ["payload", "mode"], action);

        const params = {
          id: roomId,
          body: {
            participants: participants.map(participant => ({
              contactDetails: {
                [`${participant.type}`]: {
                  value: participant.value,
                },
              },
            })),
            mode,
          },
        };
        return buildPayload(store, "updateChatSession", null, null, params);
      },
      loader: true,
    },
    [actions.createGroup]: {
      payloadBuilder: (store, action) => {
        const { groupName } = action.payload;
        const body = {
          name: groupName,
          classification: "Text Chat",
          status: "ACTIVE",
        };
        return buildPayload(store, "createGroup", null, body, null);
      },
      loader: true,
    },
    [actions.createGroupMembers]: {
      payloadBuilder: (store, action) => {
        const { contacts, groupId } = action.payload;
        const body = contacts.map(item => {
          return {
            group: {
              id: groupId,
            },
            customer: {
              contactDetails: {
                email: {
                  channel: "EMAIL",
                  value: item.value,
                },
              },
            },
          };
        });

        return buildPayload(store, "createGroupMembers", null, body, {
          id: groupId,
        });
      },
      loader: true,
    },
    [actions.createGroupChat]: {
      payloadBuilder: (store, action) => {
        const groupId = pathOr("", ["payload", "groupId"], action);
        const params = {
          realm,
          body: {
            group: {
              id: groupId,
            },
            mode: "TEXT",
          },
        };
        return buildPayload(store, "initiateChatSession", null, null, params);
      },
      loader: true,
    },
    [actions.getGroupMembers]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const params = {
          name: "MyContacts",
          access_token: state.auth.token,
          mode: "CHAT",
        };
        return buildPayload(
          store,
          "getCustomerConversations",
          null,
          null,
          params
        );
      },
      loader: true,
    },
    [actions.leaveGroupMember]: {
      payloadBuilder: (store, action) => {
        const email = action.payload ?.email;
        const groupId = action.payload ?.groupId;
        const body = {
          id: groupId,
          attributes: {
            memberEmail: email,
          },
        };
        return buildPayload(store, "leaveGroup", null, body, null);
      },
      loader: true,
    },
  },
};

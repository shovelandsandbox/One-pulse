import screens from "../screenNames";
import actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";
import { pathOr } from "ramda";

const realm = "chat";

export default {
  [screens.INITIATE_CALL_SCREEN]: {
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
            participants: participants.map(email => ({
              contactDetails: {
                email: {
                  value: email,
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
                email: {
                  value: participant.email || participant,
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
        const state = store.getState();
        const params = {
          realm: "chat",
          access_token: state.auth.token,
          groupName: "VideoSaleChat",
          mode: "TEXT",
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
        const params = {
          id: roomId,
          body: {
            participants: participants.map(email => ({
              contactDetails: {
                email: {
                  value: email,
                },
              },
            })),
            mode: "VIDEO",
          },
        };
        return buildPayload(store, "updateChatSession", null, null, params);
      },
      loader: true,
    },
  },
};

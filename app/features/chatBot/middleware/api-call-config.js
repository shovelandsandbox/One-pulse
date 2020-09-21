import { path, pathOr } from "ramda";
import { chatbotActions } from "../configs/chatbot-actions";

import { buildPayload } from "../../../utils/apiUtils";

const getRealm = state =>
  "dpas_" +
  pathOr("", ["auth", "countryInfo", "simCountry"], state).toLowerCase();

export default {
  ["ChatBot"]: {
    [chatbotActions.botStartChat]: {
      payloadBuilder: (store, action) => {
        const params = {
          platform: "api",
        };
        return buildPayload(
          store,
          "botStartChat",
          "botStartChat",
          {
            text: path(["payload", "text"], action),
          },
          params
        );
      },
      loader: false,
    },
    [chatbotActions.botSendChat]: {
      payloadBuilder: (store, action) => {
        const params = {
          platform: "api",
          workflowId: path(["payload", "workflowId"], action),
        };
        return buildPayload(
          store,
          "botSendChat",
          "botSendChat",
          {
            text: path(["payload", "text"], action),
          },
          params
        );
      },
      loader: false,
    },
    [chatbotActions.getPremiumInvoice]: {
      payloadBuilder: (store, action) => {
        const params = {
          platform: "api",
          workflowId: path(["payload", "workflowId"], action),
        };
        return buildPayload(
          store,
          "getPremiumInvoice",
          "getPremiumInvoice",
          null,
          params
        );
      },
    },
    [chatbotActions.getResource]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: getRealm(store.getState()),
          id: path(["payload", "id"], action),
        };
        return buildPayload(
          store,
          "getDocumentById",
          "getDocumentById",
          null,
          params
        );
      },
    },
    [chatbotActions.getOcrData]: {
      payloadBuilder: (store, action) => {
        const body = {
          documents: [
            {
              content: path(["payload", "image"], action),
              contentType: "base64Image",
            },
          ],
        };
        const params = {
          countryCode: path(["payload", "countryCode"]),
          realm: path(["payload", "realm"], action),
        };
        return buildPayload(store, "findOCRDocument", null, body, params);
      },
      loader: false,
    },
  },
};

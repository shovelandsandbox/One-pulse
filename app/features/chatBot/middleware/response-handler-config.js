import { chatbotActions } from "../configs/chatbot-actions";
import { failureResponseTransformer } from "../../../utils/apiUtils";
import { pathOr } from "ramda";

export default {
  ["ChatBot"]: {
    [chatbotActions.botStartChat]: {
      successAction: chatbotActions.botStartChatSuccess,
      failureAction: chatbotActions.botStartChatFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [chatbotActions.botSendChat]: {
      successAction: chatbotActions.botSendChatSuccess,
      failureAction: chatbotActions.botSendChatFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [chatbotActions.getPremiumInvoice]: {
      successAction: chatbotActions.getPremiumInvoiceSuccess,
      successHandler: payload => {
        const {
          actionPayload: { id = "", filename = "" },
        } = payload;

        if (filename.endsWith("pdf")) {
          return [
            {
              type: chatbotActions.getResource,
              context: "ChatBot",
              payload: {
                id,
              },
            },
          ];
        }
      },
      failureAction: chatbotActions.getPremiumInvoiceFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [chatbotActions.getResource]: {
      successAction: chatbotActions.getResourceSuccess,
      successHandler: (action, store) => {
        store.dispatch({
          type: "GO_TO_SCREEN",
          navigateTo: "PdfView",
          payload: {
            params: {
              source: {
                uri: "data:application/pdf;base64,".concat(
                  pathOr("", ["payload", "response", "body", "content"], action)
                ),
              },
            },
          },
        });
      },
      failureAction: chatbotActions.getResourceFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [chatbotActions.getOcrData]: {
      successAction: chatbotActions.getOcrDataSuccess,
      failureAction: chatbotActions.getOcrDataFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
};

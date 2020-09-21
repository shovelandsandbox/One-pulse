import { chatbotActions } from "./configs/chatbot-actions";
import { isEmpty, path } from "ramda";

export const INITIAL_STATE = {
  chatState: "start",
  chatBotArray: [],
  ocrData: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case chatbotActions.botStartChatSuccess: {
      const body = path(["payload", "response", "body"], action);
      const chatBotArray = [
        ...state.chatBotArray,
        { ...body[0], firstMessage: true },
      ];
      return {
        ...state,
        workflowId: path(["payload", "response", "workflowId"], action),
        chatBotArray,
        chatState: "send",
        currentResponse: body,
      };
    }
    case chatbotActions.botSendChatSuccess: {
      const body = path(["payload", "response", "body"], action);
      const [first, ...rest] = body;
      let message = [];
      if (!isEmpty(first)) {
        message = [
          {
            ...first,
            firstMessage: true,
          },
        ];
      }
      const chatBotArray = [...state.chatBotArray, ...message, ...rest];
      return {
        ...state,
        chatBotArray,
        currentResponse: body,
      };
    }
    case chatbotActions.resetChatState: {
      return {
        ...state,
        workflowId: undefined,
        chatBotArray: [],
        chatState: "start",
      };
    }
    case chatbotActions.getResourceSuccess: {
      const body = path(["payload", "response", "body"], action);
      const [first, ...rest] = body;
      const message = [
        {
          ...first,
          firstMessage: true,
        },
      ];
      const chatBotArray = [...state.chatBotArray, ...message, ...rest];
      return {
        ...state,
        //chatBotArray,
      };
    }
    case chatbotActions.getOcrDataSuccess: {
      const ocrData = path(["payload", "response", "body"], action);
      //const ocrData = [...state.ocrData, body];
      return {
        ...state,
        ocrData,
      };
    }
    default:
      return state;
  }
};

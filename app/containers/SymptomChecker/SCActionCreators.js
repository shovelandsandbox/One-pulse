import {
  CoreActionTypes,
  CoreConfig,
} from "@pru-rt-internal/pulse-common";

const { pageKeys } = CoreConfig;

export const initBabylonChat = startNewConversation => ({
  context: pageKeys.CHAT_HOME,
  type: CoreActionTypes.INIT_BABYLON_CHAT,
  payload: {
    startConversation: startNewConversation,
  },
});

export const goToSymptomSearch = () => ({
  context: pageKeys.CHAT_HOME,
  type: CoreActionTypes.GO_TO_CHAT_SUGGESTION,
});

export const goToChatHistory = () => ({
  context: pageKeys.CHAT_HOME,
  type: CoreActionTypes.GO_TO_CHAT_HISTORY,
});

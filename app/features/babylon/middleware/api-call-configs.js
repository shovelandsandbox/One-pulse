import { pathOr, forEach, isEmpty, last } from "ramda";
import screens from "../configs/screens";
import actions from "../configs/actions";
import { buildPayload } from "../../../utils/apiUtils";
import moment from "moment";
import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;

const getCurrTime = () => moment.utc().format("YYYY-MM-DDTHH:mm:ss");

const formatChat = ({
  chatMessages = [],
  conversationId,
  searchedSymptom,
  selectedSymptom,
  topic,
  startTime,
  isBot,
  options,
  inputType,
}) => {
  const endTime = getCurrTime();
  const id = conversationId;
  const status = "ACTIVE";
  const mode = "CHAT";
  const source = "babylon";
  const attributes = {
    searched: [searchedSymptom],
    selected: [selectedSymptom],
  };
  if (!isEmpty(chatMessages)) {
    const lastMessage = last(chatMessages);
    const type = lastMessage.type ? lastMessage.type : "HealthAssessment";
    const conversation = {
      endTime,
      id,
      status,
      source,
      isBot,
      mode,
      type,
      ...topic,
      startTime,
      attributes,
    };

    // -- question mapping
    const questionMsgs = chatMessages.filter(m => m.owner === "BOT");
    const mappedQsnValues = questionMsgs.map(m => {
      return { question: { question: pathOr("", ["data", "textMessage"], m) } };
    });
    const lastQsn = mappedQsnValues[mappedQsnValues.length - 1];
    if (lastQsn && lastQsn.question) lastQsn.question.options = options;

    // --- answer mapping
    const answerMsgs = chatMessages.filter(m => m.owner === "USER");
    const answerMap = {};
    let answerType = "TEXT";

    switch (inputType) {
      case "MULTI_OPTION_INPUT":
      case "SINGLE_OPTION_INPUT":
        {
          const mappedValues = answerMsgs.map(m => {
            return { value: pathOr("", ["data", "textMessage"], m) };
          });
          answerMap.selectedOptions = mappedValues;
          answerType = "OPTION";
        }
        break;
      default:
        {
          const answerObject = answerMsgs[0] || {};
          answerMap.text = pathOr("", ["data", "textMessage"], answerObject);
        }
        break;
    }

    const finalAnswerMap = {
      type: answerType,
      answer: answerMap,
    };

    conversation["messages"] = [...mappedQsnValues, finalAnswerMap];
    return conversation;
  }
};

const makeOutcomePayload = (action, state) => {
  return {
    endTime: getCurrTime(),
    id: state.chat.conversationId,
    status: "CLOSED",
    topic: "HealthAssessment",
    source: "babylon",
    mode: "CHAT",
    type: "HA_OUTCOME",
    outcome: {
      attributes: {
        babylonOutcome: action.payload,
      },
    },
  };
};

const makeSCOutcomePayload = (action, state) => {
  return {
    endTime: getCurrTime(),
    id: state.chat.conversationId,
    status: "CLOSED",
    topic: "SymptomChecker",
    source: "babylon",
    mode: "CHAT",
    type: "TRIAGE_OUTCOME",
    outcome: {
      attributes: {
        babylonOutcome: action.payload,
      },
    },
  };
};

export default {
  [screens.babylonChat]: {
    [actions.createUserConversation]: {
      payloadBuilder: (store, action) => {
        const body = formatChat(action.payload);
        return buildPayload(store, "createCustomerConversation", null, body, {
          realm: "babylon",
        });
      },
    },
  },
  // [pageKeys.HEALTH_ASSESSMENT_REPORT]: {
  //   [CoreActionTypes.HEALTH_CATEGORIES_SUCCESS]: {
  //     payloadBuilder: (store, action) => {
  //       const body = makeOutcomePayload(action, store.getState());
  //       return buildPayload(store, "createCustomerConversation", null, body, {
  //         realm: "babylon",
  //       });
  //     },
  //   },
  // },
  [pageKeys.FULL_ASSESSMENT]: {
    [CoreActionTypes.HEALTH_CATEGORIES_SUCCESS]: {
      payloadBuilder: (store, action) => {
        const body = makeOutcomePayload(action, store.getState());
        return buildPayload(store, "createCustomerConversation", null, body, {
          realm: "babylon",
        });
      },
    },
  },
  [pageKeys.CHAT_REPORT]: {
    [CoreActionTypes.TRIAGE_REPORT_RESPONSE_DATA]: {
      payloadBuilder: (store, action) => {
        const body = makeSCOutcomePayload(action, store.getState());
        return buildPayload(store, "createCustomerConversation", null, body, {
          realm: "babylon",
        });
      },
    },
  },
};

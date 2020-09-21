import moment from "moment";
import { Platform } from "react-native";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

const {
  CHAT_MESSAGE_SEND,
  CHAT_SYMPTOM_SEND,
  CHAT_CHANGE_DATE,
  CHAT_PICKED_DATE,
  CHAT_CHANGE_MULTISELECT,
  CLEAR_CHAT_MULTISELECT,
  CHAT_UPDATE_REQUEST_DATA,
  CHAT_UPDATE_RESPONSE_DATA,
  CHAT_BOT_RESPONSE,
  CHAT_BOT_SUGGESTION_RESPONSE,
  CLEAR_SYMPTOM_DATA,
  UPDATE_FLAG,
  CLEAR_CHAT_DATA,
  CHAT_HISTORY_RESPONSE_DATA,
  FROM_CHAT_HISTORY,
  TRIAGE_REPORT_RESPONSE_DATA,
  LOAD_CHAT_HOME_PAGE_STATUS,
  LOAD_I_AMIN_PAGE_FOR_NEW_USER,
  RESET_CHAT_INPUT_TYPE,
  SHOULD_SHOW_TABBAR,
  UPDATE_SELECTED_SUGGESSTION,
  INITIALIZE_DATA,
  CHAT_CHANGE_INPUT_TYPE,
  INIT_CHECK_SYMPTOMS,
  BL_CREATE_CONVERSATION_SUCCESSFUL,
  CLEAR_CREATE_CONVERSATION_STATE,
  GET_SYMPTOM_SUGGESTION,
  CHAT_UPDATE_SYMPTOM_INPUT,
} = CoreActionTypes;
const INITIAL_STATE = {
  responseData: [],
  message: "",
  inputType: "NO_INPUT",
  symptomMessage: "",
  responseSuggestionData: [],
  responseSelectedData: [],
  multiSelectValue: [],
  inputValues: [],
  data: [],
  date: new Date(),
  dateText: "Select Date",
  dateDisabled: true,
  flag: 0,
  showSuggestion: true,
  chatProgress: 0,
  chatHistoryData: [],
  activeRowKey: null,
  chatHistory: false,
  triageReportData: {},
  healthCheckPageLoadStatus: false,
  loadIamInoageForNewUserInHA: false,
  shouldShowTabBar: true,
  lastupdatedIndex: {},
  conversationId: "",
};

/* eslint-disable */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHAT_MESSAGE_SEND:
      return { ...state, message: action.payload };

    case CHAT_SYMPTOM_SEND:
      return { ...state, symptomMessage: action.payload };

    case CHAT_CHANGE_DATE:
      return { ...state, date: action.payload };

    case CHAT_UPDATE_REQUEST_DATA:
      return {
        ...state,
        data: JSON.parse(action.payload),
        responseData: JSON.parse(action.payload),
      };
    case CLEAR_SYMPTOM_DATA:
      return {
        ...state,
        symptomMessage: "",
        responseSuggestionData: [],
        responseSelectedData: [],
      };
    case CLEAR_CHAT_DATA:
      return {
        ...state,
        responseData: [],
        message: "",
        inputType: "NO_INPUT",
        symptomMessage: "",
        responseSuggestionData: [],
        responseSelectedData: [],
        multiSelectValue: [],
        inputValues: [],
        data: [],
        date: new Date(),
        dateText: "Select Date",
        dateDisabled: true,
        flag: 0,
      };
    case CHAT_UPDATE_RESPONSE_DATA: {
      const response = JSON.parse(action.payload);
      return {
        ...state,
        data: JSON.parse(action.payload),
        inputValues: response[response.length - 1].inputValues,
        inputType: response[response.length - 1].inputType,
      };
    }
    case CHAT_BOT_RESPONSE: {
      if(Platform.OS !== "ios") {
        action.payload.chatMessages.map((item,index)=>{
          item.id = item.id.toString() + index.toString();
          return item;
        });
      }

      return {
        ...state,
        message: "",
        responseData: action.payload.chatMessages,
        inputType: action.payload.inputType,
        inputValues: action.payload.inputValues,
        chatProgress: action.payload.chatProgress,
        conversationId: action.payload.conversationId,
      };
    }
    case CHAT_HISTORY_RESPONSE_DATA: {
      const chatHistory = action.payload;
      return {
        ...state,
        chatHistoryData: chatHistory,
      };
    }
    case TRIAGE_REPORT_RESPONSE_DATA: {
      const triageReport = action.payload;
      return {
        ...state,
        triageReportData: triageReport,
      };
    }
    case CHAT_BOT_SUGGESTION_RESPONSE: {
      return {
        ...state,
        // conversationId: action.payload[0].suggestedSymptoms[0].conversationId,
        responseSuggestionData: action.payload,
      };
    }
    case INIT_CHECK_SYMPTOMS:
      return {
        ...state,
        responseSuggestionData:[],
      };
    case BL_CREATE_CONVERSATION_SUCCESSFUL:
      return {
        ...state,
        conversationId: action.payload,
        isNewConversationCreated: true,
      };
    case CLEAR_CREATE_CONVERSATION_STATE:
      return {
        ...state,
        isNewConversationCreated: false,
      };
    case FROM_CHAT_HISTORY: {
      return {
        ...state,
        chatHistory: action.payload,
      };
    }
    case CHAT_PICKED_DATE:
      return {
        ...state,
        date: action.payload,
        dateText: moment(action.payload).format("DD MMM YYYY"),
        dateDisabled: false,
      };
      case CHAT_CHANGE_INPUT_TYPE:{
        return {...state, inputType: action.payload}
      };
    case CHAT_CHANGE_MULTISELECT:
      return { ...state, multiSelectValue: action.payload };
    case CLEAR_CHAT_MULTISELECT:
      return { ...state, multiSelectValue: [] };

    case UPDATE_FLAG:
      return { ...state, flag: action.payload };
    case LOAD_CHAT_HOME_PAGE_STATUS:
      return { ...state, healthCheckPageLoadStatus: action.payload };
    case LOAD_I_AMIN_PAGE_FOR_NEW_USER:
      return { ...state, loadIamInoageForNewUserInHA: action.payload };
    case RESET_CHAT_INPUT_TYPE:
      return { ...state, inputType: "NO_INPUT", inputValues: [], responseData: [] };
    case SHOULD_SHOW_TABBAR:
      return { ...state, shouldShowTabBar: action.value };
    case UPDATE_SELECTED_SUGGESSTION: {
      const selSugg = [];
      selSugg.push(action.payload);
      return { ...state, responseSelectedData: selSugg };
    }
    case GET_SYMPTOM_SUGGESTION: {
      return {
        ...state,
        searchedSymptom: action.payload,
      };
    }
    case CHAT_UPDATE_SYMPTOM_INPUT: {
      return {
        ...state,
        selectedSymptom: action.payload.SymptomInput,
      };
    }
    case INITIALIZE_DATA:
      return INITIAL_STATE;
    
   
    default:
      return state;
  }
};

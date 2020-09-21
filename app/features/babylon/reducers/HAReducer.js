import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

const {
  GETSTARTED,
  NUTRITIONDATA,
  HEALTH_CATEGORIES_SUCCESS,
  HEALTH_CATEGORIES_FAIL,
  HEALTH_FLOW_SUCCESS,
  HEALTH_CONDITION_DETAIL_SUCCESS,
  GET_HEALTH_CATEGORY_DETAIL,
  GET_HEALTH_MOOD_DETAIL,
  GET_HEALTH_ACTIVITY_DETAIL,
  GET_HEALTH_NUTRITION_DETAILS,
  GET_HEALTH_REPORT_RESPONSE,
  GET_HEALTH_ORGAN_RESPONSE,
  HEALTH_CATEGORIES_WITH_DATAMAP,
  GET_MODAL_RESPONSE,
  INITIALIZE_DATA,
  RESET_HEALTH_CONDITION_DETAIL,
  HEALTH_FLOWS_RESET,
  OPEN_HEALTH_CHECK_CONVERSATION,
} = CoreActionTypes;

const INITIAL_STATE = {
  nutritionData: [],
  healthCategories: [],
  healthFlows: [],
  conditionDetails: [],
  healthCategoryDetail: [],
  nutritionDetails: [],
  acivityDetails: [],
  moodDetails: [],
  healthReport: [],
  organDetails: [],
  categoryDetailsWithDatamap: [],
  modalResponse: false,
};

/* eslint-disable */
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETSTARTED:
      return { ...state, getStartedData: action.payload };
    case NUTRITIONDATA:
      return { ...state, nutritionData: action.payload };
    case HEALTH_CATEGORIES_SUCCESS:
      return { ...state, healthCategories: action.payload };
    case HEALTH_CATEGORIES_FAIL:
      return { ...state, healthCategories: action.payload };
    case HEALTH_FLOW_SUCCESS:
      return { ...state, healthFlows: action.payload.response };
    case HEALTH_CONDITION_DETAIL_SUCCESS:
      return { ...state, conditionDetails: action.payload };
    case GET_HEALTH_CATEGORY_DETAIL:
      return { ...state, healthCategoryDetail: action.payload };
    case GET_HEALTH_NUTRITION_DETAILS:
      return { ...state, nutritionDetails: action.payload };
    case GET_HEALTH_ACTIVITY_DETAIL:
      return { ...state, acivityDetails: action.payload };
    case GET_HEALTH_MOOD_DETAIL:
      return { ...state, moodDetails: action.payload };
    case GET_HEALTH_REPORT_RESPONSE:
      return { ...state, healthReport: action.payload };
    case GET_HEALTH_ORGAN_RESPONSE:
      return { ...state, organDetails: action.payload };
    case RESET_HEALTH_CONDITION_DETAIL:
      return { ...state, conditionDetails: [] };
    case HEALTH_CATEGORIES_WITH_DATAMAP:
      return { ...state, categoryDetailsWithDatamap: action.payload };
    case GET_MODAL_RESPONSE:
      return { ...state, modalResponse: action.payload };
    case INITIALIZE_DATA:
      return INITIAL_STATE;
    case HEALTH_FLOWS_RESET:
      return { ...state, healthFlows: [] };
    case OPEN_HEALTH_CHECK_CONVERSATION: {
      return { ...state, currentFlowId: action.payload.flowId};
    }
    default:
      return state;
  }
};

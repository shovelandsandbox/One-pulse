import { screenNames } from "../screenNames";
import {

  GET_CONSULTATION_HISTORY,
  FETCH_CONSULATION_HISTORY_SUCCESS,
  FETCH_CONSULATION_HISTORY_FAILED,

  GET_CONSULTATION_BY_ID,
  FETCH_CONSULATION_DETAILS_BY_ID_SUCCESS,
  FETCH_CONSULATION_DETAILS_BY_ID_FAILED,

  GET_CONVERSATION_MESSAGES,
  GET_CONVERSATION_MESSAGES_SUCCESS,
  GET_CONVERSATION_MESSAGES_FAILURE,
  FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA,
  FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA_SUCCESS,
  FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA_FAILED

} from '../actionNames'


const consultationHistoryApiResponse = {
  [screenNames.CONSULTATION_HISTORY_LIST]: {
    [GET_CONSULTATION_HISTORY]: {
      successAction: FETCH_CONSULATION_HISTORY_SUCCESS,
      postSuccessHook: payload => ({
        result: payload,
      }),
      failureAction: FETCH_CONSULATION_HISTORY_FAILED,
      toggleLoader: false,
    },

    [GET_CONSULTATION_BY_ID]: {
      successAction: FETCH_CONSULATION_DETAILS_BY_ID_SUCCESS,
      postSuccessHook: payload => ({
        result: payload,
      }),
      failureAction: FETCH_CONSULATION_DETAILS_BY_ID_FAILED,
      toggleLoader: false,
    },

    [GET_CONVERSATION_MESSAGES]: {
      successAction: GET_CONVERSATION_MESSAGES_SUCCESS,
      failureAction: GET_CONVERSATION_MESSAGES_FAILURE,
      toggleLoader: false,
    },
    [FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA]: {
      successAction: FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA_SUCCESS,
      failureAction: FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA_FAILED,
      postSuccessHook: (payload, state) => {
        return payload;
      },
      successHandler: (payload, state) => { },
      failureHook: (payload, state) => { },
      toggleLoader: false,
    },
  },
}

export default consultationHistoryApiResponse
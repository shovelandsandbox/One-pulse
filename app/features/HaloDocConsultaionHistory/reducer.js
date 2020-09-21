/* eslint-disable */
import {
    FETCH_CONSULATION_HISTORY_SUCCESS,
    FETCH_CONSULATION_HISTORY_FAILED,
    FETCH_CONSULATION_DETAIL_BY_ID_SUCCESS,
    FETCH_CONSULATION_DETAIL_BY_ID_FAILED,
    RESET_CONSULATION_DETAIL_DATA,
    FETCH_CONSULATION_LETTER_PRESCRIPTIOM_SUCCESS,
    FETCH_CONSULATION_LETTER_PRESCRIPTIOM_FAILED,
    FETCH_CONSULATION_DETAILS_BY_ID_SUCCESS,
    FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA_SUCCESS,
    FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA_FAILED,
    LOGOUT_DONE,
    RESET_CONSULTATION_STATUS,
    RESET_HALO_DOC_PROFILE
} from "./configs/actionNames";

import { REHYDRATE } from "redux-persist";
import { path, forEach, map } from "ramda";

const initialState = {
    historyList: [],
    consulationDetail: {},
    consulationImage: "",
    haloDocProfile: [],
};

const ConsulationHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case REHYDRATE: {
            return state;
        }
        case FETCH_CONSULATION_HISTORY_SUCCESS: {
            return { ...state, historyList: action.payload.result.response.body };
        }
        case FETCH_CONSULATION_HISTORY_FAILED: {
            return { ...state, historyList: [] };
        }

        case FETCH_CONSULATION_DETAILS_BY_ID_SUCCESS: {
            const data = action.payload.result.response.body;
            let historyList = state.historyList;
            historyList = map((history) => {
                return {
                    ...history,
                    hasDetailsFetched:
                        history.id === data.id ? true : history.hasDetailsFetched || false,
                    prescription:
                        history.id === data.id
                            ? data.prescription || null
                            : history.prescription || null
                }
            }, historyList)

            return { ...state, historyList: historyList };
        }

        case FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA_SUCCESS:
           
            let currentDocumentsList = state.haloDocProfile;
            const fileType = path(["actionPayload", "type"], action.payload);
           
            let documents = map((itrDocument) => {
                itrDocument.type = fileType
                return itrDocument;
            }, action.payload.response.body)
            return {
                ...state,
                haloDocProfile: [
                    ...currentDocumentsList,
                    ...documents
                ],
                isHaloDocProfileError: false
            };
        case FETCH_CONSULTATION_DOCUMENTS_BY_CRITERIA_FAILED:
            return {
                ...state,
            };

        case RESET_HALO_DOC_PROFILE: {
            return { ...state, haloDocProfile: [], isHaloDocProfileError: false };
        }

        case FETCH_CONSULATION_DETAIL_BY_ID_SUCCESS: {
            return { ...state, consulationDetail: action.payload.body };
        }
        case FETCH_CONSULATION_DETAIL_BY_ID_FAILED: {
            return { ...state, consulationDetail: {} };
        }
        case RESET_CONSULATION_DETAIL_DATA: {
            return { ...state, consulationDetail: {} };
        }

        case FETCH_CONSULATION_LETTER_PRESCRIPTIOM_SUCCESS:
            return {
                ...state,
                consulationImage: action.payload.body
            };
        case FETCH_CONSULATION_LETTER_PRESCRIPTIOM_FAILED:
            return {
                ...state,
                consulationImage: ""
            };
        case LOGOUT_DONE:
            return {
                ...state,
                consulationImage: ""
            };

        case RESET_CONSULTATION_STATUS:
            return {
                ...state,
                historyList: []
            };

        default:
            return state;
    }
};

export default ConsulationHistoryReducer;

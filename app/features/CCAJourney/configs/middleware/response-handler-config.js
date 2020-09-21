import { screenNames } from "../screenNames";
import * as CcaActions from "../actionNames";
import { path } from "ramda";

const ccaApiResponse = {
    [screenNames.CCA_JOURNEY]: {
        [CcaActions.GET_ASSESSMENT_STATUS_AND_HISTORY]: {
            successAction: CcaActions.GET_ASSESSMENT_STATUS_AND_HISTORY_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response.body;
            },
            failureAction: CcaActions.GET_ASSESSMENT_STATUS_AND_HISTORY_FAILURE,
            failureHook: payload => {
                return {
                    errorMsg: payload.response.status.message,
                    errorCode: payload.response.status.code,
                };
            },
            toggleLoader: false,
        },
    },

    [screenNames.BASIC_INFORMATION]: {
        [CcaActions.GET_BASIC_INFORMATION]: {
            successAction: CcaActions.GET_BASIC_INFORMATION_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response;
            },
            failureAction: CcaActions.GET_BASIC_INFORMATION_FAILURE,
            failureHook: payload => {
                return {
                    errorMsg: payload.response.status.message,
                    errorCode: payload.response.status.code,
                };
            },
            toggleLoader: false,
        },

        [CcaActions.SAVE_BASIC_INFORMATION]: {
            successAction: CcaActions.SAVE_BASIC_INFORMATION_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response.body;
            },
            failureAction: CcaActions.SAVE_BASIC_INFORMATION_FAILURE,
            failureHook: payload => {
                return {
                    errorMsg: payload.response.status.message,
                    errorCode: payload.response.status.code,
                };
            },
            toggleLoader: false,
        },
    },

    [screenNames.QUESTION_SCREEN]: {
        [CcaActions.UPDATE_ASSESSMENT]: {
            successAction: CcaActions.UPDATE_ASSESSMENT_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response.body;
            },
            dispatchActions: (payload, state) => {
                if (path(["response", "status", "shortCode"], payload) === "0010") {
                    return [
                        {
                            context: screenNames.QUESTION_SCREEN,
                            type: CcaActions.ASSESSMENT_COMPLETE,
                        },
                    ];
                }
                else return []
            },
            failureAction: CcaActions.UPDATE_ASSESSMENT_FAILURE,
            failureHook: payload => {
                return {
                    errorMsg: payload.response.status.message,
                    errorCode: payload.response.status.code,
                };
            },
            toggleLoader: false,
        },
    },

    [screenNames.CONTINUE_ASSESSMENT]: {
        [CcaActions.ABORT_ASSESSMENT]: {
            successAction: CcaActions.ABORT_ASSESSMENT_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response.body;
            },
            failureAction: CcaActions.ABORT_ASSESSMENT_FAILURE,
            failureHook: payload => {
                return {
                    errorMsg: payload.response.status.message,
                    errorCode: payload.response.status.code,
                };
            },
            toggleLoader: false,
        },
    },

    [screenNames.ASSESSMENT_RESULT]: {
        [CcaActions.GET_ASSESSMENT_RESULT]: {
            successAction: CcaActions.GET_ASSESSMENT_RESULT_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response.body;
            },
            failureAction: CcaActions.GET_ASSESSMENT_RESULT_FAILURE,
            failureHook: payload => {
                return {
                    errorMsg: payload.response.status.message,
                    errorCode: payload.response.status.code,
                };
            },
            toggleLoader: false,
        },
    },

    [screenNames.ASSESSMENT_DETAIL]: {
        [CcaActions.GET_ASSESSMENT_DETAIL]: {
            successAction: CcaActions.GET_ASSESSMENT_DETAIL_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response.body;
            },
            failureAction: CcaActions.GET_ASSESSMENT_DETAIL_FAILURE,
            failureHook: payload => {
                return {
                    errorMsg: payload.response.status.message,
                    errorCode: payload.response.status.code,
                };
            },
            toggleLoader: false,
        },
    },
}

export default ccaApiResponse
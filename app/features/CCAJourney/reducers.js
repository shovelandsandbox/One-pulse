import * as CcaActions from './configs/actionNames';
import moment from "moment";
import { pathOr } from "ramda";

const INITIAL_STATE = {
    isAssessStarted: false,
    isAssessCompleted: false,
    isAssessAborted: false,
    isResultLoading: false,
    isResultAvailable: false,
    assessmentStatus: {},
    basicInformation: {},
    assessmentQuestion: {},
    assessmentResult: {},
    assessmentDetail: [],
    assessmentHistory: [],
};

const ccaReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CcaActions.GET_ASSESSMENT_STATUS_AND_HISTORY:
            return {
                ...state,
            };
        case CcaActions.GET_ASSESSMENT_STATUS_AND_HISTORY_SUCCESS:

            const assessStatus = {}
            assessStatus["inProgress"] = action.payload.inProgress;
            assessStatus["answeredQuestion"] = action.payload.answeredQuestion;
            assessStatus["fillTimes"] = action.payload.fillTimes;
            assessStatus["recordId"] = action.payload.recordId && action.payload.recordId.trim() !== ""
                ? action.payload.recordId : "";

            const assessments = action.payload.assessments ? action.payload.assessments : null

            const assessHistory = assessments && assessments !== null
                && Object.keys(assessments).length !== 0
                ? Object.values(assessments).slice().sort((a, b) =>
                    moment(b.auditDetail.updateTime, "YYYY-MM-DD HH:mm:ss") -
                    moment(a.auditDetail.updateTime, "YYYY-MM-DD HH:mm:ss")) : []

            return {
                ...state,
                assessmentStatus: assessStatus,
                assessmentHistory: assessHistory,
                isAssessStarted: false,
                isAssessAborted: false,
                isAssessCompleted: false,
                isResultAvailable: false,
            };
        case CcaActions.GET_ASSESSMENT_STATUS_AND_HISTORY_FAILURE:
            return {
                ...state,
            };


        case CcaActions.GET_BASIC_INFORMATION:
            return {
                ...state,
            };
        case CcaActions.GET_BASIC_INFORMATION_SUCCESS:
            return {
                ...state,
                basicInformation: pathOr({}, ["body"], action.payload)
            };
        case CcaActions.GET_BASIC_INFORMATION_FAILURE:
            return {
                ...state,
            };


        case CcaActions.SAVE_BASIC_INFORMATION:
            return {
                ...state,
            };
        case CcaActions.SAVE_BASIC_INFORMATION_SUCCESS:
            const status = state.assessmentStatus
            status["recordId"] = action.payload.assessments.cca.recordId
            return {
                ...state,
                assessmentStatus: status,
                isAssessStarted: true,
            };
        case CcaActions.SAVE_BASIC_INFORMATION_FAILURE:
            return {
                ...state,
            };


        case CcaActions.UPDATE_ASSESSMENT:
            return {
                ...state,
            };
        case CcaActions.UPDATE_ASSESSMENT_SUCCESS:
            return {
                ...state,
                assessmentQuestion: action.payload
            };
        case CcaActions.UPDATE_ASSESSMENT_FAILURE:
            return {
                ...state,
            };


        case CcaActions.ABORT_ASSESSMENT:
            return {
                ...state,
            };
        case CcaActions.ABORT_ASSESSMENT_SUCCESS:
            return {
                ...state,
                isAssessAborted: true,
                assessmentQuestion: {}
            };
        case CcaActions.ABORT_ASSESSMENT_FAILURE:
            return {
                ...state,
            };


        case CcaActions.GET_ASSESSMENT_RESULT:
            return {
                ...state,
                isResultLoading: true
            };
        case CcaActions.GET_ASSESSMENT_RESULT_SUCCESS:
            return {
                ...state,
                assessmentResult: action.payload,
                isResultAvailable: true,
                isResultLoading: false
            };
        case CcaActions.GET_ASSESSMENT_RESULT_FAILURE:
            return {
                ...state,
                assessmentResult: {},
                isResultLoading: false
            };


        case CcaActions.GET_ASSESSMENT_DETAIL:
            return {
                ...state,
            };
        case CcaActions.GET_ASSESSMENT_DETAIL_SUCCESS:

            const assessDetail = action.payload.items &&
                action.payload.items !== null
                ? Object.values(action.payload.items) : []

            return {
                ...state,
                assessmentDetail: assessDetail,
            };
        case CcaActions.GET_ASSESSMENT_DETAIL_FAILURE:
            return {
                ...state,
                assessmentDetail: []
            };

        case CcaActions.ASSESSMENT_COMPLETE:
            return {
                ...state,
                isAssessCompleted: true,
                assessmentQuestion: {}
            };

        default:
            return state;
    }
};

export default ccaReducer;
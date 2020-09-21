import {
    AQHI_DEFAULT_LOCATION_SUCCESS,
    AQHI_DEFAULT_LOCATION_FAILURE,
    AQHI_GET_BY_LOCATION_SUCCESS,
    AQHI_GET_BY_LOCATION_FAILURE,
    CHECK_AQHI_INVITATION_SUCCESS,
    CHECK_AQHI_INVITATION_FAILURE,
    GET_AQHI_LOCATION_ACCESS,
    RESET_AQHI_FAILURE_TOGGLE,
} from "./configs/actionNames";
import { pathOr } from "ramda";

const INITIAL_STATE = {
    airQualityReport: null,
    airQualityIndex: false,
    isAQHILocationAccess: false,
    unknownLocationFailure: false,
};

export default (state = INITIAL_STATE, action) => {
    const { payload } = action;
    switch (action.type) {
        case AQHI_DEFAULT_LOCATION_SUCCESS:
            return {
                ...state,
                unknownLocationFailure: false,
                airQualityReport: pathOr([], ["payload", "body"], action),
            };
        case AQHI_DEFAULT_LOCATION_FAILURE:
            return {
                ...state,
                unknownLocationFailure: true,
            };
        case AQHI_GET_BY_LOCATION_SUCCESS:
            return {
                ...state,
                airQualityReport: pathOr([], ["payload", "body"], action),
                unknownLocationFailure: false,
            };
        case AQHI_GET_BY_LOCATION_FAILURE:
            return {
                ...state,
                unknownLocationFailure: true,
            };
        case CHECK_AQHI_INVITATION_SUCCESS:
            return {
                ...state,
                airQualityIndex: true,
                // customerPolicies: [],
            };
        case CHECK_AQHI_INVITATION_FAILURE:
            return {
                ...state,
                airQualityIndex: false,
                // customerPolicies: [],
            };
        case GET_AQHI_LOCATION_ACCESS:
            return {
                ...state,
                isAQHILocationAccess: null,
            };
        case RESET_AQHI_FAILURE_TOGGLE:
            return {
                ...state,
                unknownLocationFailure: false,
                airQualityReport: null,
            };
        default:
            return state;
    }
};

import * as screens from "../screenNames";
import * as actions from "../actionNames";
import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";
import { path, forEach, groupBy, forEachObjIndexed, reverse, map, isNil } from "ramda";
import { CustomAlert } from "../../../../components";
export default {
    [screens.AIR_QUALITY_DATA]: {
        [actions.AQHI_DEFAULT_LOCATION]: {
            successAction: actions.AQHI_DEFAULT_LOCATION_SUCCESS,
            postSuccessHook: payload => {
                return payload.response;
            },
            failureAction: actions.AQHI_DEFAULT_LOCATION_FAILURE,
            failureHook: payload => {
                return payload.response;
            },
            toggleLoader: false,
        },
        [actions.AQHI_GET_BY_LOCATION]: {
            successAction: actions.AQHI_GET_BY_LOCATION_SUCCESS,
            postSuccessHook: payload => {
                return payload.response;
            },
            failureAction: actions.AQHI_GET_BY_LOCATION_FAILURE,
            failureHook: payload => {
                return payload.response;
            },
            toggleLoader: false,
        },
    },

}
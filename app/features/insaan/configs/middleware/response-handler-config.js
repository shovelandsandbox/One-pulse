import { screenNames } from "../screenNames";
import * as InsaanActions from "../actionNames";

const insaanApiResponse = {
  [screenNames.GET_INSAAN]: {

    [InsaanActions.GET_INSAAN_ZONE_LIST]: {
      successAction: InsaanActions.INSAAN_ZONE_LIST_SUCCESS,
      postSuccessHook: (payload, state) => {
        return payload.response.body;
      },
      failureAction: InsaanActions.INSAAN_ZONE_LIST_FAILURE,
      failureHook: payload => {
        return {
          errorMsg: payload.response.status.message,
          errorCode: payload.response.status.code,
        };
      },
      toggleLoader: false,
    },

    [InsaanActions.GET_PRAYER_TIME_JAKIM]: {
      successAction: InsaanActions.GET_PRAYER_TIME_JAKIM_SUCCESS,
      postSuccessHook: (payload, state) => {
        return payload.response.body;
      },
      failureAction: InsaanActions.GET_PRAYER_TIME_JAKIM_FAILURE,
      failureHook: payload => {
        return {
          errorMsg: payload.response.status.message,
          errorCode: payload.response.status.code,
        };
      },
      toggleLoader: false,
    },

    [InsaanActions.GET_PRAYER_TIME_OTHER]: {
      successAction: InsaanActions.GET_PRAYER_TIME_OTHER_SUCCESS,
      postSuccessHook: (payload, state) => {
        return payload.response.body;
      },
      failureAction: InsaanActions.GET_PRAYER_TIME_OTHER_FAILURE,
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

export default insaanApiResponse
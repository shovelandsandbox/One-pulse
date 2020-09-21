/* eslint-disable complexity */
import { pathOr } from "ramda";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import Actions from "./configs/actionNames";
import { Platform } from "react-native";

/*
 * initial state of fitness tracker reducer
 * @property {('pending'|'success'|'failed')} userMetricsStatus - the current state of metrics
 */
const INITIAL_STATE = {
  wearableList: [],
  customerActivities: [],
  userMetricsStatus: "pending",
  activitiesErrMsg: "",
  activityTrends: [],
};
const clearDataReducer = (state, action) => {
  switch (action.type) {
    case CoreActionTypes.INITIALIZE_DATA:
      return action.initialState;
  }
};
const fitnessReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.getAllSupportedWearablesSuccess: {
      const wearableList = pathOr({}, ["payload", "body"], action);
      return {
        ...state,
        wearableList,
        activityTrends: [],
      };
    }
    case Actions.getCustomerActivitiesSuccess: {
      return {
        ...state,
        customerActivitiesList: pathOr(
          [],
          ["body", "wearableActivities"],
          action.payload
        ),
        userMetricsStatus: "success",
      };
    }
    case Actions.getCustomerActivitiesFailure: {
      return {
        ...state,
        userMetricsStatus: "failed",
        activitiesErrMsg: pathOr({}, ["payload", "errorMsg"], action),
      };
    }

    case Actions.getActivityTrendsSuccess: {
      return {
        ...state,
        activityTrends: pathOr([], ["body", "contestants"], action.payload),
      };
    }

    case Actions.getActivityTrendsFailed: {
      //Handle error after api integration
      return {
        ...state,
        activityTrends: [],
      };
    }

    case Actions.getAllCustomerWearablesSuccess: {
      const filteredWearables = pathOr([], ["payload", "body"], action).filter(
        e => e.wearableType.type !== "applehealth"
      );
      return {
        ...state,
        customerConnectedWearables:
          Platform.OS === "android"
            ? filteredWearables
            : pathOr([], ["payload", "body"], action),
      };
    }
  }
};

export default (state = INITIAL_STATE, action) => {
  return (
    fitnessReducer(state, action) ||
    clearDataReducer(state, {
      type: action.type,
      initialState: { ...INITIAL_STATE },
    }) ||
    state
  );
};

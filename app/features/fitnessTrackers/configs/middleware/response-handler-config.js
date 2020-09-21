import screens from "../screenNames";
import actionNames from "../actionNames";
import { failureResponseTransformer } from "../../../../utils/apiUtils";
import * as fitnessUtils from "../../utils";
import { Platform } from "react-native";
import { pathOr, path } from "ramda";
import { rangeFilters } from "../../screens/WearablesStatistics";

export default {
  [screens.WEARABLE_LIST]: {
    [actionNames.getAllSupportedWearables]: {
      successAction: actionNames.getAllSupportedWearablesSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      dispatchActions: payload => {
        const actions = [];
        const wearableList = pathOr([], ["response", "body"], payload);
        const wearable = wearableList.find(x => x.status === "ACTIVE") || {};
        const newPayload = { tab: wearable.type };
        actions.push({
          context: screens.WEARABLES_STATISTICS,
          type: actionNames.getCustomerActivities,
          payload: newPayload,
        });
        return actions;
      },
      toggleLoader: false,
    },
    [actionNames.disconnectWearables]: {
      successHandler: (action, store) => {
        fitnessUtils.stopHealthTracking();
      },
      dispatchActions: (payload, state) => {
        const actions = [];
        actions.push({
          context: screens.WEARABLES_STATISTICS,
          type: actionNames.getAllCustomerWearables,
          disableTimeout: true,
        });
        actions.push({
          context: screens.WEARABLE_LIST,
          type: actionNames.getAllSupportedWearables,
          disableTimeout: true,
        });
        return actions;
      },

      failureAction: actionNames.initiateWearableConnectionFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.initiateWearableConnection]: {
      dispatchActions: payload => {
        const fromChallenges = pathOr(
          false,
          ["actionPayload", "fromChallenges"],
          payload
        );
        const id = pathOr("", ["actionPayload", "id"], payload);
        const actions = [];
        if (fromChallenges) {
          actions.push({
            context: "CHALLENGES",
            type: "challenges/goToChallenges",
            payload: { wearableType: id },
          });
        }
        actions.push({
          context: screens.WEARABLE_LIST,
          type: actionNames.getAllCustomerWearables,
          disableTimeout: true,
          payload: { fromChallenges },
        });
        actions.push({
          context: screens.WEARABLE_LIST,
          type: actionNames.getAllSupportedWearables,
          disableTimeout: true,
        });
        return actions;
      },
    },
    [actionNames.getAllCustomerWearables]: {
      successAction: actionNames.getAllCustomerWearablesSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      dispatchActions: payload => {
        const fromChallenges = pathOr(
          false,
          ["actionPayload", "fromChallenges"],
          payload
        );
        const actions = [];
        if (!fromChallenges) {
          actions.push({
            type: actionNames.goToWearablesStatistics,
          });
        }
        return actions;
      },
    },
  },
  [screens.WEARABLES_STATISTICS]: {
    [actionNames.getCustomerActivities]: {
      successAction: actionNames.getCustomerActivitiesSuccess,
      dispatchActions: (payload, state) => {
        const actions = [];
        const type = path(["actionPayload", "tab"], payload);
        const newPayload = {
          tab: type,
          startTime: rangeFilters[0].startTime(),
          frequency: rangeFilters[0].frequency,
        };
        if (type) {
          actions.push({
            context: screens.WEARABLES_STATISTICS,
            type: actionNames.getActivityTrends,
            payload: newPayload,
          });
        }
        return actions;
      },
      toggleLoader: false,
      postSuccessHook: payload => {
        return payload.response;
      },
      failureAction: actionNames.getCustomerActivitiesFailure,
      failureHook: failureResponseTransformer,
    },
    [actionNames.addCustomerActivities]: {
      successAction: actionNames.addCustomerActivitiesSuccess,
      dispatchActions: () => {
        const actions = [];
        actions.push({
          context: screens.WEARABLES_STATISTICS,
          type: actionNames.getCustomerActivities,
          disableTimeout: true,
        });
        return actions;
      },
      postSuccessHook: payload => {
        return payload.response;
      },
      toggleLoader: false,
    },
    [actionNames.getAllCustomerWearables]: {
      successAction: actionNames.getAllCustomerWearablesSuccess,
      successHandler: (action, store) => {
        const state = store.getState();

        const connectedWearables = pathOr(
          [],
          ["payload", "response", "body"],
          action
        );
        const countryMeta = state.meta.countryCommonMeta;
        fitnessUtils.checkAndStartHealthTracking(
          connectedWearables,
          countryMeta,
          metricsByDate => {
            store.dispatch({
              context: screens.WEARABLES_STATISTICS,
              type: actionNames.addCustomerActivities,
              payload: metricsByDate,
              disableTimeout: true,
            });
          }
        );
      },
      postSuccessHook: payload => {
        return payload.response;
      },
      toggleLoader: false,
    },
    [actionNames.getActivityTrends]: {
      successAction: actionNames.getActivityTrendsSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      failureAction: actionNames.getActivityTrendsFailed,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
};

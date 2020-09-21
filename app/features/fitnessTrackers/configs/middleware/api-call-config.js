import screens from "../screenNames";
import actions from "../actionNames";
import { Platform } from "react-native";
import { buildPayload } from "../../../../utils/apiUtils";
import { pathOr, path } from "ramda";

const transformCustomerActivity = (
  date,
  metricsForDate = {},
  trackerInfo = {}
) => {
  const data = {
    wearable: {
      id: trackerInfo.id,
      wearableType: {
        type: trackerInfo.wearableType.type,
      },
    },
    summaryMetrics: [
      {
        name: "Step Count",
        value: metricsForDate.steps,
        unit: "STEPS",
      },
      {
        name: "Calories",
        value: metricsForDate.calories,
        unit: "KCAL",
      },
      {
        name: "Distance",
        value: metricsForDate.distance,
        unit: "Metre",
      },
      {
        name: "Sleep",
        value: metricsForDate.sleepSample,
        unit: "MINS",
      },
      {
        name: "Heart Rate",
        value: metricsForDate.heartRate,
        unit: "BPM",
      },
    ],
    syncTime: date,
    activities: [
      {
        type: {
          name: "Cycling",
        },
        metrics: [
          {
            name: "distance",
            value: metricsForDate.distanceCycling,
            unit: "Metre",
          },
        ],
        defaultMetric: {
          name: "distance",
          value: metricsForDate.distanceCycling,
          unit: "Metre",
        },
        startTime: "",
        endTime: "",
      },
      {
        type: {
          name: "Swimming",
        },
        metrics: [
          {
            name: "distance",
            value: metricsForDate.swimmingDistance,
            unit: "Metre",
          },
        ],
        defaultMetric: {
          name: "distance",
          value: metricsForDate.swimmingDistance,
          unit: "Metre",
        },
        startTime: "",
        endTime: "",
      },
    ],
  };
  return data;
};

export default {
  [screens.WEARABLE_LIST]: {
    [actions.getAllSupportedWearables]: {
      payloadBuilder: store => {
        return buildPayload(store, "getAllWearables", null, null, null);
      },
      loader: true,
    },
    [actions.disconnectWearables]: {
      payloadBuilder: (store, action) => {
        const params = {
          name: action.payload,
        };
        return buildPayload(store, "disconnectWearable", null, null, params);
      },
      loader: true,
    },
    //to send the status of apple health connection to platform
    [actions.initiateWearableConnection]: {
      payloadBuilder: (store, action) => {
        const name = action.payload.id;
        const params = {
          name,
          fromChallenges: pathOr(false, ["payload", "fromChallenges"], action),
          pushEnabled: name === "googlefit" ? true : false,
        };
        return buildPayload(
          store,
          "initiateWearableConnection",
          null,
          null,
          params
        );
      },
      loader: true,
    },
    [actions.getAllCustomerWearables]: {
      payloadBuilder: store => {
        const params = {
          status: "CONNECTED",
        };
        return buildPayload(
          store,
          "getAllCustomerWearables",
          null,
          null,
          params
        );
      },
      // loader: true,
    },
  },
  [screens.WEARABLES_STATISTICS]: {
    [actions.getCustomerActivities]: {
      payloadBuilder: store => {
        return buildPayload(store, "getCustomerActivities", null, null, null);
      },
      // loader: true,
    },
    [actions.addCustomerActivities]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const connectedWearables = pathOr(
          [],
          ["FitnessTrackersReducer", "customerConnectedWearables"],
          state
        );
        const type = Platform.OS === "ios" ? "applehealth" : "googlefit";
        const trackerInfo = connectedWearables.find(
          value => path(["wearableType", "type"], value) === type
        );

        const wearableDataToUpload = pathOr(
          [],
          ["payload"],
          action
        ).map(({ date, metrics }) =>
          transformCustomerActivity(date, metrics, trackerInfo || {})
        );
        const wearableActivities = { wearableActivities: wearableDataToUpload };
        const body = wearableActivities;
        return buildPayload(store, "addCustomerActivity", null, body, null);
      },
    },
    [actions.getAllCustomerWearables]: {
      payloadBuilder: store => {
        const params = {
          status: "CONNECTED",
        };
        return buildPayload(
          store,
          "getAllCustomerWearables",
          null,
          null,
          params
        );
      },
      // loader: true,
    },
    [actions.getActivityTrends]: {
      // Not sure if this is the correct name going by API Path
      payloadBuilder: (store, action) => {
        const payload = action.payload;
        const params = {
          type: "wearableactivity",
          tab: payload.tab,
          startTime: payload.startTime,
          frequency: payload.frequency,
        };
        if (payload.endTime) {
          params.endTime = payload.endTime;
        }
        return buildPayload(
          store,
          "getCustomerLeaderboard",
          null,
          null,
          params
        );
      },
      // loader: true,
    },
  },
};

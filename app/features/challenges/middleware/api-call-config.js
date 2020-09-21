import screens from "../configs/screen-names";
import actions from "../configs/actions";
import { buildPayload } from "../../../utils/apiUtils";
import { path, pathOr } from "ramda";

const CLASSIFICATION = "challenge";
// const CLASSIFICATION = "Community";

export default {
  [screens.CHALLENGES]: {
    [actions.getAllChallenges]: {
      payloadBuilder: store => {
        const params = {
          classification: CLASSIFICATION,
        };
        return buildPayload(store, "getAllGroups", null, null, params);
      },
      toggleLoader: true,
    },
    [actions.getMyChallenges]: {
      payloadBuilder: store => {
        const params = {
          classification: CLASSIFICATION,
        };
        return buildPayload(store, "getAllCustomerGroup", null, null, params);
      },
    },
    [actions.joinChallenge]: {
      payloadBuilder: (store, action) => {
        const groupActivity = {
          criteria: {
            supportedWearable: {
              ...pathOr({}, ["payload", "wearable"], action),
              type_: "Wearable",
            },
          },
        };
        return buildPayload(
          store,
          "joinGroup",
          null,
          {
            id: path(["payload", "group", "id"], action),
            groupActivity,
          },
          null
        );
      },
      loader: true,
    },
    [actions.leaveChallenge]: {
      payloadBuilder: (store, action) => {
        return buildPayload(
          store,
          "leaveGroup",
          null,
          {
            id: path(["payload", "group", "id"], action),
          },
          null
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
      loader: true,
    },
  },
  [screens.LEADERBOARD]: {
    [actions.getChallengeLeaderboard]: {
      payloadBuilder: (store, action) => {
        return buildPayload(store, "getGroupLeaderboard", null, null, {
          id: path(["payload", "id"], action),
        });
      },
      loader: true,
    },
    [actions.getProfilePic]: {
      payloadBuilder: (store, action) => {
        const id = path(["payload", "id"], action);
        return buildPayload(store, "getDocumentById", null, null, {
          id,
        });
      },
    },
  },
  [screens.CHALLENGE_DETAILS]: {
    [actions.getChallengeActivityTrends]: {
      payloadBuilder: (store, action) => {
        const params = { ...action.payload };
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

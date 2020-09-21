import screens from "../screenNames";
import actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";
import { pathOr } from "ramda";

export default {
  [screens.EXERCISE_BUDDY]: {
    [actions.createGroup]: {
      payloadBuilder: (store, action) => {
        const body = pathOr({}, ["payload", "body"], action);
        return buildPayload(store, "createGroup", null, body, null);
      },
      loader: true,
    },
    [actions.createGroupMembers]: {
      payloadBuilder: (store, action) => {
        const id = pathOr("", ["payload", "id"], action);
        const params = {
          id,
        };
        const body = pathOr([], ["payload", "body"], action);
        return buildPayload(store, "createGroupMembers", null, body, params);
      },
      loader: true,
    },
    [actions.findGroupByCriteria]: {
      payloadBuilder: (store, action) => {
        const body = pathOr({}, ["payload", "body"], action);
        return buildPayload(store, "findGroupByCriteria", null, body, null);
      },
      loader: true,
    },
    [actions.getAllCustomerGroup]: {
      payloadBuilder: (store, action) => {
        const classification = pathOr(
          "",
          ["payload", "classification"],
          action
        );
        const params = {
          classification,
        };
        return buildPayload(store, "getAllCustomerGroup", null, null, params);
      },
      loader: true,
    },
    [actions.getAllActionPlans]: {
      payloadBuilder: (store, action) => {
        const realm = pathOr("", ["payload", "realm"], action);
        const params = {
          realm,
        };
        return buildPayload(store, "getAllActionPlans", null, null, params);
      },
      loader: true,
    },
    [actions.getAllHabits]: {
      payloadBuilder: (store, action) => {
        const id = pathOr("", ["payload", "id"], action);
        const realm = pathOr("", ["payload", "realm"], action);
        const params = {
          realm: 'workout',
          id: "Workout::1",
        };
        return buildPayload(store, "getAllHabits", null, null, params);
      },
      loader: true,
    },
    [actions.getHabitById]: {
      payloadBuilder: (store, action) => {
        const id = pathOr("", ["payload", "id"], action);
        const realm = pathOr("", ["payload", "realm"], action);
        const habitId = pathOr("", ["payload", "habitId"], action);
        const params = {
          realm,
          id,
          habitId,
        };
        return buildPayload(store, "getHabitById", null, null, params);
      },
      loader: true,
    },
    [actions.getAllCustomerActionPlans]: {
      payloadBuilder: (store, action) => {
        const realm = pathOr("", ["payload", "realm"], action);
        const params = {
          realm,
        };
        return buildPayload(
          store,
          "getAllCustomerActionPlans",
          null,
          null,
          params
        );
      },
      loader: true,
    },
    [actions.joinCustomerActionPlan]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: "workout",
          actionPlanId: "Workout::1",
        };
        const body = {
          preferences: {
            shareProgressOnGroup: "false",
          },
          reminder: {
            enabled: "false",
            repeat: {
              intervals: [],
            },
          },
          actionPlan: {
            level: "_0",
          },
        };
        return buildPayload(
          store,
          "joinCustomerActionPlan",
          null,
          body,
          params
        );
      },
      loader: true,
    },


    [actions.createCustomerHabitMilestone]: {
      payloadBuilder: (store, action) => {
        const realm = pathOr("", ["payload", "realm"], action);
        const actionPlanId = pathOr("", ["payload", "actionPlanId"], action);
        const habitId = pathOr("", ["payload", "habitId"], action);
        const params = {
          realm,
          actionPlanId,
          habitId,
        };
        const body = pathOr({}, ["payload", "body"], action);
        return buildPayload(
          store,
          "createCustomerHabitMilestone",
          null,
          body,
          params
        );
      },
      loader: true,
    },


    [actions.getGroupLeaderBoard]: {
      payloadBuilder: (store, action) => {
        const type = pathOr("", ["payload", "type"], action);
        const id = pathOr("", ["payload", "id"], action);
        const realm = pathOr("", ["payload", "realm"], action);
        const params = {
          type,
          id,
          realm,
        };
        return buildPayload(store, "getGroupLeaderboard", null, null, params);
      },
      loader: true,
    },

    [actions.getAllCustomerHabits]: {
      payloadBuilder: (store, action) => {
        const actionPlanId = pathOr("", ["payload", "actionPlanId"], action);
        const realm = pathOr("", ["payload", "realm"], action);
        const params = {
          realm,
          actionPlanId: actionPlanId,
        };
        return buildPayload(store, "getAllCustomerHabits", null, null, params);
      },
      loader: true,
    },
  },
};

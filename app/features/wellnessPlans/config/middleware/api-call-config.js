import screens from "../screenNames";
import actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";
import { pathOr } from "ramda";

const realm = "fitness";

export default {
  [screens.WELLNESS_GOALS_SCREEN]: {
    [actions.getAllActionPlans]: {
      payloadBuilder: store => {
        const state = store.getState();
        const lang = pathOr("EN", ["userPreferences", "language"], state);
        const params = {
          realm,
          lang,
        };
        return buildPayload(store, "getAllActionPlans", null, null, params);
      },
      loader: true,
    },
    [actions.getAllCustomerActionPlans]: {
      payloadBuilder: store => {
        const state = store.getState();
        const lang = pathOr("EN", ["userPreferences", "language"], state);
        const params = {
          realm,
          lang,
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
        const state = store.getState();
        const lang = pathOr("EN", ["userPreferences", "language"], state);
        const shareProgressOnGroup = pathOr(
          "false",
          ["payload", "isConsentAccepted"],
          action
        );
        const actionPlanId = pathOr("", ["payload", "id"], action);
        const params = {
          actionPlanId,
          lang,
          realm,
        };
        const body = {
          preferences: {
            shareProgressOnGroup,
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
    [actions.leaveActionPlan]: {
      payloadBuilder: (store, action) => {
        const actionPlanId = pathOr("", ["payload"], action);
        const params = {
          actionPlanId,
          realm,
        };
        return buildPayload(store, "leaveActionPlan", null, null, params);
      },
      loader: true,
    },
    [actions.getAllHabits]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const id = pathOr("", ["payload", "id"], action);
        const lang = pathOr("EN", ["userPreferences", "language"], state);
        const params = {
          id,
          lang,
          realm,
        };
        return buildPayload(store, "getAllHabits", null, null, params);
      },
      loader: true,
    },
    [actions.getAllCustomerHabits]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const lang = pathOr("EN", ["userPreferences", "language"], state);
        const actionPlanId = pathOr("", ["payload", "id"], action);
        const params = {
          actionPlanId,
          lang,
          realm,
        };
        return buildPayload(store, "getAllCustomerHabits", null, null, params);
      },
      loader: true,
    },
    [actions.activateCustomerHabit]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const lang = pathOr("EN", ["userPreferences", "language"], state);
        const actionPlanId = pathOr("", ["payload", "actionPlanId"], action);
        const habitId = pathOr("", ["payload", "habitId"], action);
        const activeSlotNumber = pathOr(
          "",
          ["payload", "activeSlotNumber"],
          action
        );
        const params = {
          actionPlanId,
          habitId,
          realm,
          lang,
        };
        const body = { activeSlotNumber };
        return buildPayload(store, "activateCustomerHabit", null, body, params);
      },
      loader: true,
    },
    [actions.activateCustomerHabits]: {
      payloadBuilder: (store, action) => {
        const actionPlanId = pathOr("", ["payload", "actionPlanId"], action);
        const habitId = pathOr("", ["payload", "habitId"], action);
        const newHabitId = pathOr("", ["payload", "newHabitId"], action);
        const params = {
          actionPlanId,
          realm,
        };
        const body = [
          { id: habitId },
          {
            habit: {
              id: newHabitId,
            },
          },
        ];
        return buildPayload(
          store,
          "activateCustomerHabits",
          null,
          body,
          params
        );
      },
      loader: true,
    },
    [actions.setReminder]: {
      payloadBuilder: (store, action) => {
        const actionPlanId = pathOr("", ["payload", "actionPlanId"], action);
        const habitId = pathOr("", ["payload", "habitId"], action);
        const enabled = pathOr(false, ["payload", "enabled"], action);
        const intervals = pathOr([], ["payload", "intervals"], action);
        const params = {
          actionPlanId,
          habitId,
          realm,
        };

        const body = {
          reminder: {
            enabled: enabled,
            repeat: {
              intervals,
            },
          },
        };
        return buildPayload(store, "activateCustomerHabit", null, body, params);
      },
      loader: true,
    },
    [actions.createCustomerHabitMilestone]: {
      payloadBuilder: (store, action) => {
        const habitId = pathOr("", ["payload", "habitId"], action);
        const actionPlanId = pathOr("", ["payload", "actionPlanId"], action);
        const date = pathOr("", ["payload", "date"], action);
        const status = pathOr("", ["payload", "status"], action);
        const params = {
          habitId,
          realm,
          actionPlanId,
        };
        const body = {
          date,
          status,
        };
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
    [actions.getCustomerWalletDetail]: {
      payloadBuilder: (store, action) => {
        return buildPayload(store, "getCustomerWalletDetail", null, null, null);
      },
      loader: true,
    },
  },
};

import React from "react";
import { pathOr } from "ramda";
import { CoreConfig, metaHelpers } from "@pru-rt-internal/pulse-common";

import screens from "../screenNames";
import actionNames from "../actionNames";
import Actions from "../actions";
import { WPDarkModal, WPCongratulationModal } from "../../components";

import { CustomAlert } from "../../../../components";
import MetaConstants from "../../meta";
const {
  SCREEN_KEY_ACTION_PLANS,
  ELEMENT_KEY_JOIN_ACTION_FAILURE_ERROR,
  ELEMENT_KEY_OK_CAPS,
  ELEMENT_KEY_LEAVE_PLAN_FAILURE_ERROR,
  ELEMENT_KEY_SET_MILESTONE_FAILURE_ERROR
} = CoreConfig;

const updateHabits = (action, store) => {
  const actionPlanId = pathOr(
    "",
    ["payload", "actionPayload", "actionPlanId"],
    action
  );
  const state = store.getState();
  const lang = pathOr("EN", ["userPreferences", "language"], state);
  const params = {
    lang,
    id: actionPlanId
  };

  store.dispatch({
    context: screens.WELLNESS_GOALS_SCREEN,
    type: actionNames.getAllCustomerHabits,
    payload: params
  });
};

const updateHabitsToActionPlan = (plan, store, forWhich) => {
  const payload = {
    for: forWhich,
    id: pathOr("", ["actionPlan", "id"], plan),
    name: pathOr("", ["actionPlan", "name"], plan)
  };

  store.dispatch(Actions.getAllCustomerHabits(payload));
};

export default {
  [screens.WELLNESS_GOALS_SCREEN]: {
    [actionNames.getAllActionPlans]: {
      successAction: actionNames.getAllActionPlansSuccess,
      postSuccessHook: payload => payload.response,
      failureHook: payload => payload.response,
      failureAction: actionNames.getAllActionPlansFailure,
      toggleLoader: false
    },
    [actionNames.getAllCustomerActionPlans]: {
      successAction: actionNames.getAllCustomerActionPlansSuccess,
      postSuccessHook: payload => payload.response,
      successHandler: (action, store) => {
        const actions = pathOr([], ["response", "body"], action.payload);

        actions.map(actionPlan => {
          updateHabitsToActionPlan(actionPlan, store, "actionPlan");
        });
      },
      failureAction: actionNames.getAllCustomerActionPlansFailure,
      toggleLoader: false
    },
    [actionNames.joinCustomerActionPlan]: {
      successAction: actionNames.joinCustomerActionPlanSuccess,
      postSuccessHook: payload => payload.response,
      successHandler: (action, store) => {
        const { actionPayload } = action.payload;

        store.dispatch(Actions.gotoActionPlanHabits(actionPayload));
        store.dispatch(Actions.getCustomerWalletDetail());
      },
      failureAction: actionNames.joinCustomerActionPlanFailure,
      failureHandler: () => {
        const errorMsg = metaHelpers.findElement(
          SCREEN_KEY_ACTION_PLANS,
          ELEMENT_KEY_JOIN_ACTION_FAILURE_ERROR
        ).label;
        const okText = metaHelpers.findElement(
          SCREEN_KEY_ACTION_PLANS,
          ELEMENT_KEY_OK_CAPS
        ).label;
        CustomAlert.show("", errorMsg, {
          positiveText: okText,
          invert: false
        });
      },
      toggleLoader: false
    },
    [actionNames.leaveActionPlan]: {
      successAction: actionNames.leaveActionPlanSuccess,
      postSuccessHook: payload => payload.response,
      successHandler: (action, store) => {
        store.dispatch({
          type: actionNames.goToScreen,
          navigateTo: screens.ACTION_PLANS_SCREEN
        });
      },
      failureAction: actionNames.leaveActionPlanFailure,
      failureHandler: () => {
        const errorMsg = metaHelpers.findElement(
          SCREEN_KEY_ACTION_PLANS,
          ELEMENT_KEY_LEAVE_PLAN_FAILURE_ERROR
        ).label;
        const okText = metaHelpers.findElement(
          SCREEN_KEY_ACTION_PLANS,
          ELEMENT_KEY_OK_CAPS
        ).label;
        CustomAlert.show("", errorMsg, {
          positiveText: okText,
          invert: false
        });
      },
      toggleLoader: false
    },
    [actionNames.getAllHabits]: {
      successAction: actionNames.getAllHabitsSuccess,
      postSuccessHook: payload => payload.response,
      failureAction: actionNames.getAllHabitsFailure,
      successHandler: (action, store) => {
        const actionPlanId = pathOr(
          "",
          ["actionPayload", "id"],
          action.payload
        );

        store.dispatch(Actions.getAllCustomerHabits({ id: actionPlanId }));
      },
      failureHandler: store => {
        CustomAlert.show("", "Failed", {
          positiveText: "Ok",
          invert: false
        });
      },
      toggleLoader: false
    },
    [actionNames.getAllCustomerHabits]: {
      successAction: actionNames.getAllCustomerHabitsSuccess,
      postSuccessHook: payload => {
        return {
          habits: payload.response,
          actionPayload: payload.actionPayload
        };
      },
      failureAction: actionNames.getAllCustomerHabitsFailure,
      failureHandler: store => {
        CustomAlert.show("", "Failed", {
          positiveText: "Ok",
          invert: false
        });
      },
      toggleLoader: false
    },
    [actionNames.activateCustomerHabit]: {
      successAction: actionNames.activateCustomerHabitSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      successHandler: (action, store) => {
        updateHabits(action, store);
      },
      failureAction: actionNames.activateCustomerHabitFailure,
      toggleLoader: false,
      failureHandler: response => {
        const metaConstants = { ...MetaConstants.screenMeta() };
        const message = pathOr(
          "",
          ["payload", "response", "status", "message"],
          response
        );
        const errorCode = pathOr(
          "",
          ["payload", "response", "status", "code"],
          response
        );

        if (errorCode === 5050) {
          CustomAlert.show("", metaConstants.max_habits, {
            positiveText: metaConstants.wellness_ok,
            invert: false
          });
        } else if (errorCode === 4500) {
          CustomAlert.show("", metaConstants.master_habits, {
            positiveText: metaConstants.wellness_ok,
            invert: false
          });
        } else {
          CustomAlert.show("", message, {
            positiveText: metaConstants.wellness_ok,
            invert: false
          });
        }
      }
    },
    [actionNames.setReminder]: { 
      successAction: actionNames.setReminderSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      successHandler: (action, store) => {
        store.dispatch(Actions.getCustomerWalletDetail());
      },
      failureAction: actionNames.setReminderFailure,
      toggleLoader: false,
    },
    [actionNames.createCustomerHabitMilestone]: {
      successAction: actionNames.createCustomerHabitMilestoneSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      successHandler: (action, store) => {
        const milestoneCount = pathOr(
          0,
          ["payload", "actionPayload", "completedMilestoneCount"],
          action
        );
        const habitTitle = pathOr(
          "",
          ["payload", "actionPayload", "habit", "habit", "title"],
          action
        );
        const habitRewards = pathOr(
          0,
          ["payload", "actionPayload", "habit", "habit", "earnReward", "units"],
          action
        );

        updateHabits(action, store);
        if (milestoneCount === 6) {
          WPDarkModal.show({
            Component: () => (
              <WPCongratulationModal
                habitName={habitTitle}
                rewards={habitRewards}
              />
            )
          });
        }
      },
      failureAction: actionNames.createCustomerHabitMilestoneFailure,
      failureHandler: response => {
        const metaConstants = { ...MetaConstants.screenMeta() };
        const errorCode = pathOr(
          "",
          ["payload", "response", "status", "code"],
          response
        );
        const errorMsg = metaHelpers.findElement(
          SCREEN_KEY_ACTION_PLANS,
          ELEMENT_KEY_SET_MILESTONE_FAILURE_ERROR
        ).label;
        const okText = metaHelpers.findElement(
          SCREEN_KEY_ACTION_PLANS,
          ELEMENT_KEY_OK_CAPS
        ).label;

        if (errorCode === 4610 || errorCode === 4670) {
          const str = metaConstants.check_habits_tom;
          CustomAlert.show("", str, {
            positiveText: metaConstants.wellness_ok,
            invert: false
          });
        } else {
          CustomAlert.show("", errorMsg, {
            positiveText: okText,
            invert: false
          });
        }
      },
      toggleLoader: false
    },
    [actionNames.getCustomerWalletDetail]: {
      successAction: actionNames.getCustomerWalletDetailSuccess,
      failureAction: actionNames.getCustomerWalletDetailFailure,
      postSuccessHook: payload => {
        return payload.response;
      },
      toggleLoader: false
    },
    [actionNames.activateCustomerHabits]: {
      successAction: actionNames.activateCustomerHabitsSuccess,
      failureAction: actionNames.activateCustomerHabitsFailure,
      toggleLoader: false,
      successHandler: (action, store) => {
        updateHabits(action, store);
        store.dispatch(Actions.getCustomerWalletDetail());
      }
    }
  }
};

import screens from "../screenNames";
import actionNames from "../actionNames";
import { pathOr } from "ramda";
import { failureResponseTransformer } from "../../../../utils/apiUtils";

export default {
  [screens.EXERCISE_BUDDY]: {
    [actionNames.createGroup]: {
      successAction: actionNames.createGroupSuccess,
      postSuccessHook: payload => {
        const groupDetail = pathOr({}, ["response", "body"], payload);
        const id = pathOr("", ["response", "body", "id"], payload);
        const groupMembersBody = pathOr(
          [],
          ["actionPayload", "groupMembersBody"],
          payload
        );
        return {
          responseObject: {
            groupDetail,
            id,
            groupMembersBody,
          },
        };
      },
      failureAction: actionNames.createGroupFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.createGroupMembers]: {
      successAction: actionNames.createGroupMembersSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      failureAction: actionNames.createGroupMembersFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.findGroupByCriteria]: {
      successAction: actionNames.findGroupByCriteriaSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      failureAction: actionNames.findGroupByCriteriaFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.getAllCustomerGroup]: {
      successAction: actionNames.getAllCustomerGroupSuccess,
      postSuccessHook: payload => {
        const groups = pathOr([], ["response", "body"], payload);
        return {
          responseObject: {
            groups,
          },
        };
      },
      failureAction: actionNames.getAllCustomerGroupFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.getAllActionPlans]: {
      successAction: actionNames.getAllActionPlansSuccess,
      postSuccessHook: payload => {
        const workoutPlans = pathOr([], ["response", "body"], payload);
        return {
          responseObject: {
            workoutPlans,
          },
        };
      },
      failureAction: actionNames.getAllActionPlansFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.getAllHabits]: {
      successAction: actionNames.getAllHabitsSuccess,
      postSuccessHook: payload => {
        const workoutId = pathOr("", ["actionPayload", "id"], payload);
        const habits = pathOr([], ["response", "body"], payload);
        return {
          responseObject: {
            workoutId,
            habits,
          },
        };
      },
      failureAction: actionNames.getAllHabitsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.getHabitById]: {
      successAction: actionNames.getHabitByIdSuccess,
      postSuccessHook: payload => {
        const workoutId = pathOr("", ["actionPayload", "id"], payload);
        const habitId = pathOr("", ["actionPayload", "habitId"], payload);
        const habitDetail = pathOr([], ["response", "body"], payload);
        return {
          responseObject: {
            workoutId,
            habitId,
            habitDetail,
          },
        };
      },
      failureAction: actionNames.getHabitByIdFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.getAllCustomerActionPlans]: {
      successAction: actionNames.getAllCustomerActionPlansSuccess,
      postSuccessHook: payload => {
        const workoutPlans = pathOr([], ["response", "body"], payload);
        return {
          responseObject: {
            workoutPlans,
          },
        };
      },
      successHandler: (action, store) => {
        const actionPlans = pathOr([], ["payload", "response", "body"], action);
        
        if (actionPlans.length > 0) {
          store.dispatch({
            context: screens.EXERCISE_BUDDY,
            type: actionNames.getAllHabits,
          });
        } else {
          store.dispatch({
            context: screens.EXERCISE_BUDDY,
            type: actionNames.joinCustomerActionPlan
          });
        }
      },
      failureAction: actionNames.getAllCustomerActionPlansFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.joinCustomerActionPlan]: {
      successAction: actionNames.joinCustomerActionPlanSuccess,
      postSuccessHook: payload => {
        const joinedPlan = pathOr([], ["response", "body"], payload);
        return {
          responseObject: {
            joinedPlan,
          },
        };
      },
      successHandler: (action, store) => {
        const id = pathOr(null, ["payload", "response", "body", "id"], action);
        if (id) {
          store.dispatch({
            context: screens.EXERCISE_BUDDY,
            type: actionNames.getAllHabits,
          });
        }
      },
      failureAction: actionNames.joinCustomerActionPlanFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.createCustomerHabitMilestone]: {
      successAction: actionNames.createCustomerHabitMilestoneSuccess,
      postSuccessHook: payload => {
        const actionPlanId = pathOr(
          "",
          ["actionPayload", "actionPlanId"],
          payload
        );
        const habitId = pathOr("", ["actionPayload", "habitId"], payload);
        const milestone = pathOr({}, ["response", "body"], payload);
        return {
          responseObject: {
            actionPlanId,
            habitId,
            milestone,
          },
        };
      },
      failureAction: actionNames.createCustomerHabitMilestoneFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.getGroupLeaderBoard]: {
      successAction: actionNames.getGroupLeaderBoardSuccess,
      postSuccessHook: payload => {
        const id = pathOr("", ["actionPayload", "id"], payload);
        const type = pathOr("", ["actionPayload", "type"], payload);
        const leaderBoard = pathOr({}, ["response", "body"], payload);
        return {
          responseObject: {
            id,
            type,
            leaderBoard,
          },
        };
      },
      failureAction: actionNames.getGroupLeaderBoardFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.getAllCustomerHabits]: {
      successAction: actionNames.getAllCustomerHabitsSuccess,
      postSuccessHook: payload => {
        const actionPlanId = pathOr(
          "",
          ["actionPayload", "actionPlanId"],
          payload
        );
        const habits = pathOr([], ["response", "body"], payload);
        return {
          responseObject: {
            actionPlanId,
            habits,
          },
        };
      },
      failureAction: actionNames.getAllCustomerHabitsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
};

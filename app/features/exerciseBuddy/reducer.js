/* eslint-disable complexity */
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import Actions from "./configs/actionNames";
import { pathOr } from "ramda";

const { LOGOUT_DONE } = CoreActionTypes;

const INITIAL_STATE = {
  groups: [],
  plans: [],
  habitsByWorkoutPlanId: [],
  habitDetails: [],
  joinedPlans: [],
  createdGroup: {},
  mileStones: [],
  leaderBoard: [],
  customerHabitsByPlanId: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.getAllCustomerGroupSuccess: {
      const groups = pathOr(
        [],
        ["payload", "responseObject", "groups"],
        action
      );
      return {
        ...state,
        groups,
      };
    }

    case Actions.getAllActionPlansSuccess: {
      const plans = pathOr(
        [],
        ["payload", "responseObject", "workoutPlans"],
        action
      );
      return {
        ...state,
        plans,
      };
    }

    case Actions.getAllCustomerActionPlansSuccess: {
      const joinedPlans = pathOr(
        [],
        ["payload", "responseObject", "workoutPlans"],
        action
      );
      return {
        ...state,
        joinedPlans,
      };
    }

    case Actions.getAllHabitsSuccess: {
      const id = pathOr("", ["payload", "responseObject", "workoutId"], action);
      const responseObject = pathOr([], ["payload", "responseObject"], action);
      const index = state.habitsByWorkoutPlanId.findIndex(
        p => p.workoutId === id
      );
      if (index === -1) {
        state.habitsByWorkoutPlanId.push(responseObject);
      } else {
        state.habitsByWorkoutPlanId[index] = responseObject;
      }
      return {
        ...state,
        habitsByWorkoutPlanId: [...state.habitsByWorkoutPlanId],
      };
    }

    case Actions.getHabitByIdSuccess: {
      const workoutId = pathOr("", ["payload", "responseObject", "workoutId"], action);
      const habitId = pathOr(
        "",
        ["payload", "responseObject", "habitId"],
        action
      );
      const responseObject = pathOr([], ["payload", "responseObject"], action);
      const index = state.habitDetails.findIndex(
        p => p.workoutId === workoutId && p.habitId === habitId
      );
      if (index === -1) {
        state.habitDetails.push(responseObject);
      } else {
        state.habitDetails[index] = responseObject;
      }
      return {
        ...state,
        habitDetails: [...state.habitDetails],
      };
    }

    case Actions.createGroupSuccess: {
      const createdGroup = pathOr({}, ["payload", "responseObject"], action);
      return {
        ...state,
        createdGroup,
      };
    }
    case Actions.createGroupFailure: {
      const createdGroup = {};
      return {
        ...state,
        createdGroup,
      };
    }

    case Actions.joinCustomerActionPlanSuccess: {
      const joinedPlan = pathOr(
        {},
        ["payload", "responseObject", "joinedPlan"],
        action
      );
      state.joinedPlans.push(joinedPlan);
      return {
        ...state,
        joinedPlans: [...state.joinedPlans],
      };
    }

    case Actions.createCustomerHabitMilestoneSuccess: {
      const actionPlanId = pathOr(
        "",
        ["payload", "responseObject", "actionPlanId"],
        action
      );
      const habitId = pathOr(
        "",
        ["payload", "responseObject", "habitId"],
        action
      );
      const responseObject = pathOr({}, ["payload", "responseObject"], action);
      const index = state.mileStones.findIndex(
        p => p.actionPlanId === actionPlanId && p.habitId === habitId
      );
      if (index === -1) {
        state.mileStones.push(responseObject);
      } else {
        state.mileStones[index] = responseObject;
      }
      return {
        ...state,
        mileStones: [...state.mileStones],
      };
    }

    case Actions.getGroupLeaderBoardSuccess: {
      const id = pathOr("", ["payload", "responseObject", "id"], action);
      const type = pathOr("", ["payload", "responseObject", "type"], action);
      const responseObject = pathOr({}, ["payload", "responseObject"], action);
      const index = state.leaderBoard.findIndex(
        p => p.id === id && p.type === type
      );
      if (index === -1) {
        state.leaderBoard.push(responseObject);
      } else {
        state.leaderBoard[index] = responseObject;
      }
      return {
        ...state,
        leaderBoard: [...state.leaderBoard],
      };
    }

    case Actions.getAllCustomerHabitsSuccess: {
      const id = pathOr(
        "",
        ["payload", "responseObject", "actionPlanId"],
        action
      );
      const responseObject = pathOr([], ["payload", "responseObject"], action);
      const index = state.customerHabitsByPlanId.findIndex(
        p => p.actionPlanId === id
      );
      if (index === -1) {
        state.customerHabitsByPlanId.push(responseObject);
      } else {
        state.customerHabitsByPlanId[index] = responseObject;
      }
      return {
        ...state,
        customerHabitsByPlanId: [...state.customerHabitsByPlanId],
      };
    }

    case LOGOUT_DONE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

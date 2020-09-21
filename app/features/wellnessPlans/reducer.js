import actions from "./config/actionNames";
import { pathOr } from "ramda";

const INITIAL_STATE = {
  allActionPlans: [],
  customerActionPlans: [],
  allHabits: [],
  customerHabits: [],
  badges: 0,
  customerHabitsCallMade: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.getAllActionPlansSuccess: {
      return {
        ...state,
        allHabits: [],
        customerHabits: [],
        customerHabitsCallMade: false,
        allActionPlans: [...pathOr([], ["payload", "body"], action)],
      };
    }
    case actions.getAllCustomerActionPlansSuccess: {
      return {
        ...state,
        customerActionPlans: [...pathOr([], ["payload", "body"], action)],
      };
    }
    case actions.resetHabitData: {
      return {
        ...state,
        allHabits: [],
        customerHabits: [],
        customerHabitsCallMade: false,
      };
    }
    case actions.getAllHabitsSuccess: {
      return {
        ...state,
        allHabits: [...pathOr([], ["payload", "body"], action)],
      };
    }
    case actions.getAllCustomerHabitsFailure: {
      return {
        ...state,
        customerHabitsCallMade: true,
      };
    }
    case actions.getAllCustomerHabitsSuccess: {
      const habits = pathOr([], ["payload", "habits", "body"], action);
      const actionPayload = pathOr(null, ["payload", "actionPayload"], action);
      const allHabits = state.allHabits;

      const customerHabitsById = (habits || []).reduce((acc, cur) => {
        acc[cur.habit.id] = cur;
        return acc;
      }, {});

      const mergedHabits = allHabits.reduce((acc, cur) => {
        if (customerHabitsById[cur.id]) {
          acc.push(
            Object.assign({}, cur, customerHabitsById[cur.id], { id: cur.id })
          );
        } else {
          const status = cur.status === "LOCKED" ? "LOCKED" : "";
          acc.push(Object.assign({}, cur, { status }));
        }
        return acc;
      }, []);

      if (actionPayload.for) {
        const actionPlans = state.customerActionPlans;
        let modifiedActionPlan = 
          actionPlans.map(plan => {
            if (plan.actionPlan.id === actionPayload.id) {
              plan.actionPlan["habits"] = habits;
            }
            return plan;
          });

        return {
          ...state,
          allHabits: mergedHabits,
          customerActionPlans: modifiedActionPlan,
        }
      }

      return {
        ...state,
        allHabits: mergedHabits,
        customerHabitsCallMade: true,
        customerHabits: habits.filter(habit => habit.status !== "COMPLETED"),
      };
    }
    case actions.setActivePlanForJoining: {
      const { id } = action.payload;
      const activePlans = state.allActionPlans.filter(actionPlan => actionPlan.id === id);

      return {
        ...state,
        activePlanForJoining: pathOr({}, ["0"], activePlans)
      }
    }
    case actions.getCustomerWalletDetailSuccess: {
      const badges = pathOr(0, ["body", "loyaltyPoints", "0", "points"], action.payload);

      return {
        ...state,
        badges: parseInt(badges),
      }
    }
    case actions.setReminderSuccess: {
      const modifiedHabitId = pathOr("", ["body", "id"], action.payload);
      const modifiedHabitReminder = pathOr({}, ["body", "reminder"], action.payload);
      const filteredHabit = state.customerHabits.filter(habit => 
        habit.id === modifiedHabitId
      )[0] || {};
      
      if (filteredHabit) {
        filteredHabit.reminder = modifiedHabitReminder;
      }

      const customerHabits = state.customerHabits.map(habit => {
        if (habit.id === modifiedHabitId) {
          return filteredHabit;
        }
        return habit
      });
      
      return {
        ...state,
        customerHabits,
      };
    }
    default:
      return state;
  }
};

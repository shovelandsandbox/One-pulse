import screens from "./screenNames";
import actions from "./actionNames";

import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

const context = screens.WELLNESS_GOALS_SCREEN;

const goto = page => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: page,
});

const fetchActionPlans = () => ({
  context,
  type: actions.getAllActionPlans,
});

const fetchCustomerActionPlans = () => ({
  context,
  type: actions.getAllCustomerActionPlans,
});

const gotoActionPlanHabits = params => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: "ActionPlanJoin",
  payload: {
    params,
  },
});

const gotoActionPlanScreen = () => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: "ActionPlanDetails",
});

const setActivePlanForJoining = payload => ({
  type: actions.setActivePlanForJoining,
  payload,
});

const joinPlan = payload => ({
  context,
  type: actions.joinCustomerActionPlan,
  payload,
});

const getAllHabits = params => ({
  context,
  type: actions.getAllHabits,
  payload: params,
});

const getAllCustomerHabits = params => ({
  context,
  type: actions.getAllCustomerHabits,
  payload: params,
});

const resetHabitsData = () => ({
  type: actions.resetHabitData,
});

const leaveActionPlan = actionPlanId => ({
  context,
  type: actions.leaveActionPlan,
  payload: actionPlanId,
});

const createHabitMilestone = payload => ({
  context,
  type: actions.createCustomerHabitMilestone,
  payload: payload,
});

const activateCustomerHabit = payload => ({
  context,
  type: actions.activateCustomerHabit,
  payload,
});

const getCustomerWalletDetail = () => ({
  context,
  type: actions.getCustomerWalletDetail,
});

const changeHabit = payload => ({
  context,
  type: actions.activateCustomerHabits,
  payload,
});

const setReminder = payload => ({
  context,
  type: actions.setReminder,
  payload,
});

export default {
  activateCustomerHabit,
  changeHabit,
  fetchActionPlans,
  fetchCustomerActionPlans,
  gotoActionPlanHabits,
  gotoActionPlanScreen,
  joinPlan,
  setActivePlanForJoining,
  getAllHabits,
  getAllCustomerHabits,
  resetHabitsData,
  leaveActionPlan,
  createHabitMilestone,
  goto,
  getCustomerWalletDetail,
  setReminder,
};

import screens from "./configs/screenNames";
import actions from "./configs/actionNames";

import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

const context = screens.EXERCISE_BUDDY;

export const goToScreens = (params, screen) => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: screen,
  payload: {
    params,
  },
});

export const createGroup = ({ body, isGroup, groupMembersBody }) => ({
  context,
  type: actions.createGroup,
  payload: {
    body,
    isGroup,
    groupMembersBody,
  },
});

export const createGroupMembers = ({ id, body }) => ({
  context,
  type: actions.updateCustomer,
  payload: {
    id,
    body,
  },
});

export const findGroupByCriteria = ({
  groupName,
  groupClassification,
  customerEmailId,
}) => ({
  context,
  type: actions.findGroupByCriteria,
  payload: {
    body: {
      filter: {
        logicalExpression: {
          op: "AND",
          expressions: [
            {
              op: "EQ",
              lhs: ["name"],
              value: {
                value: groupName,
              },
            },
            {
              op: "EQ",
              lhs: ["classification"],
              value: {
                value: groupClassification,
              },
            },
            {
              op: "EQ",
              lhs: ["createdBy.emailId"],
              value: {
                value: customerEmailId,
              },
            },
          ],
        },
      },
      limit: null,
      orderBy: [
        {
          prop: "groupActivity.startTime",
          order: "DESC",
        },
      ],
    },
  },
});

export const getAllCustomerGroup = () => ({
  context,
  type: actions.getAllCustomerGroup,
  payload: {
    classification: "WorkoutBuddy",
  },
});

export const getAllActionPlans = () => ({
  context,
  type: actions.getAllActionPlans,
  payload: {
    realm: "workout",
  },
});

export const getAllHabits = actionId => ({
  context,
  type: actions.getAllHabits,
  payload: {
    id: actionId,
    realm: "workout",
  },
});

export const getHabitById = ({ actionId, habitId }) => ({
  context,
  type: actions.getHabitById,
  payload: {
    id: actionId,
    realm: "workout",
    habitId,
  },
});

export const getAllCustomerActionPlans = () => ({
  context,
  type: actions.getAllCustomerActionPlans,
  payload: {
    realm: "workout",
  },
});

export const joinCustomerActionPlan = () => ({
  context,
  type: actions.joinCustomerActionPlan
});

export const createCustomerHabitMilestone = ({
  habitId,
  body,
}) => ({
  context,
  type: actions.createCustomerHabitMilestone,
  payload: {
    realm: "workout",
    actionPlanId: "Workout::1",
    habitId,
    body,
  },
});

export const getGroupLeaderBoard = ({ id, type }) => ({
  context,
  type: actions.getGroupLeaderBoard,
  payload: {
    id,
    type,
    realm: "workout",
  },
});

export const getAllCustomerHabits = actionPlanId => ({
  context,
  type: actions.getAllCustomerHabits,
  payload: {
    actionPlanId,
    realm: "workout",
  },
});

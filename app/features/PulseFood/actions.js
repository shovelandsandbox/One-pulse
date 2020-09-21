import screens from "./configs/screenNames";
import actions from "./configs/actionNames";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

const context = screens.PULSE_FOOD;

export const goToScreens = (params, screen) => ({
  type: CoreActionTypes.GO_TO_SCREEN,
  navigateTo: screen,
  payload: {
    params,
  },
});

export const updateCustomer = payload => ({
  context,
  type: actions.UPDATE_CUSTOMER,
  payload,
});

// Get customer's meal plan for a particular date
export const getCustomerMealPlan = payload => ({
  context,
  type: actions.GET_CUSTOMER_MEAL_PLAN,
  payload,
});

// create customer diet plan holder, if meal plan is empty
export const CreateCustomerDietPlan = () => ({
  context,
  type: actions.CREATE_CUSTOMER_DIET_PLAN,
});

// Update customer's meal plan for a particular date
export const updateCustomerMealPlan = payload => ({
  context,
  type: actions.UPDATE_CUSTOMER_MEAL_PLAN,
  payload,
});

// scan food item
export const scanFoodItem = payload => ({
  context,
  type: actions.SCAN_FOOD_ITEM,
  payload,
});

// Add food item to get item imageID
export const addFoodItem = payload => ({
  context,
  type: actions.ADD_FOOD_ITEM,
  payload,
});

// get All customer joined groups
export const getAllCustomerGroup = payload => ({
  context,
  type: actions.GET_ALL_CUSTOMER_GROUPS,
  payload,
});


// Join a Group community
export const joinGroup = payload => ({
  context,
  type: actions.JOIN_GROUP,
  payload,
});

// create post in group community
export const createGroupPost = payload => ({
  context,
  type: actions.CREATE_GROUP_POST,
  payload,
});

// create image from resource ID
export const getDocumentByResourceId = payload => ({
  context,
  type: actions.GET_DOCUMENT_BY_RESOURCE_ID,
  payload,
});

export const calculateBMI = payload => {
  console.log("payloadhuh",payload)
  return {
    context,
    type: actions.CALCULATE_BMI,
    payload,
  }
};

export const saveCurrentItemDocumentID = payload => ({
  context,
  type: actions.SAVE_CURRENTITEM_DOCUMENT_ID,
  payload,
});


export const eventNames = {
  updateMyPreferences: "updateMyPreferences",
  getMealPlanForDay: "getMealPlanForDay",
  changeRecipe: "changeRecipe",
  deleteItem: "deleteItem",
  searchItem: "searchItem",
  updateItem: "updateItem",
  createMealPlan: "createMealPlan",
  onRecipePress: "onRecipePress",
  mealPlanLaunch: "mealPlanLaunch",
  myMealPlanLaunch: "myMealPlanLaunch",
  connectUser: "connectUser",
  getCustomerMealPlans: "customerMealPlans",
  getCustomerPreference: "getCustomerPreference",
  onBackPress: "onBackPress",
  onNextPress: "onNextPress",
  mealPlannerExit: "mealPlannerExit",
};

export default {
  [eventNames.updateMyPreferences]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.mealPlanner.updateMyPreferences",
      tags: ["mealPlanner_updateMyPreferences"],
      attributes,
    }),
  },
  [eventNames.getMealPlanForDay]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.mealPlanner.getMealPlanForDay",
      tags: ["mealPlanner_getMealPlanForDay"],
      attributes,
    }),
  },
  [eventNames.changeRecipe]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.mealPlanner.changeRecipe",
      tags: ["mealPlanner_changeRecipe"],
      attributes,
    }),
  },
  [eventNames.deleteItem]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.mealPlanner.deleteItem",
      tags: ["mealPlanner_deleteItem"],
      attributes,
    }),
  },
  [eventNames.searchItem]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.mealPlanner.searchItem",
      tags: ["mealPlanner_searchItem"],
      attributes,
    }),
  },
  [eventNames.updateItem]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.mealPlanner.updateItem",
      tags: ["mealPlanner_updateItem"],
      attributes,
    }),
  },
  [eventNames.createMealPlan]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.mealPlanner.createMealPlan",
      tags: ["mealPlanner_createMealPlan"],
      attributes,
    }),
  },
  [eventNames.onRecipePress]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.mealPlanner.onRecipePress",
      tags: ["mealPlanner_onRecipePress"],
      attributes,
    }),
  },
  [eventNames.mealPlanLaunch]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.mealPlanner.mealPlanLaunch",
      tags: ["mealPlanner_mealPlanLaunch"],
      attributes,
    }),
  },
  [eventNames.myMealPlanLaunch]: {
    platform: attributes => ({
      type: "ClickEvent",
      name: "pulse.mealPlanner.myMealPlanLaunch",
      tags: ["mealPlanner_myMealPlanLaunch"],
      attributes,
    }),
  },
  [eventNames.connectUser]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.mealPlanner.connectUser",
      tags: ["mealPlanner_connectUser"],
    },
  },
  [eventNames.getCustomerMealPlans]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.mealPlanner.customerMealPlans",
      tags: ["mealPlanner_customerMealPlans"],
    },
  },
  [eventNames.getCustomerPreference]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.mealPlanner.getCustomerPreference",
      tags: ["mealPlanner_getCustomerPreference"],
    },
  },
  [eventNames.onBackPress]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.mealPlanner.onBackPress",
      tags: ["mealPlanner_onBackPress"],
    },
  },
  [eventNames.onNextPress]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.mealPlanner.onNextPress",
      tags: ["mealPlanner_onNextPress"],
    },
  },
  [eventNames.mealPlannerExit]: {
    platform: {
      type: "ClickEvent",
      name: "pulse.mealPlanner.mealPlannerExit",
      tags: ["mealPlanner_mealPlannerExit"],
    },
  },
};

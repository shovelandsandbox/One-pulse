import screens from "../configs/screen-names";
import actions from "../configs/actions";
import {
  CoreActionTypes,
  CoreConfig,
  CoreServices,
} from "@pru-rt-internal/pulse-common";
import { pathOr } from "ramda";
import { eventNames } from "../events";
const { NavigationService } = CoreServices;

const { pageKeys } = CoreConfig;

const dispatchEventForMealPlan = (store, eventName) => {
  return store.dispatch({
    context: pageKeys.COMMON,
    type: CoreActionTypes.SEND_EVENT,
    payload: {
      type: "ScreenEvent",
      name: "pulse.mealPlanner." + eventName,
      tags: ["mealPlanner_" + eventName],
    },
  });
};

export default {
  [screens.MealPlanner]: {
    [actions.connectUser]: {
      successAction: actions.connectUserSuccess,
      failureAction: actions.connectUserFailure,
      successHandler: (action, store) => {
        store.dispatch({
          type: CoreActionTypes.GO_TO_SCREEN,
          navigateTo: screens.MealPlanner,
        });
      },
      failureHandler: (action, store) => {
        const errorMsg = pathOr(
          null,
          ["payload", "response", "status", "shortCode"],
          action
        );
        if (errorMsg === "USER_ALREADY_CONNECTED") {
          // user already connected to spoonacular
          store.dispatch({
            type: actions.createCustomerMealPlan,
            context: screens.MealPlanOptions,
            payload: { type: "generate" },
            disableTimeout: true,
          });
          dispatchEventForMealPlan(store, eventNames.createMealPlan);
        } else {
          store.dispatch({
            type: actions.handleMealPlannerLaunchError,
            context: screens.MealPlanner,
          });
        }
      },
      toggleLoader: false,
    },
    [actions.updateCustomerPreference]: {
      successAction: actions.updateCustomerPreferenceSuccess,
      failureAction: actions.updateCustomerPreferenceFailure,
      successHandler: (action, store) => {
        const fromMyMealPlanner = pathOr(
          false,
          ["payload", "actionPayload", "fromMyMealPlanner"],
          action
        );
        if (!fromMyMealPlanner) {
          // called after updating preferences on tile click
          store.dispatch({
            type: actions.createCustomerMealPlan,
            context: screens.MealPlanOptions,
            payload: { type: "generate", resetStack: true },
            disableTimeout: true,
          });
        } else {
          // called after updating preferences from MyMealPlan
          NavigationService.navigate(screens.MyMealPlan);
        }
      },
      toggleLoader: false,
    },
    [actions.getCustomerPreference]: {
      successAction: actions.getCustomerPreferenceSuccess,
      failureAction: actions.getCustomerPreferenceFailure,
      successHandler: (action, store) => {
        // called from MyMealPlan screen only
        store.dispatch({
          type: CoreActionTypes.GO_TO_SCREEN,
          navigateTo: screens.MealPlanner,
          payload: {
            params: {
              fromMyMealPlanner: true,
            },
          },
        });
      },
      failureHandler: (action, store) => {
        store.dispatch({
          type: actions.handleMealPlannerLaunchError,
          context: screens.MealPlanner,
        });
      },
      toggleLoader: false,
    },
  },
  [screens.MealPlanOptions]: {
    [actions.createCustomerMealPlan]: {
      successAction: actions.createCustomerMealPlanSuccess,
      successHandler: (action, store) => {
        const { skipPostResponseHandler, resetStack } = pathOr(
          false,
          ["payload", "actionPayload"],
          action
        );
        if (!skipPostResponseHandler) {
          // called on tile click
          if (resetStack) {
            // called after updating preferences
            NavigationService.resetStack(screens.MyMealPlan);
          } else {
            // called without updating preferences
            store.dispatch({
              type: CoreActionTypes.GO_TO_SCREEN,
              navigateTo: "MyMealPlan",
            });
          }
        }
      },
      failureHandler: (action, store) => {
        const skipPostResponseHandler = pathOr(
          false,
          ["payload", "actionPayload", "skipPostResponseHandler"],
          action
        );
        if (!skipPostResponseHandler) {
          // called on tile click
          store.dispatch({
            type: actions.handleUpdatePreferenceError,
            context: screens.MealPlanner,
          });
        } else {
          // called from MyMealPlan
          store.dispatch({
            type: actions.createCustomerMealPlanFailure,
            context: screens.MealPlanOptions,
          });
        }
      },
      toggleLoader: false,
    },
  },
  [screens.MyMealPlan]: {
    [actions.getCustomerMealPlans]: {
      successAction: actions.getCustomerMealPlansSuccess,
      successHandler: (action, store) => {
        const body = pathOr(null, ["payload", "response", "body"], action);
        const skipPostResponseHandler = pathOr(
          false,
          ["payload", "actionPayload", "skipPostResponseHandler"],
          action
        );
        if (!skipPostResponseHandler) {
          // called on tile click
          dispatchEventForMealPlan(store, eventNames.getCustomerMealPlans);
          if (body) {
            // meal plan exists for that day
            store.dispatch({
              type: CoreActionTypes.GO_TO_SCREEN,
              navigateTo: screens.MyMealPlan,
            });
          } else {
            const state = store.getState();
            const spoonacularId = pathOr(
              null,
              ["profile", "externalIds", "spoonacular"],
              state
            );
            if (!spoonacularId) {
              // meal plan does not exist and user not connected to spoonacular
              store.dispatch({
                type: actions.connectUser,
                context: screens.MealPlanner,
                disableTimeout: true,
              });
              store.dispatch({
                type: actions.resetMealPlan,
                context: screens.MealPlanner,
                disableTimeout: true,
              });
              dispatchEventForMealPlan(store, eventNames.connectUser);
            } else {
              // meal plan does not exist and user connected to spoonacular
              store.dispatch({
                type: actions.createCustomerMealPlan,
                context: screens.MealPlanOptions,
                payload: { type: "generate" },
                disableTimeout: true,
              });
            }
          }
        }
      },
      failureHandler: (action, store) => {
        const statusCode = pathOr(
          "",
          ["payload", "response", "status", "code"],
          action
        );
        const skipPostResponseHandler = pathOr(
          false,
          ["payload", "actionPayload", "skipPostResponseHandler"],
          action
        );
        if (!skipPostResponseHandler) {
          // called on tile click
          dispatchEventForMealPlan(store, eventNames.getCustomerMealPlans);

          if (statusCode === 9060) {
            // user is not connected to spoonacular
            dispatchEventForMealPlan(store, eventNames.connectUser);
            store.dispatch({
              type: actions.connectUser,
              context: screens.MealPlanner,
              disableTimeout: true,
            });
            store.dispatch({
              type: actions.resetMealPlan,
              context: screens.MealPlanner,
              disableTimeout: true,
            });
          } else if (statusCode === 9040) {
            //  no meal plan for that day
            store.dispatch({
              type: actions.createCustomerMealPlan,
              context: screens.MealPlanOptions,
              payload: { type: "generate" },
              disableTimeout: true,
            });
          } else {
            store.dispatch({
              type: actions.handleMealPlannerLaunchError,
              context: screens.MealPlanner,
            });
          }
        }
        if (skipPostResponseHandler && statusCode !== 9040) {
          // called from MyMealPlan screen and error occured
          store.dispatch({
            type: actions.showErrorModal,
            context: screens.MealPlanner,
          });
        }
        store.dispatch({
          type: actions.getCustomerMealPlansFailure,
          context: screens.MyMealPlan,
          payload: {
            startDate: pathOr(
              "",
              ["payload", "request", "body", "startDate"],
              action
            ),
          },
        });
      },
      toggleLoader: false,
    },
    [actions.getCustomerMealPlanTemplates]: {
      successAction: actions.getCustomerMealPlanTemplatesSuccess,
      failureAction: actions.getCustomerMealPlanTemplatesFailure,
      toggleLoader: false,
    },
  },
  [screens.ChangeRecipe]: {
    [actions.updateFoodItem]: {
      successAction: actions.updateFoodItemSuccess,
      failureAction: actions.updateFoodItemFailure,
      toggleLoader: false,
    },
    [actions.analyseFood]: {
      successAction: actions.analyseFoodSuccess,
      failureAction: actions.analyseFoodFailure,
      successHandler: (action, store) => {
        store.dispatch({
          type: CoreActionTypes.GO_TO_SCREEN,
          navigateTo: screens.RecipeDetails,
          payload: {
            params: {
              slotName: pathOr(
                "",
                ["payload", "actionPayload", "slotName"],
                action
              ),
            },
          },
        });
      },
      toggleLoader: false,
    },
    [actions.deleteFoodItem]: {
      successAction: actions.deleteFoodItemSuccess,
      failureAction: actions.deleteFoodItemFailure,
      toggleLoader: false,
    },
    [actions.searchFoodItem]: {
      successAction: actions.searchFoodItemSuccess,
      failureAction: actions.searchFoodItemFailure,
      toggleLoader: false,
    },
  },
};

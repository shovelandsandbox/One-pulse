import actions from "./configs/actions";
import { path, pathOr } from "ramda";
import moment from "moment";

const INITIAL_STATE = {
  customerMealPlanTemplates: [],
  isUserConnected: false,
  customerMealPlan: {},
  showErrorMessage: false,
  userPreferences: {},
  showErrorMsgOnTileClick: false,
  showErrorMsgOnPreferenceUpdate: false,
  updatedRecipeId: undefined,
  recipeDetails: {},
  displayType: "myMealPlan",
};

// eslint-disable-next-line complexity
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.connectUserSuccess: {
      return {
        ...state,
        isUserConnected: true,
      };
    }
    case actions.connectUserFailure: {
      return {
        ...state,
      };
    }
    case actions.getCustomerMealPlanTemplatesSuccess: {
      return {
        ...state,
        customerMealPlanTemplates: pathOr(
          [],
          ["payload", "response", "body"],
          action
        ),
      };
    }
    case actions.getCustomerMealPlanTemplatesFailure: {
      return {
        ...state,
      };
    }
    case actions.getCustomerMealPlansSuccess: {
      const startDate = path(
        ["payload", "request", "body", "startDate"],
        action
      );
      const isDayInFuture = moment().isBefore(startDate);
      const body = pathOr(null, ["payload", "response", "body"], action);
      return {
        ...state,
        customerMealPlans: {
          ...state.customerMealPlans,
          [startDate]: body || {},
        },
        showMealLoader: false,
        displayType: body || !isDayInFuture ? "myMealPlan" : "createMealPlan",
      };
    }
    case actions.createCustomerMealPlanSuccess: {
      const startDate = path(
        ["payload", "request", "body", "startDate"],
        action
      );
      return {
        ...state,
        customerMealPlans: {
          ...state.customerMealPlans,
          [startDate]: pathOr({}, ["payload", "response", "body"], action),
        },
        showMealLoader: false,
        displayType: "myMealPlan",
      };
    }
    case actions.getCustomerMealPlansFailure: {
      const startDate = pathOr("", ["payload", "startDate"], action);
      const isDayInFuture = moment().isBefore(startDate);
      return {
        ...state,
        showMealLoader: false,
        displayType: !isDayInFuture ? "myMealPlan" : "createMealPlan",
      };
    }
    case actions.showErrorModal: {
      return {
        ...state,
        showErrorMessage: true,
      };
    }
    case actions.currentSelectedRecipe: {
      return {
        ...state,
        currentSelectedRecipe: action.payload,
      };
    }
    case actions.clearState: {
      return {
        ...state,
        changeRecipeFail: false,
        updatedRecipeId: undefined,
      };
    }
    case actions.createCustomerMealPlanFailure: {
      return {
        ...state,
        showErrorMessage: true,
        displayType: "createMealPlan",
      };
    }
    case actions.updateFoodItemSuccess: {
      return {
        ...state,
        updatedRecipeId: pathOr(
          "",
          ["payload", "response", "body", "id"],
          action
        ),
      };
    }
    case actions.updateFoodItemFailure: {
      return {
        ...state,
        changeRecipeFail: true,
      };
    }
    case actions.deleteFoodItemSuccess: {
      return {
        ...state,
      };
    }
    case actions.deleteFoodItemFailure: {
      return {
        ...state,
        changeRecipeFail: true,
      };
    }
    case actions.searchFoodItemSuccess: {
      return {
        ...state,
        searchResult: pathOr([], ["payload", "response", "body"], action),
      };
    }
    case actions.searchFoodItemFailure: {
      return {
        ...state,
        searchResult: [],
        changeRecipeFail: true,
      };
    }
    case actions.analyseFoodSuccess: {
      return {
        ...state,
        recipeDetails: pathOr({}, ["payload", "response", "body"], action),
      };
    }
    case actions.analyseFoodFailure: {
      return {
        ...state,
        showErrorMessage: true,
      };
    }
    case actions.disableErrorModal: {
      return {
        ...state,
        showErrorMessage: false,
      };
    }
    case actions.resetMealPlan: {
      return {
        ...INITIAL_STATE,
      };
    }
    case actions.updateCustomerPreferenceSuccess: {
      return {
        ...state,
        userPreferences: pathOr({}, ["payload", "request", "body"], action),
      };
    }
    case actions.getCustomerPreferenceSuccess: {
      return {
        ...state,
        userPreferences: pathOr({}, ["payload", "response", "body"], action),
      };
    }
    case actions.handleMealPlannerLaunchError: {
      return {
        ...state,
        showErrorMsgOnTileClick: true,
      };
    }
    case actions.resetMealPlannerLaunchError: {
      return {
        ...state,
        showErrorMsgOnTileClick: false,
      };
    }
    case actions.updateCustomerPreferenceFailure: {
      return {
        ...state,
        showErrorMsgOnPreferenceUpdate: true,
      };
    }
    case actions.handleUpdatePreferenceError: {
      return {
        ...state,
        showErrorMsgOnPreferenceUpdate: true,
      };
    }
    case actions.resetUpdatePreferenceError: {
      return {
        ...state,
        showErrorMsgOnPreferenceUpdate: false,
      };
    }
    case actions.enableLoader: {
      return {
        ...state,
        displayType: "createPlanIndicator",
      };
    }
    case actions.enableMealLoader: {
      return {
        ...state,
        showMealLoader: true,
        displayType: "myMealPlan",
      };
    }
    case actions.disableMealLoader: {
      return {
        ...state,
        showMealLoader: false,
      };
    }
    default:
      return state;
  }
};

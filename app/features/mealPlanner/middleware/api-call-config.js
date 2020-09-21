import screens from "../configs/screen-names";
import actions from "../configs/actions";
import { buildPayload } from "../../../utils/apiUtils";
import moment from "moment";

export default {
  [screens.MealPlanner]: {
    [actions.connectUser]: {
      payloadBuilder: store => {
        const params = {
          realm: "food",
        };

        return buildPayload(store, "createCustomer", null, null, params);
      },
      loader: true,
    },
    [actions.updateCustomerPreference]: {
      payloadBuilder: (store, action) => {
        const body = {
          meta: {
            ...action.payload,
          },
        };
        const params = {
          realm: "food",
        };

        return buildPayload(
          store,
          "updateCustomerPreference",
          null,
          body,
          params
        );
      },
      loader: true,
    },
    [actions.getCustomerPreference]: {
      payloadBuilder: store => {
        const params = {
          realm: "food",
        };
        return buildPayload(store, "getCustomerDietPlan", null, {}, params);
      },
      loader: true,
    },
  },
  [screens.MealPlanOptions]: {
    [actions.createCustomerMealPlan]: {
      payloadBuilder: (store, action) => {
        const body = {
          id: action?.payload?.id,
          startDate:
            action?.payload?.startDate || moment().format("YYYY-MM-DD"),
          type: action?.payload?.type,
        };

        return buildPayload(store, "createCustomerMealPlan", null, body, {});
      },
      loader: false,
    },
  },
  [screens.MyMealPlan]: {
    [actions.getCustomerMealPlans]: {
      payloadBuilder: (store, action) => {
        const startDate =
          action?.payload?.startDate || moment().format("YYYY-MM-DD");
        const body = {
          startDate,
          type: "customer",
        };

        return buildPayload(store, "getCustomerMealPlans", null, body, {});
      },
    },
    [actions.getCustomerMealPlanTemplates]: {
      payloadBuilder: store => {
        const body = {
          type: "template",
          template: "user",
        };

        return buildPayload(store, "getCustomerMealPlans", null, body, {});
      },
      loader: true,
    },
  },
  [screens.ChangeRecipe]: {
    [actions.updateFoodItem]: {
      payloadBuilder: (store, action) => {
        const body = action.payload;
        return buildPayload(store, "createCustomerMealPlan", null, body, {});
      },
      loader: true,
    },
    [actions.analyseFood]: {
      payloadBuilder: (store, action) => {
        const body = action.payload;
        return buildPayload(store, "analyseFood", null, body, {});
      },
      loader: true,
    },
    [actions.deleteFoodItem]: {
      payloadBuilder: (store, action) => {
        const body = action.payload;
        return buildPayload(store, "updateCustomerMealPlan", null, body, {});
      },
      loader: true,
    },
    [actions.searchFoodItem]: {
      payloadBuilder: (store, action) => {
        const body = action.payload;
        return buildPayload(store, "findFoodItemsByCriteria", null, body, {});
      },
      // loader: true,
    },
  },
};

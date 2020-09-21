import { screenNames } from "../screenNames";
import * as FoodSearchActions from "../actionNames";
import { buildPayload } from "../../utils";

const foodSearchApiCall = {
    [screenNames.FOOD_SEARCH]: {
        [FoodSearchActions.GET_TOP_SEARCHES]: {
            payloadBuilder: (store, action) => {

                let state = store.getState()
                let lang = state.userPreferences.language === "TW" ? "TW" : "EN-MY"

                return buildPayload(store, "getCustomerMealPlans", null, null, {
                    realm: "cca",
                    lang: lang,
                    searchType: "topkeywords"
                });

            },
            loader: true
        },

        [FoodSearchActions.GET_SEARCH_RESULTS]: {
            payloadBuilder: (store, action) => {

                let state = store.getState()
                let lang = state.userPreferences.language === "TW" ? "TW" : "EN-MY"

                return buildPayload(store, "getCustomerMealPlans", null, null, {
                    realm: "cca",
                    lang: lang,
                    searchType: "keyword",
                    keyword: action.payload.keyword
                });

            },
            loader: true
        },

        [FoodSearchActions.GET_FOOD_DETAILS]: {
            payloadBuilder: (store, action) => {

                let state = store.getState()
                let lang = state.userPreferences.language === "TW" ? "TW" : "EN-MY"

                return buildPayload(store, "getCustomerMealPlans", null, null, {
                    realm: "cca",
                    lang: lang,
                    searchType: "food",
                    foodId: action.payload.foodId
                });

            },
            loader: true
        }
    },

};

export default foodSearchApiCall;
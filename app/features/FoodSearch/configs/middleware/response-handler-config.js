import { screenNames } from "../screenNames";
import * as FoodSearchActions from "../actionNames";

const foodSearchApiResponse = {
    [screenNames.FOOD_SEARCH]: {
        [FoodSearchActions.GET_TOP_SEARCHES]: {
            successAction: FoodSearchActions.GET_TOP_SEARCHES_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response.body;
            },
            failureAction: FoodSearchActions.GET_TOP_SEARCHES_FAILURE,
            failureHook: payload => {
                return {
                    errorMsg: payload.response.status.message,
                    errorCode: payload.response.status.code,
                };
            },
            toggleLoader: false,
        },

        [FoodSearchActions.GET_SEARCH_RESULTS]: {
            successAction: FoodSearchActions.GET_SEARCH_RESULTS_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response.body;
            },
            failureAction: FoodSearchActions.GET_SEARCH_RESULTS_FAILURE,
            failureHook: payload => {
                return {
                    errorMsg: payload.response.status.message,
                    errorCode: payload.response.status.code,
                };
            },
            toggleLoader: false,
        },

        [FoodSearchActions.GET_FOOD_DETAILS]: {
            successAction: FoodSearchActions.GET_FOOD_DETAILS_SUCCESS,
            postSuccessHook: (payload, state) => {
                return payload.response;
            },
            failureAction: FoodSearchActions.GET_FOOD_DETAILS_FAILURE,
            failureHook: payload => {
                return {
                    errorMsg: payload.response.status.message,
                    errorCode: payload.response.status.code,
                };
            },
            toggleLoader: false,
        }
    },

};

export default foodSearchApiResponse;

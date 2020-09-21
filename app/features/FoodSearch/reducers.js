import * as FoodSearchActions from './configs/actionNames';
import { pathOr, isEmpty } from "ramda"

const INITIAL_STATE = {
    topSearches: [],
    searchResults: [],
    isSearchResponseReceived: false,
    foodDetails: []
};

const foodSearchReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case FoodSearchActions.GET_TOP_SEARCHES:
            return {
                ...state,
            };
        case FoodSearchActions.GET_TOP_SEARCHES_SUCCESS:
            const foodItems = pathOr([], [0, "foodItems", "ccaFood"], action.payload)
            const topTwentySearches = !isEmpty(foodItems) ? foodItems.slice(0, 20) : []
            return {
                ...state,
                topSearches: topTwentySearches,
            };
        case FoodSearchActions.GET_TOP_SEARCHES_FAILURE:
            return {
                ...state,
            };


        case FoodSearchActions.GET_SEARCH_RESULTS:
            return {
                ...state,
            };
        case FoodSearchActions.GET_SEARCH_RESULTS_SUCCESS:
            return {
                ...state,
                searchResults: pathOr([], [0, "foodItems", "ccaFood"], action.payload),
                isSearchResponseReceived: true
            };
        case FoodSearchActions.GET_SEARCH_RESULTS_FAILURE:
            return {
                ...state,
                isSearchResponseReceived: true
            };

        case FoodSearchActions.CLEAR_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: [],
                isSearchResponseReceived: false
            };


        case FoodSearchActions.GET_FOOD_DETAILS:
            return {
                ...state,
            };
        case FoodSearchActions.GET_FOOD_DETAILS_SUCCESS:
            return {
                ...state,
                foodDetails: pathOr([], ["body"], action.payload),
                searchResults: [],
                isSearchResponseReceived: false,
            };
        case FoodSearchActions.GET_FOOD_DETAILS_FAILURE:
            return {
                ...state,
            };


        default:
            return state;
    }

};

export default foodSearchReducer;
import { screenNames } from "./configs/screenNames"
import * as FoodSearchActions from "./configs/actionNames"

export const goToFoodSearch = payload => ({
    type: FoodSearchActions.GO_TO_SCREEN,
    navigateTo: screenNames.FOOD_SEARCH,
    payload: {
        params: payload
    }
});

export const goToFoodSearchResult = payload => ({
    type: FoodSearchActions.GO_TO_SCREEN,
    navigateTo: screenNames.FOOD_SEARCH_RESULT,
    payload: {
        params: payload
    }
});

export const goToCCA = payload => ({
    type: FoodSearchActions.GO_TO_SCREEN,
    navigateTo: "CCAJourney",
    payload: {
        params: payload
    }
});

export const getTopSearches = payload => ({
    context: screenNames.FOOD_SEARCH,
    type: FoodSearchActions.GET_TOP_SEARCHES,
    payload: payload
});

export const getSearchResults = payload => ({
    context: screenNames.FOOD_SEARCH,
    type: FoodSearchActions.GET_SEARCH_RESULTS,
    payload: payload
});

export const clearSearchResults = payload => ({
    context: screenNames.FOOD_SEARCH,
    type: FoodSearchActions.CLEAR_SEARCH_RESULTS,
    payload: payload
});

export const getFoodDetails = payload => ({
    context: screenNames.FOOD_SEARCH,
    type: FoodSearchActions.GET_FOOD_DETAILS,
    payload: payload
});
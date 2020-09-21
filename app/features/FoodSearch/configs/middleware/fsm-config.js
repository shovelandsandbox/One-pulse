import { screenNames } from "../screenNames";
import * as FoodSearchActions from "../actionNames";
import { getPayloadForNavigation } from "../../utils"
import { CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;

const foodSearchFsmConfig = {
    [screenNames.FOOD_SEARCH]: {
        [FoodSearchActions.GET_FOOD_DETAILS_SUCCESS]: ({ action }) => {
            const navigateTo = screenNames.FOOD_SEARCH_RESULT;
            return getPayloadForNavigation(action, navigateTo, null);
        }
    },
};

export default foodSearchFsmConfig;
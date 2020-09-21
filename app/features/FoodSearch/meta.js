import {
    CoreConfig,
    metaHelpers as helpers
} from "@pru-rt-internal/pulse-common";

const {
    FOOD_SEARCH,
    FOOD_SEARCH_HEADING,
    FOOD_SEARCH_SEARCH,
    FOOD_SEARCH_OOPS,
    FOOD_SEARCH_AVAIL,
    FOOD_SEARCH_DATABASE,
    FOOD_SEARCH_SELECT,
    FOOD_SEARCH_TOP_KEYWORDS,
    FOOD_SEARCH_ENTER_FOOD_NAME,
    FOOD_SEARCH_PROVIDED,
    FOOD_SEARCH_PCA_LIFE,
    FOOD_SEARCH_RESEARCH_CENTER,
    FOOD_SEARCH_CONSTI,
    FOOD_SEARCH_FOOD_NAME,
    FOOD_SEARCH_SUITABLE_BODY,
    FOOD_SEARCH_UNSUITABLE_BODY,
    FOOD_SEARCH_UNDERSTAND_FOOD,
    FOOD_SEARCH_CHARACTERSTICS,
    FOOD_SEARCH_SEASON,
    FOOD_SEARCH_RECIPES,
    FOOD_SEARCH_OTHER,
    FOOD_SEARCH_GO,
    FOOD_SEARCH_UNDERSTAND,
    FOOD_SEARCH_RESULT,
    FOOD_SEARCH_SHOWING_RESULT,
    FOOD_SEARCH_VALID_FOOD_NAME,
} = CoreConfig;

const fetchLabel = (value, defaultValue) =>
    value.label ? value.label : defaultValue;

const initializeFoodSearchScreenMeta = () => {

    return {
        foodSearchHeading: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_HEADING),
            "foodSearchHeading"
        ),
        foodSearchTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_SEARCH),
            "foodSearchTxt"
        ),
        foodSearchOopsTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_OOPS),
            "foodSearchOopsTxt"
        ),
        foodSearchAvailTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_AVAIL),
            "foodSearchAvailTxt"
        ),
        foodSearchDatabaseTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_DATABASE),
            "foodSearchDatabaseTxt"
        ),
        foodSearchSelectTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_SELECT),
            "foodSearchSelectTxt"
        ),
        foodSearchTopKeywords: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_TOP_KEYWORDS),
            "foodSearchTopKeywords"
        ),
        foodSearchEnterFoodName: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_ENTER_FOOD_NAME),
            "foodSearchEnterFoodName"
        ),
        foodSearchProvidedByTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_PROVIDED),
            "foodSearchProvidedByTxt"
        ),

        foodSearchPcaLifeTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_PCA_LIFE),
            "foodSearchPcaLifeTxt"
        ),
        foodSearchResearchCenter: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_RESEARCH_CENTER),
            "foodSearchResearchCenter"
        ),
        foodSearchConstiTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_CONSTI),
            "foodSearchConstiTxt"
        ),
        foodSearchFoodName: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_FOOD_NAME),
            "foodSearchFoodName"
        ),
        foodSearchSuitableBody: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_SUITABLE_BODY),
            "foodSearchSuitableBody"
        ),
        foodSearchUnsuitableBody: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_UNSUITABLE_BODY),
            "foodSearchUnsuitableBody"
        ),
        foodSearchUnderstandFood: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_UNDERSTAND_FOOD),
            "foodSearchUnderstandFood"
        ),
        foodSearchCharacteristics: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_CHARACTERSTICS),
            "foodSearchCharacteristics"
        ),
        foodSearchSeasonTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_SEASON),
            "foodSearchSeasonTxt"
        ),
        foodSearchRecipesTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_RECIPES),
            "foodSearchRecipesTxt"
        ),
        foodSearchOthersTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_OTHER),
            "foodSearchOthersTxt"
        ),
        foodSearchGoTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_GO),
            "foodSearchGoTxt"
        ),
        foodSearchUnderstandTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_UNDERSTAND),
            "foodSearchUnderstandTxt"
        ),
        foodSearchResultTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_RESULT),
            "foodSearchResultTxt"
        ),
        foodSearchShowingResultTxt: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_SHOWING_RESULT),
            "foodSearchShowingResultTxt"
        ),
        foodSearchValidFoodName: fetchLabel(
            helpers.findElement(FOOD_SEARCH, FOOD_SEARCH_VALID_FOOD_NAME),
            "foodSearchValidFoodName"
        ),
    };
};

export default { initializeFoodSearchScreenMeta };
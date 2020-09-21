import {
    metaHelpers,
    CoreConstants
} from "@pru-rt-internal/pulse-common";

const {
    WRINKLE_INDEX_RESULTS,
    WRINKLE_IDX_RESULTS_SHARE,
    WRINKLE_IDX_RESULTS_VIEW_MORE,
    WRINKLE_IDX_RESULTS_WRINKLE_STATUS,
    WRINKLE_IDX_RESULTS_GOOD_SIGN,
    ZERO_TO_NINE,
    TEN_TO_TWENTY_NINE,
    THIRTY_TO_FORTY_NINE,
    FIFTY_TO_SIXTY_NINE,
    SEVENTY_TO_EIGHTY_NINE,
    NINTY_TO_HUNDRED,
    NO_VISIBLE_WRINKLE,
    SHALLOW_WRINKLE,
    MODERATE_WRINKLE,
    DEEP_WRINKLE,
    SEVERE_WRINKLE,
    WRINKLE_INDEX,
    CLASSIFICATION,
    AGE,
    WRINKLE_VALUE_GUIDE,
    VALUE_IN_PERCENTAGE,
    DESCRIPTION,
    SOME_WRINKLE,
} = CoreConstants;

const findElement = metaHelpers.findElement;
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen =
    metaHelpers.findBackendErrorMessageByScreen;

const initializeScreenMeta = () => {
    const wrinkleIdxResultsShareLabel = findElement(WRINKLE_INDEX_RESULTS, WRINKLE_IDX_RESULTS_SHARE).label;
    const wrinkleIdxResultsViewMoreLabel = findElement(WRINKLE_INDEX_RESULTS, WRINKLE_IDX_RESULTS_VIEW_MORE).label;
    const wrinkleIdxResultsWrinkleStatusLabel = findElement(WRINKLE_INDEX_RESULTS, WRINKLE_IDX_RESULTS_WRINKLE_STATUS).label;
    const wrinkleIdxResultsGoodSignLabel = findElement(WRINKLE_INDEX_RESULTS, WRINKLE_IDX_RESULTS_GOOD_SIGN).label;
    const zeroToNineLabel = findElement(WRINKLE_INDEX_RESULTS, ZERO_TO_NINE).label;
    const tenToTwentyNineLabel = findElement(WRINKLE_INDEX_RESULTS, TEN_TO_TWENTY_NINE).label;
    const thirtyToFortyNineLabel = findElement(WRINKLE_INDEX_RESULTS, THIRTY_TO_FORTY_NINE).label;
    const fiftyToSixtyNineLabel = findElement(WRINKLE_INDEX_RESULTS, FIFTY_TO_SIXTY_NINE).label;
    const seventyToEightyNineLabel = findElement(WRINKLE_INDEX_RESULTS, SEVENTY_TO_EIGHTY_NINE).label;
    const nintyToHundredLabel = findElement(WRINKLE_INDEX_RESULTS, NINTY_TO_HUNDRED).label;
    const noVisiblyWrinkleLabel = findElement(WRINKLE_INDEX_RESULTS, NO_VISIBLE_WRINKLE).label;
    const shallowWrinkleLabel = findElement(WRINKLE_INDEX_RESULTS, SHALLOW_WRINKLE).label;
    const moderateWrinkleLabel = findElement(WRINKLE_INDEX_RESULTS, MODERATE_WRINKLE).label;
    const deepWrinkleLabel = findElement(WRINKLE_INDEX_RESULTS, DEEP_WRINKLE).label;
    const severeWrinkleLabel = findElement(WRINKLE_INDEX_RESULTS, SEVERE_WRINKLE).label;
    const wrinkleIndexLabel = findElement(WRINKLE_INDEX_RESULTS, WRINKLE_INDEX).label;
    const classificationLabel = findElement(WRINKLE_INDEX_RESULTS, CLASSIFICATION).label;
    const ageLabel = findElement(WRINKLE_INDEX_RESULTS, AGE).label;
    const wrinkleValueGuideLabel = findElement(WRINKLE_INDEX_RESULTS, WRINKLE_VALUE_GUIDE).label;
    const valueInPercentageLabel = findElement(WRINKLE_INDEX_RESULTS, VALUE_IN_PERCENTAGE).label;
    const descriptionLabel = findElement(WRINKLE_INDEX_RESULTS, DESCRIPTION).label;
    const someWrinkleLabel = findElement(WRINKLE_INDEX_RESULTS, SOME_WRINKLE).label;
    return {
        wrinkleIdxResultsShareLabel,
        wrinkleIdxResultsViewMoreLabel,
        wrinkleIdxResultsWrinkleStatusLabel,
        wrinkleIdxResultsGoodSignLabel,
        zeroToNineLabel,
        tenToTwentyNineLabel,
        thirtyToFortyNineLabel,
        fiftyToSixtyNineLabel,
        seventyToEightyNineLabel,
        nintyToHundredLabel,
        noVisiblyWrinkleLabel,
        shallowWrinkleLabel,
        moderateWrinkleLabel,
        deepWrinkleLabel,
        severeWrinkleLabel,
        wrinkleIndexLabel,
        classificationLabel,
        ageLabel,
        wrinkleValueGuideLabel,
        valueInPercentageLabel,
        descriptionLabel,
        someWrinkleLabel,
    };
};

export default MetaConstants = {
    findElement,
    findCommon,
    findErrorMessage,
    findCommonErrorMessages,
    findBackendErrorMessage,
    findBackendErrorMessageByScreen,
    initializeScreenMeta
};

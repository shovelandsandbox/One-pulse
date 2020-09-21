import {
    metaHelpers,
    CoreConstants
} from "@pru-rt-internal/pulse-common";

const {
    BMI_RESULTS,
    BMI_RESULTS_MALE,
    BMI_RESULTS_FEMALE,
    BMI_RESULTS_SHARE,
    BMI_RESULTS_YOUR_RESULT,
    BMI_RESULTS_GOT_RIGHT,
    BMI_RESULTS_NORMAL_BMI,
    BMI_RESULTS_AGE,
    BMI_RESULTS_GENDER,
    BMI_RESULTS_HEIGHT,
    BMI_RESULTS_CM,
    BMI_RESULTS_FT,
    BMI_RESULTS_WEIGHT,
    BMI_RESULTS_KGS,
    BMI_RESULTS_LBS,

    WRINKLE_INDEX_RESULTS,
    WRINKLE_IDX_RESULTS_SHARE,
    WRINKLE_IDX_RESULTS_VIEW_MORE,
    WRINKLE_IDX_RESULTS_WRINKLE_STATUS,
    WRINKLE_IDX_RESULTS_GOOD_SIGN,
    BMI_INDEX_GUIDE,
    BMI_VALUE,
    LESS_THAN_EIGHTEEN_POINT_FIVE,
    EIGHTEEN_POINT_FIVE_TO_TWENTY_FIVE,
    FROM_TWENTY_FIVE_TO_THIRTY,
    OVER_THIRTY,
    BMI_UNDER_WEIGHT,
    BMI_NORMAL,
    BMI_OVER_WEIGHT,
    BMI_OBESE,
    BMI,
    DESCRIPTION,
    CLASSIFICATION,
    AGE,
} = CoreConstants;

const findElement = metaHelpers.findElement;
const findCommon = metaHelpers.findCommon;
const findErrorMessage = metaHelpers.findErrorMessage;
const findCommonErrorMessages = metaHelpers.findCommonErrorMessages;
const findBackendErrorMessage = metaHelpers.findBackendErrorMessage;
const findBackendErrorMessageByScreen =
    metaHelpers.findBackendErrorMessageByScreen;

const initializeScreenMeta = () => {
    const bmiResultsMaleLabel = findElement(BMI_RESULTS, BMI_RESULTS_MALE).label;
    const bmiResultsFemaleLabel = findElement(BMI_RESULTS, BMI_RESULTS_FEMALE).label;
    const bmiResultsShareLabel = findElement(BMI_RESULTS, BMI_RESULTS_SHARE).label;
    const bmiResultsYourResultLabel = findElement(BMI_RESULTS, BMI_RESULTS_YOUR_RESULT).label;
    const bmiResultsGotRightLabel = findElement(BMI_RESULTS, BMI_RESULTS_GOT_RIGHT).label;
    const bmiResultsNormalBmiLabel = findElement(BMI_RESULTS, BMI_RESULTS_NORMAL_BMI).label;
    const bmiResultsAgeLabel = findElement(BMI_RESULTS, BMI_RESULTS_AGE).label;
    const bmiResultsGenderLabel = findElement(BMI_RESULTS, BMI_RESULTS_GENDER).label;
    const bmiResultsHeightLabel = findElement(BMI_RESULTS, BMI_RESULTS_HEIGHT).label;
    const bmiResultsCmLabel = findElement(BMI_RESULTS, BMI_RESULTS_CM).label;
    const bmiResultsFtLabel = findElement(BMI_RESULTS, BMI_RESULTS_FT).label;
    const bmiResultsWeightLabel = findElement(BMI_RESULTS, BMI_RESULTS_WEIGHT).label;
    const bmiResultsKgsLabel = findElement(BMI_RESULTS, BMI_RESULTS_KGS).label;
    const bmiResultsLbLabel = findElement(BMI_RESULTS, BMI_RESULTS_LBS).label;
    const wrinkleIdxResultsShareLabel = findElement(WRINKLE_INDEX_RESULTS, WRINKLE_IDX_RESULTS_SHARE).label;
    const wrinkleIdxResultsViewMoreLabel = findElement(WRINKLE_INDEX_RESULTS, WRINKLE_IDX_RESULTS_VIEW_MORE).label;
    const wrinkleIdxResultsWrinkleStatusLabel = findElement(WRINKLE_INDEX_RESULTS, WRINKLE_IDX_RESULTS_WRINKLE_STATUS).label;
    const wrinkleIdxResultsGoodSignLabel = findElement(WRINKLE_INDEX_RESULTS, WRINKLE_IDX_RESULTS_GOOD_SIGN).label;
    const descriptionLabel = findElement(WRINKLE_INDEX_RESULTS, DESCRIPTION).label;
    const classificationLabel = findElement(WRINKLE_INDEX_RESULTS, CLASSIFICATION).label;
    const ageLabel = findElement(WRINKLE_INDEX_RESULTS, AGE).label;
    const bmiIndexGuideLabel = findElement(BMI_RESULTS, BMI_INDEX_GUIDE).label;
    const bmiValueLabel = findElement(BMI_RESULTS, BMI_VALUE).label;
    const lessThanEighteenPointFiveLabel = findElement(BMI_RESULTS, LESS_THAN_EIGHTEEN_POINT_FIVE).label;
    const eighteenPointFiveToTwentyFiveLabel = findElement(BMI_RESULTS, EIGHTEEN_POINT_FIVE_TO_TWENTY_FIVE).label;
    const fromTwentyFiveTOThirtyLabel = findElement(BMI_RESULTS, FROM_TWENTY_FIVE_TO_THIRTY).label;
    const overThirtyLabel = findElement(BMI_RESULTS, OVER_THIRTY).label;
    const bmiUnderWeightLabel = findElement(BMI_RESULTS, BMI_UNDER_WEIGHT).label;
    const bmiNormalLabel = findElement(BMI_RESULTS, BMI_NORMAL).label;
    const bmiOverWeightLabel = findElement(BMI_RESULTS, BMI_OVER_WEIGHT).label;
    const bmiObeseLabel = findElement(BMI_RESULTS, BMI_OBESE).label;
    const bmiLabel = findElement(BMI_RESULTS, BMI).label;
    return {
        bmiResultsMaleLabel,
        bmiResultsFemaleLabel,
        bmiResultsShareLabel,
        bmiResultsYourResultLabel,
        bmiResultsGotRightLabel,
        bmiResultsNormalBmiLabel,
        bmiResultsAgeLabel,
        bmiResultsGenderLabel,
        bmiResultsHeightLabel,
        bmiResultsCmLabel,
        bmiResultsFtLabel,
        bmiResultsWeightLabel,
        bmiResultsKgsLabel,
        bmiResultsLbLabel,
        wrinkleIdxResultsShareLabel,
        wrinkleIdxResultsViewMoreLabel,
        wrinkleIdxResultsWrinkleStatusLabel,
        wrinkleIdxResultsGoodSignLabel,
        bmiIndexGuideLabel,
        bmiValueLabel,
        lessThanEighteenPointFiveLabel,
        eighteenPointFiveToTwentyFiveLabel,
        fromTwentyFiveTOThirtyLabel,
        overThirtyLabel,
        bmiUnderWeightLabel,
        bmiNormalLabel,
        bmiOverWeightLabel,
        bmiObeseLabel,
        bmiLabel,
        descriptionLabel,
        classificationLabel,
        ageLabel
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

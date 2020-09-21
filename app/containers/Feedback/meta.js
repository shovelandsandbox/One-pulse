import {
  CoreConfig,
  metaHelpers as helpers
} from "@pru-rt-internal/pulse-common";

const {
  NEW_PROVIDEFEEDBACK,
  FEEDBACKISREQUIRED,
  NEW_PROVIDEFEEDBACK_SUBMIT,
  COMMON_ERROR_KEY_GENERIC_ERROR,
  NEW_FEEDBACK_TITLE,
  NEW_PROVIDEFEEDBACK_GOOD,
  NEW_PROVIDEFEEDBACK_VGOOD,
  NEW_PROVIDEFEEDBACK_AVERAGE,
  NEW_PROVIDEFEEDBACK_VPOOR,
  NEW_PROVIDEFEEDBACK_POOR,
  NEW_PROVIDEFEEDBACK_WENTWRONG,
  NEW_PROVIDEFEEDBACK_WENTGOOD,
  NEW_PROVIDEFEEDBACK_CANIMPROVE,
  SHARE_THOUGHTS,
  FEEDBACK_IMPROVE
} = CoreConfig;

const initializeScreenMeta = () => {
  return {
    SCREEN_PROVIDEFEEDBACK_SUBMIT: helpers.findElement(NEW_PROVIDEFEEDBACK, NEW_PROVIDEFEEDBACK_SUBMIT).label,
    SCREEN_PROVIDEFEEDBACK_FEEDBACKISREQUIRED: helpers.findErrorMessage(
      helpers.findElement(NEW_PROVIDEFEEDBACK),
      FEEDBACKISREQUIRED
    ).message,
    FEEDBACK_TITLE: helpers.findElement(NEW_PROVIDEFEEDBACK, NEW_FEEDBACK_TITLE).label,
    FEEDBACK_VERYGOOD: helpers.findElement(NEW_PROVIDEFEEDBACK, NEW_PROVIDEFEEDBACK_VGOOD).label,
    FEEDBACK_GOOD: helpers.findElement(NEW_PROVIDEFEEDBACK, NEW_PROVIDEFEEDBACK_GOOD).label,
    FEEDBACK_AVERAGE: helpers.findElement(NEW_PROVIDEFEEDBACK, NEW_PROVIDEFEEDBACK_AVERAGE).label,
    FEEDBACK_VERYPOOR: helpers.findElement(NEW_PROVIDEFEEDBACK, NEW_PROVIDEFEEDBACK_VPOOR).label,
    FEEDBACK_POOR: helpers.findElement(NEW_PROVIDEFEEDBACK, NEW_PROVIDEFEEDBACK_POOR).label,
    FEEDBACK_WHATTO_IMPROVE: helpers.findElement(NEW_PROVIDEFEEDBACK, NEW_PROVIDEFEEDBACK_CANIMPROVE).label,
    FEEDBACK_WENTGOOD: helpers.findElement(NEW_PROVIDEFEEDBACK, NEW_PROVIDEFEEDBACK_WENTGOOD).label,
    COMMON_ERROR_KEY_GENERIC_ERROR: helpers.findCommonErrorMessages(COMMON_ERROR_KEY_GENERIC_ERROR).message,
    SHARE_THOUGHTS: helpers.findElement(NEW_PROVIDEFEEDBACK, SHARE_THOUGHTS).label,
    FEEDBACK_IMPROVE: helpers.findElement(NEW_PROVIDEFEEDBACK, FEEDBACK_IMPROVE).label,
  }
};

export default MetaConstants = {
  initializeScreenMeta
};

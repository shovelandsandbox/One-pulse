import {
  metaHelpers as helpers
} from "@pru-rt-internal/pulse-common";
import {
  APP_RATING_EXPERIENCE,
  APP_RATING_TITLE,
  APP_RATING_THANKS,
  APP_RATING_SUBMIT,
  APP_RATING_SKIP,
  APP_RATING_ALERT_MSG,
  APP_RATING_SCREEN_KEY
} from "./metaConstants";
import { path } from "ramda";

getMetaLabel = (elementKey, defaultValue) => {
  let returnValue = defaultValue;
  const metaObj = helpers.findElement(APP_RATING_SCREEN_KEY, elementKey);
  if (metaObj) {
    returnValue = path(["label"], metaObj);
    returnValue = returnValue && returnValue !== elementKey ? returnValue : defaultValue;
  }
  return returnValue;
};

const initializeScreenMeta = () => {
  return {
    AppratingExperience:getMetaLabel(APP_RATING_EXPERIENCE, "How was your Experience?"),
    AppRatingTitle: getMetaLabel(APP_RATING_TITLE, "Your Feedback help us provide better service"),
    AppRatingThanks:getMetaLabel(APP_RATING_THANKS, "Thanks for your Help"),
    AppRatingSubmit: getMetaLabel(APP_RATING_SUBMIT, "Continue"),
    AppRatingSkip: getMetaLabel(APP_RATING_SKIP, "Not Now"),
    AppRatingAlertMsg: getMetaLabel(APP_RATING_ALERT_MSG, "Please choose your rating before submit.")
  }
};

export default MetaConstants = {
  initializeScreenMeta
};

import screens from "../screenNames";
import actions from "../actionNames";
import { CoreUtils, CoreConfig } from "@pru-rt-internal/pulse-common";
import { pathOr } from "ramda";

const { getPayloadForNavigation } = CoreUtils;

const middlewareConfig = {
  [screens.PULSE_FOOD]: {
    [actions.GO_TO_PULSEFOOD_LANDING]: ({ action }) => {
      const navigateTo = screens.FOOD_DIARY_LANDING
      return getPayloadForNavigation(action, navigateTo, null);
    },
    [actions.GO_TO_PULSEFOOD_USERINFO]: ({ action }) => {
      const navigateTo = screens.USER_INFORMATION
      return getPayloadForNavigation(action, navigateTo, null);
    },
  },
};

export default middlewareConfig;

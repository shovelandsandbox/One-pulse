import screens from "../screenNames";
import actions from "../actionNames";
import { CoreUtils } from "@pru-rt-internal/pulse-common";
const { getPayloadForNavigation } = CoreUtils;

const middlewareConfig = {
  [screens.WEARABLE_LIST]: {
    [actions.goToWearablesStatistics]: ({ action }) => {
      const navigateTo = screens.WEARABLES_STATISTICS;
      return getPayloadForNavigation(action, navigateTo, null);
    },
    [actions.goToWearablesContainer]: ({ action }) => {
      const navigateTo = screens.WEARABLES_CONTAINER;
      return getPayloadForNavigation(action, navigateTo, null);
    },
  },
};

export default middlewareConfig;

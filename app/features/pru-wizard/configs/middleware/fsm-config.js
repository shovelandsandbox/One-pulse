import screens from "../screenNames";
import actions from "../actionNames";
import { CoreUtils, CoreConfig } from "@pru-rt-internal/pulse-common";
import { pathOr } from "ramda";

const { getPayloadForNavigation } = CoreUtils;
const { pageKeys } = CoreConfig;

const middlewareConfig = {
  [pageKeys.COMMON]: {
    [actions.goToRegWizard]: ({ action }) => {
      const navigateTo = screens.PruWizardScreen;
      return getPayloadForNavigation(action, navigateTo, null);
    },
    [actions.goToHome]: ({ action }) => {
      const navigateTo = screens.MainTab;
      const params = pathOr(null, ["payload", "params"], action);
      return getPayloadForNavigation(action, navigateTo, params);
    },
  },
};

export default middlewareConfig;

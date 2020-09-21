import screens from "../configs/screens";
import actions from "../configs/actions";
import { CoreUtils } from "@pru-rt-internal/pulse-common";
const { getPayloadForNavigation } = CoreUtils;

const middlewareConfig = {
  [screens.ppgVitals]: {
    [actions.enableppgVitals]: ({ action }) => {
      const navigateTo = screens.ppgVitals;
      return getPayloadForNavigation(action, navigateTo, null);
    },
  },
};

export default middlewareConfig;

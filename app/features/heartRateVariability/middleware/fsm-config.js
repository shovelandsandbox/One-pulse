import screens from "../configs/screens";
import actions from "../configs/actions";
import { CoreUtils } from "@pru-rt-internal/pulse-common";
const { getPayloadForNavigation } = CoreUtils;

const middlewareConfig = {
  [screens.heartRateVariability]: {
    [actions.enableHrv]: ({ action }) => {
      const navigateTo = screens.heartRateVariability;
      return getPayloadForNavigation(action, navigateTo, null);
    },
  },
};

export default middlewareConfig;

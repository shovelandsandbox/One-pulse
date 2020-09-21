import screens from "../screenNames";
import actions from "../actionNames";
import { CoreUtils } from "@pru-rt-internal/pulse-common";
const { getPayloadForNavigation } = CoreUtils;

const FsmConfig = {
  [screens.VACCINATION_CALENDAR]: {
    [actions.goToVaccineTable]: ({ action }) => {
      const navigateTo = screens.VACCINE_TABLE;
      return getPayloadForNavigation(action, navigateTo, action.payload);
    },
  },
};

export default FsmConfig;

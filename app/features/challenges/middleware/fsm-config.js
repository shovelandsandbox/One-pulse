import screens from "../configs/screen-names";
import actions from "../configs/actions";
import { CoreUtils } from "@pru-rt-internal/pulse-common";
const { getPayloadForNavigation } = CoreUtils;

const FsmConfig = {
  [screens.CHALLENGES]: {
    [actions.goToWerableLisstPage]: ({ action }) => {
      const navigateTo = screens.WEARABLE_LIST;
      return getPayloadForNavigation(action, navigateTo, action.payload);
    },
    [actions.goToChallenges]: ({ action }) => {
      const navigateTo = screens.CHALLENGES;
      return getPayloadForNavigation(action, navigateTo, action.payload);
    },
  },
};

export default FsmConfig;

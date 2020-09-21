import screens from "../configs/screens";
import actions from "../configs/actions";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

export default {
  [screens.heartRateVariability]: {
    [actions.getHrv]: {
      successAction: actions.getHrvSuccess,
      dispatchActions: (actionPayload, state) => {
        if (state.heartRateVariability.hrvSuccess) {
          return [
            {
              type: CoreActionTypes.GO_TO_SCREEN,
              navigateTo: screens.hrvContainer,
            },
          ];
        }
        return [];
      },
      failureAction: actions.getHrvFailure,
      toggleLoader: false,
    },
  },
};

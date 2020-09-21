// import { path } from "ramda";
import screens from "../configs/screens";
import actions from "../configs/actions";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
// import { failureResponseTransformer } from "../../../utils/apiUtils";

export default {
  [screens.ppgVitals]: {
    [actions.getPPGVitals]: {
      successAction: actions.getPPGVitalsSuccess,
      dispatchActions: (actionPayload, state) => {
        if (state.ppgVitals.ppgVitalsSuccess) {
          return [
            {
              type: CoreActionTypes.GO_TO_SCREEN,
              navigateTo: screens.vitalsContainer,
            },
          ];
        }
        return [];
      },
      failureAction: actions.getPPGVitalsFailure,
      toggleLoader: false,
    },
  },
};

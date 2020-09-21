import { pathOr } from "ramda";
import screens from "../configs/screens";
import actions from "../configs/actions";
import { buildPayload } from "../../../utils/apiUtils";

export default {
  [screens.heartRateVariability]: {
    [actions.getHrv]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const body = {
          ...action.payload,
          type: "fingertip",
        };
        return buildPayload(store, "ppgVitals", null, body, {
          id: getUserId(state),
        });
      },
      loader: false,
    },
  },
};
const getUserId = state => pathOr("", ["profile", "id"], state);

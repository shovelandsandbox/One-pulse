import { pathOr } from "ramda";
import screens from "../configs/screens";
import actions from "../configs/actions";
import { buildPayload } from "../../../utils/apiUtils";

export default {
  [screens.ppgVitals]: {
    [actions.getPPGVitals]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const body = action.payload;

        return buildPayload(store, "ppgVitals", null, body, {
          id: getUserId(state),
        });
      },
      loader: true,
    },
  },
};
const getUserId = state => pathOr("", ["profile", "id"], state);

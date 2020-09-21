import screens from "../configs/screen-names";
import actions from "../configs/actions";
import { buildPayload } from "../../../utils/apiUtils";
import { path, pathOr } from "ramda";

const getRealm = state =>
  "dpas_" +
  pathOr("", ["auth", "countryInfo", "simCountry"], state).toLowerCase();

export default {
  [screens.COMMON]: {
    [actions.getResource]: {
      payloadBuilder: (store, action) => {
        const params = {
          id: `data::${action.payload.tileId}-${action.payload.screen}`,
        };
        return buildPayload(store, "getResourceById", null, null, params);
      },
    },
  },
};

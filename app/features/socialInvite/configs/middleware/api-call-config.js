import screens from "../screenNames";
import actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";
import { pathOr } from "ramda";

export default {
  [screens.SOCIAL_INVITE]: {
    [actions.updateCustomersContact]: {
      payloadBuilder: (store, action) => {
        const body = pathOr([], ["payload", "contacts"], action);
        return buildPayload(
          store,
          "updateCustomerContactGroup",
          null,
          body,
          null
        );
      },
      loader: false,
    },
  },
};

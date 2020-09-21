import { screenNames } from "../screenNames";
import * as actionsNames from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";

const consentManagementApiCall = {
  [screenNames.MARKETING_CONSENT]: {
    [actionsNames.MARKETING_CONSENT_STATUS]: {
      payloadBuilder: (store, action) => {
        let acceptStatus = "";
        if (action.payload.status) {
          acceptStatus = "ACCEPT";
        } else {
          acceptStatus = "REJECT";
        }
        const body = {
          termsConditions: {
            marketing: {
              org: "Prudential",
              consent: acceptStatus,
            },
          },
        };
        return buildPayload(store, "updateCustomer", null, body, null);
      },
      loader: true,
    },
  },
};

export default consentManagementApiCall;

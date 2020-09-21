import { buildPayload } from "../../../utils/apiUtils";
import { CoreActionTypes, CoreConfig } from "@pru-rt-internal/pulse-common";
const { pageKeys } = CoreConfig;

export default {
  [pageKeys.CAMPAIGN]: {
    [CoreActionTypes.UPDATE_PROFILE_DETAILS]: {
      payloadBuilder: (store, action) => {
        const { actionPayload } = action.payload;
        let body = actionPayload.userDetails;
        const state = store.getState();
        const campaignCode = state.referralGroup.campaignCode;

        if (campaignCode) {
          if (campaignCode == "PruBoostCorona") {
            //Boost Corona campaign
            body["attributes"] = body["attributes"] || {};
            body["attributes"]["boostCoronaCampaign"] = true;
          }
        }
        return buildPayload(store, "updateCustomer", null, body, null);
      },
    },
    [CoreActionTypes.GET_CUSTOMER_DETAILS]: {
      payloadBuilder: (store, action) => {
        // const { response } = action.payload;
        return buildPayload(store, "getCustomerById", null, null, null);
      },
    },
  },
};

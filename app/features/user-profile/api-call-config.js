import { buildPayload } from "../../utils/apiUtils";
import { makeCustomerObject } from "../../utils/customer-utils";

const updateCustomerDetailsConfig = {
  payloadBuilder: (store, action) => {
    const userProfile = makeCustomerObject(store.getState());
    return buildPayload(store, "updateCustomer", null, userProfile, null);
  },
  loader: true,
};
const updatePreferredLanguage = {
  payloadBuilder: (store, action) => {
    const { value } = action.payload;
    const body = {
      preferences: {
        languagePreference: {
          type: "PREFERREDLANGUAGE",
          value
        }
      }
    }
    return buildPayload(store, "updateCustomerPreference", null, body, null);
  },
  loader: false,
}
export default {
  "COMMON_UPDATE_CUSTOMER": {
    "UPDATE_FULL_FROM_STATE": updateCustomerDetailsConfig,
    "UPDATE_PREFFERED_LANGUAGE": updatePreferredLanguage,
  },
};

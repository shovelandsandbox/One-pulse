import screens from "../screenNames";
import actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";
import { path } from "ramda";

const makeCustomerObject = state => {
  const { profile = {} } = state;
  const userProfile = {
    firstName: profile.firstName,
    surName: profile.surName,
    sex: profile.gender || "",
    addressDetails: {
      address: {
        line1: profile.address1 || "",
      },
    },
    contactDetails: {
      phone: {
        channel: "PHONE",
        value: profile.phone || "",
      },
    },
    externalIds: {
      NATIONAL_ID: path(["externalIds", "NATIONAL_ID"], profile),
    },
    dob: profile.dob || "",
  };
  return userProfile;
};

const updateCustomerDetailsConfig = {
  payloadBuilder: (store, action) => {
    const userProfile = makeCustomerObject(store.getState());
    return buildPayload(store, "updateCustomer", null, userProfile, null);
  },
  loader: true,
};
const updateCustomerTnc = {
  payloadBuilder: (store, action) => {
    const body = {
      termsConditions: action.payload,
    };
    return buildPayload(store, "updateCustomer", null, body, null);
  },
  loader: true,
};
export default {
  [screens.BUY_POLICY_CARD]: {
    [actions.updateCustomerDetails]: updateCustomerDetailsConfig,
  },
  [screens.PRU_WIZARD_SCREEN]: {
    [actions.updateCustomerDetails]: updateCustomerDetailsConfig,
  },
  [screens.ProductCatalog]: {
    [actions.updateCustomerDetails]: updateCustomerTnc,
  },
};

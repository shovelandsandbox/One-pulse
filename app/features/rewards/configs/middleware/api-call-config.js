import screens from "../screenNames";
import actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";
import moment from "moment";

import { safeMetaLabelFinder } from "../../../../utils/meta-utils";

export const metaFinderRewards = key => {
  return safeMetaLabelFinder("RewardCenter", key);
};

const prepareCustomerWalletPayload = ({
  code,
  name,
  description,
  discountType,
  expiry = moment()
    .add(1, "days")
    .format(),
  category,
  type = "VOUCHER",
}) => {
  return {
    vouchers: [
      {
        earnedDate: moment().format(),
        code,
        name,
        description,
        discountType,
        expiry,
        category,
        type,
        platform: "Pulse",
        status: "ACTIVE",
      },
    ],
  };
};

export default {
  [screens.REWARD_SERVICE_SUMMARY]: {
    [actions.getCustomerTransactions]: {
      payloadBuilder: (store, action) => {
        let params = {}; //we would require all transactions

        return buildPayload(
          store,
          "getCustomerTransactions",
          null,
          null,
          params
        );
      },
      loader: false,
    },
    [actions.getCustomerWalletDetail]: {
      payloadBuilder: (store, action) => {
        return buildPayload(store, "getCustomerWalletDetail", null, null, null);
      },
      loader: false,
    },
    [actions.updateCustomerWallet]: {
      payloadBuilder: (store, action) => {
        const body = prepareCustomerWalletPayload(action.payload);
        return buildPayload(store, "updateCustomerWallet", null, body, null);
      },
    },
  },
};

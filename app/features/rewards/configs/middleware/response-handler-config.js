import screens from "../screenNames";
import actionNames from "../actionNames";

import { failureResponseTransformer } from "../../../../utils/apiUtils";

export default {
  [screens.REWARD_SERVICE_SUMMARY]: {
    [actionNames.getCustomerTransactions]: {
      successAction: actionNames.getCustomerTransactionsSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      failureAction: actionNames.getCustomerTransactionsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.getCustomerWalletDetail]: {
      successAction: actionNames.getCustomerWalletDetailSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      failureAction: actionNames.getCustomerWalletDetailFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actionNames.updateCustomerWallet]: {
      successAction: actionNames.updateCustomerWalletSuccess,
      failureAction: actionNames.updateCustomerWalletFailure,
    }
  },
};

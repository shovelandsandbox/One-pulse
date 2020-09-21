import { pathOr } from "ramda";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import Actions from "./configs/actionNames";

const { LOGOUT_DONE } = CoreActionTypes;

const INITIAL_STATE = {
  transactions: [],
  walletDetails: {},
  loyaltyPoints: [],
  vouchers: [],
  experience: [],
  offers: [],
  isLoading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.setLoader: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case Actions.getCustomerTransactionsSuccess: {
      const transactions = pathOr([], ["payload", "body"], action);

      return {
        ...state,
        transactions,
        isLoading: false,
      };
    }
    case Actions.getCustomerTransactionsFailure: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case Actions.getCustomerWalletDetailSuccess: {
      const loyaltyPoints = pathOr(
        [],
        ["payload", "body", "loyaltyPoints"],
        action
      );
      const vouchers = pathOr([], ["payload", "body", "vouchers"], action);
      const walletDetails = pathOr({}, ["payload", "body"], action);
      return {
        ...state,
        loyaltyPoints,
        vouchers,
        walletDetails,
        isLoading: false,
      };
    }
    case Actions.getCustomerWalletDetailFailure: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case Actions.updateCustomerWalletSuccess: {
      return {
        ...state,
      };
    }
    case Actions.updateCustomerWalletFailure: {
      return {
        ...state,
      };
    }
    case LOGOUT_DONE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

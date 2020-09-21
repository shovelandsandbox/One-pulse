import Actions from "./actionNames";
import { path } from "ramda";
import _ from "lodash";

const productList = [
  {
    type: "Teleconsultation",
    doctor: "Mydoc Doctor",
    canIncrementQuantity: false,
    totalAmount: 0,
    currency: "",
    adjustedAmount: 0
  }
];

const paymentRequiredEnum = {
  ALLOW: {
    type: "ALLOW"
  },
  DENY: {
    type: "DENY"
  }
};

const paymentCodes = {
  payment_required: {
    type: "payment_required"
  },
  payment_redeem_reward: {
    type: "payment_redeem_reward"
  }
};

const INITIAL_STATE = {
  allowPayment: paymentRequiredEnum["DENY"].type,
  paymentCode: paymentCodes["payment_required"].type,
  redemptionResponse: {},
  policyCheckFailure: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.CHECK_PAYMENT_POLICY_SUCCESS: {
      const responseBody = action.payload.response.body;
      const resAttributes = responseBody.attrs;
      const policyCheckFailure = _.isEmpty(resAttributes) ? true : false;
      return {
        allowPayment: paymentRequiredEnum[responseBody.outcome].type,
        paymentCode: paymentCodes[responseBody.code],
        ...resAttributes,
        policyCheckFailure
      };
    }
    case Actions.CHECK_PAYMENT_POLICY_FAILURE: {
      return {
        ...state,
        policyCheckFailure: true,
      };
    }
    case Actions.PERFORM_REDEMPTION_SUCCESS: {
      return {
        ...state,
        redemptionResponse: {
          ...action.payload.response.body
        }
      };
    }
    case Actions.PERFORM_REDEMPTION_FAILURE: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

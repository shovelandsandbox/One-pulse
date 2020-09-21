import cancerPolicyActions from "./configs/actions";
import { path, pathOr, reduce, map } from "ramda";

const cancerPolicyInitialState = {};

const INITIAL_STATE = {};

// eslint-disable-next-line complexity
export default (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case cancerPolicyActions.clearPolicies:
      return {
        ...state,
        myPolicyList: [],
      };
    case cancerPolicyActions.getPolicyListSuccess: {
      const policies = pathOr([], ["payload", "response", "body"], action);
      policies.forEach(
        policy => (policy.poWithBaseCoverage = policy.productOptions[0])
      );
      return {
        ...state,
        myPolicyList: policies,
        getPolicyStatus: "getPolicyListSuccess",
      };
    }
    case cancerPolicyActions.findTransactionDetailSuccess: {
      return {
        ...state,
        transactionDetails: action.payload.body,
        action: action.type,
      };
    }
    case cancerPolicyActions.getStepProgressSuccess: {
      return {
        ...state,
        stepProgress: action.payload.response.body,
        action: action.type,
      };
    }
    default:
      return state;
  }
};

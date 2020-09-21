import screens from "../configs/screen-names";
import actions from "../configs/actions";
import { failureResponseTransformer } from "../../../utils/apiUtils";
import { pathOr, path } from "ramda";
import moment from "moment";

export default {
  [screens.CANCER_POLICY]: {
    [actions.getPolicyList]: {
      successAction: actions.getPolicyListSuccess,
      dispatchActions: (payload, state) => {
        const extActions = [];
        const policies = pathOr("", ["response", "body"], payload);
        const policyData = policies.find(
          policy => path(["product", "code"], policy) == "S00568"
        );
        if (policyData) {
          extActions.push({
            context: screens.CANCER_POLICY,
            type: actions.findTransactionDetail,
            payload: {
              policyId: policyData.id,
              startDate: moment(),
            },
          });
        }
        return extActions;
      },
      failureAction: actions.getPolicyListFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actions.getStepProgress]: {
      successAction: actions.getStepProgressSuccess,
      failureAction: actions.getStepProgressFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [actions.findTransactionDetail]: {
      successAction: actions.findTransactionDetailSuccess,
      postSuccessHook: payload => path(["response"], payload),
      failureAction: actions.findTransactionDetailFailure,
      toggleLoader: false,
    },
  },
};

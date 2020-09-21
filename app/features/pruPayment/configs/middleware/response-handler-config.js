import screens from "../../screenNames";
import ActionTypes from "../../actionNames";
import { checkoutPayment, gotoPreconScreen } from "../../actionsBuilder";
import { CustomAlert } from "../../../../components";
import { path } from "ramda";

export default {
  [screens.PRU_PAYMENT]: {
    [ActionTypes.CHECK_PAYMENT_POLICY]: {
      successAction: ActionTypes.CHECK_PAYMENT_POLICY_SUCCESS,
      failureAction: ActionTypes.CHECK_PAYMENT_POLICY_FAILURE,
    },
    [ActionTypes.PERFORM_REDEMPTION]: {
      successAction: ActionTypes.PERFORM_REDEMPTION_SUCCESS,
      failureAction: ActionTypes.PERFORM_REDEMPTION_FAILURE,
      successHandler: (action, store) => {
        const referenceNo = path(["response", "body", "referenceNo"], action.payload);
        const { dispatchActions } = action;
        if (dispatchActions && dispatchActions.length > 0) {
          dispatchActions.forEach(dispatchAction => {
            dispatchAction.payload = {
              orderRef: referenceNo
            };
            store.dispatch(dispatchAction);
          });
        } else {
          store.dispatch(checkoutPayment(referenceNo));
          store.dispatch(gotoPreconScreen());
        }
      },
      failureHandler: () => {
        CustomAlert.show("Invalid or expired voucher selected!", "", {
          positiveText: "Ok",
          invert: false,
        });
      }
    }
  },
};

import screens from "../../screenNames";
import ActionTypes from "../../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";


export default {
  [screens.PRU_PAYMENT]: {
    [ActionTypes.CHECK_PAYMENT_POLICY]: {
      payloadBuilder: (store, action) => {
        const params = {
          query: "service.teleconsultation.payment"
        }
        return buildPayload(
          store,
          "getPolicycheckDecision",
          null,
          null,
          params
        );
      }
    },
    [ActionTypes.PERFORM_REDEMPTION]: {
      payloadBuilder: (store, action) => {
        const params = {
          type: "Voucher"
        };
        const body = {
          id: action.payload.id,
          code: action.payload.code,
        };
        return buildPayload(
          store,
          "redeemReward",
          null,
          body,
          params
        );
      }
    }
  },
};

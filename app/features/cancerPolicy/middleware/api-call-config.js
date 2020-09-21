import screens from "../configs/screen-names";
import actions from "../configs/actions";
import { buildPayload } from "../../../utils/apiUtils";
import { path, pathOr } from "ramda";
const getRealm = state =>
  "dpas_" +
  pathOr("", ["auth", "countryInfo", "simCountry"], state).toLowerCase();

export default {
  [screens.CANCER_POLICY]: {
    [actions.getPolicyList]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();

        return buildPayload(
          store,
          "getCustomerPolicies",
          "getCustomerPolicies",
          action.payload,
          null
        );
      },
      loader: true,
    },
    [actions.getStepProgress]: {
      payloadBuilder: (store, action) => {
        const params = {
          id: `data::${action.payload.screen}-${action.payload.tileId}`,
        };
        return buildPayload(store, "getResourceById", null, null, params);
      },
    },
    [actions.findTransactionDetail]: {
      payloadBuilder: (store, action) =>
        buildPayload(
          store,
          "findTransactionDetailByCriteria",
          "findTransactionDetailByCriteria",
          {
            filter: {
              logicalExpression: {
                op: "AND",
                expressions: [
                  {
                    op: "EQ",
                    lhs: ["policy.id"],
                    value: {
                      value: action.payload.policyId,
                    },
                  },
                  {
                    op: "EQ",
                    lhs: ["type"],
                    value: {
                      value: "PolicyEndorsement",
                    },
                  },
                ],
              },
            },
          },
          { realm: getRealm(store.getState()) }
        ),
      loader: false,
    },
  },
};

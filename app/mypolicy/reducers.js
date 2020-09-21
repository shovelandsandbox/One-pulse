import { myPolicyActions } from "./configs/myPolicyActions";
import { path, pathOr, reduce, map } from "ramda";
import { transformPolicy, contactInfoMapper } from "./utils";

const myPolicyInitialState = {
  upgradeAccountFetch: false,
  policiesViewMode: "owner",
  upgradeAccountParam: null,
  phoneNo: "",
  upgradeAccountResponse: {
    body: {
      phoneNo: "",
    },
  },
  upgradeAccountError: {
    shortCode: "",
    errorMsg: "",
    errorCode: "",
  },
  myPolicyList: undefined,
  currentSelectedPolicy: {},
  transactionLink: {},
};

const upgradeAccountSaveInitialState = {
  upgradeAccountSaveFetch: false,
  upgradeAccountSaveParam: null,
  upgradeAccountSaveResponse: null,
  upgradeAccountSaveError: null,
};

const INITIAL_STATE = {
  action: "",
  ...myPolicyInitialState,
  ...upgradeAccountSaveInitialState,
};

// eslint-disable-next-line complexity
export default (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case myPolicyActions.requestOTPSuccess:
      return {
        ...state,
        otpWorkflowId: path(["response", "workflowId"], payload),
        updateContactStatus: "requestOTPSuccess",
      };
    case myPolicyActions.switchPoliciesViewMode:
      return {
        ...state,
        policiesViewMode: payload.payload,
      };
    case myPolicyActions.requestOTPFailure:
      return {
        ...state,
        updateContactStatus: "requestOTPFailure",
      };
    case myPolicyActions.verifyOTPFailure:
      return {
        ...state,
        otpWorkflowId: undefined,
        updateContactStatus: "verifyOTPFailure",
      };
    case myPolicyActions.verifyOTPSuccess:
      return {
        ...state,
        otpWorkflowId: undefined,
        updateContactStatus: "verifyOTPSuccess",
      };
    case myPolicyActions.verifyOTPLinkPolicyFailure:
      return {
        ...state,
        upgradeAccountSaveError: payload,
        upgradeAccountSaveFetch: false,
        action: action.type,
      };
    case myPolicyActions.verifyOTPLinkPolicySuccess:
      return {
        ...state,
        upgradeAccountSaveResponse: payload,
        upgradeAccountSaveFetch: false,
        action: action.type,
      };
    case myPolicyActions.updateInfoSuccess:
      return {
        ...state,
        updateContactStatus: "updateInfoSuccess",
      };
    case myPolicyActions.updateInfoFailure:
      return {
        ...state,
        updateContactStatus: "updateInfoFailure",
      };
    case myPolicyActions.resetStatus:
      return {
        ...state,
        updateContactStatus: undefined,
      };
    case myPolicyActions.searchByPolicyNoSuccess: {
      const clients = pathOr([], ["response", "body", "clients"], payload);
      const contactDetails = path(["0", "contactDetails"], clients);
      let mobOrPh = path(["phone", "value"], contactDetails);
      if (!mobOrPh) {
        mobOrPh = pathOr("", ["mobile", "value"], contactDetails);
      }
      return {
        ...state,
        otpWorkflowId: path(["response", "workflowId"], payload),
        upgradeAccountResponse: payload,
        upgradeAccountFetch: false,
        action: action.type,
        phoneNumber: mobOrPh,
        customer_master: clients[0],
      };
    }
    case myPolicyActions.searchByPolicyNoFailure:
      return {
        ...state,
        upgradeAccountError: payload,
        upgradeAccountFetch: false,
        action: action.type,
      };
    case myPolicyActions.searchPDFDocumentSuccess:
      return {
        ...state,
        showPDFData: payload,
        action: action.type,
      };
    case myPolicyActions.searchPDFDocumentFailure:
      return {
        ...state,
        showPDFData: undefined,
        action: action.type,
      };
    case myPolicyActions.resetMyPolicyAction:
      return {
        ...state,
        action: INITIAL_STATE.action,
      };
    case myPolicyActions.updateContactData: {
      let value = path(["payload", "actionPayload", "value"], action);
      const key = path(["payload", "actionPayload", "updateType"], action);
      const policyId = path(["payload", "actionPayload", "policyId"], action);

      if (!policyId)
        return {
          ...state,
        };

      const address = {
        city: path(["payload", "actionPayload", "city"], action),
        line1: path(["payload", "actionPayload", "line1"], action),
        line2: path(["payload", "actionPayload", "line2"], action),
        zip: path(["payload", "actionPayload", "zip"], action),
        addressType: path(["payload", "actionPayload", "addressType"], action),
      };

      if (key === "address") {
        value = address;
      }

      const contactDetails = path(
        [
          "currentSelectedPolicy",
          "roleToCustomers",
          "OWNER",
          "0",
          "customer",
          "contactDetails",
        ],
        state
      );
      const addressDetails = path(
        [
          "currentSelectedPolicy",
          "roleToCustomers",
          "OWNER",
          "0",
          "customer",
          "addressDetails",
        ],
        state
      );

      const statePath = contactInfoMapper({
        addressDetails,
        contactDetails,
        key,
        policyId,
        value,
      });

      return {
        ...state,
        currentSelectedPolicy: {
          ...state.currentSelectedPolicy,
          roleToCustomers: {
            ...state.currentSelectedPolicy.roleToCustomers,
            OWNER: Object.assign(
              [...state.currentSelectedPolicy.roleToCustomers.OWNER],
              {
                0: {
                  ...state.currentSelectedPolicy.roleToCustomers.OWNER[0],
                  customer: {
                    ...state.currentSelectedPolicy.roleToCustomers.OWNER[0]
                      .customer,
                    ...statePath,
                  },
                },
              }
            ),
          },
        },
      };
    }
    case myPolicyActions.clearPolicies:
      return {
        ...state,
        myPolicyList: [],
      };
    case myPolicyActions.getPolicyListSuccess: {
      const policies = pathOr([], ["payload", "response", "body"], action);
      policies.forEach(
        policy => (policy.poWithBaseCoverage = pathOr(undefined, ["productOptions", 0], policy))
      );
      return {
        ...state,
        myPolicyList: policies,
        getPolicyStatus: "getPolicyListSuccess",
      };
    }
    case myPolicyActions.getPolicyListFailure:
      return {
        ...state,
        myPolicyList: undefined,
        getPolicyStatus: "getPolicyListFailure",
      };
    case myPolicyActions.getPolicyDetailsSuccess: {
      const transformedPolicy = transformPolicy(
        pathOr({}, ["payload", "response", "body"], action)
      );
      return {
        ...state,
        currentSelectedPolicy: transformedPolicy,
        getPolicyStatus: "getPolicyDetailsSuccess",
      };
    }
    case myPolicyActions.resetCurrentSelectedPolicy: {
      return {
        ...state,
        currentSelectedPolicy: undefined,
        transactionLink: undefined,
      };
    }
    case myPolicyActions.getPolicyDetailsFailure:
      return {
        ...state,
        getPolicyStatus: "getPolicyDetailsFailure",
      };
    case myPolicyActions.resetPolicyStatus:
      return {
        ...state,
        getPolicyStatus: undefined,
      };
    case myPolicyActions.getFundDetailsSuccess: {
      let funds = pathOr([], ["payload", "response", "body"], action);

      funds = map(entry => {
        const fund = pathOr({}, ["fund"], entry);
        const unitPrice = pathOr(0, ["unitPrice"], fund);
        const units = pathOr(0, ["units"], entry);

        return {
          ...entry,
          fund: {
            ...fund,
            fundName: fund.name,
            unitValue: unitPrice * units,
          },
        };
      }, funds);

      const totalInvestment = reduce(
        (prev, curr) => prev + pathOr(0, ["fund", "unitValue"], curr),
        0,
        funds
      );
      return {
        ...state,
        currentSelectedPolicy: {
          ...state.currentSelectedPolicy,
          myPolicyFunds: {
            funds,
            totalInvestment,
          },
        },
        getPolicyStatus: "getFundDetailsSuccess",
      };
    }
    case myPolicyActions.getFundDetailsFailure:
      return {
        ...state,
        getPolicyStatus: "getFundDetailsFailure",
      };
    // case myPolicyActions.getPolicyFundDetailsSuccess: {
    //   const { id, name, unitPrice, unitPriceDate } = pathOr(
    //     {},
    //     ["body"],
    //     payload
    //   );
    //   const myPolicyFundsBody = pathOr([], ["myPolicyFunds", "body"], state);
    //   const newBody = map(entry => {
    //     const fund = pathOr({}, ["fund"], entry);
    //     if (fund.id === id) {
    //       return {
    //         ...entry,
    //         fund: {
    //           ...fund,
    //           fundName: name,
    //           unitValue: unitPrice * entry.units,
    //         },
    //       };
    //     }
    //     return entry;
    //   }, myPolicyFundsBody);
    //   const totalInvestment = reduce(
    //     (prev, curr) => prev + pathOr(0, ["fund", "unitValue"], curr),
    //     0,
    //     newBody
    //   );
    //   return {
    //     ...state,
    //     currentSelectedPolicy: {
    //       ...state.currentSelectedPolicy,
    //       myPolicyFunds: {
    //         ...state.currentSelectedPolicy.myPolicyFunds,
    //         totalInvestment,
    //       },
    //       myPolicyFundsDetail: {
    //         ...state.currentSelectedPolicy.myPolicyFundsDetail,
    //         [id]: { name, id, unitPrice, unitPriceDate },
    //       },
    //     },
    //     getPolicyStatus: "getPolicyFundDetailsSuccess",
    //   };
    // }
    case myPolicyActions.getPolicyFundDetailsFailure:
      return {
        ...state,
        getPolicyStatus: "getPolicyFundDetailsFailure",
      };
    case myPolicyActions.resetPoliciesViewMode: {
      return {
        ...state,
        policiesViewMode: myPolicyInitialState.policiesViewMode,
      };
    }
    case myPolicyActions.getTransacitionLinksSuccess: {
      const body = pathOr([], ["payload", "body"], action);
      return {
        ...state,
        transactionLink: body,
      };
    }
    case myPolicyActions.getTransacitionLinksFailure:
      return { ...state, transactionLink: {} };
    default:
      return state;
  }
};

import moment from "moment";
import { path, pathOr } from "ramda";
import myPolicyScreens from "../../configs/screenNames";
import { myPolicyActions } from "../../configs/myPolicyActions";
import { buildPayload } from "../../../utils/apiUtils";

const getRealm = state =>
  "dpas_" +
  pathOr("", ["auth", "countryInfo", "simCountry"], state).toLowerCase();

const getChannel = action => path(["payload", "updateType"], action);

export default {
  [myPolicyScreens.POLICY_MAIN_SCREEN]: {
    [myPolicyActions.getPolicyList]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        let params = null;
        if (state.myPolicy.policiesViewMode === "beneficiary") {
          params = { role: "beneficiary" };
        }

        const policyListFetchApi =
          state.myPolicy.policiesViewMode === "owner"
            ? "getCustomerPolicies"
            : "findCustomerPoliciesByRole";

        return buildPayload(
          store,
          policyListFetchApi,
          policyListFetchApi,
          action.payload,
          params
        );
      },
      loader: true,
    },
    [myPolicyActions.getPolicyDetails]: {
      payloadBuilder: (store, action) => {
        const params = {
          id: pathOr("", ["payload", "policyData", "id"], action),
        };
        return buildPayload(
          store,
          "getPolicyWithDetails",
          "getPolicyWithDetails",
          null,
          params
        );
      },
      loader: true,
    },
  },
  [myPolicyScreens.UPDATE_INFO_SCREEN]: {
    [myPolicyActions.requestOTP]: {
      payloadBuilder: (store, action) => {
        const newValue = path(["payload", "newValue"], action);
        return buildPayload(
          store,
          "requestOtp",
          undefined,
          {
            channels: [
              {
                name: getChannel(action),
                value: newValue,
              },
            ],
          },
          { realm: getRealm(store.getState()) }
        );
      },
      loader: true,
    },
    [myPolicyActions.verifyOTP]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const params = {
          realm: getRealm(store.getState()),
          workflowId: pathOr("", ["myPolicy", "otpWorkflowId"], state),
        };
        return buildPayload(
          store,
          "submitOtp",
          undefined,
          {
            channel: getChannel(action),
            otp: pathOr("", ["payload", "otpToVerify"], action),
          },
          params
        );
      },
      loader: true,
    },
    [myPolicyActions.updateContact]: {
      payloadBuilder: (store, action) => {
        const channel = getChannel(action);
        const params = {
          realm: getRealm(store.getState()),
          key: channel,
          id: pathOr("", ["payload", "clientId"], action),
          customerEmail: pathOr("", ["payload", "email"], action),
          policyId: pathOr("", ["payload", "policyId"], action),
        };
        return buildPayload(
          store,
          "updateCustomerContact",
          undefined,
          {
            channel: channel && channel.toUpperCase(),
            value:
              pathOr("", ["payload", "isdCode"], action) +
              pathOr("", ["payload", "value"], action),
          },
          params
        );
      },
      loader: true,
    },
    [myPolicyActions.updateAddress]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: getRealm(store.getState()),
          key: pathOr("", ["payload", "addressType"], action),
          id: pathOr("", ["payload", "clientId"], action),
          customerEmail: pathOr("", ["payload", "email"], action),
          policyId: pathOr("", ["payload", "policyId"], action),
        };
        return buildPayload(
          store,
          "updateCustomerAddress",
          undefined,
          {
            line1: pathOr("", ["payload", "line1"], action),
            line2: pathOr("", ["payload", "line2"], action),
            city: pathOr("", ["payload", "city"], action),
            zipcode: pathOr("", ["payload", "zip"], action),
            country: pathOr("", ["payload", "country"], action),
          },
          params
        );
      },
      loader: true,
    },
    [myPolicyActions.getPolicyDetails]: {
      payloadBuilder: (store, action) => {
        const params = {
          id: pathOr("", ["payload", "policyData", "id"], action),
        };
        return buildPayload(
          store,
          "getPolicyWithDetails",
          "getPolicyWithDetails",
          null,
          params
        );
      },
      loader: true,
    },
  },
  [myPolicyScreens.PROFILE_UPGRADE_ACCOUNT_SCREEN]: {
    [myPolicyActions.searchByPolicyNo]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const params = {
          realm: "epolicy",
          policyNo: action.payload.policyNumber,
          access_token: state.auth.token,
        };
        return buildPayload(
          store,
          "searchByPolicyNo",
          undefined,
          undefined,
          params
        );
      },
      loader: true,
    },
    [myPolicyActions.verifyOTPLinkPolicy]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const params = {
          workflowId: pathOr("", ["myPolicy", "otpWorkflowId"], state),
          event: "otpVerificationState",
          access_token: state.auth.token,
        };
        return buildPayload(
          store,
          "requestOtp",
          undefined,
          {
            channel: getChannel(action),
            otp: pathOr("", ["payload", "otp"], action),
          },
          params
        );
      },
      loader: true,
    },
  },
  [myPolicyScreens.MY_POLICY_DETAIL_SCREEN]: {
    [myPolicyActions.searchPDFDocument]: {
      payloadBuilder: (store, action) => {
        const params = {
          realm: getRealm(store.getState()),
          id: pathOr("", ["payload", "documentId"], action),
          policyData: pathOr({}, ["payload", "policyData"], action),
        };
        return buildPayload(
          store,
          "getDocumentById",
          undefined,
          undefined,
          params
        );
      },
      loader: true,
    },
    [myPolicyActions.getFundDetails]: {
      payloadBuilder: (store, action) => {
        const params = {
          id: action.payload.id,
          // productOptionId: action.payload.productOptionId,
        };
        return buildPayload(
          store,
          "getFundHoldingsByCriteria",
          "getFundHoldingsByCriteria",
          null,
          params
        );
      },
      loader: true,
    },
    [myPolicyActions.getPolicyFundDetails]: {
      payloadBuilder: (store, action) => {
        const params = {
          id: action.payload.fundId,
        };
        return buildPayload(
          store,
          "getFundDetail",
          "getFundDetail",
          null,
          params
        );
      },
      loader: false,
    },
    [myPolicyActions.getTransacitionLinks]: {
      payloadBuilder: (store, action) => {
        const policyData = pathOr("", ["payload", "policyData"], action);
        const code = pathOr("", ["product", "code"], policyData);
        const issueDate = pathOr("", ["firstIssueDate"], policyData);
        const policyStartDate = issueDate
          ? moment(issueDate).format("YYYY-MM-DD")
          : "";
        const email= pathOr("", ["payload","email"], action);
        const body = {
          products: [
            {
              code: code,
              attributes: [
                {
                  name: "policyStatus",
                  value: pathOr("", ["status"], policyData),
                },
                {
                  name: "policyStartDate",
                  value: policyStartDate,
                },
                { name: "policyId", value: pathOr("", ["id"], policyData) },
                { name: "email", value: email }
              ],
            },
          ],
        };
        const params = { id: code, realm: getRealm(store.getState()), body };

        return buildPayload(
          store,
          "computeByKey",
          "computeByKey",
          null,
          params,
          "transactions"
        );
      },
      loader: true,
    },
  },
  [myPolicyScreens.CHANGE_BENEFICIARY]: {
    [myPolicyActions.getPolicyDetails]: {
      payloadBuilder: (store, action) => {
        const params = {
          id: pathOr("", ["payload", "policyData", "id"], action),
        };
        return buildPayload(
          store,
          "getPolicyWithDetails",
          "getPolicyWithDetails",
          null,
          params
        );
      },
      loader: true,
    },
  },
  [myPolicyScreens.POLICY_TRANSACTIONS]: {
    [myPolicyActions.getPolicyDetails]: {
      payloadBuilder: (store, action) => {
        const state = store.getState();
        const params = {
          id: pathOr("", ["myPolicy", "currentSelectedPolicy", "id"], state),
        };
        return buildPayload(
          store,
          "getPolicyWithDetails",
          "getPolicyWithDetails",
          null,
          params
        );
      },
      loader: true,
    },
  },
};

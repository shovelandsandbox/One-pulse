import { path, pathOr, startsWith } from "ramda";
import myPolicyScreens from "../../configs/screenNames";
import { myPolicyActions } from "../../configs/myPolicyActions";
import { failureResponseTransformer } from "../../../utils/apiUtils";
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import lang from "../../screens/MyPolicy/lang";

const { LOAD_MY_POLICY_DETAIL } = CoreActionTypes;

const shouldLoadProductMeta = (state, policyData) => {
  const productCode = pathOr("", ["product", "code"], policyData);
  return startsWith("S", productCode); //TODO: is there a better way.
};

export default {
  [myPolicyScreens.POLICY_MAIN_SCREEN]: {
    [myPolicyActions.getPolicyList]: {
      successAction: myPolicyActions.getPolicyListSuccess,
      failureHandler: (action, store) => {
        const state = store.getState();
        // const linkPolicyRequired = path(
        //   ["meta", "countryCommonMeta", "linkPolicyRequired"],
        //   state
        // );

        // if (
        //   path(["payload", "response", "status", "code"], action) === 999 &&
        //   linkPolicyRequired &&
        //   state.myPolicy.policiesViewMode != "Beneficiary"
        // ) {
        //   store.dispatch({
        //     context: myPolicyScreens.POLICY_MAIN_SCREEN,
        //     type: "LINK_POLICY",
        //   });
        // }
      },
      failureAction: myPolicyActions.getPolicyListFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [myPolicyActions.getPolicyDetails]: {
      successAction: myPolicyActions.getPolicyDetailsSuccess,
      // eslint-disable-next-line complexity
      dispatchActions: (payload, state) => {
        const actions = [];
        const switchPolicyView = state.myPolicy.policiesViewMode;
        const policyData = path(["actionPayload", "policyData"], payload);
        const id = path(["id"], policyData);
        const productOptions = path(["productOptions"], policyData);
        const documentForBeneficiary = pathOr([], ["documents"], policyData)
          .find(d => (d.filename || "").toLowerCase().indexOf(lang.beneficiaryDocumentName()) > -1);
        const documentId = documentForBeneficiary ? documentForBeneficiary.id : path(["documents", "0", "id"], policyData);;
        const showTransactionLinks = pathOr(
          "",
          ["sourceOfBusiness"],
          policyData
        ) === "DIGITAL";

        let productOptionId = null;

        if (productOptions.length > 1) {
          for (let i = 0; i < productOptions.length; i++) {
            if (productOptions[i].id.includes("01_01"))
              productOptionId = productOptions[i].id;
          }
        } else if (productOptions.length == 1) {
          productOptionId = productOptions[0].id;
        }

        if (shouldLoadProductMeta(state, policyData)) {
          actions.push({
            context: "PRODUCT_SELECT_PAGE",
            type: "GET_PRODUCT_META",
            payload: {
              code: pathOr("", ["0", "product", "code"], productOptions),
              language: pathOr("", ["userPreferences", "language"], state),
            },
          });
        }

        if (id && productOptionId) {
          actions.push({
            context: myPolicyScreens.MY_POLICY_DETAIL_SCREEN,
            type: myPolicyActions.getFundDetails,
            payload: { id, productOptionId },
          });
        }
        if (switchPolicyView === "beneficiary") {
          actions.push({
            context: myPolicyScreens.MY_POLICY_DETAIL_SCREEN,
            type: myPolicyActions.searchPDFDocument,
            payload: { documentId },
          });
        } else {
          actions.push({
            context: myPolicyScreens.MY_POLICY_DETAIL_SCREEN,
            type: LOAD_MY_POLICY_DETAIL,
          });
        }
        if (showTransactionLinks) {
          actions.push({
            context: myPolicyScreens.MY_POLICY_DETAIL_SCREEN,
            type: myPolicyActions.getTransacitionLinks,
            payload: { policyData,
            email: pathOr("", ["profile", "email"], state) },
          });
        }

        return actions;
      },
      failureAction: myPolicyActions.getPolicyDetailsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: (action, config, store) => {
        const policyData = path(
          ["actionPayload", "policyData"],
          action.payload
        );
        shouldLoadProductMeta(store.getState(), policyData);
      },
    },
  },
  [myPolicyScreens.UPDATE_INFO_SCREEN]: {
    [myPolicyActions.requestOTP]: {
      successAction: myPolicyActions.requestOTPSuccess,
      failureAction: myPolicyActions.requestOTPFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [myPolicyActions.verifyOTP]: {
      successAction: myPolicyActions.verifyOTPSuccess,
      failureAction: myPolicyActions.verifyOTPFailure,
      isSuccessResponse: (config, response) => {
        return (
          path(["status", "code"], response) === 0 &&
          path(["body", "isOTPVerificationSuccessful"], response)
        );
      },
      dispatchActions: payload => [
        {
          type: myPolicyActions.updateContact,
          payload: path(["actionPayload", "updateInfoPayload"], payload),
        },
      ],
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [myPolicyActions.updateContact]: {
      successAction: myPolicyActions.updateInfoSuccess,
      successHandler: (action, store) => {
        store.dispatch({
          type: myPolicyActions.updateContactData,
          payload: action.payload,
        });
      },
      failureAction: myPolicyActions.updateInfoFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [myPolicyActions.updateAddress]: {
      successAction: myPolicyActions.updateInfoSuccess,
      successHandler: (action, store) => {
        store.dispatch({
          type: myPolicyActions.updateContactData,
          payload: action.payload,
        });
      },
      failureAction: myPolicyActions.updateInfoFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [myPolicyActions.getPolicyDetails]: {
      successAction: myPolicyActions.getPolicyDetailsSuccess,
      dispatchActions: [
        {
          type: CoreActionTypes.GO_TO_SCREEN,
          navigateTo: myPolicyScreens.UPDATE_INFO_SCREEN,
        },
      ],
      failureAction: myPolicyActions.getPolicyDetailsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
  [myPolicyScreens.PROFILE_UPGRADE_ACCOUNT_SCREEN]: {
    [myPolicyActions.verifyOTPLinkPolicy]: {
      successAction: myPolicyActions.verifyOTPLinkPolicySuccess,
      dispatchActions: (payload, state) => {
        if (path(["response", "status", "code"], payload) === 0) {
          return [
            {
              context: myPolicyScreens.PROFILE,
              type: CoreActionTypes.GET_CUSTOMER_DETAILS,
            },
          ];
        }
      },
      failureHook: failureResponseTransformer,
      failureAction: myPolicyActions.verifyOTPLinkPolicyFailure,
      toggleLoader: false,
    },
    [myPolicyActions.searchByPolicyNo]: {
      successAction: myPolicyActions.searchByPolicyNoSuccess,
      failureAction: myPolicyActions.searchByPolicyNoFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
  [myPolicyScreens.MY_POLICY_DETAIL_SCREEN]: {
    [myPolicyActions.searchPDFDocument]: {
      successAction: myPolicyActions.searchPDFDocumentSuccess,
      successHandler: (action, store) => {
        store.dispatch({
          type: "GO_TO_SCREEN",
          navigateTo: "PolicyPdfViewer",
          payload: {
            params: {
              source: {
                uri: "data:application/pdf;base64,".concat(
                  pathOr("", ["payload", "response", "body", "content"], action)
                ),
              },
            }, 
          },
        });
      },
      failureAction: myPolicyActions.searchPDFDocumentFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [myPolicyActions.getFundDetails]: {
      successAction: myPolicyActions.getFundDetailsSuccess,
      // dispatchActions: (payload, state) => {
      //   return actionsToGetFundDetails(
      //     pathOr([], ["response", "body"], payload)
      //   );
      // },
      failureAction: myPolicyActions.getFundDetailsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
    [myPolicyActions.getPolicyFundDetails]: {
      postSuccessHook: payload => path(["response"], payload),
      successAction: myPolicyActions.getPolicyFundDetailsSuccess,
      failureAction: myPolicyActions.getPolicyFundDetailsFailure,
      toggleLoader: false,
    },
    [myPolicyActions.getTransacitionLinks]: {
      postSuccessHook: payload => path(["response"], payload),
      successAction: myPolicyActions.getTransacitionLinksSuccess,
      failureAction: myPolicyActions.getTransacitionLinksFailure,
      toggleLoader: false,
    },
  },
  [myPolicyScreens.CHANGE_BENEFICIARY]: {
    [myPolicyActions.getPolicyDetails]: {
      successAction: myPolicyActions.getPolicyDetailsSuccess,
      dispatchActions: (payload, state) => {
        const actions = [];

        const policyData = path(["actionPayload", "policyData"], payload);
        const productOptions = path(["productOptions"], policyData);
        if (shouldLoadProductMeta(state, policyData)) {
          actions.push({
            context: "PRODUCT_SELECT_PAGE",
            type: "GET_PRODUCT_META",
            payload: {
              code: pathOr("", ["0", "product", "code"], productOptions),
              language: pathOr("", ["userPreferences", "language"], state),
            },
          });
        }

        actions.push({
          context: "PRODUCT_JOURNEYS",
          type: "product-journeys/add-beneficiary-for-existing-policy",
        });

        return actions;
      },
      failureAction: myPolicyActions.getPolicyDetailsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
  [myPolicyScreens.POLICY_TRANSACTIONS]: {
    [myPolicyActions.getPolicyDetails]: {
      successAction: myPolicyActions.getPolicyDetailsSuccess,
      dispatchActions: (payload, state) => {
        const actions = [];
        const policyData = pathOr(
          "",
          ["myPolicy", "currentSelectedPolicy"],
          state
        );
        const productOptions = path(["productOptions"], policyData);
        if (shouldLoadProductMeta(state, policyData)) {
          actions.push({
            context: "PRODUCT_SELECT_PAGE",
            type: "GET_PRODUCT_META",
            payload: {
              code: pathOr("", ["0", "product", "code"], productOptions),
              language: pathOr("", ["userPreferences", "language"], state),
            },
          });
        }
        if (lang.viewTransaction()) {
          actions.push(lang.viewTransaction().action);
        }

        return actions;
      },
      failureAction: myPolicyActions.getPolicyDetailsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
};

const actionsToGetFundDetails = funds => {
  return funds.map((val, key) => {
    const actionObject = {
      context: myPolicyScreens.MY_POLICY_DETAIL_SCREEN,
      type: myPolicyActions.getPolicyFundDetails,
      payload: {
        fundId: val.fund.id,
      },
    };
    return actionObject;
  });
};

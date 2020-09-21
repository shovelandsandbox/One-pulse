import screens from "../screenNames";
import { goToProductJourney } from "../../actions";
import actionNames from "../actionNames";
import { CoreConfig, CoreActionTypes } from "@pru-rt-internal/pulse-common";
import _ from "lodash";
import { path } from "ramda";
const { pageKeys } = CoreConfig;

export default {
  [screens.BUY_POLICY_CARD]: {
    [actionNames.updateCustomerDetails]: {
      successAction: actionNames.updateCustomerDetailsSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      successHandler: (action, store) => {
        const postUpdateNavigation = path(["actionPayload", "postUpdateNavigation"], action.payload);
        if (!_.isEmpty(postUpdateNavigation)) {
          store.dispatch(postUpdateNavigation);
        } else {
          store.dispatch(
            goToProductJourney({
              productCode: action.payload.actionPayload.productCode,
              backAction: actionNames.goToRegWizard,
              successBackAction: actionNames.goToHome,
              isReadOnly: true,
              isProductSummaryExpanded: true,
            })
          );
        }
      },
      failureAction: actionNames.updateCustomerDetailsFailure,
      toggleLoader: false,
    },
  },
  [screens.PRU_WIZARD_SCREEN]: {
    [actionNames.updateCustomerDetails]: {
      successAction: actionNames.updateCustomerDetailsSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      dispatchActions: payload => {
        return [
          {
            type: CoreActionTypes.REGISTRATION_SUCCESS_HANDLER,
            context: pageKeys.REGISTRATION,
          },
        ];
      },
      failureAction: actionNames.updateCustomerDetailsFailure,
      toggleLoader: false,
    },
  },
  [screens.ProductCatalog]: {
    [actionNames.updateCustomerDetails]: {
      successAction: actionNames.updateCustomerDetailsSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      dispatchActions: () => {
        return [
          {
            type: CoreActionTypes.GET_CUSTOMER_DETAILS_1,
            context: pageKeys.PROFILE,
          },
        ];
      },
      failureAction: actionNames.updateCustomerDetailsFailure,
      toggleLoader: false,
    },
  },
};

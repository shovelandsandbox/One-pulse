import screens from "../screenNames";
import actionNames from "../actionNames";
import { pathOr, path } from "ramda";
import { CoreConfig, CoreActionTypes } from "@pru-rt-internal/pulse-common";
import { failureResponseTransformer } from "../../../../utils/apiUtils";

const { pageKeys } = CoreConfig;

export default {
  [screens.VACCINATION_CALENDAR]: {
    [actionNames.updateCustomer]: {
      successAction: actionNames.updateCustomerSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      successHandler: (action, store) => {
        store.dispatch({
          context: pageKeys.PROFILE,
          type: CoreActionTypes.GET_CUSTOMER_DETAILS,
        });
      },
      failureAction: actionNames.updateCustomerFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },

    [actionNames.createVaccinationDetails]: {
      successAction: actionNames.createVaccinationDetailsSuccess,
      postSuccessHook: payload => {
        const vaccinationDetails = pathOr({}, ["response", "body"], payload);
        const id = pathOr("", ["response", "body", "id"], payload);
        return {
          responseObject: {
            vaccinationDetails,
            id,
          },
        };
      },
      successHandler: (action, store) => {
        const id = pathOr(
          "",
          ["payload", "actionPayload", "appliedTo", "id"],
          action
        );
        store.dispatch({
          context: screens.VACCINATION_CALENDAR,
          type: actionNames.goToVaccineTable,
          payload: {
            id,
          },
        });
      },
      failureAction: actionNames.createVaccinationDetailsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },

    [actionNames.getVaccinationDetails]: {
      successAction: actionNames.getVaccinationDetailsSuccess,
      postSuccessHook: payload => {
        const vaccinationDetails = pathOr({}, ["response", "body"], payload);
        const id = pathOr("", ["response", "body", "id"], payload);
        return {
          responseObject: {
            vaccinationDetails,
            id,
          },
        };
      },
      successHandler: (action, store) => {
        const id = pathOr(
          "",
          ["payload", "actionPayload", "customerId"],
          action
        );
        const enableNavigation = pathOr(
          true,
          ["payload", "actionPayload", "enableNavigation"],
          action
        );
        if (enableNavigation) {
          store.dispatch({
            context: screens.VACCINATION_CALENDAR,
            type: actionNames.goToVaccineTable,
            payload: {
              id,
            },
          });
        }
      },
      failureAction: actionNames.getVaccinationDetailsFailure,
      failureHandler: (action, store) => {
        if (path(["payload", "response", "status", "code"], action) === 3408) {
          const id = pathOr(
            "",
            ["payload", "actionPayload", "customerId"],
            action
          );
          const dateOfBirth = pathOr(
            "",
            ["payload", "actionPayload", "dateOfBirth"],
            action
          );
          store.dispatch({
            context: screens.VACCINATION_CALENDAR,
            type: actionNames.createVaccinationDetails,
            payload: {
              dateOfBirth,
              appliedTo: {
                id,
              },
            },
          });
        }
      },
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },

    [actionNames.updateVaccinationDetails]: {
      successAction: actionNames.updateVaccinationDetailsSuccess,
      postSuccessHook: payload => {
        return payload.response;
      },
      successHandler: (action, store) => {
        const customerId = pathOr(
          "",
          ["payload", "actionPayload", "body", "appliedTo", "id"],
          action
        );
        store.dispatch({
          context: screens.VACCINATION_CALENDAR,
          type: actionNames.getVaccinationDetails,
          payload: {
            customerId,
            enableNavigation: false,
          },
        });
      },
      failureAction: actionNames.updateVaccinationDetailsFailure,
      failureHook: failureResponseTransformer,
      toggleLoader: false,
    },
  },
};

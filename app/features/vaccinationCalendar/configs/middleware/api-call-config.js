import screens from "../screenNames";
import actions from "../actionNames";
import { buildPayload } from "../../../../utils/apiUtils";
import { pathOr, isEmpty } from "ramda";

export default {
  [screens.VACCINATION_CALENDAR]: {
    [actions.updateCustomer]: {
      payloadBuilder: (store, action) => {
        const children = pathOr({}, ["payload", "children"], action);
        const spouse = pathOr({}, ["payload", "spouse"], action);
        const body = {};
        if (!isEmpty(children)) {
          body.children = children;
        } else if (!isEmpty(spouse)) {
          body.spouse = spouse;
        }
        return buildPayload(store, "updateCustomer", null, body, null);
      },
      loader: true,
    },
    [actions.createVaccinationDetails]: {
      payloadBuilder: (store, action) => {
        const dateOfBirth = pathOr({}, ["payload", "dateOfBirth"], action);
        const appliedTo = pathOr({}, ["payload", "appliedTo"], action);
        const body = {
          dateOfBirth,
          appliedTo,
        };
        return buildPayload(
          store,
          "createVaccinationDetails",
          null,
          body,
          null
        );
      },
      loader: true,
    },
    [actions.getVaccinationDetails]: {
      payloadBuilder: (store, action) => {
        const customerId = pathOr({}, ["payload", "customerId"], action);
        const params = {
          customerId,
        };
        return buildPayload(store, "getVaccinationDetails", null, null, params);
      },
      loader: true,
    },
    [actions.updateVaccinationDetails]: {
      payloadBuilder: (store, action) => {
        const body = pathOr({}, ["payload", "body"], action);
        return buildPayload(
          store,
          "updateVaccinationDetails",
          null,
          body,
          null
        );
      },
      loader: true,
    },
  },
};

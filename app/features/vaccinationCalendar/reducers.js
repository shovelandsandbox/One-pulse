import { CoreActionTypes } from "@pru-rt-internal/pulse-common";
import Actions from "./configs/actionNames";
import { pathOr } from "ramda";

const { LOGOUT_DONE, GET_CUSTOMER_DETAILS_SUCCESS } = CoreActionTypes;

const INITIAL_STATE = {
  schedules: [],
  children: [],
  spouse: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.createVaccinationDetailsSuccess:
    case Actions.getVaccinationDetailsSuccess: {
      const { id, vaccinationDetails } = action.payload.responseObject;
      const index = state.schedules.findIndex(p => p.id === id);
      if (index === -1) {
        state.schedules.push(vaccinationDetails);
      } else {
        state.schedules[index] = vaccinationDetails;
      }
      return {
        ...state,
        schedules: [...state.schedules],
      };
    }
    case GET_CUSTOMER_DETAILS_SUCCESS: {
      const { response } = action.payload;
      const customerRaw = response.body;
      const children = pathOr([], ["children"], customerRaw);
      const spouse = pathOr([], ["spouse"], customerRaw);
      return {
        ...state,
        children,
        spouse,
      };
    }
    case LOGOUT_DONE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

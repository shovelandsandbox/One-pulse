/* eslint-disable complexity */
import * as actions from "./config/actionNames";

const INITIAL_STATE = {
  consentStatus: true,
};

const consentManagementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.REJECT_MARKETING_CONSENT_SUCCESS:
      return {
        ...state,
        consentStatus: action.payload.actionPayload.status,
      };
    default:
      return state;
  }
};

export default consentManagementReducer;

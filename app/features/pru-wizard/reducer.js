import { path, assocPath } from "ramda";

const INITIAL_STATE = {
  isPostRegister: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "updateModelValue": {
      const model = path(["payload", "model"], action);
      if (model) {
        const value = path(["payload", "value"], action);
        return assocPath(model.split("."), value, state);
      }
      return state;
    }
    case "GET_PRU_WIZARD_ID_SUCCESS":
      return {
        ...state,
        pruWizardSteps: action.payload.response.body,
      };
    case "SET_FIRST_PRU_WIZARD":
      return {
        ...state,
        isPostRegister: true,
      };
    case "CLEAR_FIRST_PRU_WIZARD":
      return {
        ...state,
        isPostRegister: false,
      };
    default:
      return state;
  }
};

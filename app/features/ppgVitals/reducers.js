import actions from "./configs/actions";
import { pathOr } from "ramda";

const INITIAL_STATE = {
  showErrorMessage: false,
  showLoadScreen: false,
  ppgVitalsSuccess: false,
  isFinalApiCall: false,
  ppgVitalsResults: null,
  isStabilized: false,
  isMaxFrame: false,
  isTensorReady: false,
};

export const checkIfResultIsStabilized = (currentResults, state) => {
  const { ppgVitalsResults: prevResults } = state;
  if (!prevResults && currentResults) return true;
  if (!prevResults && !currentResults) return false;
  return Object.keys(currentResults).some(
    key =>
      Math.abs(currentResults[key] - prevResults[key]) / currentResults[key] <=
      1
  );
};

// eslint-disable-next-line complexity
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.initPpgVitals: {
      return {
        ...INITIAL_STATE,
        isTensorReady: state.isTensorReady,
      };
    }
    case actions.getPPGVitalsSuccess: {
      const result = pathOr(null, ["payload", "response", "body"], action);
      const isStabilized = checkIfResultIsStabilized(result, state);
      const showResults =
        state.isFinalApiCall &&
        (result !== null || state.ppgVitalsResults !== null);
      return {
        ...state,
        ppgVitalsSuccess: showResults,
        isStabilized,
        showErrorMessage:
          state.isFinalApiCall && !result && !state.ppgVitalsResults,
        ppgVitalsResults: result ? result : state.ppgVitalsResults,
      };
    }
    case actions.getPPGVitalsFailure: {
      return {
        ...state,
        ppgVitalsSuccess: false,
        isStabilized: false,
        showErrorMessage: state.isMaxFrame && !state.ppgVitalsResults,
      };
    }
    case actions.resetErrorMessage: {
      return {
        ...state,
        showErrorMessage: false,
      };
    }
    case actions.enableLoadScreen: {
      return {
        ...state,
        showLoadScreen: true,
      };
    }
    case actions.setFinalApiCall: {
      return {
        ...state,
        isFinalApiCall: action.payload.isFinalApiCall,
        isMaxFrame: action.payload.isMaxFrame,
      };
    }
    case actions.setTensorReady: {
      return {
        ...state,
        isTensorReady: true,
      };
    }
    default:
      return state;
  }
};

import actions from "./configs/actions";
import { pathOr } from "ramda";

const INITIAL_STATE = {
  showErrorMessage: false,
  showLoadScreen: false,
  hrvSuccess: false,
  isFinalApiCall: false,
  hrvResults: null,
  isStabilized: false,
  isMaxFrame: false,
  isTensorReady: false,
};

export const checkIfResultIsStabilized = (currentResults, state) => {
  const { hrvResults: prevResults } = state;
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
    case actions.initHrv: {
      return {
        ...INITIAL_STATE,
        isTensorReady: state.isTensorReady,
      };
    }
    case actions.getHrvSuccess: {
      const result = pathOr(
        null,
        ["payload", "response", "body", "hrv_metrics"],
        action
      );
      const isStabilized = checkIfResultIsStabilized(result, state);
      const showResults =
        state.isFinalApiCall && (result !== null || state.hrvResults !== null);
      return {
        ...state,
        hrvSuccess: showResults,
        isStabilized,
        showErrorMessage: state.isFinalApiCall && !result && !state.hrvResults,
        hrvResults: result
          ? { ...result, resp: result.breathingrate }
          : state.hrvResults,
      };
    }
    case actions.getHrvFailure: {
      return {
        ...state,
        hrvSuccess: false,
        isStabilized: false,
        showErrorMessage: state.isMaxFrame && !state.hrvResults,
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

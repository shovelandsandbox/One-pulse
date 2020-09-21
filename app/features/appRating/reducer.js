
import { CoreActionTypes } from "@pru-rt-internal/pulse-common";

/*
 * initial state of fitness tracker reducer
 * @property {('pending'|'success'|'failed')} userMetricsStatus - the current state of metrics
 */
const INITIAL_STATE = {
  showModal: false,
};
const clearDataReducer = (state, action) => {
  switch (action.type) {
    case CoreActionTypes.INITIALIZE_DATA:
      return action.initialState;
  }
};
const ratingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SHOW_MODAL_FOR_APP_RATING": {
      return {
        ...state,
        showModal: action.payload.showModal,
      };
    }
  }
};

export default (state = INITIAL_STATE, action) => {
  return (
    ratingReducer(state, action) ||
    clearDataReducer(state, {
      type: action.type,
      initialState: { ...INITIAL_STATE },
    }) ||
    state
  );
};

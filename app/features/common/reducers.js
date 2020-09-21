import actions from "./configs/actions";
import { path, pathOr, reduce, map } from "ramda";

const INITIAL_STATE = {};

// eslint-disable-next-line complexity
export default (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case actions.getResourceSuccess: {
      return {
        ...state,
        [action.payload.actionPayload.tileId]: action.payload.response.body,
        action: action.type,
      };
    }
    default:
      return state;
  }
};

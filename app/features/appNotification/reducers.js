import actions from "./configs/actionNames";
import { tail, isEmpty, pathOr } from "ramda";
import moment from "moment";
const TIMEOUT_MSGS_MAX_LENGTH = 10;

const INITIAL_STATE = {
  queue: [],
  timeoutMsgArr: [],
};

//TODO: has to do type check too
const isPresent = (notifications, payload = {}) => {
  const id = pathOr("", ["notification", "id"], payload);
  return notifications.some(
    element =>
      pathOr("", ["notification", "id"], element) === id ||
      (isEmpty(id) && isEmpty(element.id))
  );
};

const addNotification = (state, payload, body) => {
  const request = state.timeoutMsgArr;
  if (body) {
    if (request.length === TIMEOUT_MSGS_MAX_LENGTH) {
      request.splice(0, 1);
    }
    request.push(body);
  }

  if (isPresent(state.queue, payload) || (body && body.disableTimeout)) {
    return { ...state, timeoutMsgArr: request };
  }
  return {
    ...state,
    queue: [...state.queue, payload],
    timeoutMsgArr: request,
  };
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //TODO: should come from middleware config
    case "REQUEST_TIMEOUT": {
      return addNotification(
        state,
        {
          type: "error",
          swipeHeight: 500,
        },
        {
          ...action.payload,
          time: moment().format("YYYY-MM-DDThh:mm:ss"),
        }
      );
    }
    case actions.addNotification: {
      return addNotification(state, action.payload);
    }
    case actions.removeNotification:
      return {
        ...state,
        queue: tail(state.queue), //FIFO
      };
    default:
      return state;
  }
};

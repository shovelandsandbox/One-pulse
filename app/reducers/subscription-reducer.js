import {
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_SUBSCRIPTIONS_FAILURE,
  SUBSCRIPTIONS_RESET,
  GET_ALL_SUBSCRIPTIONS_SUCCESS,
  GET_ALL_SUBSCRIPTIONS_FAILURE,
  CREATE_CUSTOMER_SUBSCRIPTION_SUCCESS,
  CREATE_CUSTOMER_SUBSCRIPTION_FAILURE,
  SUBSCRIPTION_PAYMENT_SUCCESS,
  SET_SUBSCRIPTION_JOURNEY_TYPE
} from "../actions/Types";

const INITIAL_STATE = {
  subscriptionDetail: {},
  recommendedSubscription: null,
  selectedSubscription: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case GET_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptionDetail: action.payload.response,
      };
    case GET_SUBSCRIPTIONS_FAILURE:
      return INITIAL_STATE;
    case SUBSCRIPTIONS_RESET:
      return INITIAL_STATE;
    case GET_ALL_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        recommendedSubscription: action.payload.response,
      };
    case GET_ALL_SUBSCRIPTIONS_FAILURE:
      return INITIAL_STATE;

    case CREATE_CUSTOMER_SUBSCRIPTION_SUCCESS:
      return { ...state, selectedSubscription: action.payload };
    case CREATE_CUSTOMER_SUBSCRIPTION_FAILURE:
      return INITIAL_STATE;
    case SUBSCRIPTION_PAYMENT_SUCCESS:
      return {...state, subscription_success: action.payload.screen};
      case SET_SUBSCRIPTION_JOURNEY_TYPE:
        return {...state, journey_type: action.payload.journey_type};
    default:
      return state;
  }
};

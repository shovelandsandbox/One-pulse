import {
  INITIAL_STATE,
  handleRegActionsConfig,
  consultationReducerConfig,
  reportsReducerConfig,
} from "./doctor-service-reducer-config";

// eslint-disable-next-line complexity
const handleRegActions = (state, action) => {
  if (handleRegActionsConfig[action.type])
    return handleRegActionsConfig[action.type](state, action);
  return null;
};

// eslint-disable-next-line complexity
const ConsultationReducer = (state, action) => {
  if (consultationReducerConfig[action.type])
    return consultationReducerConfig[action.type](state, action);
  return null;
};

const ReportsReducer = (state, action) => {
  if (reportsReducerConfig[action.type])
    return reportsReducerConfig[action.type](state, action);
  return null;
};

export default (state = INITIAL_STATE, action) => {
  return (
    handleRegActions(state, action) ||
    ConsultationReducer(state, action) ||
    ReportsReducer(state, action) ||
    state
  );
};

import {
  GET_DOCTOR_PROFILE_SUCCESS,
  GET_DOCTOR_PROFILE_FAILURE,
} from "../actions/Types";
const INITIAL_STATE = {
  doctorProfile: {},
};

export default (state = INITIAL_STATE, action) => {
  const { type } = action;
  switch (type) {
    case GET_DOCTOR_PROFILE_SUCCESS:
      return {
        ...state,
        doctorProfile: action.payload,
      };
    case GET_DOCTOR_PROFILE_FAILURE:
      return INITIAL_STATE;
    default:
      return state;
  }
};

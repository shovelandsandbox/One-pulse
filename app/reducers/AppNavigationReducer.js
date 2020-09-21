const INITIAL_STATE = {
  currentPage: undefined,
  params: undefined,
};

export default (state = INITIAL_STATE, { payload = {} }) => {
  if (typeof payload.navigateTo !== "undefined") {
    // if (payload.navigateTo !== "PRODUCT_JOURNEY_READONLY") {
     // payload.navigateTo = "ppgVitals";
    // }
    // && payload.navigateTo !== state.currentPage) {
    return {
      currentPage: payload.navigateTo,
      params: payload.params,
    };
  }
  return state;
};

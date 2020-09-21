import screens from "../screenNames";
import actionNames from "../actionNames";

export default {
  [screens.SOCIAL_INVITE]: {
    [actionNames.updateCustomersContact]: {
      successAction: actionNames.updateCustomersContactSuccess,
      failureAction: actionNames.updateCustomersContactFailure,
      toggleLoader: false,
    },
  },
};

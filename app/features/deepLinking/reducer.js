import { pathOr } from "ramda";

const INITIAL_STATE = {
  deepLinkUrl: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "deeplink/updateUrl": {
      const deepLinkUrl = pathOr(null, ["payload", "deepLinkUrl"], action);

      return {
        ...state,
        deepLinkUrl,
      };
    }
    case "deeplink/resetUrl": {
      const deepLinkUrl = null;

      return {
        ...state,
        deepLinkUrl,
      };
    }
    default:
      return state;
  }
};

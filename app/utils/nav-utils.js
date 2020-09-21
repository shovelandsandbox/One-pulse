import { path } from "ramda";

export const getPayloadForNavigation = ({ action, navigateTo, params }) => ({
  ...action,
  payload: {
    ...action.payload,
    navigateTo,
    params: path(["payload", "params"], action) || params,
  },
});

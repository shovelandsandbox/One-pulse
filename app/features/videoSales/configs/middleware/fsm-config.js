import screens from "../screenNames";
import actions from "../actionNames";
import { CoreUtils, CoreConfig } from "@pru-rt-internal/pulse-common";

const { getPayloadForNavigation } = CoreUtils;
const { pageKeys } = CoreConfig;

const VideoCallHandler = ({ action }) => {
  return getPayloadForNavigation(action, screens.CHAT);
};

const middlewareConfig = {
  [screens.INITIATE_CALL_SCREEN]: {
    [actions.createRoomSuccess]: ({ action }) => {
      const navigateTo = screens.CHAT;
      return getPayloadForNavigation(action, navigateTo, null);
    },
  },
  ["ACCEPT_VC_NAVIGATION_TOCHAT"]: {
    [actions.inviteAccepted]: VideoCallHandler,
  },
  ["BACKGROUND"]: {
    [actions.inviteAccepted]: VideoCallHandler,
  },
  [pageKeys.LOGIN]: {
    [actions.inviteAccepted]: VideoCallHandler,
  },
};

export default middlewareConfig;

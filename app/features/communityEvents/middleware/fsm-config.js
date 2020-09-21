import screens from "../config/screens";
import actions from "../config/actions";
import { CoreUtils } from "@pru-rt-internal/pulse-common";
const { getPayloadForNavigation } = CoreUtils;

const VideoCallHandler = ({ action }) => {
  return getPayloadForNavigation(action, screens.PULSE_TV_VIDEO_CALL);
};

const FsmConfig = {
  [screens.COMMUNITY_EVENT_LANDING]: {
    [actions.navigateToWebinar]: ({ action }) => {
      const navigateTo = screens.PULSE_TV_WEBINAR;
      return getPayloadForNavigation(action, navigateTo, action.payload);
    },
  },
  ["ACCEPT_PULSE_TV_VIDEO_CALL"]: {
    [actions.navigateToVideoCall]: VideoCallHandler,
  },
};

export default FsmConfig;

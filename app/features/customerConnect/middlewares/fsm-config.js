import screens from "../constants/screenNames";
import actions from "../redux/actionNames";
import { CoreUtils, CoreConfig } from "@pru-rt-internal/pulse-common";

const { getPayloadForNavigation } = CoreUtils;
const { pageKeys } = CoreConfig;

const VideoCallHandler = ({ action }) => {
  return getPayloadForNavigation(action, screens.CUSTOMER_CONNECT_CHAT);
};

const middlewareConfig = {
  [screens.CUSTOMER_CONNECT_LANDING]: {
    [actions.gotoCustomerConnectAgentLanding]: ({ action, store }) => {
      store.dispatch({
        context: screens.CUSTOMER_CONNECT_LANDING,
        type: actions.setCurrentJourneyType,
        payload: {
          type: "AGENT",
        },
      });
      const navigateTo = screens.CUSTOMER_CONNECT_LANDING;
      return getPayloadForNavigation(action, navigateTo, null);
    },
    [actions.gotoCustomerConnectUserLanding]: ({ action, store }) => {
      store.dispatch({
        context: screens.CUSTOMER_CONNECT_LANDING,
        type: actions.setCurrentJourneyType,
        payload: {
          type: "USER",
        },
      });
      const navigateTo = screens.CUSTOMER_CONNECT_LANDING;
      return getPayloadForNavigation(action, navigateTo, null);
    },
    [actions.createRoomSuccess]: ({ action }) => {
      const navigateTo = screens.CUSTOMER_CONNECT_CHAT;
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

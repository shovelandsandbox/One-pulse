import screens from "./config/screens";

import Login from "./screens/Login";
import Home from "./screens/Home";
import Streamer from "./screens/streamer";
import Viewer from "./screens/viewer";

import CreateCommunityEvents from "./screens/create-event";
import CommunityEventsLanding from "./screens/landing";
import PulseTvWebinar from "./screens/PulseTvWebinar";
import EventInvite from "./screens/EventInvite";

import PulseTvVideoCall from "./screens/PulseTvVideoCall";
import EventManagerLanding from "./screens/EventManagerLanding";
import UpdateInvite from "./screens/UpdateInvite";

export const PulseTvScreenConfigs = {
  PulseTvLogin: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  PulseTvHome: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  PulseTvStreamer: {
    screen: Streamer,
    navigationOptions: {
      header: null,
    },
  },
  PulseTvViewer: {
    screen: Viewer,
    navigationOptions: {
      header: null,
    },
  },
  [screens.COMMUNITY_EVENT_LANDING]: {
    screen: CommunityEventsLanding,
    navigationOptions: {
      header: null,
    },
  },
  [screens.CREATE_COMMUNITY_EVENT]: {
    screen: CreateCommunityEvents,
    navigationOptions: {
      header: null,
    },
  },
  [screens.EVENT_INVITE]: {
    screen: EventInvite,
    navigationOptions: {
      header: null,
    },
  },
  [screens.EVENT_UPDATE_INVITE]: {
    screen: UpdateInvite,
    navigationOptions: {
      header: null,
    },
  },
  [screens.PULSE_TV_WEBINAR]: {
    screen: PulseTvWebinar,
    navigationOptions: {
      header: null,
    },
  },
  [screens.PULSE_TV_EVENT_MANAGER]: {
    screen: EventManagerLanding,
    navigationOptions: {
      header: null,
    },
  },
  [screens.PULSE_TV_VIDEO_CALL]: {
    screen: PulseTvVideoCall,
    navigationOptions: {
      header: null,
    },
  },
};

import {
  CoreActionTypes,
  CoreUtils,
  CoreConfig,
} from "@pru-rt-internal/pulse-common";

import eventConfig from "./events";
const { logFirebaseEvent } = CoreUtils;
const { pageKeys } = CoreConfig;

const registerEvent = (type, attributes = {}) => {
  const config = eventConfig[type] || {};

  //firebase
  config["firebase"] && logFirebaseEvent(config["firebase"]);

  //platform
  const platformConfig = config["platform"];
  if (platformConfig) {
    let payload = platformConfig;
    if (typeof platformConfig == "function") {
      payload = platformConfig(attributes);
    }
    return {
      context: pageKeys.COMMON,
      type: CoreActionTypes.SEND_EVENT,
      payload,
    };
  }
};

const sendEvent = (config) => {
  //firebase
  config["firebase"] && logFirebaseEvent(config["firebase"]);

  //platform
  const platformConfig = config["platform"];
  if (platformConfig) {
    let payload = platformConfig;
    return {
      context: pageKeys.COMMON,
      type: CoreActionTypes.SEND_EVENT,
      payload,
    };
  }
}

export { registerEvent, sendEvent };

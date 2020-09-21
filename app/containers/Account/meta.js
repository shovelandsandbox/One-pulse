import {
  metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";

import {
  SCREEN_KEY_ACCOUNT_TAB,
  ELEMENT_KEY_ACCOUNT_THATSALL_CONFIG,
  ELEMENT_KEY_ACCOUNT_THATSALL_TEXT,
  ELEMENT_KEY_ACCOUNT_THATSALL_STYLE,
} from "./configs/metaConstants";

const fetchLabel = (value, defaultValue) =>
  value && value.label != value.key ? value.label : defaultValue;


const initializeScreenMeta = () => {
  return {
    thatsAllConfig: fetchLabel(
      helpers.findElement(SCREEN_KEY_ACCOUNT_TAB, ELEMENT_KEY_ACCOUNT_THATSALL_CONFIG),
      "enable"
    ),
    thatsAllText: fetchLabel(
      helpers.findElement(SCREEN_KEY_ACCOUNT_TAB, ELEMENT_KEY_ACCOUNT_THATSALL_TEXT),
      "That's all for now!"
    ),
    thatsAllStyle: fetchLabel(
      helpers.findElement(SCREEN_KEY_ACCOUNT_TAB, ELEMENT_KEY_ACCOUNT_THATSALL_STYLE),
      "{\"fontSize\": 12, \"color\": \"#7e7e7e\", \"textAlign\": \"center\"}"
    )
  };
};

export default {
  initializeScreenMeta
};

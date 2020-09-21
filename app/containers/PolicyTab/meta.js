import {
    CoreConfig,
    metaHelpers as helpers,
  } from "@pru-rt-internal/pulse-common";
  import metaConstants from "../../features/socialInvite/configs/metaConstants";
  
  const {
    SCREEN_KEY_SOCIAL_INVITE,
    ELEMENT_KEY_SKIP,
    ELEMENT_KEY_INVITE_FRIEND,
    ELEMENT_KEY_WHATSAPP,
    ELEMENT_KEY_PHONEBOOK,
    ELEMENT_KEY_WHATSAPP_CONTENT,
    ELEMENT_KEY_PHONEBOOK_CONTENT,
    ELEMENT_KEY_AWESOME,
    ELEMENT_KEY_THANKS_MESSAGE,
    ELEMENT_KEY_GET_STARTED,
    ELEMENT_KEY_CONTACT_ACCESS_REQUIRED,
    ELEMENT_KEY_CONTACT_ACCESS_MESSAGE,
    ELEMENT_KEY_ALLOW_ACCESS,
    FITTER_WITH_PULSE
  } = CoreConfig;
  
  import {
    SCREEN_KEY_HOME_TAB,
    ELEMENT_KEY_HOME_THATSALL_CONFIG,
    ELEMENT_KEY_HOME_THATSALL_TEXT,
    ELEMENT_KEY_HOME_THATSALL_STYLE,
    SCREEN_KEY_POLICY_TAB,
    ELEMENT_KEY_COMING_SOON,
    ELEMENT_KEY_PULSE_PRODUCTS
  } from "./metaConstants";
  
  const { ELEMENT_KEY_LINE, ELEMENT_KEY_LINE_CONTENT } = metaConstants;
  
  const fetchLabel = (value, defaultValue) =>
    value && value.label != value.key ? value.label : defaultValue;
  
  const initializeScreenMeta = () => {
    return {
      comingSoonText: fetchLabel(
        helpers.findElement(SCREEN_KEY_POLICY_TAB, ELEMENT_KEY_COMING_SOON),
        "Coming Soon!"
      ),
      pulseProductsText: fetchLabel(
        helpers.findElement(SCREEN_KEY_POLICY_TAB, ELEMENT_KEY_PULSE_PRODUCTS),
        "Pulse Products"
      ),
      thatsAllConfig: fetchLabel(
        helpers.findElement(SCREEN_KEY_HOME_TAB, ELEMENT_KEY_HOME_THATSALL_CONFIG),
        "enable"
      ),
      thatsAllText: fetchLabel(
        helpers.findElement(SCREEN_KEY_HOME_TAB, ELEMENT_KEY_HOME_THATSALL_TEXT),
        "That's all for now!"
      ),
      thatsAllStyle: fetchLabel(
        helpers.findElement(SCREEN_KEY_HOME_TAB, ELEMENT_KEY_HOME_THATSALL_STYLE),
        "{\"fontSize\": 12, \"color\": \"#7e7e7e\", \"textAlign\": \"center\"}"
      )
    };
  };
  
  export default {
    initializeScreenMeta
  };
  
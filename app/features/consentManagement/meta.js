import { metaHelpers as helpers } from "@pru-rt-internal/pulse-common";
import {
  SCREEN_KEY_MARKETING_CONSENT,
  MARKETING_CONSENT_TEXT,
  MARKETING_CONSENT_SAVE_TEXT,
  ELEMENT_KEY_MARKETING_CONSENT,
  MARKETING,
  PULSE_PERSONALISED_TITLE,
  PULSE_PERSONALISED_DESCRIPTION,
  PULSE_PERSONALISED_CANCEL_BTN,
  PULSE_PERSONALISED_CONTINUE_BTN
} from "./config/metaConstants";

const fetchLabel = (value, defaultValue, elementKey) =>
  value && value.label && value.label !== elementKey ? value.label : defaultValue;

const initializeScreenMeta = () => {
  return {
    marketingConsentText: fetchLabel(
      helpers.findElement(SCREEN_KEY_MARKETING_CONSENT, MARKETING_CONSENT_TEXT),
      "With Pulse Personalised, you get customised product and service offerings and suggestions to help with your health and wellbeing. Pulse Personalised will give you tips and recommended products and services based on the health information collected and generated through your use of Pulse. Pulse Personalised will be activated when you click Activate and can always be turned off in your settings.",
      MARKETING_CONSENT_TEXT
    ),
    markertingHeader: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_MARKETING_CONSENT,
        ELEMENT_KEY_MARKETING_CONSENT
      ),
      "Marketing Consent",
      ELEMENT_KEY_MARKETING_CONSENT
    ),
    marketing: fetchLabel(
      helpers.findElement(SCREEN_KEY_MARKETING_CONSENT, MARKETING),
      "Marketing",
      MARKETING
    ),
    saveText: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_MARKETING_CONSENT,
        MARKETING_CONSENT_SAVE_TEXT
      ),
      "SAVE",
      MARKETING_CONSENT_SAVE_TEXT
    ),
    pulsePersonalisedTitle: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_MARKETING_CONSENT,
        PULSE_PERSONALISED_TITLE
      ),
      "Pulse Personalised",
      PULSE_PERSONALISED_TITLE
    ),
    pulsePersonalisedDescription: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_MARKETING_CONSENT,
        PULSE_PERSONALISED_DESCRIPTION
      ),
      "With Pulse Personalised, you get customised product and service offerings and suggestions to help with your health and wellbeing. Pulse Personalised will give you tips and recommended products and services based on the health information collected and generated through your use of Pulse. Pulse Personalised will be activated when you click Activate and can always be turned off in your settings.",
      PULSE_PERSONALISED_DESCRIPTION
    ),
    pulsePersonalisedCancelButton: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_MARKETING_CONSENT,
        PULSE_PERSONALISED_CANCEL_BTN
      ),
      "No Thanks",
      PULSE_PERSONALISED_CANCEL_BTN
    ),
    pulsePersonalisedContinueButton: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_MARKETING_CONSENT,
        PULSE_PERSONALISED_CONTINUE_BTN
      ),
      "ACTIVATE",
      PULSE_PERSONALISED_CONTINUE_BTN
    ),
  };
};

export default {
  initializeScreenMeta,
};

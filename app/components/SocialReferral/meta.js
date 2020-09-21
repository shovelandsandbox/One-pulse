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


const { ELEMENT_KEY_LINE, ELEMENT_KEY_LINE_CONTENT } = metaConstants;

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

const getElement = (elementData, elementKey) => elementData.find(element => element.key == elementKey)

const getLabelByContext = (context, screen) => {
  let screenElement = helpers.findScreen(screen || SCREEN_KEY_SOCIAL_INVITE);
  let elementData = screenElement.elements.filter(element => element.context == context);
  return {
    inviteFriendVia: fetchLabel(getElement(elementData, ELEMENT_KEY_INVITE_FRIEND), "inviteFriendVia"),
    whatsappContent: fetchLabel(getElement(elementData, ELEMENT_KEY_WHATSAPP_CONTENT), "whatsappContent"),
    phonebookContent: fetchLabel(getElement(elementData, ELEMENT_KEY_PHONEBOOK_CONTENT), "phonebookContent"),
    shareMessage: fetchLabel(getElement(elementData, FITTER_WITH_PULSE), "shareMessage"),
    accessMessage: fetchLabel(getElement(elementData, ELEMENT_KEY_CONTACT_ACCESS_MESSAGE), "contactAccessMessage"),
    lineContent: fetchLabel(getElement(elementData, ELEMENT_KEY_LINE_CONTENT), "lineContent"),
  }
}


const initializeScreenMeta = () => {
  return {
    skip: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_SKIP),
      "skip"
    ),
    inviteFriendVia: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_INVITE_FRIEND),
      "inviteFriendVia"
    ),
    whatsapp: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_WHATSAPP),
      "whatsapp"
    ),
    phonebook: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_PHONEBOOK),
      "phonebook"
    ),
    whatsappContent: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_SOCIAL_INVITE,
        ELEMENT_KEY_WHATSAPP_CONTENT
      ),
      "whatsappContent"
    ),
    phonebookContent: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_SOCIAL_INVITE,
        ELEMENT_KEY_PHONEBOOK_CONTENT
      ),
      "phonebookContent"
    ),
    awesome: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_AWESOME),
      "awesome"
    ),
    thanksMessage: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_THANKS_MESSAGE),
      "thanksMessage"
    ),
    getStarted: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_GET_STARTED),
      "getStarted"
    ),
    accessRequired: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_SOCIAL_INVITE,
        ELEMENT_KEY_CONTACT_ACCESS_REQUIRED
      ),
      "accessRequired"
    ),
    accessMessage: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_SOCIAL_INVITE,
        ELEMENT_KEY_CONTACT_ACCESS_MESSAGE
      ),
      "accessMessage"
    ),
    allowAccess: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_ALLOW_ACCESS),
      "allowAccess"
    ),
    line: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_LINE),
      "line"
    ),
    lineContent: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_LINE_CONTENT),
      "lineContent"
    ),
  };
};

export default {
  initializeScreenMeta,
  getLabelByContext
};

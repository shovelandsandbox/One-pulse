import {
  CoreConfig,
  metaHelpers as helpers,
} from "@pru-rt-internal/pulse-common";

const {
  HOMEREWARD,
  FITTER_WITH_PULSE,
  SCREEN_KEY_SOCIAL_INVITE,
  ELEMENT_KEY_CONTACTS,
  ELEMENT_KEY_INVITED,
  ELEMENT_KEY_GREETING,
  ELEMENT_KEY_NO_EMAIL_CONTACTS,
  ELEMENT_KEY_ADD_EMAIL_CONTACTS,
  ELEMENT_KEY_SKIP,
  ELEMENT_KEY_SELECT_ALL,
  ELEMENT_KEY_SEARCH,
  ELEMENT_KEY_INVITE,
  ELEMENT_KEY_CANCEL,
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
  ELEMENT_KEY_CLEAR,
  ELEMENT_KEY_CANCEL_INVITE,
} = CoreConfig;

const fetchLabel = (value, defaultValue) =>
  value ? value.label : defaultValue;

const getElement = (elementData, elementKey) => elementData.find(element => element.key == elementKey)

const getLabelByContext = (context, screen) => {
  let screenElement = helpers.findScreen(screen || HOMEREWARD);
  let elementData = screenElement.elements.filter(element => element.context == context);
  return {
    shareMessage: fetchLabel(getElement(elementData, FITTER_WITH_PULSE), "shareMessage"),
  }
}

const initializeScreenMeta = () => {
  return {
    contacts: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_CONTACTS),
      "contacts"
    ),
    invited: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_INVITED),
      "invited"
    ),
    greeting: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_GREETING),
      "greeting"
    ),
    noEmailContacts: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_SOCIAL_INVITE,
        ELEMENT_KEY_NO_EMAIL_CONTACTS
      ),
      "noEmailContacts"
    ),
    addEmailContacts: fetchLabel(
      helpers.findElement(
        SCREEN_KEY_SOCIAL_INVITE,
        ELEMENT_KEY_ADD_EMAIL_CONTACTS
      ),
      "addEmailContacts"
    ),
    skip: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_SKIP),
      "skip"
    ),
    selectAll: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_SELECT_ALL),
      "selectAll"
    ),
    clear: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_CLEAR),
      "clear"
    ),
    search: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_SEARCH),
      "search"
    ),
    invite: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_INVITE),
      "invite"
    ),
    cancel: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_CANCEL),
      "cancel"
    ),
    fitterWithPulse: fetchLabel(
      helpers.findElement(HOMEREWARD, FITTER_WITH_PULSE),
      "fitterWithPulse"
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
    cancelInvite: fetchLabel(
      helpers.findElement(SCREEN_KEY_SOCIAL_INVITE, ELEMENT_KEY_CANCEL_INVITE),
      "cancelInvite"
    ),
  };
};

export default {
  initializeScreenMeta,
  getLabelByContext
};

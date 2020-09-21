import screens from "./configs/screenNames";
import actions from "./configs/actionNames";

const context = screens.SOCIAL_INVITE;

export const readEmailContacts = contacts => dispatch => {
  dispatch({
    type: screens.READ_EMAIL_CONTACTS,
    payload: contacts,
  });
};

export const updateCustomersContact = contacts => ({
  context,
  type: actions.updateCustomersContact,
  payload: {
    contacts,
  },
});

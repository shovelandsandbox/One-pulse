import screens from "./configs/screenNames";
import actions from "./configs/actionNames";

const getAllNotifications = () => ({
  context: screens.PULSE_NOTIFICATION,
  type: actions.getCustomerComms,
});

const getNotification = payload => ({
  context: screens.PULSE_NOTIFICATION,
  type: actions.getCustomerCommById,
  payload,
});

const changeNotificationStatus = payload => ({
  context: screens.PULSE_NOTIFICATION,
  type: actions.updateCustomerComm,
  payload,
});

const recordNotificationViewed = (payload, fromNotification) => ({
  context: screens.PULSE_NOTIFICATION,
  type: actions.notificationViewed,
  payload: {
    ...payload,
    fromNotification,
  },
});

const recordNotificationActioned = (payload, fromNotification) => ({
  context: screens.PULSE_NOTIFICATION,
  type: actions.notificationActioned,
  payload: {
    ...payload,
    fromNotification,
  },
});

const recordNotificationDismissed = payload => ({
  context: screens.PULSE_NOTIFICATION,
  type: actions.notificationDismiss,
  payload: {
    ...payload
  },
});

export default {
  changeNotificationStatus,
  getAllNotifications,
  getNotification,
  recordNotificationActioned,
  recordNotificationViewed,
  recordNotificationDismissed,
};


import { Platform, PushNotificationIOS } from "react-native";
import { gotoMainPage } from "../../actions";
import { connect } from "react-redux";
import PushNotification from "react-native-push-notification";

export const ChallengeNotificationIOS = (title, description) => {
  const date = new Date(Date.now() + 30 * 1000)
  let bodys = {};
  if (Platform.OS === "ios") {
    bodys = {
      alertBody: description,
      alertTitle: title,
      // fireDate: date.toISOString(),
      // fireDate: new Date().toISOString(),targetDate.toISOString() || 
      fireDate: date.toISOString(),
      isSilent: false,
      alertAction: "view",
      clickAction: "ok"
    };
  }
  PushNotificationIOS.scheduleLocalNotification(bodys);
};

export const ChallengeNotification = (title, description) => {
  const date = new Date(Date.now() + 30 * 1000)
  let bodys = {};
  if (Platform.OS === "android") {
    bodys = {
      message: description,
      title: title,
      date: date,
      importance: "high",
    };
  }
  PushNotification.localNotificationSchedule(bodys)
};

export const cancelChallengeNotificationIOS = () => {
  PushNotificationIOS.cancelAllLocalNotifications();
};
export const cancelChallengeNotification = () => {
  PushNotification.cancelAllLocalNotifications();
};

export const reScheduleAllChallengeNotification = (title, description) => {
  cancelChallengeNotificationIOS();
  ChallengeNotificationIOS(title, description);
  return;
};

export const reScheduleChallengeNotification = (title, description) => {
  cancelChallengeNotification();

  ChallengeNotification(title, description);
  return;
};



/* eslint-disable */
import React, { Component } from "react";
import { Platform, PushNotificationIOS } from "react-native";
import PushNotification from "react-native-push-notification";
import {
  colors,
  CoreComponents,
  CoreConfig,
  metaHelpers,
  CoreConstants
} from "@pru-rt-internal/pulse-common";
const {
  HOMEINSAN,
  NOTIF_OFFSET,
  NOTIF_NO_OFFSET
} = CoreConfig;
const os = Platform.OS;
// const NOTIF_OFFSET = " minutes to the next prayer";
// const NOTIF_NO_OFFSET = "Prayer time is about to begin";
import * as InssanType from "../../config/insaanTypes";
import moment from "moment/moment";
import * as SFX from "../../config/sounds";

export const scheduleNotification = (title, body, date, identifier) => {
  var targetDate = null;

  if (typeof date == "string") {
    targetDate = new Date(date);
  }

  var UUID = identifier;
  // if (identifier === undefined || identifier == "") {
  //   UUID = targetDate ? targetDate.toISOString() : date.toISOString();
  // }
  let bodys = {};
  if (Platform.OS == "android") {
    // UUID = convertTypeToIntegerID(identifier);
    // UUID = moment(date).format('X');
    bodys = {
      id: Number(UUID), // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      importance: "high",
      message: body, // (required)
      title: title,
      date: targetDate || date,
      soundName: SFX.INSAAN_SOUND_AZAN_MP3
    };
  } else {
    bodys = {
      title: title ? title : " ",
      body: body,
      soundName: SFX.INSAAN_SOUND_AZAN,
      date: targetDate || date,
      // repeatType: "day",
      userInfo: {
        // Here will inject the unique identifier to mark this notification
        identifier: UUID
      }
    };
  }
  PushNotification.localNotificationSchedule(bodys);
};





export const scheduleNotificationIOS = (title, body, date, identifier) => {
  var targetDate = null;
  if (typeof date == "string") {
    console.log("date", date)
    // targetDate = new Date(date);
    date = new Date(date);
  }
  var UUID = identifier;
  let bodys = {};
  if (Platform.OS === "ios") {
    console.log("body",body, title, UUID, targetDate, date)
    console.log("iso date",new Date().toISOString())
    bodys = {
      id: Number(UUID), // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      alertBody: body, // (required)
      alertTitle: title,
      fireDate: date.toISOString(),
      // fireDate: new Date().toISOString(),targetDate.toISOString() || 
      // fireDate: new Date(Date.now() + 60 * 1000),
      soundName: SFX.INSAAN_SOUND_AZAN,
      isSilent: false,
      alertAction: "view"
    };
  } 
  PushNotificationIOS.scheduleLocalNotification(bodys);
};


export const cancelScheduledLocalNotification = () => {
  PushNotification.cancelAllLocalNotifications();
};

export const cancelScheduledLocalNotificationIOS = () => {
  PushNotificationIOS.cancelAllLocalNotifications();
};

export const reScheduleAllInsanNotification = array => {
  const list = array;
  for (const type in list) {
    const config = list[type];
    const isOn = config.isOn;
    const offset = config.timeOffset;
    const date = config.targetDate;

    // const debugDate = new Date();
    // debugDate.setSeconds(debugDate.getSeconds() + 10);
    // const debugOffset = 0;

    cancelScheduledLocalNotification(type);
    if (isOn) {
      const identifier = type;
      scheduleNotification(
        offset > 0 ? `${offset}` +
          // NOTIF_OFFSET 
          NOTIF_OFFSET_INFO
          :
          // NOTIF_NO_OFFSET
          NOTIF_NO_OFFSET_INFO,
        " ",
        date, // Set to debugDate to debug
        identifier
      );
    }
  }
};

export const reScheduleAllInsanNotificationForWeek = source => {
  cancelScheduledLocalNotification();

  let NOTIF_OFFSET_INFO = metaHelpers.findElement(HOMEINSAN, NOTIF_OFFSET).label;
  let NOTIF_NO_OFFSET_INFO = metaHelpers.findElement(HOMEINSAN, NOTIF_NO_OFFSET).label;
  for (const type in source) {
    const config = source[type];
    const timeList = config.times;
    const dates = config.dates;
    const isOn = config.isOn || false;
    const offset = config.offset || 0;
    for (const i in dates) {
      if (isOn) {
        const UUID = dates[i] + convertTypeToIntegerID(type);

        //  ;

        // const debugDate = new Date();
        // debugDate.setSeconds(debugDate.getSeconds() + 10);
        // Add To Local Notification
        const time = timeList[i];
        if (time != undefined) {
          const sample = moment();
          sample.set("s", 0);
          const compare = moment(time);
          if (compare.isBefore(sample)) {
            continue;
          }
          scheduleNotification(
            offset > 0 ? `${offset} ` + NOTIF_OFFSET_INFO : NOTIF_NO_OFFSET_INFO,
            " ",
            time, // Set to debugDate to debug
            UUID
          );
        }
        // break
      }
    }
    //  ;
  }
  return;
};

export const reScheduleAllInsaanNotificationForWeek = source => {
  cancelScheduledLocalNotificationIOS();

  let NOTIF_OFFSET_INFO = metaHelpers.findElement(HOMEINSAN, NOTIF_OFFSET).label;
  let NOTIF_NO_OFFSET_INFO = metaHelpers.findElement(HOMEINSAN, NOTIF_NO_OFFSET).label;
  for (const type in source) {
    const config = source[type];
    const timeList = config.times;
    const dates = config.dates;
    const isOn = config.isOn || false;
    const offset = config.offset || 0;
    for (const i in dates) {
      if (isOn) {
        const UUID = dates[i] + convertTypeToIntegerID(type);

        //  ;

        // const debugDate = new Date();
        // debugDate.setSeconds(debugDate.getSeconds() + 10);
        // Add To Local Notification
        const time = timeList[i];
        if (time != undefined) {
          const sample = moment();
          sample.set("s", 0);
          const compare = moment(time);
          if (compare.isBefore(sample)) {
            continue;
          }
          scheduleNotificationIOS(
            offset > 0 ? `${offset} ` + NOTIF_OFFSET_INFO : NOTIF_NO_OFFSET_INFO,
            " ",
            time, // Set to debugDate to debug
            UUID
          );
        }
        // break
      }
    }
    //  ;
  }
  return;
};

export const cancelScheduledNotificationByIdentifier = UUID => { };

const convertTypeToIntegerID = type => {
  switch (type) {
    case InssanType.INSAAN_TYPE_BEFORE_SUNRISE:
      return "65530";
    case InssanType.INSAAN_TYPE_SUNRISE:
      return "65531";
    case InssanType.INSAAN_TYPE_NOON:
      return "65532";
    case InssanType.INSAAN_TYPE_AFTERNOON:
      return "65533";
    case InssanType.INSAAN_TYPE_SUNSET:
      return "65534";
    case InssanType.INSAAN_TYPE_NIGHT:
      return "65535";
    default:
      break;
  }
};
import React from "react";
import * as Notifications from "expo-notifications";
import messages from "./messages";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MINUTE = 60;
const HOUR = 3600;

/**
 * opens app
 * Remove all scheduled noti
 * Schedule new noti group
 */

/**
 * opens add post
 * add reminder and remove if posts
 */

const setPostReminders = async () => {
  let length = messages.post_reminders.length;
  let noti_ids = [];
  let sch1 = await schedulePushNotification(
    messages.post_reminders[0],
    minuteToSeconds(10),
  );
  let sch2 = await schedulePushNotification(messages.post_reminders[1], HOUR);
  let sch3 = await schedulePushNotification(
    messages.post_reminders[2],
    HOUR * 5,
  );

  noti_ids.push(...[sch1, sch2, sch3]);

  try {
    const postNotiIds = JSON.stringify(noti_ids);
    await AsyncStorage.setItem("@post_notifications", postNotiIds);
    console.log("set");
  } catch (e) {
    console.error("failed to save ids");
  }
};

const clearPostScheduledNotifications = async () => {
  try {
    let postNotiIds = await AsyncStorage.getItem("@post_notifications");
    if (postNotiIds != null) {
      postNotiIds = JSON.parse(postNotiIds);
      postNotiIds.forEach((x) => {
        cancelNotification(x);
      });
      await AsyncStorage.removeItem("@post_notifications");
      console.log("removed all");
    }
  } catch (e) {}
};

const clearScheduledNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

const minuteToSeconds = (min) => {
  return min * MINUTE;
};

const randomNumber = (max) => {
  return Math.round(Math.random() * (max - 1));
};

async function schedulePushNotification(message, seconds) {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: message.title,
      body: message.body,
      sound: "default",
    },
    trigger: {
      seconds: seconds,
      repeats: false,
    },
  });
  return id;
}

async function cancelNotification(notifId) {
  await Notifications.cancelScheduledNotificationAsync(notifId);
}

export {
  schedulePushNotification,
  cancelNotification,
  setPostReminders,
  clearPostScheduledNotifications,
};

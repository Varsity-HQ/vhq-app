import React from "react";
import * as Notifications from "expo-notifications";
import messages from "./messages";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MINUTE = 60;
const HOUR = 3600;

const setPromoNots = async () => {
  await clearScheduledNotifications();
  let length = messages.general_promos.length;
  schedulePushNotification(messages.general_promos[randomNumber(length)], HOUR);
  schedulePushNotification(
    messages.general_promos[randomNumber(length)],
    HOUR * 4,
  );
  schedulePushNotification(
    messages.general_promos[randomNumber(length)],
    HOUR * 6,
  );
  schedulePushNotification(
    messages.general_promos[randomNumber(length)],
    HOUR * 9,
  );
  schedulePushNotification(
    messages.general_promos[randomNumber(length)],
    HOUR * 14,
  );
  schedulePushNotification(messages.bring_back[0], HOUR * 24);
  schedulePushNotification(messages.bring_back[1], HOUR * 48);
  schedulePushNotification(messages.bring_back[2], HOUR * 72);
};

const setPostReminders = async () => {
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
  setPromoNots,
};

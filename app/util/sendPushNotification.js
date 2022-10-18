const { Expo } = require("expo-server-sdk");

let expo = new Expo();

export const sendPushNotification = (pushToken, message, pushTokens) => {
  let messages = [];
  let somePushTokens = pushTokens ? pushTokens : [pushToken];

  for (let pushToken of somePushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    messages.push({
      to: pushToken,
      title: message.title,
      sound: "default",
      body: message.body,
      data: { ...message },
    });
  }

  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];

  (async () => {
    for (let chunk of chunks) {
      try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        // console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

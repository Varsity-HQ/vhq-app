export const sendPushNotification = async (pushToken, message) => {
  let notification = {
    to: pushToken,
    title: message.title,
    sound: "default",
    body: message.body,
    data: { ...message },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      host: "exp.host",
      accept: "application/json",
      "accept-encoding": "gzip, deflate",
      "content-type": "application/json",
    },
    body: JSON.stringify(notification),
  }).catch((err) => {
    console.log(err);
  });
};

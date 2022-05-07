import axios from "axios";

export const get_notification = () => (dispatch) => {
  axios
    .get("/get/notifications")
    .then((data) => {
      dispatch({
        type: "SET_RECEIVED_NOTIFICATIONS",
        payload: data.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const flag_notification_opened = (id) => () => {
  axios
    .get(`/flag/notifications/opened/${id}`)
    .then(() => {})
    .catch((err) => {
      console.error(err);
    });
};

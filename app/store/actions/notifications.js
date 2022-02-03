import axios from "axios";

export const get_notification = () => (dispatch) => {
  axios
    .get("/get/notifications")
    .then((data) => {
      //   console.log(data.data);
      dispatch({
        type: "SET_RECEIVED_NOTIFICATIONS",
        payload: data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

import axios from "axios";
import store from "../store";

export const setExpoPushToken = (token) => (dispatch) => {
  let currentToken = store.getState().core.accData.notificationToken;
  if (currentToken !== token) {
    axios
      .post("/update/notifications/token", {
        token,
      })
      .then(() => {
        dispatch({
          type: "SET_PUSH_TOKEN",
          payload: token,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
};

export const request_password_reset = (email) => (dispatch) => {
  let reset_token = generate_token(32);

  dispatch({
    type: "SET_RESETTING_LOADING_N_CLEAR_ERR",
    payload: true,
  });

  axios
    .post(`/forgot-password`, {
      token: reset_token,
      email: email,
    })
    .then(() => {
      dispatch({
        type: "SET_RESETTING_LOADING_N_CLEAR_ERR",
        payload: false,
      });
      dispatch({
        type: "SET_PASS_R_REQUESTED",
      });
    })
    .catch((err) => {
      dispatch({
        type: "SET_RESETTING_LOADING_N_CLEAR_ERR",
        payload: false,
      });
      dispatch({
        type: "SET_PASS_R_ERRORS",
        payload: { ...err.response.data },
      });
    });
};

const generate_token = (length) => {
  var a =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
};

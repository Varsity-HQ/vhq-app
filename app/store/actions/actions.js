import axios from "axios";
import store from "../store";

export const setAuthState = (state) => (dispatch) => {
  dispatch({
    type: "SET_AUTH_STATE",
    payload: state,
  });
};

export const logOutUser = () => (dispatch) => {
  delete axios.defaults.headers.common[`Authorization`];
  dispatch({ type: "SET_UNAUTHENTICATED" });
};

const setAuthorizationHeader = (token) => {
  const vhqat = `Bearer ${token}`;
  axios.defaults.headers.common["Authorization"] = vhqat;
};

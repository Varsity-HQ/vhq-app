import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import auth_storage from "../../auth/auth_storage";
import store from "../store";

export const set_user = (user) => (dispatch) => {
  dispatch({
    type: "SET_USER_DATA",
    payload: user,
  });
};

export const set_user_token = (token) => (dispatch) => {
  setAuthorizationHeader(token);
  dispatch({
    type: "SET_AUTH_STATE",
    payload: true,
  });
};

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

export const set_token = (token) => () => {
  setAuthorizationHeader(token);
};

const setAuthorizationHeader = async (token) => {
  const vhqat = `Bearer ${token}`;
  axios.defaults.headers.common["Authorization"] = vhqat;
  try {
    await auth_storage.storeToken(token);
  } catch (error) {
    console.log("failed to set token", error);
  }
};

import axios from "axios";
import Toast from "react-native-toast-message";
import store from "../store";
import {
  SAVED_MARKETPLACE_ITEM,
  UNSAVED_MARKETPLACE_ITEM,
} from "../../util/toast_messages";
import { TShirt2Fill } from "react-native-remix-icon/src/icons";

export const get_home = () => (dispatch) => {
  dispatch({
    type: "CLEAR_ERROR",
  });

  axios
    .get("/marketplacehome/get")
    .then((data) => {
      dispatch({
        type: "MP_SET_HOME_DATA",
        payload: data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const get_category = (category) => (dispatch) => {
  dispatch({
    type: "MP_SET_CATEGORY_LOADING",
  });
  axios
    .get(`/marketplace/cat/${category}/getall`)
    .then((data) => {
      dispatch({
        type: "MP_SET_CATEGORY_DATA",
        payload: data.data,
      });
      // console.log(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const save_marketplace_item = (itemID) => (dispatch) => {
  dispatch({
    type: "SAVE_MARKETPLACE_ITEM",
    payload: itemID,
  });
  Toast.show({
    type: "general",
    autoHide: false,
    ...SAVED_MARKETPLACE_ITEM,
  });
  axios.get(`/marketplace/${itemID}/save`);
};
export const unsave_marketplace_item = (itemID) => (dispatch) => {
  dispatch({
    type: "UNSAVE_MARKETPLACE_ITEM",
    payload: itemID,
  });
  Toast.show({
    type: "general",
    autoHide: false,
    ...UNSAVED_MARKETPLACE_ITEM,
  });
  axios.get(`/marketplace/${itemID}/unsave`);
};

// /marketplace/cat/${category}/getall

// Create AD
export const update_name = (name) => (dispatch) => {
  dispatch({
    type: "MPC_UPDATE_NAME",
    payload: name,
  });
};
export const update_category = (category) => (dispatch) => {
  dispatch({
    type: "MPC_UPDATE_CATEGORY",
    payload: category,
  });
};
export const update_pricing = (pricing) => (dispatch) => {
  dispatch({
    type: "MPC_UPDATE_PRICING",
    payload: pricing,
  });
};
export const set_tab_index = (index) => (dispatch) => {
  dispatch({
    type: "MPC_UPDATE_TAB_INDEX",
    payload: index,
  });
};
export const update_duration = (index) => (dispatch) => {
  dispatch({
    type: "MPC_UPDATE_TAB_INDEX",
    payload: index,
  });
};

export const tab_back = () => (dispatch) => {
  let currentIndex = store.getState().marketplaceReducer.create.tabIndex;
  if (currentIndex > 0) {
    dispatch({
      type: "MPC_UPDATE_TAB_INDEX",
      payload: currentIndex - 1,
    });
  }
};

export const update_department =
  (department = "service") =>
  (dispatch) => {
    dispatch({
      type: "MPC_UPDATE_DEPARTMENT",
      payload: department.toLowerCase(),
    });
  };

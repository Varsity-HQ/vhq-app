import axios from "axios";
import Toast from "react-native-toast-message";
import store from "../store";
import {
  SAVED_MARKETPLACE_ITEM,
  UNSAVED_MARKETPLACE_ITEM,
} from "../../util/toast_messages";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";

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
  let title = store.getState().marketplaceReducer.create.data.title;
  if (title.length < 100)
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
export const update_duration = (duration) => (dispatch) => {
  dispatch({
    type: "MPC_UPDATE_DURATION",
    payload: duration,
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

export const update_department = (department) => (dispatch) => {
  let current_department =
    store.getState().marketplaceReducer.create.data.department;

  if (current_department !== department) {
    dispatch({
      type: "RESET_MPC",
    });
  }

  dispatch({
    type: "MPC_UPDATE_DEPARTMENT",
    payload: department.toLowerCase(),
  });
};
export const update_company = (company) => (dispatch) => {
  dispatch({
    type: "MPC_UPDATE_COMPANY",
    payload: company,
  });
};
export const update_job_type = (type) => (dispatch) => {
  dispatch({
    type: "MPC_UPDATE_JOB_TYPE",
    payload: type,
  });
};
export const update_description = (html, text) => (dispatch) => {
  dispatch({
    type: "MPC_UPDATE_DESCRIPTION",
    payload: {
      html,
      text,
    },
  });
};

export const add_mc_image = (image) => (dispatch) => {
  dispatch({
    type: "MPC_ADD_LOCAL_IMAGE",
    payload: image,
  });
};

export const remove_local_image = (index) => (dispatch) => {
  dispatch({
    type: "MPC_REMOVE_LOCAL_IMAGE",
    payload: index,
  });
};
export const select_everyone = (isChecked) => (dispatch) => {
  const new_targets = {
    first: isChecked,
    second: isChecked,
    third: isChecked,
    forth: isChecked,
    postgraduates: isChecked,
  };

  dispatch({
    type: "MPC_UPDATE_NEW_TARGETS_ALL",
    payload: new_targets,
  });
};
export const handle_target_check = (isChecked, field) => (dispatch) => {
  const current_targets =
    store.getState().marketplaceReducer.create.data.target;
  const new_targets = {
    ...current_targets,
    [field]: isChecked,
  };

  dispatch({
    type: "MPC_UPDATE_NEW_TARGETS_ALL",
    payload: new_targets,
  });
};

export const handle_create_ad = () => async (dispatch) => {
  dispatch({
    type: "MPC_UPLOADING",
    payload: true,
  });
  const ad_data = store.getState().marketplaceReducer.create.data;
  const ad_local_marketplace =
    store.getState().marketplaceReducer.create.local_images;

  let attachment_urls =
    ad_local_marketplace.length > 0
      ? await uploadMultipleImagesAsync(ad_local_marketplace)
      : [];

  const ready_ad_data = {
    ...ad_data,
    attachments: attachment_urls,
    feed_targeting: ad_data.target,
    fromUniversity: store.getState().core.accData.university,
  };

  axios
    .post("/market/addnew", ready_ad_data)
    .then(() => {
      dispatch({
        type: "RESET_MPC",
      });
      dispatch({
        type: "MPC_UPLOADING",
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "MPC_UPLOADING",
        payload: false,
      });
    });
};

const uploadMultipleImagesAsync = async (images) => {
  let promises = [];
  await images.forEach((x) => {
    promises.push(uploadImageAsync(x));
  });
  return Promise.all(promises)
    .then((upload_res) => {
      return upload_res;
    })
    .catch((err) => console.error(err.code));
};

const uploadImageAsync = async (uri) => {
  return await new Promise(async (resolve, reject) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), `vhq_${uuid.v4()}.jpeg`);
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    let downloadUrl = await getDownloadURL(fileRef);

    resolve(downloadUrl); // peviously return;
    reject("failed to upload");
  });
};

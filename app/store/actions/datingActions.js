import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";
import store from "../store";
import axios from "axios";

export const update_dating_purpose = (purpose, interested_in) => (dispatch) => {
  dispatch({
    type: "DATING_UPDATE_PURPOSE",
    payload: {
      purpose: purpose,
      interested_in: interested_in,
    },
  });
};

export const update_dating_uname = (name) => (dispatch) => {
  dispatch({
    type: "DATING_UPDATE_USERNAME",
    payload: name,
  });
};

export const update_dating_profile_pic = (image) => (dispatch) => {
  dispatch({
    type: "DATING_UPDATE_PROFILE_PIC",
    payload: "url",
  });
};
export const update_dating_profile_is_active = (state) => (dispatch) => {
  dispatch({
    type: "UPDATE_DATING_PROFILE_IS_ACTIVE",
    payload: state,
  });
};

export const update_dating_main_info = (info) => (dispatch) => {
  dispatch({
    type: "UPDATE_DATING_MAIN_INFO",
    payload: { ...info },
  });
};

export const remove_dating_profile_picture = () => async (dispatch) => {
  dispatch({
    type: "SET_UPLOADING_DATING_PROFILE_PIC",
    payload: true,
  });

  dispatch({
    type: "DATING_UPDATE_PROFILE_PIC",
    payload: "",
  });

  axios
    .get("/deletesubprofilepic")
    .then(() => {
      dispatch({
        type: "SET_UPLOADING_DATING_PROFILE_PIC",
        payload: false,
      });
      dispatch({
        type: "DATING_UPDATE_PROFILE_PIC",
        payload: "",
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "SET_UPLOADING_DATING_PROFILE_PIC",
        payload: false,
      });
    });
};

export const import_vhq_profile_to_dating = () => async (dispatch) => {
  dispatch({
    type: "SET_UPLOADING_DATING_PROFILE_PIC",
    payload: true,
  });

  let current_vhq_pp = store.getState().core.accData.profilepic;

  if (current_vhq_pp) {
    let profilepic_url = await uploadImageAsync(current_vhq_pp);

    axios
      .post("/changesubprofilepic/byurl", {
        newUrl: profilepic_url,
      })
      .then(() => {
        dispatch({
          type: "DATING_UPDATE_PROFILE_PIC",
          payload: profilepic_url,
        });
        dispatch({
          type: "SET_UPLOADING_DATING_PROFILE_PIC",
          payload: false,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "SET_UPLOADING_DATING_PROFILE_PIC",
          payload: false,
        });
      });
  } else {
    dispatch({
      type: "SET_UPLOADING_DATING_PROFILE_PIC",
      payload: false,
    });
  }
};
export const upload_dating_profile_picture = (image) => async (dispatch) => {
  dispatch({
    type: "SET_UPLOADING_DATING_PROFILE_PIC",
    payload: true,
  });

  if (image) {
    let profilepic_url = await uploadImageAsync(image);

    axios
      .post("/changesubprofilepic/byurl", {
        newUrl: profilepic_url,
      })
      .then(() => {
        dispatch({
          type: "DATING_UPDATE_PROFILE_PIC",
          payload: profilepic_url,
        });
        dispatch({
          type: "SET_UPLOADING_DATING_PROFILE_PIC",
          payload: false,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "SET_UPLOADING_DATING_PROFILE_PIC",
          payload: false,
        });
      });
  } else {
    dispatch({
      type: "SET_UPLOADING_DATING_PROFILE_PIC",
      payload: false,
    });
  }
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

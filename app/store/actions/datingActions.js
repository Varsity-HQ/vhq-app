import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  get,
  addDoc,
  collection,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import uuid from "uuid";
import store from "../store";
import dating_profile_mask from "../dating_profile_mask";
import axios from "axios";
import db from "../../util/fb_admin";
import { async } from "@firebase/util";

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

export const initialize_discover_page = () => (dispatch) => {
  console.log("initialized");

  let discover_id = store.getState().core.accData.discover_profile_id;

  if (discover_id) {
    get_discover_profile(dispatch);
  } else {
    create_discover_profile(dispatch);
  }
};

const get_discover_profile = async (dispatch) => {
  console.log("get_discover_profile");

  const discover_profile_id = store.getState().core.accData.discover_profile_id;
  const uDiscProfileRef = doc(db, "discover_profiles", discover_profile_id);

  await getDoc(uDiscProfileRef)
    .then((data) => {
      dispatch({
        type: "SET_DATING_DATA",
        payload: data.data(),
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const create_discover_profile = async (dispatch) => {
  console.log("create_discover_profile");

  const uData = store.getState().core.accData;
  const profile = {
    ...dating_profile_mask,
    gender: uData.gender,
    age: uData.age,
    sexual_orientation: uData.s_orientation,
    university: uData.university,
    profilepic: uData.sub_profilepic,
    parentID: uData.userID,
  };

  const uCollectionRef = collection(db, "discover_profiles");

  await addDoc(uCollectionRef, profile)
    .then(async (data) => {
      await updateDoc(doc(db, "discover_profiles", data.id), {
        id: data.id,
      });
      await updateDoc(doc(db, "accounts", uData.userID), {
        discover_profile_id: data.id,
      });
      dispatch({
        type: "SET_DATING_PROFILE_ID",
        payload: data.id,
      });
      dispatch({
        type: "SET_DATING_DATA",
        payload: profile,
      });
      console.log("doc added");
    })
    .catch((err) => {
      console.log(err);
    });
};

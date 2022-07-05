import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  get,
  addDoc,
  collection,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import uuid from "uuid";
import * as geofire from "geofire-common";
import store from "../store";
import dating_profile_mask from "../dating_profile_mask";
import axios from "axios";
import db from "../../util/fb_admin";
import Toast from "react-native-toast-message";
import { Alert } from "react-native";
import isDatingProfileReady from "../../util/isDatingProfileReady";
import { async } from "@firebase/util";

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

  let discover_id = store.getState().core.accData?.discover_profile_id;

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
    nickname: uData.firstname,
    show_sorientation: uData.show_sorientation,
    yearOfStudy: uData.yearOfStudy,
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
        payload: { ...profile, id: data.id },
      });
      console.log("doc added");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const save_dating_nickname = (nickname) => async (dispatch) => {
  const discover_profile_id = store.getState().core.accData.discover_profile_id;
  const uDiscProfileRef = doc(db, "discover_profiles", discover_profile_id);

  dispatch({
    type: "DATING_UPDATE_NICKNAME_LOADING",
    payload: true,
  });

  await updateDoc(uDiscProfileRef, {
    nickname: nickname,
  })
    .then(() => {
      dispatch({
        type: "DATING_UPDATE_NICKNAME",
        payload: nickname,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "DATING_UPDATE_NICKNAME_LOADING",
        payload: false,
      });
    });
};

export const update_dating_purpose = (purpose) => async (dispatch) => {
  const discover_profile_id = store.getState().core.accData.discover_profile_id;
  const uDiscProfileRef = doc(db, "discover_profiles", discover_profile_id);
  const prevPurpose = store.getState().datingReducer.profile.purpose;

  if (prevPurpose === purpose) return;

  await updateDoc(uDiscProfileRef, {
    purpose: purpose,
  })
    .then(() => {
      dispatch({
        type: "DATING_UPDATE_PURPOSE",
        payload: {
          purpose: purpose,
          interested_in: "",
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const update_dating_about = (about) => async (dispatch) => {
  const discover_profile_id = store.getState().core.accData.discover_profile_id;
  const uDiscProfileRef = doc(db, "discover_profiles", discover_profile_id);

  dispatch({
    type: "DATING_UPDATE_ABOUT_LOADING",
    payload: true,
  });
  await updateDoc(uDiscProfileRef, {
    about: about,
  })
    .then(() => {
      dispatch({
        type: "DATING_UPDATE_ABOUT",
        payload: about,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "DATING_UPDATE_ABOUT_LOADING",
        payload: false,
      });
    });
};

export const update_dating_gender_interest = (interest) => async (dispatch) => {
  const discover_profile_id = store.getState().core.accData.discover_profile_id;
  const uDiscProfileRef = doc(db, "discover_profiles", discover_profile_id);
  let interestArray = [];

  if (interest === "female") {
    interestArray = ["Female"];
  }
  if (interest === "male") {
    interestArray = ["Male"];
  }
  if (interest === "everyone") {
    interestArray = ["Female", "Male"];
  }

  await updateDoc(uDiscProfileRef, {
    show_me: interestArray,
  })
    .then(() => {
      dispatch({
        type: "DATING_UPDATE_GENDER_INTEREST",
        payload: interestArray,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const toggle_dating_active = (to_active) => async (dispatch) => {
  let discover_profile_id = store.getState().datingReducer.profile.id;
  const uDiscProfileRef = doc(db, "discover_profiles", discover_profile_id);

  if (to_active) {
    if (isDatingProfileReady()) {
      dispatch({
        type: "UPDATE_DATING_PROFILE_IS_ACTIVE",
        payload: to_active,
      });

      dispatch({
        type: "DATING_UPDATE_UPDATING_IS_ACTIVE",
        payload: true,
      });

      await updateDoc(uDiscProfileRef, {
        is_active: to_active,
      })
        .then(() => {
          Toast.show({
            type: "general",
            autoHide: true,
            text1: "Profile actived",
            text2: "Profile now visible in discover",
          });
          dispatch({
            type: "DATING_UPDATE_UPDATING_IS_ACTIVE",
            payload: false,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: "DATING_UPDATE_UPDATING_IS_ACTIVE",
            payload: false,
          });
        });
    } else {
      Alert.alert(
        "Warning",
        "You need to complete setting up your discover account to activate profile",
        [
          {
            text: "Alright",
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
      );
    }
  } else {
    dispatch({
      type: "UPDATE_DATING_PROFILE_IS_ACTIVE",
      payload: to_active,
    });

    dispatch({
      type: "DATING_UPDATE_UPDATING_IS_ACTIVE",
      payload: true,
    });

    await updateDoc(uDiscProfileRef, {
      is_active: to_active,
    })
      .then(() => {
        Toast.show({
          type: "general",
          autoHide: true,
          text1: "Profile deactivated",
          text2: "Profile no longer visible in discover",
        });
        dispatch({
          type: "DATING_UPDATE_UPDATING_IS_ACTIVE",
          payload: false,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "DATING_UPDATE_UPDATING_IS_ACTIVE",
          payload: false,
        });
      });
  }
};

export const delete_dating_profile = () => async (dispatch) => {
  let discover_profile_id = store.getState().datingReducer.profile.id;
  let userID = store.getState().core.accData.userID;

  const uDiscProfileRef = doc(db, "discover_profiles", discover_profile_id);
  const uMyProfileRef = doc(db, "accounts", userID);

  await deleteDoc(uDiscProfileRef)
    .then(async () => {
      dispatch({
        type: "DATING_RESET",
      });
      dispatch({
        type: "SET_DATING_PROFILE_ID",
        payload: "",
      });
      await updateDoc(uMyProfileRef, {
        discover_profile_id: "",
      });
    })
    .then(async () => {
      await create_discover_profile(dispatch);
    })
    .then(() => {
      Toast.show({
        type: "general",
        autoHide: true,
        text1: ".",
        text2: "Dating profile reset successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const update_user_location = (data) => async (dispatch) => {
  let discover_profile_id = store.getState().core.accData.discover_profile_id;
  const uDiscProfileRef = doc(db, "discover_profiles", discover_profile_id);
  const latitude = data.coords?.latitude;
  const longitude = data.coords?.longitude;

  if (data?.coords && discover_profile_id) {
    let g_hash = geofire.geohashForLocation([latitude, longitude]);
    await updateDoc(uDiscProfileRef, {
      lat: latitude ? latitude : "",
      long: longitude ? longitude : "",
      hashed_location: g_hash,
    })
      .then(() => {
        dispatch({
          type: "DATING_UPDATE_LOCATION",
          payload: {
            lat: latitude,
            long: longitude,
            hashed_location: g_hash,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export const save_dating_profile = (p) => (dispatch) => {
  dispatch({
    type: "DATING_SAVE_PROFILE",
    payload: p,
  });
};

export const update_distance_filter = (distance) => async (dispatch) => {
  let discover_profile_id = store.getState().core.accData.discover_profile_id;
  const uDiscProfileRef = doc(db, "discover_profiles", discover_profile_id);

  let current_filter = store.getState().datingReducer.profile.filters;
  if (distance === current_filter.distance) return;
  dispatch({
    type: "DATING_SET_DISTANCE",
    payload: distance,
  });

  await updateDoc(uDiscProfileRef, {
    filters: {
      ...current_filter,
      distance: distance,
    },
  })
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const poke_profile = (id) => async (dispatch) => {
  let discover_profile_id = store.getState().core.accData.discover_profile_id;
  const myDiscProfileRef = doc(db, "discover_profiles", discover_profile_id);
  const uDiscProfileRef = doc(db, "discover_profiles", id);
  const pokedCollection = collection(db, "poked_users");
  dispatch({
    type: "DATING_POKE_ACCOUNT",
    payload: id,
  });
  await updateDoc(uDiscProfileRef, {
    poked: true,
  })
    .then(async () => {
      return getDoc(myDiscProfileRef);
    })
    .then(async (data) => {
      let currPoked = data.data().poked_users;
      let newPoked = currPoked ? currPoked.concat([id]) : [id];
      return updateDoc(myDiscProfileRef, {
        poked_users: newPoked,
      });
    })
    .then(async () => {
      await addDoc(pokedCollection, {
        datePoked: new Date().toISOString(),
        poked_user: id,
        poked_by: discover_profile_id,
      });
    });
};
export const register_visit = (id) => async () => {
  if (!id) return;
  const uDiscProfileRef = doc(db, "discover_profiles", id);
  await getDoc(uDiscProfileRef).then(async (data) => {
    await updateDoc(uDiscProfileRef, {
      ...data.data(),
      seen_count: parseInt(data.data().seen_count) + 1,
    });
  });
};

export const handle_dating_blocked_account = (id) => async (dispatch) => {
  dispatch({
    type: "DATING_ADD_TO_BLOCKED",
    payload: id,
  });

  let discover_profile_id = store.getState().core.accData.discover_profile_id;
  const myDiscProfileRef = doc(db, "discover_profiles", discover_profile_id);
  const uDiscProfileRef = doc(db, "discover_profiles", id);

  await getDoc(uDiscProfileRef)
    .then((data) => {
      let blocked = data.data().blocked;
      return updateDoc(uDiscProfileRef, {
        blocked: blocked
          ? blocked.concat([discover_profile_id])
          : [discover_profile_id],
      });
    })
    .then(() => {
      return getDoc(myDiscProfileRef);
    })
    .then((data) => {
      let blocked = data.data().blocked;
      return updateDoc(myDiscProfileRef, {
        blocked: blocked ? blocked.concat([id]) : [id],
      });
    });
};

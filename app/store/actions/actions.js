import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import auth_storage from "../../auth/auth_storage";
import store from "../store";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";

export const updates_gender_pref = (s_target, show_s_target) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_S_TARGET_SETTINGS",
    payload: true,
  });
  axios
    .post("/account/update/s_target", {
      show_s_target: show_s_target,
      s_target: s_target,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_S_TARGET",
        payload: {
          s_target: s_target,
          show_s_target: show_s_target,
        },
      });
      dispatch({
        type: "UPDATE_SAVING_S_TARGET_SETTINGS",
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "UPDATE_SAVING_S_TARGET_SETTINGS",
        payload: false,
      });
    });
};
export const update_sexual_orientation = (orientation, show) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_SO_SETTINGS",
    payload: true,
  });
  axios
    .post("/account/update/sexualori", {
      show_sorientation: show,
      s_orientation: orientation,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_SAVING_SO_SETTINGS",
        payload: false,
      });
      dispatch({
        type: "UPDATE_SEXUAL_ORIENTATION",
        payload: {
          s_orientation: orientation,
          show_sorientation: show,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_SO_SETTINGS",
        payload: false,
      });
    });
};

export const update_relationship_status = (rs) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_RS_SETTINGS",
    payload: true,
  });
  axios
    .post("/account/update/relationshipstatus", {
      relationshipStatus: rs,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_RELATIONSHIP_STATUS",
        payload: rs,
      });
      dispatch({
        type: "UPDATE_SAVING_RS_SETTINGS",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_RS_SETTINGS",
        payload: false,
      });
    });
};

export const update_gender = (gender) => (dispatch) => {
  let s_target = "";

  dispatch({
    type: "UPDATE_SAVING_GENDER_SETTINGS",
    payload: true,
  });

  if (gender === "Male") {
    s_target = "Female";
  } else {
    s_target = "Male";
  }
  axios
    .post("/account/update/gender", {
      gender: gender,
      s_target: s_target,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_GENDER",
        payload: gender,
      });
      dispatch({
        type: "UPDATE_S_TARGET_2",
        payload: s_target,
      });
      dispatch({
        type: "UPDATE_SAVING_GENDER_SETTINGS",
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "UPDATE_SAVING_GENDER_SETTINGS",
        payload: false,
      });
    });
};

export const update_dob = (date, age) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_DOB_SETTINGS",
    payload: true,
  });
  axios
    .post("/account/update/dob", {
      dob: date,
      age: age,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_DOB",
        payload: { dob: date, age },
      });
      dispatch({
        type: "UPDATE_SAVING_DOB_SETTINGS",
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "UPDATE_SAVING_DOB_SETTINGS",
        payload: false,
      });
    });
};

export const update_degree = (degree) => (dispatch) => {
  let my_degree = degree;
  let yearOfStudy = store.getState().core.accData.yearOfStudy;

  dispatch({
    type: "UPDATE_SAVING_DEGREE_SETTINGS",
    payload: true,
  });

  axios
    .post("/account/update/yosndegree", {
      degree: my_degree,
      yearOfStudy: yearOfStudy,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_SAVING_DEGREE_SETTINGS",
        payload: false,
      });
      dispatch({
        type: "UPDATE_DEGREE",
        payload: my_degree,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_DEGREE_SETTINGS",
        payload: false,
      });
      console.log(err);
    });
};

export const update_yearofstudy = (yos) => (dispatch) => {
  let yearOfStudy = yos;
  let degree = store.getState().core.accData.degree;

  dispatch({
    type: "UPDATE_SAVING_YOS_SETTINGS",
    payload: true,
  });

  axios
    .post("/account/update/yosndegree", {
      degree: degree,
      yearOfStudy: yearOfStudy,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_SAVING_YOS_SETTINGS",
        payload: false,
      });
      dispatch({
        type: "UPDATE_YOS",
        payload: yearOfStudy,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_YOS_SETTINGS",
        payload: false,
      });
      console.log(err);
    });
};

export const turn_off_anonymous = () => (dispatch) => {
  dispatch({
    type: "TURN_OFF_ANONYMOUS",
  });

  axios
    .get("/set-anonymous-off")
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const switch_to_anonymous = (name, index) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_ANON_SETTINGS",
    payload: true,
  });

  axios
    .post("/set-anonymous", {
      anonymous_name: name,
      anonymous_emoji_index: index,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_SAVING_ANON_SETTINGS",
        payload: false,
      });
      dispatch({
        type: "SWITCH_TO_ANONYMOUS",
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_ANON_SETTINGS",
        payload: false,
      });
      console.log(err);
    });
};

export const update_anonymous_name = (name) => (dispatch) => {
  dispatch({
    type: "UPDATE_ANONYMOUS_NAME",
    payload: name,
  });
};
export const set_anon_emoji_index = (index) => (dispatch) => {
  dispatch({
    type: "SET_ANON_EMOJI_INDEX",
    payload: index,
  });
};

export const follow_account = (uid) => (dispatch) => {
  let account = {
    id: uuid.v4(),
    follower_id: store.getState().core.accData.userID,
    following_user: uid,
    follow_date: new Date().toISOString(),
  };

  let pp_user_id = store.getState().data.profile_page.user.userID;

  dispatch({
    type: "ADD_FOLLOWED_ACCOUNT",
    payload: account,
  });

  if (pp_user_id === uid) {
    dispatch({
      type: "INCREMENT_OTHER_USER_FOLLOWING",
    });
  }

  axios
    .get(`/follow/${uid}`)
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
};

export const unfollow_account = (uid) => (dispatch) => {
  let pp_user_id = store.getState().data.profile_page.user.userID;

  dispatch({
    type: "REMOVE_FOLLOWED_ACCOUNT",
    payload: uid,
  });

  if (pp_user_id === uid) {
    dispatch({
      type: "DECREMENT_OTHER_USER_FOLLOWING",
    });
  }

  axios
    .get(`/unfollow/${uid}`)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const get_search_data = () => (dispatch) => {
  axios
    .get("/get/search")
    .then((data) => {
      dispatch({
        type: "SET_SEARCH_DATA",
        payload: data.data,
      });

      console.log(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const get_auth_user_posts = () => (dispatch) => {
  let previous_user = store.getState().data.profile_page.user.userID;
  let auth_user_id = store.getState().core.accData.userID;

  if (previous_user !== auth_user_id) {
    dispatch({
      type: "SET_PROFILE_POSTS_LOADING",
    });
  }

  axios
    .get("/profile/posts")
    .then((data) => {
      dispatch({
        type: "SET_PROFILE_POSTS",
        payload: data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const get_auth_profile = () => (dispatch) => {
  let profile = store.getState().core.accData;
  dispatch({
    type: "SET_PROFILE_DATA",
    payload: profile,
  });
};

export const get_user_profile = (username) => (dispatch) => {
  let previous_user = store.getState().data.profile_page.user.username;
  let previous_errors = store.getState().data.profile_page.errors;

  if (previous_user !== username || previous_errors.notFound) {
    console.log("set loading", { previous_user, username });
    dispatch({
      type: "SET_LOADING_PROFILE",
    });
  }

  console.log({ username });

  axios
    .get(`/user/${username}/get`)
    .then((data) => {
      let u_data = data.data;
      console.log(u_data);

      if (u_data.response === "user_not_found") {
        return dispatch({
          type: "SET_USER_NOT_FOUND",
        });
      }

      dispatch({
        type: "SET_OTHER_PROFILE_DATA",
        payload: {
          posts: u_data.user_posts,
          user: u_data.user_data,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const get_user_page = (username) => {
  axios
    .get(`/user/${username}/get`)
    .then((data) => {
      console.log(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const get_home_posts = () => (dispatch) => {
  let lastVisible = store.getState().data.home_data.page_cursor;

  axios
    .get(`/get/home${lastVisible ? "?pt_ad=" + lastVisible : ""}`)
    .then((data) => {
      // console.log("home=>", data.data);

      let currentPosts = store.getState().data.home_data.posts;
      let new_posts = currentPosts.concat(data.data.posts);

      // console.log("updated home");

      console.log(data.data);

      dispatch({
        type: "SET_HOME_MARKET_ITEMS",
        payload: data.data.items,
      });

      dispatch({
        type: "SET_HOME_POSTS",
        payload: {
          posts: new_posts,
          cursor: data.data.lastVisible,
        },
      });
      //
    })
    .catch((err) => console.log(err));
};

export const save_profileDefaults = (uObj) => async (dispatch) => {
  dispatch({
    type: "SET_OVERLAY_STATE",
    payload: true,
  });
  console.log({ uObj });
  let uploaded = await uploadImageAsync(uObj.profilepic);
  console.log(uploaded);

  axios
    .post("/changeprofilepic/byurl", {
      newUrl: uploaded,
    })
    .then((data) => {
      console.log(data.data);
      dispatch({
        type: "UPDATE_PROFILE_PIC",
        payload: uploaded,
      });
      return axios.post("/account/update/pinfo", {
        firstname: uObj.firstname,
        surname: uObj.surname,
      });
    })
    .then(() => {
      dispatch({
        type: "UPDATE_FIRSTNAME_N_SURNAME",
        payload: {
          firstname: uObj.firstname,
          surname: uObj.surname,
        },
      });
      return axios.get("/account/activate");
    })
    .then(() => {
      dispatch({
        type: "SET_OVERLAY_STATE",
        payload: false,
      });

      dispatch({
        type: "SET_ACC_ACTIVATED",
      });
      return;
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "SET_OVERLAY_STATE",
        payload: false,
      });
    });
};

export const set_overlay_state = (state) => (dispatch) => {
  dispatch({
    type: "SET_OVERLAY_STATE",
    payload: state,
  });
};

export const update_university = (uni) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_UNI_SETTINGS",
    payload: true,
  });

  axios
    .post(`/account/update/university`, {
      university: uni,
    })
    .then(() => {
      dispatch({
        type: "SET_UNIVERSITY",
        payload: uni,
      });
      dispatch({
        type: "UPDATE_SAVING_UNI_SETTINGS",
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "UPDATE_SAVING_UNI_SETTINGS",
        payload: false,
      });
    });
};

export const set_university = (uni) => (dispatch) => {
  dispatch({
    type: "SET_UNIVERSITY",
    payload: uni,
  });
};
export const set_yearofstudy = (yos) => (dispatch) => {
  dispatch({
    type: "SET_YEAR_OF_STUDY",
    payload: yos,
  });
};

export const get_user = () => (dispatch) => {
  axios
    .get("/get/account")
    .then((data) => {
      console.log(data.data);

      dispatch({
        type: "SET_USER_DATA",
        payload: data.data,
      });

      dispatch({
        type: "SET_AUTH_STATE",
        payload: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

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

export const logOutUser = () => async (dispatch) => {
  delete axios.defaults.headers.common[`Authorization`];
  dispatch({ type: "SET_UNAUTHENTICATED" });
  try {
    await auth_storage.removeToken();
  } catch (error) {
    console.log("failed to sign out", error);
  }
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

const uploadImageAsync = async (uri) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), `vhq_${uuid.v4()}.jpeg`);
  const result = await uploadBytes(fileRef, blob);
  // console.log({ result });

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
};

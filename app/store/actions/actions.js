import axios from "axios";
import auth_storage from "../../auth/auth_storage";
import store from "../store";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";

export const remove_bookmark = (post_id) => (dispatch) => {
  dispatch({
    type: "REMOVE_BOOKMARKED_POST_CORE",
    payload: post_id,
  });
  axios
    .get(`/post/${post_id}/removebookmark`)
    .then((data) => {})
    .catch((err) => {
      console.log(err.response);
    });
};

export const bookmark_post = (post_id) => (dispatch) => {
  dispatch({
    type: "ADD_BOOKMARKED_POST_CORE",
    payload: post_id,
  });
  axios
    .get(`/post/${post_id}/bookmark`)
    .then((data) => {})
    .catch((err) => {
      console.log(err.response);
    });
};

export const unlike_post = (post_id) => (dispatch) => {
  // console.log("unlike");
  dispatch({ type: "UNLIKE_POST", payload: post_id });
  dispatch({ type: "UPDATE_UNLIKED_POST", payload: post_id });

  // if (store.getState().core.currentPost) {
  //   dispatch({ type: "UPDATE_LIKED_POST_PP_DEC" });
  // }

  axios
    .get(`/post/unlike/${post_id}`)
    .then((data) => {
      // console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const like_post = (post_id) => (dispatch) => {
  // console.log("like");
  dispatch({ type: "LIKE_POST", payload: post_id });
  dispatch({ type: "UPDATE_LIKED_POST", payload: post_id });
  // if (store.getState().core.currentPost) {
  //   dispatch({ type: "UPDATE_LIKED_POST_PP" });
  // }
  axios
    .get(`/post/like/${post_id}`)
    .then((data) => {
      // console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const update_profile_pic = (uri) => async (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_PROFILE_PIC",
    payload: true,
  });

  let uploaded = await uploadImageAsync(uri);
  //
  axios
    .post("/changeprofilepic/byurl", { newUrl: uploaded })
    .then(() => {
      dispatch({
        type: "UPDATE_SAVING_PROFILE_PIC",
        payload: false,
      });
      dispatch({
        type: "UPDATE_PROFILE_PIC",
        payload: uploaded,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "UPDATE_SAVING_PROFILE_PIC",
        payload: false,
      });
    });
};

export const update_firstname = (firstname) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_FIRSTNAME",
    payload: true,
  });
  axios
    .post("/account/update/firstname", {
      firstname: firstname,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_FIRSTNAME",
        payload: firstname,
      });
      dispatch({
        type: "UPDATE_SAVING_FIRSTNAME",
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "UPDATE_SAVING_FIRSTNAME",
        payload: false,
      });
    });
};
export const update_surname = (surname) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_SURNAME",
    payload: true,
  });
  axios
    .post("/account/update/surname", {
      surname: surname,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_SURNAME",
        payload: surname,
      });
      dispatch({
        type: "UPDATE_SAVING_SURNAME",
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "UPDATE_SAVING_SURNAME",
        payload: false,
      });
    });
};

export const update_username = (username) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_USERNAME",
    payload: true,
  });
  axios
    .post("/account/update/username", {
      username: username,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_USERNAME",
        payload: username,
      });
      dispatch({
        type: "UPDATE_SAVING_USERNAME",
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "UPDATE_SAVING_USERNAME",
        payload: false,
      });
    });
};

export const update_about = (about) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_ABOUT",
    payload: true,
  });
  axios
    .post("/account/update/about", {
      about: about,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_ABOUT",
        payload: about,
      });
      dispatch({
        type: "UPDATE_SAVING_ABOUT",
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "UPDATE_SAVING_ABOUT",
        payload: false,
      });
    });
};

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
    // console.log("set loading", { previous_user, username });
    dispatch({
      type: "SET_LOADING_PROFILE",
    });
  }

  axios
    .get(`/user/${username}/get`)
    .then((data) => {
      let u_data = data.data;

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
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
};

export const get_home_posts = (props) => (dispatch) => {
  let lastVisible = null;

  if (props.init) {
    lastVisible = null;
  }

  if (props.refresh) {
    lastVisible = null;
    dispatch({
      type: "HOME_LOAD_REFRESH",
      payload: true,
    });
  }
  if (props.more) {
    lastVisible = store.getState().data.home_data.page_cursor;
    dispatch({
      type: "HOME_LOADING_MORE",
      payload: true,
    });
  }

  axios
    .get(`/get/home${lastVisible ? "?pt_ad=" + lastVisible : ""}`)
    .then((data) => {
      // console.log("home=>", data.data);
      let currentPosts = store.getState().data.home_data.posts;
      let new_posts = !lastVisible
        ? data.data.posts
        : currentPosts.concat(data.data.posts);

      // console.log("updated home");

      dispatch({
        type: "HOME_LOAD_REFRESH",
        payload: false,
      });

      dispatch({
        type: "HOME_LOADING_MORE",
        payload: false,
      });
      dispatch({
        type: "SET_HOME_MARKET_ITEMS",
        payload: data.data.items,
      });

      if (
        data.data.lastVisible !== store.getState().data.home_data.page_cursor
      ) {
        dispatch({
          type: "SET_HOME_POSTS",
          payload: {
            posts: [...new Set(new_posts)],
            cursor: data.data.lastVisible,
          },
        });
      }

      //
    })
    .catch((err) => {
      dispatch({
        type: "HOME_LOAD_REFRESH",
        payload: false,
      });

      dispatch({
        type: "HOME_LOADING_MORE",
        payload: false,
      });
      console.log(err);
    });
};

export const save_profileDefaults = (uObj) => async (dispatch) => {
  dispatch({
    type: "SET_OVERLAY_STATE",
    payload: true,
  });

  let uploaded = await uploadImageAsync(uObj.profilepic);

  axios
    .post("/changeprofilepic/byurl", {
      newUrl: uploaded,
    })
    .then((data) => {
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

export const login_user = (email, password) => (dispatch) => {
  dispatch({
    type: "LOGGING_IN_USER",
    payload: true,
  });

  dispatch({
    type: "SET_LOGGING_IN_ERROR",
    payload: {},
  });
  axios
    .post("/login", {
      email,
      password,
    })
    .then((data) => {
      setAuthorizationHeader(data.data.token);
      return axios.get("/get/account").then((user_data) => {
        dispatch({
          type: "SET_USER_DATA",
          payload: user_data.data,
        });
        dispatch({
          type: "SET_AUTH_STATE",
          payload: true,
        });

        dispatch({
          type: "LOGGING_IN_USER",
          payload: false,
        });
        dispatch({
          type: "SET_LOGGING_IN_ERROR",
          payload: {},
        });
      });
    })
    .catch((err) => {
      dispatch({
        type: "LOGGING_IN_USER",
        payload: false,
      });
      if (err.response) {
        return dispatch({
          type: "SET_LOGGING_IN_ERROR",
          payload: { ...err.response.data },
        });
      }
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

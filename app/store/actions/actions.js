import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import auth_storage from "../../auth/auth_storage";
import store from "../store";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";

export const follow_account = (uid) => (dispatch) => {
  let account = {
    id: "",
    follower_id: store.getState().core.accData.userID,
    following_user: uid,
    follow_date: new Date().toISOString(),
  };

  axios
    .get(`/follow/${uid}`)
    .then((data) => {
      dispatch({
        type: "ADD_FOLLOWED_ACCOUNT",
        payload: { ...account, id: data.data.followID },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unfollow_account = (uid) => (dispatch) => {
  dispatch({
    type: "REMOVE_FOLLOWED_ACCOUNT",
    payload: uid,
  });

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

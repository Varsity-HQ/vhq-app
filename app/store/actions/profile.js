import axios from "axios";
import store from "../store";
import returnUser from "../../util/returnUser";
import check_if_followed from "../../util/check_if_followed";

const check_if_auth = (uid) => {
  if (uid === store.getState().core.accData.userID) {
    return true;
  } else {
    return false;
  }
};

export const set_following = (followed) => (dispatch) => {
  dispatch({
    type: "PROFILE_USER_FOLOWING",
    payload: followed,
  });
};

export const get_posts = (load_more) => (dispatch) => {
  let user_id = store.getState().profile.user.userID;
  if (!user_id) return;

  if (check_if_auth(user_id)) {
    get_auth_posts(load_more, dispatch);
  } else {
    get_user_posts(load_more, dispatch);
  }
};

export const get_auth_posts = (load_more, dispatch) => {
  console.log("get auth posts");

  let stop = false;

  let lastVisible = null;

  if (load_more) {
    lastVisible = store.getState().profile.posts_lv;

    if (!lastVisible) {
      stop = true;
    } else {
      dispatch({
        type: "LOADING_MORE_POSTS",
        payload: true,
      });
    }
  }

  if (stop) return;

  console.log("called");

  axios
    .get(`/profile/posts${lastVisible ? "?plv=" + lastVisible : ""}`)
    .then((data) => {
      dispatch({
        type: "SET_PROFILE_POSTS",
        payload: {
          posts: data.data.posts,
          lastVisible:
            data.data.lastVisible === lastVisible
              ? null
              : data.data.lastVisible,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const get_user_posts = (load_more, dispatch) => {
  console.log("get posts");
};

export const save_post_user = (post) => (dispatch) => {
  const profile_data = returnUser(post);

  if (
    profile_data.userID &&
    profile_data.userID === store.getState().core.accData.userID
  ) {
    dispatch({
      type: "IS_AUTH_PROFILE",
      payload: true,
    });
    dispatch({
      type: "SET_PROFILE_DATA",
      payload: store.getState().core.accData,
    });
  }

  if (
    profile_data.userID &&
    profile_data.userID !== store.getState().core.accData.userID
  ) {
    dispatch({
      type: "PROFILE_USER_FOLOWING",
      payload: check_if_followed(profile_data.userID),
    });
    dispatch({
      type: "IS_AUTH_PROFILE",
      payload: false,
    });
    dispatch({
      type: "SET_PROFILE_DATA",
      payload: profile_data,
    });
  }
};

export const profile_screen_moved_away = () => (dispatch) => {
  dispatch({
    type: "RESET_PROFILE_PAGE",
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
  let previous_user = store.getState().profile.user.username;
  let previous_errors = store.getState().profile.errors;

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

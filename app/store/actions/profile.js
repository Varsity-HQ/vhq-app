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

export const get_pictures = (load_more) => (dispatch) => {
  let user_id = store.getState().profile.user.userID;
  if (!user_id) return;

  if (check_if_auth(user_id)) {
    get_auth_pictures(load_more, dispatch);
  } else {
    get_user_pictures(load_more, dispatch);
    // console.log("get posts");
  }
};

export const get_auth_bookmarks = (load_more) => (dispatch) => {
  let stop = false;

  let lastVisible = null;

  if (load_more) {
    lastVisible = store.getState().profile.bookmarks_lv;

    if (!lastVisible) {
      stop = true;
    } else {
      dispatch({
        type: "SET_BOOKMARKS_MORE_LOADING",
        payload: true,
      });
    }
  }

  if (stop) return;

  axios
    .post(`/profile/bookmarks`, {
      post_ids: store.getState().core.accData.bookmarks,
    })
    .then((data) => {
      console.log(data.data);
      dispatch({
        type: "SET_BOOKMARKS",
        payload: data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const get_auth_pictures = (load_more, dispatch) => {
  let stop = false;

  let lastVisible = null;

  if (load_more) {
    lastVisible = store.getState().profile.pictures_lv;

    if (!lastVisible) {
      stop = true;
    } else {
      dispatch({
        type: "LOADING_MORE_PICTURES",
        payload: true,
      });
    }
  }

  if (stop) return;

  console.log("called");

  axios
    .get(`/profile/images${lastVisible ? "?plv=" + lastVisible : ""}`)
    .then((data) => {
      console.log(data.data);
      dispatch({
        type: "SET_PICTURES",
        payload: {
          posts: data.data.pictures,
          pictures_lv: null,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const get_user_pictures = (load_more, dispatch) => {
  let username = store.getState().profile.user.username;

  let stop = false;

  let lastVisible = null;

  if (load_more) {
    lastVisible = store.getState().profile.pictures_lv;

    if (!lastVisible) {
      stop = true;
    } else {
      dispatch({
        type: "LOADING_MORE_PICTURES",
        payload: true,
      });
    }
  }

  if (stop) return;

  axios
    .get(
      `/user/${username}/pictures/get${
        lastVisible ? "?plv=" + lastVisible : ""
      }`,
    )
    .then((data) => {
      console.log(data.data);

      const last_visible = data.data.lastVisible;

      let currentPosts = store.getState().profile.posts;

      let new_posts = !lastVisible
        ? data.data.user_posts
        : currentPosts.concat(data.data.user_posts);

      // if (data.data.lastVisible !== store.getState().profile.pictures_lv) {
      console.log("set new data");
      dispatch({
        type: "SET_PROFILE_DATA",
        payload: data.data.user_data,
      });

      dispatch({
        type: "SET_PICTURES",
        payload: {
          pictures: [...new Set(new_posts)],
          pictures_lv: data.data.lastVisible,
          // lastVisible: null,
        },
      });
      // }
    })
    .catch((err) => {
      console.log(err);
      if (load_more) {
        dispatch({
          type: "STOP_LOADING_MORE_PICTURES",
        });
      }
    });
};

// Load posts

export const get_posts = (load_more) => (dispatch) => {
  let user_id = store.getState().profile.user.userID;
  if (!user_id) return;

  if (check_if_auth(user_id)) {
    get_auth_posts(load_more, dispatch);
  } else {
    get_user_posts(load_more, dispatch);
    // console.log("get posts");
  }
};

export const get_auth_posts = (load_more, dispatch) => {
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
  let username = store.getState().profile.user.username;

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

  console.log("start req");

  axios
    .get(
      `/user/${username}/posts/get${lastVisible ? "?plv=" + lastVisible : ""}`,
    )
    .then((data) => {
      console.log(data.data);

      const last_visible = data.data.lastVisible;

      let currentPosts = store.getState().profile.posts;

      let new_posts = !lastVisible
        ? data.data.user_posts
        : currentPosts.concat(data.data.user_posts);

      console.log("before set new data");

      if (
        data.data.lastVisible === null &&
        store.getState().profile.posts_lv === null
      ) {
        dispatch({
          type: "SET_PROFILE_DATA",
          payload: data.data.user_data,
        });

        dispatch({
          type: "SET_PROFILE_POSTS",
          payload: {
            posts: [...new Set(new_posts)],
            lastVisible: data.data.lastVisible,
            // lastVisible: null,
          },
        });
      }

      if (data.data.lastVisible !== store.getState().profile.posts_lv) {
        console.log("set new data");
        dispatch({
          type: "SET_PROFILE_DATA",
          payload: data.data.user_data,
        });

        dispatch({
          type: "SET_PROFILE_POSTS",
          payload: {
            posts: [...new Set(new_posts)],
            lastVisible: data.data.lastVisible,
            // lastVisible: null,
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
      if (load_more) {
        dispatch({
          type: "STOP_LOADING_MORE",
        });
      }
    });
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
  let set_user = store.getState().profile.user.username;
  let previous_errors = store.getState().profile.errors;

  if (set_user !== username || previous_errors.notFound) {
    // console.log("set loading", { previous_user, username });
    dispatch({
      type: "SET_LOADING_PROFILE",
    });
  }

  if (set_user) return;

  console.log({ username });

  axios
    .get(`/user/${username}/posts/get`)
    .then((data) => {
      let u_data = data.data;

      if (u_data.response === "user_not_found") {
        return dispatch({
          type: "SET_USER_NOT_FOUND",
        });
      }

      dispatch({
        type: "PROFILE_USER_FOLOWING",
        payload: check_if_followed(u_data.user_data.userID),
      });
      dispatch({
        type: "IS_AUTH_PROFILE",
        payload: check_if_auth(u_data.user_data.userID),
      });

      dispatch({
        type: "SET_OTHER_PROFILE_DATA",
        payload: {
          posts: u_data.user_posts,
          user: u_data.user_data,
          lastVisible: data.data.lastVisible,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

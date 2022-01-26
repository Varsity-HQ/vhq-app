import axios from "axios";
import store from "../store";
import returnUser from "../../util/returnUser";

export const save_post_user = (post) => (dispatch) => {
  const profile_data = returnUser(post);
  if (
    profile_data.userID &&
    profile_data.userID !== store.getState().core.accData.userID
  )
    dispatch({
      type: "SET_PROFILE_DATA",
      payload: profile_data,
    });
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

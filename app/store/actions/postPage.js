import axios from "axios";
import store from "../store";

export const save_local_post = (post) => (dispatch) => {
  dispatch({
    type: "SAVE_LOCAL_POST",
    payload: post,
  });
};

export const clear_post_page = () => (dispatch) => {
  dispatch({
    type: "CLEAR_POST_PAGE",
  });
};

export const get_post_page = (id) => (dispatch) => {
  const saved_post_id = store.getState().postPage.post?.post?.id;

  if (saved_post_id === id) {
    dispatch({
      type: "POST_DATA_LOADING",
      payload: false,
    });
    axios
      .get(`/post/comments/${id}`)
      .then((data) => {
        dispatch({
          type: "LOAD_POST_COMMENTS",
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    // console.log("fetch whole post");
    axios
      .get(`/post/${id}`)
      .then((data) => {
        dispatch({
          type: "SET_POST_PAGE_DATA",
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

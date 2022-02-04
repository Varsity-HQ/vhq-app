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

export const send_post_comment = (txt) => (dispatch) => {
  const auth_user_data = store.getState().core.accData;
  const post_id = store.getState().postPage.post.post.id;

  axios
    .post(`/post/comment/${post_id}`, {
      comment: txt,
    })
    .then((data) => {
      dispatch({
        type: "ADD_POST_COMMENT",
        payload: {
          post_id: post_id,
          commenter_username: auth_user_data.username,
          commenter_profilepic: auth_user_data.profilepic,
          commenter_firstname: auth_user_data.firstname,
          commenter_surname: auth_user_data.surname,
          comment_by: auth_user_data.userID,
          date_created: new Date().toISOString(),
          comment_text: txt,
          comment_likes: "0",
          comment_comments: "0",
          comment_id: data.data.comment_id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

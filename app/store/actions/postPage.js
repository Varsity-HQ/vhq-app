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
  //|
  //|
  if (saved_post_id === id) {
    //
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
  //|
  //|
};

const send_comment_comment = (txt, dispatch) => {
  const auth_user_data = store.getState().core.accData;
  const post_id = store.getState().postPage.post.post.id;
  const commentToReplyId = store.getState().postPage.replyTo?.parentCommentId;
  const username = store.getState().postPage.replyTo?.username;

  axios
    .post(`/post/comment/${commentToReplyId}/reply`, {
      comment_text: txt,
      replyingTo: username,
    })
    .then((data) => {
      console.log(data.data.comment_id);
      dispatch({
        type: "ADD_POST_COMMENT_REPLY",
        payload: {
          comment_by: auth_user_data.userID,
          date_created: new Date().toISOString(),
          commenter_surname: auth_user_data.surname,
          comment_text: txt,
          comment_id: data.data.comment_id,
          commenter_username: auth_user_data.username,
          commenter_firstname: auth_user_data.firstname,
          commenter_profilepic: auth_user_data.profilepic,
          parent_comment_id: commentToReplyId,
          replyingTo: username,
        },
      });
      dispatch({
        type: "SET_COMMENTING",
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "SET_COMMENTING",
        payload: false,
      });
    });
};

export const send_post_comment = (txt) => (dispatch) => {
  const auth_user_data = store.getState().core.accData;
  const post_id = store.getState().postPage.post.post.id;
  const isReplyingToComment =
    store.getState().postPage.replyTo?.parentCommentId;

  dispatch({
    type: "SET_COMMENTING",
    payload: true,
  });

  if (isReplyingToComment) {
    return send_comment_comment(txt, dispatch);
  }

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
      dispatch({
        type: "SET_COMMENTING",
        payload: false,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "SET_COMMENTING",
        payload: false,
      });
    });
};
export const replyToComment = (data) => (dispatch) => {
  const id = data.comment_id;
  const ctext = data.comment_text;
  const username = data.commenter_username;

  dispatch({
    type: "SET_COMMENT_REPLY_TO",
    payload: {
      parentCommentId: id,
      username: username,
      commentText: ctext,
    },
  });
};

export const delete_comment = (cid) => (dispatch) => {
  console.log({ cid });
  let post_id = store.getState().postPage.post.post.id;

  if (!cid) return;

  dispatch({
    type: "PP_DELETE_COMMENT",
    payload: cid,
  });
  dispatch({
    type: "POST_COMMENT_DECREMENT",
    payload: post_id,
  });

  axios
    .get(`/post/comment/${cid}/delete`)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const cancel_reply_comment = () => (dispatch) => {
  dispatch({
    type: "SET_COMMENT_REPLY_TO",
    payload: null,
  });
};

export const close_comment_replies = (c_id) => (dispatch) => {
  dispatch({
    type: "PP_CLOSE_COMMENT_REPLIES",
    payload: c_id,
  });
};

export const get_comment_replies = (c_id) => (dispatch) => {
  dispatch({
    type: "SET_COMMENT_REPLIES_LOADING",
    payload: c_id,
  });
  axios
    .get(`/comment/${c_id}/replies`)
    .then((data) => {
      console.log(data.data);

      let comments = data.data;
      if (comments) {
        comments.reverse();
      }

      dispatch({
        type: "SET_COMMENT_REPLIES",
        payload: {
          comment_id: c_id,
          comments: comments,
        },
      });
      dispatch({
        type: "SET_COMMENT_REPLIES_LOADING_OFF",
        payload: c_id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

import axios from "axios";
import { v4 } from "uuid";
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
        console.error(err);
      });
  } else {
    axios
      .get(`/post/${id}`)
      .then((data) => {
        dispatch({
          type: "SET_POST_PAGE_DATA",
          payload: data.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  //|
  //|
};

export const unlike_main_comment = (id) => (dispatch) => {
  dispatch({
    type: "UNLIKE_MAIN_COMMENT",
    payload: id,
  });
  dispatch({
    type: "UNLIKE_MAIN_COMMENT_UC",
    payload: id,
  });

  axios
    .get(`/comment/unlike/${id}`)
    .then((data) => {})
    .catch((err) => {
      console.error(err);
    });
};

export const like_main_comment = (id) => (dispatch) => {
  dispatch({
    type: "LIKED_MAIN_COMMENT",
    payload: id,
  });
  dispatch({
    type: "LIKED_MAIN_COMMENT_UC",
    payload: id,
  });

  axios
    .get(`/comment/like/${id}`)
    .then((data) => {})
    .catch((err) => {
      console.error(err);
    });
};

const send_comment_comment = (txt, dispatch) => {
  const auth_user_data = store.getState().core.accData;
  const post_id = store.getState().postPage.post.post.id;
  const commentToReplyId = store.getState().postPage.replyTo?.parentCommentId;
  const username = store.getState().postPage.replyTo?.username;

  axios
    .post(`/post/comment/${commentToReplyId}/reply`, {
      comment_text: txt,
      replyingTo: "",
    })
    .then((data) => {
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
          replyingTo: "",
        },
      });
      dispatch({
        type: "SET_COMMENTING",
        payload: false,
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: "SET_COMMENTING",
        payload: false,
      });
    });
};

export const send_post_comment = (txt) => (dispatch) => {
  const auth_user_data = store.getState().core.accData;
  const auth_user_anonymous = auth_user_data.anonymous_profile;
  const post_id = store.getState().postPage.post.post.id;
  const isReplyingToComment =
    store.getState().postPage.replyTo?.parentCommentId;

  dispatch({
    type: "SET_COMMENTING",
    payload: true,
  });

  if (isReplyingToComment) {
    //needs to send anon comments
    return send_comment_comment(txt, dispatch);
  }

  const temp_id = v4();

  const comment = {
    post_id: post_id,
    commenter_username: auth_user_anonymous
      ? auth_user_data.anonymous_name
      : auth_user_data.username,
    commenter_profilepic: auth_user_anonymous
      ? auth_user_data.anonymous_emoji_index
      : auth_user_data.profilepic,
    commenter_firstname: auth_user_anonymous
      ? "hidden"
      : auth_user_data.firstname,
    commenter_surname: auth_user_anonymous ? "hidden" : auth_user_data.surname,

    comment_by: auth_user_data.userID,
    date_created: new Date().toISOString(),
    comment_text: txt,
    comment_likes: "0",
    comment_comments: "0",
    comment_id: temp_id,
    anonymous_comment: auth_user_anonymous,
  };

  dispatch({
    type: "ADD_POST_COMMENT",
    payload: {
      ...comment,
      is_sending: true,
    },
  });
  dispatch({
    type: "SET_COMMENTING",
    payload: false,
  });

  axios
    .post(`/post/comment/${post_id}`, {
      comment: txt,
      anonymous_comment: auth_user_anonymous,
    })
    .then((data) => {
      dispatch({
        type: "SET_POST_COMMENT_SENT",
        payload: {
          ...comment,
          temp_id: temp_id,
          new_id: data.data.comment_id,
        },
      });
      dispatch({
        type: "SET_COMMENTING",
        payload: false,
      });
    })
    .catch((err) => {
      console.error(err);
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
      // reply: reply,
    },
  });
};

export const delete_comment = (cid) => (dispatch) => {
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
      console.error(err);
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
      console.error(err);
    });
};

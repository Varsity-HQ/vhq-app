const initialState = {
  post: null,
  post_loading: true,
  comments: null,
  comments_loading: true,
  replyTo: null,
  commenting: false,
};

const postPageReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "UNLIKE_MAIN_COMMENT":
      let main_comments_to_unlike = state.comments;

      if (main_comments_to_unlike) {
        main_comments_to_unlike.forEach((x, index) => {
          if (x.comment_id === actions.payload) {
            main_comments_to_unlike[index] = {
              ...x,
              comment_likes: parseInt(x.comment_likes) - 1,
            };
          }
        });
      }

      return {
        ...state,
        comments: main_comments_to_unlike,
      };
    case "LIKED_MAIN_COMMENT":
      let main_comments_to_like = state.comments;

      if (main_comments_to_like) {
        main_comments_to_like.forEach((x, index) => {
          if (x.comment_id === actions.payload) {
            main_comments_to_like[index] = {
              ...x,
              comment_likes: parseInt(x.comment_likes) + 1,
            };
          }
        });
      }

      return {
        ...state,
        comments: main_comments_to_like,
      };

    case "PP_DELETE_COMMENT":
      let c_comments = state.comments;
      let filtered_comments = [];

      if (c_comments) {
        c_comments.forEach((x) => {
          if (x.comment_id !== actions.payload) {
            filtered_comments.push(x);
          }
        });
      }

      let p_d_post = {
        ...state.post,
        post: {
          ...state.post.post,
          comments_count: parseInt(state.post.post.comments_count) - 1,
        },
      };

      return {
        ...state,
        post: p_d_post,
        comments: filtered_comments,
      };

    case "SET_COMMENTING":
      return {
        ...state,
        commenting: actions.payload,
      };
    case "PP_CLOSE_COMMENT_REPLIES":
      let comment_to_close_replies = state.comments;

      if (comment_to_close_replies) {
        comment_to_close_replies.forEach((x, index) => {
          if (x.comment_id === actions.payload) {
            comment_to_close_replies[index] = {
              ...x,
              comments_loading: false,
              replies_isOpen: false,
            };
          }
        });
      }

      return {
        ...state,
        comments: comment_to_close_replies,
      };

    case "SET_COMMENT_REPLIES":
      let comment_to_set_replies = state.comments;

      if (comment_to_set_replies) {
        comment_to_set_replies.forEach((x, index) => {
          if (x.comment_id === actions.payload.comment_id) {
            comment_to_set_replies[index] = {
              ...x,
              comments_loading: false,
              replies_isOpen: true,
              comments_replies: actions.payload.comments,
            };
          }
        });
      }
      return {
        ...state,
        comments: comment_to_set_replies,
      };

    case "SET_POST_COMMENT_REPLY_SENT":
      let comment_to_set_reply_sent = state.comments;

      if (comment_to_set_reply_sent) {
        comment_to_set_reply_sent.forEach((x, index) => {
          if (x.comment_id === actions.payload.parent_comment_id) {
            let comment_replies = x.comments_replies;
            if (comment_replies) {
              comment_replies.forEach((comment, cindex) => {
                if (comment.comment_id === actions.payload.temp_id) {
                  comment_replies[cindex] = {
                    ...comment,
                    comment_id: actions.payload.new_id,
                    is_sending: false,
                  };
                }
              });
            }

            comment_to_set_reply_sent[index] = {
              ...x,
              comments_loading: false,
              replies_isOpen: true,
              comments_replies: comment_replies,
              replyTo: null,
            };
          }
        });
      }
      return {
        ...state,

        comments: comment_to_set_reply_sent,
        replyTo: null,
      };
    case "ADD_POST_COMMENT_REPLY":
      let comment_to_add_reply = state.comments;

      if (comment_to_add_reply) {
        comment_to_add_reply.forEach((x, index) => {
          if (x.comment_id === actions.payload.parent_comment_id) {
            let comment_replies = x.comments_replies;
            if (comment_replies) {
              comment_replies.push(actions.payload);
            } else {
              comment_replies = [{ ...actions.payload }];
            }

            comment_to_add_reply[index] = {
              ...x,
              comments_loading: false,
              replies_isOpen: true,
              comments_replies: comment_replies,
              replyTo: null,
              comment_comments: parseInt(x.comment_comments) + 1,
            };
          }
        });
      }
      return {
        ...state,

        comments: comment_to_add_reply,
        replyTo: null,
      };

    case "SET_COMMENT_REPLIES_LOADING":
      let comments_to_set_loading = state.comments;

      if (comments_to_set_loading) {
        comments_to_set_loading.forEach((x, index) => {
          if (x.comment_id === actions.payload) {
            comments_to_set_loading[index] = {
              ...x,
              comments_loading: true,
            };
          }
        });
      }

      return {
        ...state,
        comments: comments_to_set_loading,
      };
    case "SET_COMMENT_REPLIES_LOADING_OFF":
      let comments_to_set_not_loading = state.comments;

      if (comments_to_set_not_loading) {
        comments_to_set_not_loading.forEach((x, index) => {
          if (x.comment_id === actions.payload) {
            comments_to_set_not_loading[index] = {
              ...x,
              comments_loading: false,
            };
          }
        });
      }

      return {
        ...state,
        comments: comments_to_set_not_loading,
      };
    case "SET_COMMENT_REPLY_TO":
      return {
        ...state,
        replyTo: actions.payload,
      };

    case "SET_POST_COMMENT_SENT":
      let updated1_comments_array = state.comments;

      if (state.comments) {
        updated1_comments_array.forEach((x, index) => {
          if (x.comment_id === actions.payload.temp_id) {
            updated1_comments_array[index] = {
              ...x,
              comment_id: actions.payload.new_id,
              is_sending: false,
            };
          }
        });
      }

      return {
        ...state,
        comments: updated1_comments_array,
      };

    case "ADD_POST_COMMENT":
      let new_comments_array = state.comments;

      if (state.comments) {
        new_comments_array.unshift(actions.payload);
      } else {
        new_comments_array = [actions.payload];
      }

      let post_new_comments = {
        ...state.post,
        post: {
          ...state.post.post,
          comments_count: parseInt(state.post.post.comments_count) + 1,
        },
      };

      return {
        ...state,
        post: post_new_comments,
        comments: new_comments_array,
      };

    case "CLEAR_POST_PAGE":
      return (state = initialState);

    case "LOAD_POST_COMMENTS":
      return {
        ...state,
        post_loading: false,
        comments: actions.payload,
        comments_loading: false,
      };

    case "UPDATE_LIKED_POST_POST_PAGE":
      let updated_post = state.post?.post;

      if (updated_post) {
        let updated_like_count = parseInt(updated_post.likes_count) + 1;
        updated_post = {
          ...updated_post,
          likes_count: updated_like_count,
        };
      }

      return {
        ...state,
        post: {
          ...state.post,
          post: updated_post,
        },
      };
    case "UPDATE_UNLIKED_POST_POST_PAGE":
      let updated_post_d = state.post?.post;

      if (updated_post_d) {
        let updated_d_like_count = parseInt(updated_post_d.likes_count) - 1;
        updated_post_d = {
          ...updated_post_d,
          likes_count: updated_d_like_count,
        };
      }

      return {
        ...state,
        post: {
          ...state.post,
          post: updated_post_d,
        },
      };

    case "POST_DATA_LOADING":
      return {
        ...state,
        post_loading: false,
        comments: null,
        comments_loading: true,
      };

    case "SET_POST_PAGE_DATA":
      let post_to_save = {
        post: actions.payload.post,
        account: actions.payload.account,
      };

      return {
        ...state,
        post: post_to_save,
        post_loading: false,
        comments: actions.payload.comments,
        comments_loading: false,
      };

    case "SAVE_LOCAL_POST":
      let l_post = { ...actions.payload };
      let l_account = {
        surname: actions.payload.surname,
        firstname: actions.payload.firstname,
        username: actions.payload.username,
        profilepic: actions.payload.profilepic,
        userID: actions.payload.userID,
      };
      // let l_comments = [];

      let local_post = { post: l_post, account: l_account };

      return {
        ...state,
        post: local_post,
        post_loading: true,
        comments: null,
        comments_loading: true,
      };

    default:
      return state;
  }
};

export default postPageReducer;

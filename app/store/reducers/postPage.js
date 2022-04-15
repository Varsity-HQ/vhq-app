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

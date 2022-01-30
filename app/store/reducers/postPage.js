const initialState = {
  post: null,
  post_loading: true,
  comments: null,
  comments_loading: true,
  comment_replies: [
    // {
    //   parent_comment_id: "bAaRufZFxLHGQyTs1yfq",
    //   loading : false,
    //   replies: [
    //     {
    //       comment_id: "C8EZS08ZHifujpfJBmlz",
    //       comment_text: "working",
    //     },
    //   ],
    // },
  ],
};

const postPageReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "CLEAR_POST_PAGE":
      return {
        ...state,
        post: null,
        post_loading: true,
        comments: null,
        comments_loading: true,
      };

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

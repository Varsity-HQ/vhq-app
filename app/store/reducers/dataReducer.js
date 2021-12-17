const initialData = {
  profilesData: [],
  sidebar_data: {},

  home_data: {
    loading: true,
    page_cursor: null,
    posts: [],
    error: false,
  },

  profile_page: {
    //
    loading_user: true,
    loading_post: true,
    loading_pictures: true,
    loading_bookmarks: true,
    //
    page_cursor: null,
    posts: [],
    pictures: [],
    bookmarks: [],
    //
    errors: {},
    //
    user: {},
  },

  //home
  homePosts: [],
  homePosts_cursor: null,
  homePosts_loading: true,

  home_market_items: [],
  //search
  search_page_data: {},
  search_page_loading: true,
  //profile
  myPosts: [],
  myPosts_loading: true,
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

const dataReducer = (state = initialData, actions) => {
  switch (actions.type) {
    case "SET_PROFILE_POSTS":
      return {
        ...state,
        profile_page: {
          ...state.profile_page,
          loading_post: false,
          posts: actions.payload,
        },
      };
    case "SET_PROFILE_DATA":
      return {
        ...state,
        profile_page: {
          ...state.profile_page,
          loading_user: false,
          user: actions.payload,
          errors: {},
        },
      };

    case "SET_HOME_POSTS":
      let updated_home_data = {
        loading: false,
        page_cursor: actions.payload.cursor,
        posts: actions.payload.posts,
        error: false,
      };

      return {
        ...state,
        home_data: updated_home_data,
      };

    default:
      return state;
  }
};

export default dataReducer;

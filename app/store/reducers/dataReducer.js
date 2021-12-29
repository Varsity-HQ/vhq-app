const initialData = {
  profilesData: [],

  home_data: {
    loading: true,
    page_cursor: null,
    posts: [],
    error: false,
    refreshing: false,
    loading_more: false,
  },

  profile_page: {
    loading_user: true,
    loading_post: true,
    loading_pictures: true,
    loading_bookmarks: true, // for authenticated user
    page_cursor: null,
    posts: [],
    pictures: [],
    bookmarks: [],
    errors: {},
    user: {},
  },
  home_market_items: [],
  search_page: {
    loading: true,
    data: {},
  },
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
    case "INCREMENT_OTHER_USER_FOLLOWING":
      return {
        ...state,
        profile_page: {
          ...state.profile_page,
          user: {
            ...state.profile_page.user,
            followers: state.profile_page.user.followers + 1,
          },
        },
      };
    case "DECREMENT_OTHER_USER_FOLLOWING":
      return {
        ...state,
        profile_page: {
          ...state.profile_page,
          user: {
            ...state.profile_page.user,
            followers:
              state.profile_page.user.followers > 1
                ? state.profile_page.user.followers - 1
                : 0,
          },
        },
      };

    case "SET_PROFILE_POSTS_LOADING":
      return {
        ...state,
        profile_page: {
          ...state.profile_page,
          loading_post: true,
        },
      };
    case "SET_OTHER_PROFILE_DATA":
      return {
        ...state,
        profile_page: {
          ...state.profile_page,
          loading_user: false,
          loading_post: false,
          posts: actions.payload.posts,
          user: actions.payload.user,
        },
      };
    case "SET_USER_NOT_FOUND":
      return {
        ...state,
        profile_page: {
          ...state.profile_page,
          loading_user: true,
          loading_post: true,
          loading_pictures: true,
          errors: {
            notFound: true,
          },
        },
      };
    case "SET_LOADING_PROFILE":
      return {
        ...state,
        profile_page: {
          ...state.profile_page,
          loading_user: true,
          loading_post: true,
          loading_pictures: true,
          errors: {},
          user: {},
          // posts: [],
          // pictures: [],
        },
      };

    case "SET_SEARCH_DATA":
      return {
        ...state,
        search_page: {
          ...state.search_page,
          data: actions.payload,
          loading: false,
        },
      };

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

    case "HOME_LOAD_REFRESH":
      return {
        ...state,
        home_data: {
          ...state.home_data,
          refreshing: actions.payload,
        },
      };
    case "HOME_LOADING_MORE":
      return {
        ...state,
        home_data: {
          ...state.home_data,
          loading_more: actions.payload,
        },
      };

    case "SET_HOME_POSTS":
      let updated_home_data = {
        loading: false,
        page_cursor: actions.payload.cursor,
        posts: actions.payload.posts,
        error: false,
        refreshing: false,
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

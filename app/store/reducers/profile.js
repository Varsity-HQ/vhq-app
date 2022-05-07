const initialState = {
  is_auth_profile: false,
  user_following: false,

  loading_user: true,
  user: {},
  //
  loading_post: true,
  loading_more_posts: false,

  page_cursor: null,

  posts: [],
  posts_lv: null,

  pictures: [],
  pictures_lv: null,
  loading_pictures: true,
  loading_more_pictures: false,

  bookmarks: [],
  bookmarks_lv: null,
  loading_bookmarks: true, // for authenticated user
  loading_more_bookmarks: true,

  errors: {},
  //tabs
  tabIndex: 1,
};

const profileReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_BOOKMARKS_LV":
      return {
        ...state,
        bookmarks_lv: actions.payload,
      };
    case "SET_BOOKMARKS_MORE_LOADING":
      return {
        ...state,
        loading_more_bookmarks: actions.payload,
      };
    case "SET_BOOKMARKS_LOADING":
      return {
        ...state,
        loading_bookmarks: actions.payload,
      };

    case "SET_BOOKMARKS":
      return {
        ...state,
        bookmarks: actions.payload,
        loading_bookmarks: false,
        loading_more_bookmarks: false,
      };

    case "SET_PICTURES":
      return {
        ...state,
        pictures: actions.payload.pictures,
        pictures_lv: actions.payload.pictures_lv,
        loading_pictures: false,
        loading_more_pictures: false,
      };
    case "SET_PICTURES_LV":
      return {
        ...state,
        pictures_lv: actions.payload,
      };
    case "SET_PICTURES_LOADING":
      return {
        ...state,
        loading_pictures: actions.payload,
      };
    case "STOP_LOADING_MORE_PICTURES":
      return {
        ...state,
        loading_more_pictures: false,
      };
    case "LOADING_MORE_PICTURES":
      return {
        ...state,
        loading_more_pictures: actions.payload,
      };
    case "STOP_LOADING_MORE":
      return {
        ...state,
        loading_more_posts: false,
      };
    case "PROFILE_USER_FOLOWING":
      return {
        ...state,
        user_following: actions.payload,
      };
    case "IS_AUTH_PROFILE":
      return {
        ...state,
        is_auth_profile: actions.payload,
      };

    case "LOADING_MORE_POSTS":
      return {
        ...state,
        loading_more_posts: actions.payload,
      };

    case "CHANGE_TAB":
      return {
        ...state,
        tabIndex: actions.payload,
      };

    case "RESET_PROFILE_PAGE":
      return (state = initialState);

    case "REMOVE_DELETED_POST":
      let myPosts = state.posts;
      let filtered_my_posts = [];

      myPosts.forEach((x) => {
        if (x.id !== actions.payload) {
          filtered_my_posts.push(x);
        }
      });

      return {
        ...state,
        posts: filtered_my_posts,
      };

    case "UPDATE_UNLIKED_POST_PP":
      let updated_profile_posts_unl = [];

      state.posts.forEach((x) => {
        if (x.id === actions.payload) {
          let updated_liked_count = (parseInt(x.likes_count) - 1).toString();
          let post_r = { ...x, likes_count: updated_liked_count };
          updated_profile_posts_unl.push(post_r);
        } else {
          updated_profile_posts_unl.push(x);
        }
      });

      return {
        ...state,
        posts: updated_profile_posts_unl,
      };

    case "UPDATE_LIKED_POST_PP":
      let updated_profile_posts = [];

      state.posts.forEach((x) => {
        if (x.id === actions.payload) {
          let updated_liked_count = (parseInt(x.likes_count) + 1).toString();
          let post_r = { ...x, likes_count: updated_liked_count };
          updated_profile_posts.push(post_r);
        } else {
          updated_profile_posts.push(x);
        }
      });

      return {
        ...state,
        posts: updated_profile_posts,
      };

    case "INCREMENT_OTHER_USER_FOLLOWING":
      return {
        ...state,
        user: {
          ...state.user,
          followers: state.user.followers + 1,
        },
      };
    case "DECREMENT_OTHER_USER_FOLLOWING":
      return {
        ...state,
        user: {
          ...state.user,
          followers: state.user.followers > 1 ? state.user.followers - 1 : 0,
        },
      };

    case "SET_PROFILE_POSTS_LOADING":
      return {
        ...state,
        loading_post: true,
      };
    case "SET_OTHER_PROFILE_DATA":
      return {
        ...state,
        loading_user: false,
        loading_post: false,
        posts: actions.payload.posts,
        user: actions.payload.user,
        posts_lv: actions.payload.lastVisible,
      };

    case "SET_PROFILE_POSTS":
      return {
        ...state,
        loading_post: false,
        loading_more_posts: false,
        posts: actions.payload.posts,
        posts_lv: actions.payload.lastVisible,
      };
    case "SET_PROFILE_DATA":
      return {
        ...state,
        loading_user: false,
        user: actions.payload,
        errors: {},
      };

    case "SET_USER_NOT_FOUND":
      return {
        ...state,
        loading_user: true,
        loading_post: true,
        loading_pictures: true,
        errors: {
          notFound: true,
        },
      };
    case "SET_LOADING_PROFILE":
      return {
        ...state,
        loading_user: true,
        loading_post: true,
        loading_pictures: true,
        errors: {},
        user: {},
        // posts: [],
        // pictures: [],
      };

    default:
      return state;
  }
};

export default profileReducer;

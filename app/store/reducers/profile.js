const initialState = {
  loading_user: true,
  user: {},
  //
  loading_post: true,
  loading_pictures: true,
  loading_bookmarks: true, // for authenticated user
  page_cursor: null,
  posts: [],
  pictures: [],
  bookmarks: [],
  errors: {},
};

const profileReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "RESET_PROFILE_PAGE":
      console.log("reset");
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
      };

    case "SET_PROFILE_POSTS":
      return {
        ...state,
        loading_post: false,
        posts: actions.payload,
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

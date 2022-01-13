const initialData = {
  profilesData: [],

  new_post: {
    anonymous: false,
    anonymous_name: "Anonymous",
    anonymous_emoji_index: 1,
    post: "",
    uploading: false,
  },

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
  post_page: {
    post: null,
    post_loading: true,
    comments: null,
    comments_loading: true,
  },
  home_market_items: [],
  search_page: {
    loading: true,
    data: {},
  },
  //profile

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

  poll_details: {
    loading: true,
    poll: null,
    voters: [],
    loading_voters: [],
  },
};

const dataReducer = (state = initialData, actions) => {
  switch (actions.type) {
    case "SAVE_POLL_POST_DETAILS":
      return {
        ...state,
        poll_details: {
          poll: actions.payload,
          loading: false,
        },
      };

    case "RESET_POLL_POST_DETAILS":
      return {
        ...state,
        poll_details: {
          poll: null,
          loading: true,
        },
      };

    case "ADD_NEW_POST":
      let cur_home_posts = state.home_data.posts;
      cur_home_posts.unshift(actions.payload);

      return {
        ...state,
        home_data: {
          ...state.home_data,
          posts: cur_home_posts,
        },
      };
    case "SET_POST_UPLOADING":
      return {
        ...state,
        new_post: {
          ...state.new_post,
          uploading: actions.payload,
        },
      };
    case "TOGGLE_TEMP_POST_ANONYMOUSLY":
      return {
        ...state,
        new_post: {
          ...state.new_post,
          anonymous: actions.payload,
        },
      };

    case "UPDATE_TEMP_ANON_NAME":
      return {
        ...state,
        new_post: {
          ...state.new_post,
          anonymous_name: actions.payload,
        },
      };

    case "UPDATE_TEMP_ANON_EMOJI":
      return {
        ...state,
        new_post: {
          ...state.new_post,
          anonymous_emoji_index: actions.payload,
        },
      };

    case "CLEAR_POST_PAGE":
      return {
        ...state,
        post_page: {
          post: null,
          post_loading: true,
          comments: null,
          comments_loading: true,
        },
      };
    case "LOAD_POST_COMMENTS":
      return {
        ...state,
        post_page: {
          ...state.post_page,
          post_loading: false,
          comments: actions.payload,
          comments_loading: false,
        },
      };
    case "POST_DATA_LOADING":
      return {
        ...state,
        post_page: {
          ...state.post_page,
          post_loading: false,
          comments: null,
          comments_loading: true,
        },
      };

    case "SET_POST_PAGE_DATA":
      let post_to_save = {
        post: actions.payload.post,
        account: actions.payload.account,
      };

      return {
        ...state,
        post_page: {
          ...state.post_page,
          post: post_to_save,
          post_loading: false,
          comments: actions.payload.comments,
          comments_loading: false,
        },
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
        post_page: {
          ...state.post_page,
          post: local_post,
          post_loading: true,
          comments: null,
          comments_loading: true,
        },
      };

    case "REMOVE_DELETED_POST":
      let homePosts = state.home_data.posts;
      let myPosts = state.profile_page.posts;

      let filtered_home_posts = [];
      let filtered_my_posts = [];

      homePosts.forEach((x) => {
        if (x.id !== actions.payload) {
          filtered_home_posts.push(x);
        }
      });
      myPosts.forEach((x) => {
        if (x.id !== actions.payload) {
          filtered_my_posts.push(x);
        }
      });
      // console.group("Post filtering");
      // console.log({
      //   ...state,
      //   homePosts: filtered_home_posts,
      //   myPosts: filtered_my_posts,
      // });
      // console.groupEnd();
      return {
        ...state,
        home_data: {
          ...state.home_data,
          posts: filtered_home_posts,
        },
        profile_page: {
          ...state.profile_page,
          posts: filtered_my_posts,
        },
      };
    case "UPDATE_UNLIKED_POST":
      // console.log("fired with id ", actions.payload);

      let updated_home_posts_unl = [];
      let updated_profile_posts_unl = [];

      state.home_data.posts.forEach((x) => {
        if (x.id === actions.payload) {
          let updated_liked_count = (parseInt(x.likes_count) - 1).toString();
          let post_r = { ...x, likes_count: updated_liked_count };
          updated_home_posts_unl.push(post_r);
        } else {
          updated_home_posts_unl.push(x);
        }
      });

      state.profile_page.posts.forEach((x) => {
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
        home_data: { ...state.home_data, posts: updated_home_posts_unl },
        profile_page: {
          ...state.profile_page,
          posts: updated_profile_posts_unl,
        },
      };

    case "UPDATE_LIKED_POST":
      // console.log("fired with id ", actions.payload);

      let updated_home_posts = [];
      let updated_profile_posts = [];

      state.home_data.posts.forEach((x) => {
        if (x.id === actions.payload) {
          let updated_liked_count = (parseInt(x.likes_count) + 1).toString();
          let post_r = { ...x, likes_count: updated_liked_count };
          updated_home_posts.push(post_r);
        } else {
          updated_home_posts.push(x);
        }
      });
      state.profile_page.posts.forEach((x) => {
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
        home_data: { ...state.home_data, posts: updated_home_posts },
        profile_page: { ...state.profile_page, posts: updated_profile_posts },
      };

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
        loading_more: false,
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

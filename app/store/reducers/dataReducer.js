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
    loading_top: true,
    top_page_cursor: null,
    top_posts: [],

    loading: true,
    page_cursor: null,
    posts: [],
    //
    events: [],
    loading_events: true,
    events_cursor: null,
    events_error: false,
    //
    offers: [],
    loading_offers: true,
    offers_cursor: null,
    offers_error: false,
    //
    error: false,
    refreshing: false,
    loading_more: false,
  },
  home_market_items: [],
  //
  search_page: {
    loading: true,
    data: {},
  },
  search_page_pictures: {
    loading: true,
    pictures: [],
    cursor: null,
  },
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

    case "REMOVE_DELETED_POST":
      let homePosts = state.home_data.posts;

      let filtered_home_posts = [];
      let filtered_my_posts = [];

      homePosts.forEach((x) => {
        if (x.id !== actions.payload) {
          filtered_home_posts.push(x);
        }
      });

      return {
        ...state,
        home_data: {
          ...state.home_data,
          posts: filtered_home_posts,
        },
      };

    case "POST_COMMENT_DECREMENT":
      let updated_home_posts_cD = [];

      state.home_data.posts.forEach((x) => {
        if (x.id === actions.payload) {
          let updated_liked_count = (parseInt(x.comments_count) - 1).toString();
          let post_r = { ...x, comments_count: updated_liked_count };
          updated_home_posts_cD.push(post_r);
        } else {
          updated_home_posts_cD.push(x);
        }
      });

      return {
        ...state,
        home_data: { ...state.home_data, posts: updated_home_posts_cD },
      };

    case "UPDATE_UNLIKED_POST":
      let updated_home_posts_unl = [];

      state.home_data.posts.forEach((x) => {
        if (x.id === actions.payload) {
          let updated_liked_count = (parseInt(x.likes_count) - 1).toString();
          let post_r = { ...x, likes_count: updated_liked_count };
          updated_home_posts_unl.push(post_r);
        } else {
          updated_home_posts_unl.push(x);
        }
      });

      return {
        ...state,
        home_data: { ...state.home_data, posts: updated_home_posts_unl },
      };

    case "UPDATE_LIKED_POST":
      let updated_home_posts = [];

      state.home_data.posts.forEach((x) => {
        if (x.id === actions.payload) {
          let updated_liked_count = (parseInt(x.likes_count) + 1).toString();
          let post_r = { ...x, likes_count: updated_liked_count };
          updated_home_posts.push(post_r);
        } else {
          updated_home_posts.push(x);
        }
      });

      return {
        ...state,
        home_data: { ...state.home_data, posts: updated_home_posts },
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

    case "SET_HOME_OFFERS":
      return {
        ...state,
        home_data: {
          ...state.home_data,
          offers: actions.payload,
          loading_offers: false,
        },
      };
    case "SET_HOME_EVENTS":
      return {
        ...state,
        home_data: {
          ...state.home_data,
          events: actions.payload,
          loading_events: false,
        },
      };

    case "RESET_HOME_POSTS_STATE":
      let home_data_to_reset = {
        ...state.home_data,
        loading: true,
        page_cursor: null,
        posts: [],
        error: false,
        refreshing: false,
        loading_more: false,
        loading_top: true,
        top_page_cursor: null,
        top_posts: [],
      };

      return {
        ...state,
        home_data: home_data_to_reset,
      };

    case "SET_HOME_POSTS":
      let updated_home_data = {
        ...state.home_data,
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
    case "SET_TOP_HOME_POSTS":
      let updated_home_top_data = {
        ...state.home_data,
        loading_top: false,
        top_page_cursor: actions.payload.cursor,
        top_posts: actions.payload.posts,
        error: false,
        refreshing: false,
        loading_more: false,
      };

      return {
        ...state,
        home_data: updated_home_top_data,
      };

    case "RESET_DATA":
      return (state = initialData);

    default:
      return state;
  }
};

export default dataReducer;

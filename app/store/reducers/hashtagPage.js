const initialState = {
  hashtag: "",

  loading_posts: true,
  loading_more_posts: false,
  posts: [],
  refreshing_posts: false,
  //
  loading_pictures: true,
  loading_more_pics: false,
  pictures: [],
  refreshing_pictures: false,
};

const hashtagPage = (state = initialState, actions) => {
  switch (actions.type) {
    case "HP_SET_PICTURES":
      return {
        ...state,
        pictures: actions.payload,
        loading_pictures: false,
        loading_more_pics: false,
      };
    case "HP_SET_POSTS":
      return {
        ...state,
        posts: actions.payload,
        loading_posts: false,
        loading_more_posts: false,
      };

    case "HP_SET_HASHTAG":
      let reset_state = initialState;
      return {
        ...reset_state,
        hashtag: actions.payload,
      };
    default:
      return state;
  }
};

export default hashtagPage;

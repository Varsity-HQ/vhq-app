const initialState = {
  loading_top: true,
  top_page_cursor: null,
  top_questions: [],

  loading_recent: true,
  recent_page_cursor: null,
  recent_questions: [],

  refreshing: false,
  loading_more: false,
  error: false,
};

const askviReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_ASKVI_RECENT_QUESTIONS":
      return {
        ...state,
        loading_recent: false,
        recent_page_cursor: actions.payload.cursor,
        recent_questions: actions.payload.posts,
        error: false,
        refreshing: false,
        loading_more: false,
      };

    case "SET_TOP_ASK_QUESTIONS":
      return {
        ...state,
        loading_top: false,
        top_page_cursor: actions.payload.cursor,
        top_questions: actions.payload.posts,
        error: false,
        refreshing: false,
        loading_more: false,
      };

    case "ASKVI_LOADING_MORE":
      return {
        ...state,
        loading_more: actions.payload,
      };

    case "ASKVI_LOAD_REFRESH":
      return {
        ...state,
        refreshing: actions.payload,
      };

    default:
      return state;
  }
};

export default askviReducer;

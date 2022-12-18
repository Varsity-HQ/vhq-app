import axios from "axios";
import store from "../store";

export const get_home_questions = (props) => (dispatch) => {
  handle_get_home_questions(props, dispatch);
};

const handle_get_home_questions = (props, dispatch) => {
  let lastVisible = null;

  if (props.init) {
    lastVisible = null;
  }

  if (props.refresh) {
    lastVisible = null;
    dispatch({
      type: "ASKVI_LOAD_REFRESH",
      payload: true,
    });
  }
  if (props.more) {
    lastVisible = props.top
      ? store.getState().askvi.top_page_cursor
      : store.getState().askvi.recent_page_cursor;
    dispatch({
      type: "ASKVI_LOADING_MORE",
      payload: true,
    });
  }

  if (props.more && lastVisible === null) {
    return dispatch({
      type: "ASKVI_LOADING_MORE",
      payload: false,
    });
  }

  let query = "";
  if (props.top) {
    query = `?top=true`;
  }
  if (lastVisible) {
    query = "?pt_ad=" + lastVisible;
  }
  if (lastVisible && props.top) {
    query = `?top=true&pt_ad=${lastVisible}`;
  }

  console.log({ query });

  axios
    .get(`/askvi/questions/get${query}`)
    .then((data) => {
      let currentPosts = props.top
        ? store.getState().askvi.top_questions
        : store.getState().askvi.recent_questions;
      let new_posts = !lastVisible
        ? data.data.posts
        : currentPosts.concat(data.data.posts);

      dispatch({
        type: "ASKVI_LOAD_REFRESH",
        payload: false,
      });

      dispatch({
        type: "ASKVI_LOADING_MORE",
        payload: false,
      });

      if (props.more && data.data.lastVisible === null) {
        console.log("1");
        return dispatch({
          type: props.top
            ? "SET_TOP_ASK_QUESTIONS"
            : "SET_ASKVI_RECENT_QUESTIONS",
          payload: {
            posts: [...new Set(new_posts)],
            cursor: null,
          },
        });
      }

      console.log("5");

      if (data.data.lastVisible === null && new_posts.length === 0) {
        console.log("2");
        return dispatch({
          type: props.top
            ? "SET_TOP_ASK_QUESTIONS"
            : "SET_ASKVI_RECENT_QUESTIONS",
          payload: {
            posts: [],
            cursor: null,
          },
        });
      }

      console.log("6");

      let cursor = props.top
        ? store.getState().askvi.top_page_cursor
        : store.getState().askvi.recent_page_cursor;

      if (data.data.lastVisible !== cursor) {
        console.log("3");
        return dispatch({
          type: props.top
            ? "SET_TOP_ASK_QUESTIONS"
            : "SET_ASKVI_RECENT_QUESTIONS",
          payload: {
            posts: [...new Set(new_posts)],
            cursor: data.data.lastVisible,
          },
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: "ASKVI_LOAD_REFRESH",
        payload: false,
      });

      dispatch({
        type: "ASKVI_LOADING_MORE",
        payload: false,
      });
      console.error(err);
    });
};

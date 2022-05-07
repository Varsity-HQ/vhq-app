/**
 * Store Prefix : HP_
 */

import axios from "axios";
import store from "../store";

export const get_posts = () => (dispatch) => {
  const hashtag = store.getState().hashtagPage.hashtag;
  axios
    .get(`/get/topic/${hashtag}/posts`)
    .then((data) => {
      dispatch({
        type: "HP_SET_POSTS",
        payload: data.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
export const get_pictures = () => (dispatch) => {
  const hashtag = store.getState().hashtagPage.hashtag;
  axios
    .get(`/get/topic/${hashtag}/pictures`)
    .then((data) => {
      dispatch({
        type: "HP_SET_PICTURES",
        payload: data.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const set_hashtag = (hashtag) => (dispatch) => {
  if (!hashtag) return;
  dispatch({
    type: "HP_SET_HASHTAG",
    payload: hashtag,
  });
};

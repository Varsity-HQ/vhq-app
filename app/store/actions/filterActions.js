import axios from "axios";

export const not_interested_in_content = (id) => (dispatch) => {
  dispatch({
    type: "ADD_ID_TO_REPORTED",
    payload: id,
  });
  axios.get(`/notinterested/${id}`);
};

export const report_content_id = (id) => (dispatch) => {
  dispatch({
    type: "ADD_ID_TO_REPORTED",
    payload: id,
  });
};

export const block_profile_by_id = (id) => (dispatch) => {
  dispatch({
    type: "ADD_PROFILE_ID_TO_BLOCKED",
    payload: id,
  });
  axios
    .get(`/block/${id}`)
    .then(() => {})
    .catch((err) => console.log(err));
};

export const unblock_user = (username) => (dispatch) => {
  dispatch({
    type: "UNBLOCK_PROFILE_USERNAME",
    payload: username,
  });
  axios
    .get(`/unblock/${username}`)
    .then(() => {})
    .catch((err) => console.log(err));
};

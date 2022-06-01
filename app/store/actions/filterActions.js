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
};

export const unblock_user = (username) => (dispatch) => {
  dispatch({
    type: "UNBLOCK_PROFILE_USERNAME",
    payload: username,
  });
};

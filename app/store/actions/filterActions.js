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

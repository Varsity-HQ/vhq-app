export const update_dating_purpose = (purpose, interested_in) => (dispatch) => {
  dispatch({
    type: "DATING_UPDATE_PURPOSE",
    payload: {
      purpose: purpose,
      interested_in: interested_in,
    },
  });
};

export const update_dating_uname = (name) => (dispatch) => {
  dispatch({
    type: "DATING_UPDATE_USERNAME",
    payload: name,
  });
};

export const update_dating_profile_pic = (image) => (dispatch) => {
  dispatch({
    type: "DATING_UPDATE_PROFILE_PIC",
    payload: "url",
  });
};
export const update_dating_profile_is_active = (state) => (dispatch) => {
  dispatch({
    type: "UPDATE_DATING_PROFILE_IS_ACTIVE",
    payload: state,
  });
};

export const update_dating_main_info = (info) => (dispatch) => {
  dispatch({
    type: "UPDATE_DATING_MAIN_INFO",
    payload: { ...info },
  });
};

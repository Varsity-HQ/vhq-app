import axios from "axios";

export const get_home = () => (dispatch) => {
  dispatch({
    type: "CLEAR_ERROR",
  });

  axios
    .get("/marketplacehome/get")
    .then((data) => {
      dispatch({
        type: "MP_SET_HOME_DATA",
        payload: data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const get_category = (category) => (dispatch) => {
  dispatch({
    type: "MP_SET_CATEGORY_LOADING",
  });
  axios
    .get(`/marketplace/cat/${category}/getall`)
    .then((data) => {
      dispatch({
        type: "MP_SET_CATEGORY_DATA",
        payload: data.data,
      });
      console.log(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// /marketplace/cat/${category}/getall

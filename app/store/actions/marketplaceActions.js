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
      console.log(data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

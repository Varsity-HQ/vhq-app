import axios from "axios";
import store from "../store";

export const load_page_data = () => (dispatch) => {
  let user_following = store.getState().core.accData.user_following;
  axios
    .post("/get/discover", {
      userFollowing: user_following,
    })
    .then((data) => {
      dispatch({
        type: "DP_SET_DATA",
        payload: {
          related: data.data.related,
          theRest: data.data.theRest,
        },
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

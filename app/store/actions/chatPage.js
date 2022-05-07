import axios from "axios";
import store from "../store";

export const get_accounts = (paginate) => (dispatch) => {
  let user_following = store.getState().core.accData.user_following;
  axios
    .post(`/returnprofiles`, {
      userids: user_following,
    })
    .then((data) => {
      dispatch({
        type: "CP_SET_ACCOUNTS_LOADING",
        payload: false,
      });
      dispatch({
        type: "CP_SET_ACCOUNTS",
        payload: data.data,
      });
    })
    .catch((err) => {});
};

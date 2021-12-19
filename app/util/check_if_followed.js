import store from "../store/store";

function check_if_followed(userid) {
  let followed = false;
  let account = store.getState().core.accData;

  account.user_following.forEach((x) => {
    if (x.following_user === userid) {
      return (followed = true);
    }
  });

  return followed;
}

export default check_if_followed;

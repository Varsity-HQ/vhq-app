import store from "../store/store";

export default function check_user_blocked(username = "") {
  let blocked_users = store.getState().filterReducer.blocked_profile_ids;
  let blocked = false;

  blocked_users.forEach((x) => {
    if (x === username) {
      blocked = true;
    }
  });

  return blocked;
}

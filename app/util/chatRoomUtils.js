import store from "../store/store";

const __get_chatAcc_id = (x, target) => {
  let uid = null;
  let relative_id =
    target === "d"
      ? store.getState().core.accData.discover_profile_id
      : store.getState().core.accData.userID;

  x.members.forEach((_m) => {
    if (_m !== relative_id) {
      uid = _m;
    }
  });

  return uid;
};

export { __get_chatAcc_id };

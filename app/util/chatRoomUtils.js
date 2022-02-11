import store from "../store/store";

const __get_chatAcc_id = (x) => {
  let uid = null;
  x.members.forEach((_m) => {
    if (_m !== store.getState().core.accData.userID) {
      uid = _m;
    }
  });

  return uid;
};

export { __get_chatAcc_id };

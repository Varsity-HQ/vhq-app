import store from "../store/store";

const _chat_head_data = (user_data, is_dating) => {
  let chat_heads = [];

  if (!user_data) {
    return [];
  }

  console.log({ user_data });

  let other_user_data = {};
  let auth_user_data = {};

  if (is_dating) {
    other_user_data = {
      profilepic: user_data.profilepic,
      nickname: user_data.nickname,
      is_online: user_data.is_online,
      uid: user_data.id,
      is_dating,
    };
    auth_user_data = {};
    chat_heads.push(other_user_data, auth_user_data);
  }

  return chat_heads;
};

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

export { __get_chatAcc_id, _chat_head_data };

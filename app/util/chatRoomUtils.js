import store from "../store/store";

const _chat_head_data = (user_data, is_dating) => {
  let discover_profile_id = store.getState().core.accData.discover_profile_id;
  let auth_user_data = is_dating
    ? store.getState().datingReducer.profile
    : store.getState().core.accData;

  let chat_heads = [];

  if (!user_data) {
    return [];
  }

  console.log({ user_data });

  let other_user_data = {};
  let receiver_user_data = {};

  if (is_dating && discover_profile_id) {
    other_user_data = {
      profilepic: user_data.profilepic,
      nickname: user_data.nickname,
      is_online: user_data.is_online ? true : false,
      uid: user_data.id,
      is_dating,
    };
    receiver_user_data = {
      profilepic: auth_user_data.profilepic,
      nickname: auth_user_data.nickname,
      is_online: true,
      uid: auth_user_data.id,
      is_dating,
    };

    chat_heads.push(other_user_data, receiver_user_data);
  } else {
    other_user_data = {
      profilepic: user_data.profilepic,
      username: user_data.username,
      firstname: user_data.firstname,
      surname: user_data.surname,
      is_online: user_data.is_online ? true : false,
      uid: user_data.userID,
      is_dating,
    };
    receiver_user_data = {
      profilepic: auth_user_data.profilepic,
      username: auth_user_data.username,
      firstname: auth_user_data.firstname,
      surname: auth_user_data.surname,
      is_online: true,
      uid: auth_user_data.userID,
      is_dating,
    };
    chat_heads.push(other_user_data, receiver_user_data);
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

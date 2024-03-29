import axios from "axios";
import auth_storage from "../../auth/auth_storage";
import store from "../store";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "uuid";
import Toast from "react-native-toast-message";
import {
  POST_DELETED,
  POST_POST_SUCCESS_POSTED,
} from "../../util/toast_messages";
import { clearPostScheduledNotifications } from "../../notifications";
import { Alert, Keyboard, Linking } from "react-native";
import * as WebBrowser from "expo-web-browser";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import db from "../../util/fb_admin";

export const submit_report = () => (dispatch) => {
  dispatch({
    type: "SET_REPORTING",
    payload: true,
  });
};

export const get_home_offers = () => (dispatch) => {
  axios
    .get("/get/offers")
    .then((data) => {
      dispatch({
        type: "SET_HOME_OFFERS",
        payload: data.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const get_home_events = () => (dispatch) => {
  axios
    .get("/get/events")
    .then((data) => {
      dispatch({
        type: "SET_HOME_EVENTS",
        payload: data.data.events,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const reset_poll_details_page = () => (dispatch) => {
  dispatch({
    type: "RESET_POLL_POST_DETAILS",
  });
};

export const save_poll_details = (poll_post) => (dispatch) => {
  if (
    poll_post.postType === "poll_post" &&
    store.getState().core.accData.userID === poll_post?.posted_by
  ) {
    dispatch({
      type: "SAVE_POLL_POST_DETAILS",
      payload: poll_post,
    });
  } else {
    dispatch({
      type: "RESET_POLL_POST_DETAILS",
    });
  }
};

export const set_poll_vote = (c) => (dispatch) => {
  dispatch({
    type: "SET_POLL_VOTE",
    payload: c,
  });
};

export const post_new = (post, attach) => async (dispatch) => {
  dispatch({
    type: "INCREMENT_POST_COUNT",
  });
  let postObj = post;

  let post_anonymously = store.getState().data.new_post.anonymous;
  let anonymous_name = store.getState().data.new_post.anonymous_name;
  let anonymous_emoji_index =
    store.getState().data.new_post.anonymous_emoji_index;

  dispatch({
    type: "SET_POST_UPLOADING",
    payload: true,
  });

  if (attach.length > 0) {
    let attachment_urls = await uploadMultipleImagesAsync(attach);
    return axios
      .post("/post/new", {
        ...postObj,
        attachments: attachment_urls,
        post_anonymously,
        anonymous_name,
        anonymous_emoji_index,
      })
      .then((data) => {
        dispatch({
          type: "ADD_NEW_POST",
          payload: data.data.post,
        });
        dispatch({
          type: "SET_POST_UPLOADING",
          payload: false,
        });

        dispatch({
          type: "UPDATE_ANONYMOUS_NAME",
          payload: anonymous_name,
        });

        dispatch({
          type: "SET_ANON_EMOJI_INDEX",
          payload: anonymous_emoji_index,
        });
        Toast.show({
          type: "general",
          autoHide: false,
          ...POST_POST_SUCCESS_POSTED,
        });
        clearPostScheduledNotifications();
      })
      .catch((err) => {
        dispatch({
          type: "SET_UPLOADING",
          payload: false,
        });
      });
  } else {
    axios
      .post("/post/new", {
        ...postObj,
        attachments: [],
        post_anonymously,
        anonymous_name,
        anonymous_emoji_index,
      })
      .then((data) => {
        dispatch({
          type: "ADD_NEW_POST",
          payload: data.data.post,
        });
        dispatch({
          type: "SET_POST_UPLOADING",
          payload: false,
        });

        dispatch({
          type: "UPDATE_ANONYMOUS_NAME",
          payload: anonymous_name,
        });

        dispatch({
          type: "SET_ANON_EMOJI_INDEX",
          payload: anonymous_emoji_index,
        });
        Toast.show({
          type: "general",
          autoHide: false,
          ...POST_POST_SUCCESS_POSTED,
        });
        clearPostScheduledNotifications();
      })

      .catch((err) => {
        dispatch({
          type: "SET_POST_UPLOADING",
          payload: false,
        });
      });
  }
};

export const initializePostAnonData = () => (dispatch) => {
  let auth_acc = store.getState().core.accData;
  dispatch({
    type: "UPDATE_TEMP_ANON_EMOJI",
    payload: auth_acc.anonymous_emoji_index,
  });
  dispatch({
    type: "UPDATE_TEMP_ANON_NAME",
    payload: auth_acc.anonymous_name,
  });
  // dispatch({
  //   type: "TOGGLE_TEMP_POST_ANONYMOUSLY",
  //   payload: auth_acc.anonymous_profile,
  // });
};

export const update_temp_anon_emoji = (index) => (dispatch) => {
  dispatch({
    type: "UPDATE_TEMP_ANON_EMOJI",
    payload: index,
  });
};
export const update_temp_anon_name = (name) => (dispatch) => {
  dispatch({
    type: "UPDATE_TEMP_ANON_NAME",
    payload: name,
  });
};
export const toggle_temp_post_anonymous = (isOn) => (dispatch) => {
  dispatch({
    type: "TOGGLE_TEMP_POST_ANONYMOUSLY",
    payload: isOn,
  });
};

export const delete_post = (p_id) => (dispatch) => {
  dispatch({
    type: "DELETING_POST",
    payload: true,
  });
  axios
    .get(`/post/${p_id}/delete`)
    .then(() => {
      dispatch({ type: "REMOVE_DELETED_POST", payload: p_id });
      dispatch({ type: "REMOVE_DELETED_POST_PP", payload: p_id });
      dispatch({
        type: "DECREMENT_POST_COUNT",
      });
      dispatch({
        type: "DELETING_POST",
        payload: false,
      });
      Toast.show({
        type: "general",
        autoHide: false,
        ...POST_DELETED,
      });
    })
    .catch((err) => {
      dispatch({
        type: "DELETING_POST",
        payload: false,
      });
    });
};

export const remove_bookmark = (post_id) => (dispatch) => {
  dispatch({
    type: "REMOVE_BOOKMARKED_POST_CORE",
    payload: post_id,
  });
  axios
    .get(`/post/${post_id}/removebookmark`)
    .then((data) => {})
    .catch((err) => {});
};

export const bookmark_post = (post_id) => (dispatch) => {
  dispatch({
    type: "ADD_BOOKMARKED_POST_CORE",
    payload: post_id,
  });
  axios
    .get(`/post/${post_id}/bookmark`)
    .then((data) => {})
    .catch((err) => {});
};

export const unlike_post = (post_id) => (dispatch) => {
  dispatch({ type: "UNLIKE_POST", payload: post_id });
  dispatch({ type: "UPDATE_UNLIKED_POST", payload: post_id });
  dispatch({ type: "UPDATE_UNLIKED_POST_PP", payload: post_id });
  dispatch({ type: "UPDATE_UNLIKED_POST_POST_PAGE", payload: post_id });

  // if (store.getState().core.currentPost) {
  //   dispatch({ type: "UPDATE_LIKED_POST_PP_DEC" });
  // }

  axios
    .get(`/post/unlike/${post_id}`)
    .then((data) => {})
    .catch((err) => {});
};
export const like_post = (post_id) => (dispatch) => {
  dispatch({ type: "LIKE_POST", payload: post_id });
  dispatch({ type: "UPDATE_LIKED_POST", payload: post_id });
  dispatch({ type: "UPDATE_LIKED_POST_PP", payload: post_id });
  dispatch({ type: "UPDATE_LIKED_POST_POST_PAGE", payload: post_id });

  // if (store.getState().core.currentPost) {
  //   dispatch({ type: "UPDATE_LIKED_POST_PP" });
  // }
  axios
    .get(`/post/like/${post_id}`)
    .then((data) => {})
    .catch((err) => {
      console.error(err);
    });
};

export const update_profile_pic = (uri) => async (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_PROFILE_PIC",
    payload: true,
  });

  const userID = store.getState().core.accData.userID;
  const chat_ref = collection(db, "chats");
  const query_ = query(
    chat_ref,
    where("members", "array-contains-any", [userID]),
  );

  let uploaded = await uploadImageAsync(uri);
  //
  axios
    .post("/changeprofilepic/byurl", { newUrl: uploaded })
    .then(() => {
      dispatch({
        type: "UPDATE_SAVING_PROFILE_PIC",
        payload: false,
      });
      dispatch({
        type: "UPDATE_PROFILE_PIC",
        payload: uploaded,
      });
    })
    .then(() => {
      return getDocs(query_);
    })
    .then((data) => {
      data.forEach((x) => {
        let chat_heads = [];
        let chat_id = x.id;
        x.data().members_chat_heads &&
          x.data().members_chat_heads.forEach((c) => {
            if (c.uid === userID) {
              chat_heads.push({
                ...c,
                profilepic: uploaded,
              });
            } else {
              chat_heads.push(c);
            }
          });

        const docRef = doc(db, "chats", chat_id);
        x.data().members_chat_heads &&
          updateDoc(docRef, {
            members_chat_heads: chat_heads,
          });
      });
      return;
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_PROFILE_PIC",
        payload: false,
      });
    });
};

export const update_firstname = (firstname) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_FIRSTNAME",
    payload: true,
  });
  axios
    .post("/account/update/firstname", {
      firstname: firstname,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_FIRSTNAME",
        payload: firstname,
      });
      dispatch({
        type: "UPDATE_SAVING_FIRSTNAME",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_FIRSTNAME",
        payload: false,
      });
    });
};
export const update_surname = (surname) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_SURNAME",
    payload: true,
  });
  axios
    .post("/account/update/surname", {
      surname: surname,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_SURNAME",
        payload: surname,
      });
      dispatch({
        type: "UPDATE_SAVING_SURNAME",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_SURNAME",
        payload: false,
      });
    });
};

export const update_username = (username) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_USERNAME",
    payload: true,
  });
  axios
    .post("/account/update/username", {
      username: username,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_USERNAME",
        payload: username,
      });
      dispatch({
        type: "UPDATE_SAVING_USERNAME",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_USERNAME",
        payload: false,
      });
    });
};

export const update_about = (about) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_ABOUT",
    payload: true,
  });
  axios
    .post("/account/update/about", {
      about: about,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_ABOUT",
        payload: about,
      });
      dispatch({
        type: "UPDATE_SAVING_ABOUT",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_ABOUT",
        payload: false,
      });
    });
};

export const updates_gender_pref = (s_target, show_s_target) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_S_TARGET_SETTINGS",
    payload: true,
  });
  axios
    .post("/account/update/s_target", {
      show_s_target: show_s_target,
      s_target: s_target,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_S_TARGET",
        payload: {
          s_target: s_target,
          show_s_target: show_s_target,
        },
      });
      dispatch({
        type: "UPDATE_SAVING_S_TARGET_SETTINGS",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_S_TARGET_SETTINGS",
        payload: false,
      });
    });
};
export const update_sexual_orientation = (orientation, show) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_SO_SETTINGS",
    payload: true,
  });
  axios
    .post("/account/update/sexualori", {
      show_sorientation: show,
      s_orientation: orientation,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_SAVING_SO_SETTINGS",
        payload: false,
      });
      dispatch({
        type: "DATING_UPDATE_SEXUAL_ORIENTATION",
        payload: orientation,
      });

      dispatch({
        type: "UPDATE_SEXUAL_ORIENTATION",
        payload: {
          s_orientation: orientation,
          show_sorientation: show,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_SO_SETTINGS",
        payload: false,
      });
    });
};

export const update_relationship_status = (rs) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_RS_SETTINGS",
    payload: true,
  });
  axios
    .post("/account/update/relationshipstatus", {
      relationshipStatus: rs,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_RELATIONSHIP_STATUS",
        payload: rs,
      });
      dispatch({
        type: "UPDATE_SAVING_RS_SETTINGS",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_RS_SETTINGS",
        payload: false,
      });
    });
};

export const update_gender = (gender) => (dispatch) => {
  let s_target = "";

  dispatch({
    type: "UPDATE_SAVING_GENDER_SETTINGS",
    payload: true,
  });

  if (gender === "Male") {
    s_target = "Female";
  } else {
    s_target = "Male";
  }
  axios
    .post("/account/update/gender", {
      gender: gender,
      s_target: s_target,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_GENDER",
        payload: gender,
      });
      dispatch({
        type: "DATING_UPDATE_GENDER",
        payload: gender,
      });
      dispatch({
        type: "UPDATE_S_TARGET_2",
        payload: s_target,
      });
      dispatch({
        type: "UPDATE_SAVING_GENDER_SETTINGS",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_GENDER_SETTINGS",
        payload: false,
      });
    });
};

export const update_dob = (date, age) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_DOB_SETTINGS",
    payload: true,
  });
  axios
    .post("/account/update/dob", {
      dob: date,
      age: age,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_DOB",
        payload: { dob: date, age },
      });
      dispatch({
        type: "DATING_UPDATE_AGE",
        payload: age,
      });

      dispatch({
        type: "UPDATE_SAVING_DOB_SETTINGS",
        payload: false,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_DOB_SETTINGS",
        payload: false,
      });
    });
};

export const update_degree = (degree) => (dispatch) => {
  let my_degree = degree;
  let yearOfStudy = store.getState().core.accData.yearOfStudy;

  dispatch({
    type: "UPDATE_SAVING_DEGREE_SETTINGS",
    payload: true,
  });

  axios
    .post("/account/update/yosndegree", {
      degree: my_degree,
      yearOfStudy: yearOfStudy,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_SAVING_DEGREE_SETTINGS",
        payload: false,
      });
      dispatch({
        type: "UPDATE_DEGREE",
        payload: my_degree,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_DEGREE_SETTINGS",
        payload: false,
      });
    });
};

export const update_yearofstudy = (yos) => (dispatch) => {
  let yearOfStudy = yos;
  let degree = store.getState().core.accData.degree;

  dispatch({
    type: "UPDATE_SAVING_YOS_SETTINGS",
    payload: true,
  });

  axios
    .post("/account/update/yosndegree", {
      degree: degree,
      yearOfStudy: yearOfStudy,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_SAVING_YOS_SETTINGS",
        payload: false,
      });
      dispatch({
        type: "DATING_UPDATE_YOS",
        payload: yearOfStudy,
      });
      dispatch({
        type: "UPDATE_YOS",
        payload: yearOfStudy,
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_YOS_SETTINGS",
        payload: false,
      });
    });
};

export const turn_off_anonymous = () => (dispatch) => {
  dispatch({
    type: "TURN_OFF_ANONYMOUS",
  });

  axios
    .get("/set-anonymous-off")
    .then(() => {})
    .catch((err) => {});
};

export const switch_to_anonymous = (name, index) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_ANON_SETTINGS",
    payload: true,
  });

  axios
    .post("/set-anonymous", {
      anonymous_name: name,
      anonymous_emoji_index: index,
    })
    .then(() => {
      dispatch({
        type: "UPDATE_SAVING_ANON_SETTINGS",
        payload: false,
      });
      dispatch({
        type: "SWITCH_TO_ANONYMOUS",
      });
    })
    .catch((err) => {
      dispatch({
        type: "UPDATE_SAVING_ANON_SETTINGS",
        payload: false,
      });
    });
};

export const update_anonymous_name = (name) => (dispatch) => {
  dispatch({
    type: "UPDATE_ANONYMOUS_NAME",
    payload: name,
  });
};
export const set_anon_emoji_index = (index) => (dispatch) => {
  dispatch({
    type: "SET_ANON_EMOJI_INDEX",
    payload: index,
  });
};

export const follow_account = (uid) => (dispatch) => {
  let account = {
    id: uuid.v4(),
    follower_id: store.getState().core.accData.userID,
    following_user: uid,
    follow_date: new Date().toISOString(),
  };

  let pp_user_id = store.getState().profile.user.userID;

  dispatch({
    type: "ADD_FOLLOWED_ACCOUNT",
    payload: account,
  });

  if (pp_user_id === uid) {
    dispatch({
      type: "INCREMENT_OTHER_USER_FOLLOWING",
    });
  }

  axios
    .get(`/follow/${uid}`)
    .then((data) => {})
    .catch((err) => {});
};

export const unfollow_account = (uid) => (dispatch) => {
  let pp_user_id = store.getState().profile.user.userID;

  dispatch({
    type: "REMOVE_FOLLOWED_ACCOUNT",
    payload: uid,
  });

  if (pp_user_id === uid) {
    dispatch({
      type: "DECREMENT_OTHER_USER_FOLLOWING",
    });
  }

  axios
    .get(`/unfollow/${uid}`)
    .then(() => {})
    .catch((err) => {});
};

export const get_search_data = () => (dispatch) => {
  const userFollowing = store.getState().core.accData.user_following;
  axios
    .post("/get/search", {
      userFollowing: userFollowing,
    })
    .then((data) => {
      dispatch({
        type: "SET_SEARCH_DATA",
        payload: data.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const get_search_pictures = () => (dispatch) => {};

export const get_auth_user_posts = () => (dispatch) => {
  let previous_user = store.getState().data.profile_page.user.userID;
  let auth_user_id = store.getState().core.accData.userID;

  if (previous_user !== auth_user_id) {
    dispatch({
      type: "SET_PROFILE_POSTS_LOADING",
    });
  }

  axios
    .get("/profile/posts")
    .then((data) => {
      dispatch({
        type: "SET_PROFILE_POSTS",
        payload: data.data,
      });
    })
    .catch((err) => {
      console.error(err);
    });
};

export const get_user_page = (username) => {
  axios
    .get(`/user/${username}/get`)
    .then((data) => {})
    .catch((err) => {
      console.error(err);
    });
};

export const showFilteredPosts = (filter) => (dispatch) => {
  if (filter.set_filter) switch_to_filtered_posts(dispatch, filter.tab);
  else switch_to_unfiltered_posts(dispatch, filter.tab);
};

const switch_to_filtered_posts = (dispatch, tab) => {
  dispatch({
    type: "SWITCTH_IS_LOADING_FILTERED_POSTS",
    payload: false,
  });
  dispatch({
    type: "RESET_HOME_POSTS_STATE",
  });

  axios
    .get(`/home/posts/filterposts/true`)
    .then(() => {
      handle_get_home_posts(
        {
          refresh: false,
          init: true,
          more: false,
          top: tab === 1 ? true : false,
        },
        dispatch,
      );
    })
    .catch((err) => {
      console.err(err);
    });
};

const switch_to_unfiltered_posts = (dispatch, tab) => {
  dispatch({
    type: "SWITCTH_IS_LOADING_FILTERED_POSTS",
    payload: true,
  });

  dispatch({
    type: "RESET_HOME_POSTS_STATE",
  });

  axios
    .get(`/home/posts/filterposts/false`)
    .then(() => {
      handle_get_home_posts(
        {
          refresh: false,
          init: true,
          more: false,
          top: tab === 1 ? true : false,
        },
        dispatch,
      );
    })
    .catch((err) => {
      console.err(err);
    });
};

export const get_home_posts = (props) => (dispatch) => {
  handle_get_home_posts(props, dispatch);
};

const handle_get_home_posts = (props, dispatch) => {
  let lastVisible = null;

  if (props.init) {
    lastVisible = null;
  }

  if (props.refresh) {
    lastVisible = null;
    dispatch({
      type: "HOME_LOAD_REFRESH",
      payload: true,
    });
  }
  if (props.more) {
    lastVisible = props.top
      ? store.getState().data.home_data.top_page_cursor
      : store.getState().data.home_data.page_cursor;
    dispatch({
      type: "HOME_LOADING_MORE",
      payload: true,
    });
  }

  if (props.more && lastVisible === null) {
    return dispatch({
      type: "HOME_LOADING_MORE",
      payload: false,
    });
  }

  let query = "";
  if (props.top) {
    query = `?top=true`;
  }
  if (lastVisible) {
    query = "?pt_ad=" + lastVisible;
  }
  if (lastVisible && props.top) {
    query = `?top=true&pt_ad=${lastVisible}`;
  }

  axios
    .get(`/get/home${query}`)
    .then((data) => {
      let currentPosts = props.top
        ? store.getState().data.home_data.top_posts
        : store.getState().data.home_data.posts;
      let new_posts = !lastVisible
        ? data.data.posts
        : currentPosts.concat(data.data.posts);

      dispatch({
        type: "HOME_LOAD_REFRESH",
        payload: false,
      });

      dispatch({
        type: "HOME_LOADING_MORE",
        payload: false,
      });
      dispatch({
        type: "SET_HOME_MARKET_ITEMS",
        payload: data.data.items,
      });

      if (props.more && data.data.lastVisible === null) {
        return dispatch({
          type: props.top ? "SET_TOP_HOME_POSTS" : "SET_HOME_POSTS",
          payload: {
            posts: [...new Set(new_posts)],
            cursor: null,
          },
        });
      }

      if (data.data.lastVisible === null && new_posts.length === 0) {
        return dispatch({
          type: props.top ? "SET_TOP_HOME_POSTS" : "SET_HOME_POSTS",
          payload: {
            posts: [],
            cursor: null,
          },
        });
      }

      let cursor = props.top
        ? store.getState().data.home_data.top_page_cursor
        : store.getState().data.home_data.page_cursor;

      if (data.data.lastVisible !== cursor) {
        return dispatch({
          type: props.top ? "SET_TOP_HOME_POSTS" : "SET_HOME_POSTS",
          payload: {
            posts: [...new Set(new_posts)],
            cursor: data.data.lastVisible,
          },
        });
      }

      //
    })
    .catch((err) => {
      dispatch({
        type: "HOME_LOAD_REFRESH",
        payload: false,
      });

      dispatch({
        type: "HOME_LOADING_MORE",
        payload: false,
      });
      console.error(err);
    });
};

export const save_profileDefaults = (uObj) => async (dispatch) => {
  dispatch({
    type: "SET_FINALIZING_ACC_STTNGS",
    payload: true,
  });

  let uploaded = await uploadImageAsync(uObj.profilepic);

  axios
    .post("/changeprofilepic/byurl", {
      newUrl: uploaded,
    })
    .then((data) => {
      dispatch({
        type: "UPDATE_PROFILE_PIC",
        payload: uploaded,
      });
      return axios.post("/account/update/pinfo", {
        firstname: uObj.firstname,
        surname: uObj.surname,
      });
    })
    .then(() => {
      dispatch({
        type: "UPDATE_FIRSTNAME_N_SURNAME",
        payload: {
          firstname: uObj.firstname,
          surname: uObj.surname,
        },
      });
      return axios.get("/account/activate");
    })
    .then(() => {
      dispatch({
        type: "SET_FINALIZING_ACC_STTNGS",
        payload: false,
      });
      dispatch({
        type: "SET_ACC_ACTIVATED",
      });
      return axios.get("/get/account");
    })
    .then((data) => {
      dispatch({
        type: "SET_USER_DATA",
        payload: data.data,
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: "SET_FINALIZING_ACC_STTNGS",
        payload: false,
      });
    });
};

export const set_overlay_state = (state) => (dispatch) => {
  dispatch({
    type: "SET_OVERLAY_STATE",
    payload: state,
  });
};

export const update_university = (uni) => (dispatch) => {
  dispatch({
    type: "UPDATE_SAVING_UNI_SETTINGS",
    payload: true,
  });

  axios
    .post(`/account/update/university`, {
      university: uni,
    })
    .then(() => {
      dispatch({
        type: "DATING_UPDATE_UNIVERSITY",
        payload: uni,
      });
      dispatch({
        type: "SET_UNIVERSITY",
        payload: uni,
      });
      dispatch({
        type: "UPDATE_SAVING_UNI_SETTINGS",
        payload: false,
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: "UPDATE_SAVING_UNI_SETTINGS",
        payload: false,
      });
    });
};

export const set_university = (uni) => (dispatch) => {
  dispatch({
    type: "SET_UNIVERSITY",
    payload: uni,
  });
};
export const set_yearofstudy = (yos) => (dispatch) => {
  dispatch({
    type: "SET_YEAR_OF_STUDY",
    payload: yos,
  });
};

export const get_user = (props) => (dispatch) => {
  if (props === true) {
    dispatch({
      type: "SET_GETTING_USER_LOADER",
      payload: true,
    });
  }
  axios
    .get("/get/account")
    .then((data) => {
      dispatch({
        type: "SET_USER_DATA",
        payload: data.data,
      });

      dispatch({
        type: "SET_AUTH_STATE",
        payload: true,
      });

      dispatch({
        type: "SET_GETTING_USER_LOADER",
        payload: false,
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: "SET_GETTING_USER_LOADER",
        payload: false,
      });
    });
};

export const set_user = (user) => (dispatch) => {
  dispatch({
    type: "SET_USER_DATA",
    payload: user,
  });
};

export const login_user = (email, password) => (dispatch) => {
  log_out_function();
  dispatch({ type: "SET_UNAUTHENTICATED" });
  dispatch({
    type: "LOGGING_IN_USER",
    payload: true,
  });

  dispatch({
    type: "SET_LOGGING_IN_ERROR",
    payload: {},
  });
  axios
    .post("/login", {
      email,
      password,
    })
    .then((data) => {
      Alert.alert(
        `To use "VarsityHQ" you must agree to our Terms and Conditions and Privacy Policy. We value user privacy.`,
        `If you have read and agree, press "I agree" to continue and start using our app.`,
        [
          {
            text: "Terms and Conditions",
            onPress: async () => {
              const url = "https://varsityhq.co.za/terms-of-service";
              const supported = await Linking.canOpenURL(url);
              if (supported) {
                await Linking.openURL(url);
              }
              dispatch({
                type: "LOGGING_IN_USER",
                payload: false,
              });
            },
          },
          {
            text: "I agree",
            onPress: () => {
              setAuthorizationHeader(data.data.token);
              return axios.get("/get/account").then((user_data) => {
                if (user_data.data.userID) {
                  dispatch({
                    type: "SET_USER_DATA",
                    payload: user_data.data,
                  });

                  dispatch({
                    type: "SET_BLOCKED_USERS",
                    payload: user_data.data?.blocked_users,
                  });

                  dispatch({
                    type: "SET_AUTH_STATE",
                    payload: true,
                  });

                  dispatch({
                    type: "LOGGING_IN_USER",
                    payload: false,
                  });
                  dispatch({
                    type: "SET_LOGGING_IN_ERROR",
                    payload: {},
                  });
                } else {
                  dispatch({
                    type: "LOGGING_IN_USER",
                    payload: false,
                  });
                  dispatch({
                    type: "SET_LOGGING_IN_ERROR",
                    payload: {
                      error:
                        "Something happened. Please try again or report issue.",
                    },
                  });
                }
              });
            },
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              dispatch({
                type: "LOGGING_IN_USER",
                payload: false,
              });
            },
          },
        ],
      );
    })
    .catch((err) => {
      dispatch({
        type: "LOGGING_IN_USER",
        payload: false,
      });
      if (err.response) {
        return dispatch({
          type: "SET_LOGGING_IN_ERROR",
          payload: { ...err.response.data },
        });
      }
    });
};

export const set_user_token = (token) => (dispatch) => {
  setAuthorizationHeader(token);
  dispatch({
    type: "SET_AUTH_STATE",
    payload: true,
  });
};

export const setAuthState = (state) => (dispatch) => {
  dispatch({
    type: "SET_AUTH_STATE",
    payload: state,
  });
};

export const deleteUserAccount = () => (dispatch) => {
  axios
    .get("/account/delete")
    .then(() => {})
    .catch((err) => {
      console.error(err);
    });

  log_out_function();
  dispatch({ type: "SET_UNAUTHENTICATED" });
  dispatch({ type: "RESET_DATA" });
};

export const logOutUser = () => (dispatch) => {
  log_out_function();
  dispatch({ type: "SET_UNAUTHENTICATED" });
  dispatch({ type: "RESET_DATA" });
  dispatch({ type: "DATING_RESET" });
};

const log_out_function = async () => {
  delete axios.defaults.headers.common[`Authorization`];
  try {
    await auth_storage.removeToken();
  } catch (error) {
    console.error("failed to sign out", error);
  }
};

export const set_token = (token) => () => {
  setAuthorizationHeader(token);
};

const setAuthorizationHeader = async (token) => {
  const vhqat = `Bearer ${token}`;
  axios.defaults.headers.common["Authorization"] = vhqat;
  try {
    await auth_storage.storeToken(token);
  } catch (error) {
    console.error("failed to set token", error);
  }
};

const uploadMultipleImagesAsync = async (images) => {
  let promises = [];
  await images.forEach((x) => {
    promises.push(uploadImageAsync(x));
  });
  return Promise.all(promises)
    .then((upload_res) => {
      return upload_res;
    })
    .catch((err) => console.error(err.code));
};

const uploadImageAsync = async (uri) => {
  return await new Promise(async (resolve, reject) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const fileRef = ref(getStorage(), `vhq_${uuid.v4()}.jpeg`);
    const result = await uploadBytes(fileRef, blob);

    // We're done with the blob, close and release it
    blob.close();

    let downloadUrl = await getDownloadURL(fileRef);

    resolve(downloadUrl); // peviously return;
    reject("failed to upload");
  });
};

import initialaccData from "../reducers/init_acc_data.init";

const initialData = {
  authenticated: false,
  accData: initialaccData,
  post_anonymously: false,
  temp_anonymous_name: "",
  temp_anonymous_emoji_index: 20,
  //
  overlayloader: false,
  getting_account_data: false,
  finalizing_account_settings: false,

  saving_anon_settings: false,
  saving_yos_settings: false,
  saving_degree_settings: false,
  saving_dob_settings: false,
  saving_gender_settings: false,
  saving_university_settings: false,
  saving_rs_settings: false,
  saving_so_settings: false,
  saving_s_target_settings: false,

  saving_username_settings: false,
  saving_about_settings: false,
  saving_surname_settings: false,
  saving_firstname_settings: false,
  saving_profile_pic_settings: false,

  //
  logging_in_user: false,
  logging_in_error: {},
  deleting_post: false,

  reset_pass: {
    loading: false,
    errors: {},
    requested: false,
  },
};

const coreReducer = (state = initialData, actions) => {
  switch (actions.type) {
    case "SET_FINALIZING_ACC_STTNGS":
      return {
        ...state,
        finalizing_account_settings: actions.payload,
      };

    case "SET_GETTING_USER_LOADER":
      return {
        ...state,
        getting_account_data: actions.payload,
      };

    case "SET_PUSH_TOKEN":
      return {
        ...state,
        accData: {
          ...state.accData,
          notificationToken: actions.payload,
        },
      };

    case "SET_RESETTING_LOADING_N_CLEAR_ERR":
      return {
        ...state,
        reset_pass: {
          loading: actions.payload,
          errors: {},
          requested: false,
        },
      };
    case "SET_PASS_R_REQUESTED":
      return {
        ...state,
        reset_pass: {
          ...state.reset_pass,
          requested: true,
        },
      };
    case "SET_PASS_R_ERRORS":
      return {
        ...state,
        reset_pass: {
          ...state.reset_pass,
          errors: actions.payload,
        },
      };

    case "SET_POLL_VOTE":
      let poll_votes = state.accData.poll_votes;

      let updated_votes = [];
      poll_votes.forEach((x) => {
        if (x.poll_id === actions.payload.poll_id) {
          updated_votes.push({
            ...x,
            voted_choice: actions.payload.voted_choice,
          });
        } else {
          updated_votes.push(x);
        }
      });

      return {
        ...state,
        accData: {
          ...state.accData,
          poll_votes: updated_votes,
        },
      };

    case "DELETING_POST":
      return {
        ...state,
        deleting_post: actions.payload,
      };

    case "DECREMENT_POST_COUNT":
      return {
        ...state,
        accData: {
          ...state.accData,
          number_of_posts: parseInt(
            state.accData.number_of_posts - 1,
          ).toString(),
        },
      };
    case "REMOVE_BOOKMARKED_POST_CORE":
      let bookmarks_br = state.accData.bookmarks;

      let bookmarks_af = [];
      bookmarks_br.forEach((x) => {
        if (x.post_id !== actions.payload) {
          bookmarks_af.push(x);
        }
      });

      return {
        ...state,
        accData: {
          ...state.accData,
          bookmarks: bookmarks_af,
        },
      };
    case "ADD_BOOKMARKED_POST_CORE":
      let bookmarks = state.accData.bookmarks;

      bookmarks.push({
        post_id: actions.payload,
        user_id: state.accData.userID,
      });

      // console.log({ bookmarks });

      return {
        ...state,
        accData: {
          ...state.accData,
          bookmarks: bookmarks,
        },
      };
    case "LIKE_POST": {
      let updated_liked_posts = state.accData.liked_posts;
      updated_liked_posts.push({
        post_id: actions.payload,
      });
      return {
        ...state,
        accData: {
          ...state.accData,
          liked_posts: updated_liked_posts,
        },
      };
    }
    case "UNLIKE_POST":
      let posts_remaining_liked = [];
      state.accData.liked_posts.forEach((x) => {
        if (x.post_id !== actions.payload) {
          posts_remaining_liked.push(x);
        }
      });

      return {
        ...state,
        accData: {
          ...state.accData,
          liked_posts: posts_remaining_liked,
        },
      };

    case "UPDATE_SAVING_PROFILE_PIC":
      return {
        ...state,
        saving_profile_pic_settings: actions.payload,
      };
    case "UPDATE_SAVING_FIRSTNAME":
      return {
        ...state,
        saving_firstname_settings: actions.payload,
      };
    case "UPDATE_FIRSTNAME":
      return {
        ...state,
        accData: {
          ...state.accData,
          firstname: actions.payload,
        },
      };
    case "UPDATE_SAVING_SURNAME":
      return {
        ...state,
        saving_surname_settings: actions.payload,
      };
    case "UPDATE_SURNAME":
      return {
        ...state,
        accData: {
          ...state.accData,
          surname: actions.payload,
        },
      };
    case "UPDATE_SAVING_USERNAME":
      return {
        ...state,
        saving_username_settings: actions.payload,
      };
    case "UPDATE_USERNAME":
      return {
        ...state,
        accData: {
          ...state.accData,
          username: actions.payload,
        },
      };
    case "UPDATE_SAVING_ABOUT":
      return {
        ...state,
        saving_about_settings: actions.payload,
      };
    case "UPDATE_ABOUT":
      return {
        ...state,
        accData: {
          ...state.accData,
          about: actions.payload,
        },
      };
    case "UPDATE_SAVING_S_TARGET_SETTINGS":
      return {
        ...state,
        saving_s_target_settings: actions.payload,
      };
    case "UPDATE_S_TARGET":
      return {
        ...state,
        accData: {
          ...state.accData,
          s_target: actions.payload.s_target,
          show_s_target: actions.payload.show_s_target,
        },
      };
    case "UPDATE_SAVING_SO_SETTINGS":
      return {
        ...state,
        saving_so_settings: actions.payload,
      };
    case "UPDATE_SEXUAL_ORIENTATION":
      return {
        ...state,
        accData: {
          ...state.accData,
          s_orientation: actions.payload.s_orientation,
          show_sorientation: actions.payload.show_sorientation,
        },
      };
    case "UPDATE_SAVING_RS_SETTINGS":
      return {
        ...state,
        saving_rs_settings: actions.payload,
      };
    case "UPDATE_RELATIONSHIP_STATUS":
      return {
        ...state,
        accData: {
          ...state.accData,
          relationshipStatus: actions.payload,
        },
      };
    case "UPDATE_SAVING_UNI_SETTINGS":
      return {
        ...state,
        saving_university_settings: actions.payload,
      };
    case "UPDATE_SAVING_GENDER_SETTINGS":
      return {
        ...state,
        saving_gender_settings: actions.payload,
      };
    case "UPDATE_GENDER":
      return {
        ...state,
        accData: {
          ...state.accData,
          gender: actions.payload,
        },
      };
    case "UPDATE_S_TARGET_2":
      return {
        ...state,
        accData: {
          ...state.accData,
          s_target: actions.payload,
        },
      };
    case "UPDATE_SAVING_DOB_SETTINGS":
      return {
        ...state,
        saving_dob_settings: actions.payload,
      };
    case "UPDATE_DOB":
      return {
        ...state,
        accData: {
          ...state.accData,
          dob: actions.payload.dob,
          age: actions.payload.age,
        },
      };
    case "UPDATE_DEGREE":
      return {
        ...state,
        accData: {
          ...state.accData,
          degree: actions.payload,
        },
      };
    case "UPDATE_YOS":
      return {
        ...state,
        accData: {
          ...state.accData,
          yearOfStudy: actions.payload,
        },
      };
    case "UPDATE_SAVING_YOS_SETTINGS":
      return {
        ...state,
        saving_yos_settings: actions.payload,
      };

    case "UPDATE_SAVING_DEGREE_SETTINGS":
      return {
        ...state,
        saving_degree_settings: actions.payload,
      };
    case "UPDATE_SAVING_ANON_SETTINGS":
      return {
        ...state,
        saving_anon_settings: actions.payload,
      };

    case "TURN_OFF_ANONYMOUS":
      return {
        ...state,
        accData: {
          ...state.accData,
          anonymous_profile: false,
        },
      };

    case "SWITCH_TO_ANONYMOUS":
      return {
        ...state,
        accData: {
          ...state.accData,
          anonymous_profile: true,
        },
      };

    case "SET_ANON_EMOJI_INDEX":
      return {
        ...state,
        accData: {
          ...state.accData,
          anonymous_emoji_index: actions.payload,
        },
      };
    case "UPDATE_ANONYMOUS_NAME":
      return {
        ...state,
        accData: {
          ...state.accData,
          anonymous_name: actions.payload,
        },
      };

    case "SWITCH_TO_ANONYMOUS":
      return {
        ...state,
        accData: {
          ...state.accData,
          anonymous_profile: true,
        },
      };
    case "REMOVE_FOLLOWED_ACCOUNT":
      let filtered_following = [];

      state.accData.user_following.forEach((x) => {
        if (x.userID !== actions.payload) {
          filtered_following.push(x);
        }
      });

      return {
        ...state,
        accData: {
          ...state.accData,
          user_following: filtered_following,
          following: parseInt(state.accData.following) - 1,
        },
      };
    case "ADD_FOLLOWED_ACCOUNT":
      let new_following = state.accData.user_following;
      new_following.unshift(actions.payload);

      return {
        ...state,
        accData: {
          ...state.accData,
          user_following: new_following,
          following: parseInt(state.accData.following) + 1,
        },
      };

    case "SET_ACC_ACTIVATED":
      return {
        ...state,
        accData: {
          ...state.accData,
          accountStatus: "active",
        },
      };
    case "UPDATE_FIRSTNAME_N_SURNAME":
      return {
        ...state,
        accData: {
          ...state.accData,
          firstname: actions.payload.firstname,
          surname: actions.payload.surname,
        },
      };
    case "UPDATE_PROFILE_PIC":
      return {
        ...state,
        accData: { ...state.accData, profilepic: actions.payload },
      };
    case "SET_OVERLAY_STATE":
      return {
        ...state,
        overlayloader: actions.payload,
      };
    case "SET_UNIVERSITY":
      return {
        ...state,
        accData: { ...state.accData, university: actions.payload },
      };
    case "SET_YEAR_OF_STUDY":
      return {
        ...state,
        accData: { ...state.accData, yearOfStudy: actions.payload },
      };

    case "SET_LOGGING_IN_ERROR":
      return {
        ...state,
        logging_in_error: actions.payload,
      };
    case "LOGGING_IN_USER":
      return {
        ...state,
        logging_in_user: actions.payload,
        logging_in_error: {},
      };
    case "SET_USER_DATA":
      return {
        ...state,
        accData: actions.payload,
      };
    case "SET_UNAUTHENTICATED":
      return (state = initialData);
    case "SET_AUTH_STATE":
      return {
        ...state,
        authenticated: actions.payload,
      };
    default:
      return state;
  }
};

export default coreReducer;

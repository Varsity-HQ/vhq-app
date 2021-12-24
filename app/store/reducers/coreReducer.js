import initialaccData from "../reducers/init_acc_data.init";

const initialData = {
  authenticated: false,
  accData: initialaccData,
  post_anonymously: false,
  temp_anonymous_name: "",
  temp_anonymous_emoji_index: 20,
  //
  overlayloader: false,
  saving_anon_settings: false,
  saving_yos_settings: false,
  saving_degree_settings: false,
  saving_dob_settings: false,
  saving_gender_settings: false,
  saving_university_settings: false,
  saving_rs_settings: false,
  saving_so_settings: false,
};

const coreReducer = (state = initialData, actions) => {
  switch (actions.type) {
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
    case "UPDATE_S_TARGET":
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
    case "UPDATE_TEMP_ANON_NAME":
      return {
        ...state,
        temp_anonymous_name: actions.payload,
      };
    case "UPDATE_TEMP_ANON_EMOJI":
      return {
        ...state,
        temp_anonymous_emoji_index: actions.payload,
      };
    case "TOGGLE_POST_ANONYMOUSLY":
      return {
        ...state,
        post_anonymously: actions.payload,
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
    case "SET_USER_DATA":
      return {
        ...state,
        accData: actions.payload,
      };
    case "SET_UNAUTHENTICATED":
      return {
        ...state,
        authenticated: false,
      };
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

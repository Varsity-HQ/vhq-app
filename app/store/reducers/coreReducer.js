import initialaccData from "../reducers/init_acc_data.init";

const initialData = {
  authenticated: false,
  accData: initialaccData,
  overlayloader: false,
  post_anonymously: false,
  temp_anonymous_name: "",
  temp_anonymous_emoji_index: 20,
};

const coreReducer = (state = initialData, actions) => {
  switch (actions.type) {
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

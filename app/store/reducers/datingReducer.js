const initialState = {
  profile: {
    id: "",
    loading: true,
    name: "",
    profilepic: "",
    uploading_profilepic: false,
    show_sorientation: false,
    seen_count: "",
    is_active: false,
    purpose: "dating",
    interested_in: "talking",
    about: "",
    report_count: "",
    gender: "male",
    star_sign: "",
    age: 0,
    sexual_orientation: "",
    university: "",
    location: "",
    show_me: ["Female", "Male"],
    g_postion: "",
    online_status: "",
    hashed_location: "",
    lat: "",
    long: "",
    parentID: "",
    saving_nickname: false,
    saving_about: false,
    updating_is_active: false,
    yearOfStudy: "",
    blocked: [],
    poked: false,
    poked_users: [],
    filters: {
      by_online: false,
      by_university: "",
      by_purpose: "",
      distance: 200,
    },
  },
  saved_profile: {
    loading: true,
  },
};

const datingReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "DATING_ADD_TO_BLOCKED":
      return {
        ...state,
        profile: {
          ...state.profile,
          blocked: state.profile.blocked.concat([actions.payload]),
        },
      };
    case "DATING_POKE_ACCOUNT":
      return {
        ...state,
        profile: {
          ...state.profile,
          poked_users: state.profile.poked_users.concat([actions.payload]),
        },
      };
    case "DATING_SET_DISTANCE":
      return {
        ...state,
        profile: {
          ...state.profile,
          filters: {
            ...state.profile.filters,
            distance: actions.payload,
          },
        },
      };

    case "DATING_SAVE_PROFILE":
      return {
        ...state,
        saved_profile: {
          ...state.saved_profile,
          ...actions.payload,
          loading: false,
        },
      };

    case "DATING_CLEAR_SAVED_PROFILE": {
      return {
        ...state,
        saved_profile: {
          loading: true,
        },
      };
    }

    case "DATING_UPDATE_LOCATION":
      return {
        ...state,
        profile: {
          ...state.profile,
          lat: actions.payload.lat,
          long: actions.payload.long,
          hashed_location: actions.payload.hashed_location,
        },
      };

    case "DATING_RESET":
      return (state = initialState);

    case "DATING_UPDATE_UPDATING_IS_ACTIVE":
      return {
        ...state,
        profile: {
          ...state.profile,
          updating_is_active: actions.payload,
        },
      };
    case "DATING_UPDATE_YOS":
      return {
        ...state,
        profile: {
          ...state.profile,
          yearOfStudy: actions.payload,
        },
      };
    case "DATING_UPDATE_SEXUAL_ORIENTATION":
      return {
        ...state,
        profile: {
          ...state.profile,
          sexual_orientation: actions.payload,
        },
      };
    case "DATING_UPDATE_GENDER":
      return {
        ...state,
        profile: {
          ...state.profile,
          gender: actions.payload,
        },
      };
    case "DATING_UPDATE_AGE":
      return {
        ...state,
        profile: {
          ...state.profile,
          age: actions.payload,
        },
      };

    case "DATING_UPDATE_UNIVERSITY":
      return {
        ...state,
        profile: {
          ...state.profile,
          university: actions.payload,
        },
      };
    case "DATING_UPDATE_GENDER_INTEREST":
      return {
        ...state,
        profile: {
          ...state.profile,
          show_me: actions.payload,
        },
      };
    case "DATING_UPDATE_ABOUT_LOADING":
      return {
        ...state,
        profile: {
          ...state.profile,
          saving_about: actions.payload,
        },
      };
    case "DATING_UPDATE_ABOUT":
      return {
        ...state,
        profile: {
          ...state.profile,
          about: actions.payload,
          saving_about: false,
        },
      };
    case "SET_DATING_DATA":
      return {
        ...state,
        profile: {
          ...state.profile,
          ...actions.payload,
          loading: false,
        },
      };
    case "SET_UPLOADING_DATING_PROFILE_PIC":
      return {
        ...state,
        profile: {
          ...state.profile,
          uploading_profilepic: actions.payload,
        },
      };

    case "UPDATE_DATING_MAIN_INFO":
      return {
        ...state,
        profile: {
          ...state.profile,
          gender: actions.payload.gender,
          star_sign: actions.payload.star_sign,
          age: actions.payload.age,
          sexual_orientation: actions.payload.sexual_orientation,
          location: actions.payload.location,
        },
      };
    case "UPDATE_DATING_PROFILE_IS_ACTIVE":
      return {
        ...state,
        profile: {
          ...state.profile,
          is_active: actions.payload,
        },
      };
    case "DATING_UPDATE_PROFILE_PIC":
      return {
        ...state,
        profile: {
          ...state.profile,
          profilepic: actions.payload,
        },
      };
    case "DATING_UPDATE_NICKNAME":
      return {
        ...state,
        profile: {
          ...state.profile,
          nickname: actions.payload,
          saving_nickname: false,
        },
      };
    case "DATING_UPDATE_NICKNAME_LOADING":
      return {
        ...state,
        profile: {
          ...state.profile,
          saving_nickname: actions.payload,
        },
      };

    case "DATING_PROFILE_LOADING":
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: actions.payload,
        },
      };
    case "DATING_UPDATE_PURPOSE":
      return {
        ...state,
        profile: {
          ...state.profile,
          purpose: actions.payload.purpose,
          interested_in: actions.payload.interested_in,
        },
      };
    default:
      return state;
  }
};

export default datingReducer;

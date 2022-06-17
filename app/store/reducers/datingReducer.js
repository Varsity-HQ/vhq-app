const initialState = {
  profile: {
    id: "",
    loading: true,
    name: "",
    profilepic: "",
    uploading_profilepic: false,
    seen_count: "",
    is_active: false,
    purpose: "dating",
    interested_in: "talking",
    about: "",
    report_count: "",
    gender: "male",
    star_sign: "",
    age: "",
    sexual_orientation: "",
    university: "",
    location: "",
    show_me: ["Female", "Male"],
    g_postion: "",
    hashed_location: "",
    online_status: "",
    alt: "",
    long: "",
    parentID: "",
    saving_nickname: false,
    saving_about: false,
  },
};

const datingReducer = (state = initialState, actions) => {
  switch (actions.type) {
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

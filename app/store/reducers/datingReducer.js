const initialState = {
  profile: {
    id: "",
    loading: true,
    name: "",
    profilepic: "",
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
    show_me: ["female", "male"],
    g_postion: "",
  },
};

const datingReducer = (state = initialState, actions) => {
  switch (actions.type) {
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
    case "DATING_UPDATE_USERNAME":
      return {
        ...state,
        profile: {
          ...state.profile,
          name: actions.payload,
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

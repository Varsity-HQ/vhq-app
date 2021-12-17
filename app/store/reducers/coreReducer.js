import initialaccData from "../reducers/init_acc_data.init";

const initialData = {
  authenticated: false,
  accData: initialaccData,
  overlayloader: false,
};

const coreReducer = (state = initialData, actions) => {
  switch (actions.type) {
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

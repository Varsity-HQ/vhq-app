import initialaccData from "../reducers/init_acc_data.init";

const initialData = {
  authenticated: false,
  accData: initialaccData,
};

const coreReducer = (state = initialData, actions) => {
  switch (actions.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        accData: actions.payload,
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

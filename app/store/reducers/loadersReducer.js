const initialState = {
  auth_action_loading: false,
};

const loadersReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "AUTH_ACTION_LOADING":
      return {
        state,
        auth_action_loading: actions.payload,
      };

    default:
      return state;
  }
};

export default loadersReducer;

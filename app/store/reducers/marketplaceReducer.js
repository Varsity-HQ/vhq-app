const initialState = {
  home: {
    loading: true,
    error: null,
    data: null,
  },
};

const marketplaceReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "MP_SET_HOME_DATA":
      return {
        ...state,
        home: {
          ...state.home,
          data: actions.payload,
          loading: false,
        },
      };

    case "MP_HOME_CLEAR_ERROR":
      return {
        ...state,
        home: {
          ...state.home,
          error: null,
        },
      };

    default:
      return state;
  }
};

export default marketplaceReducer;

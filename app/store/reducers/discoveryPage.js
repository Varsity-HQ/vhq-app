const initialState = {
  related: [],
  theRest: [],
  loading: true,
};

const discoveryPage = (state = initialState, actions) => {
  switch (actions.type) {
    case "DP_SET_LOADING":
      return {
        ...state,
        loading: actions.payload,
      };

    case "DP_SET_DATA":
      return {
        ...state,
        related: actions.payload.related,
        theRest: actions.payload.theRest,
        loading: false,
      };

    default:
      return state;
  }
};

export default discoveryPage;

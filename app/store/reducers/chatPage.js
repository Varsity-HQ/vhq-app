const initialState = {
  loading_accounts: true,
  accounts: [],
  accounts_cursor: null,
};

const chatPage = (state = initialState, actions) => {
  switch (actions.type) {
    case "CP_SET_ACCOUNTS_LOADING":
      return {
        ...state,
        loading_accounts: actions.payload,
      };

    case "CP_SET_ACCOUNTS_CURSOR":
      return {
        ...state,
        accounts_cursor: actions.payload,
      };

    case "CP_SET_ACCOUNTS":
      return {
        ...state,
        accounts: actions.payload,
      };

    default:
      return state;
  }
};

export default chatPage;

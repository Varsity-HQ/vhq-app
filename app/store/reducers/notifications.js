const initialState = {
  loading: true,
  new: [],
  last_15days: [],
  earlier: [],
  total: 0,
};

const notificationsReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "SET_NOTIFICATIONS_LOADING":
      return {
        state,
        loading: actions.payload,
      };

    case "SET_RECEIVED_NOTIFICATIONS":
      return {
        ...state,
        loading: false,
        new: actions.payload.notifications.new,
        last_15days: actions.payload.notifications.last_15days,
        earlier: actions.payload.notifications.earlier,
        total: actions.payload.total,
      };

    default:
      return state;
  }
};

export default notificationsReducer;

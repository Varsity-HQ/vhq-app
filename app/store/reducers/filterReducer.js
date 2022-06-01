const initialState = {
  blocked_profile_ids: [],
  reported_ids: [],
};

const filterReducer = (state = initialState, actions) => {
  let reported_ids = [];
  let blocked_ids = [];
  let new_blocked = [];
  switch (actions.type) {
    case "SET_REPORTED_IDS":
      return {
        ...state,
        reported_ids: actions.payload,
      };
    case "UNBLOCK_PROFILE_USERNAME":
      blocked_ids = [];
      new_blocked = [];
      blocked_ids = state.blocked_profile_ids;

      blocked_ids.forEach((x) => {
        if (x !== actions.payload) {
          new_blocked.push(x);
        }
      });

      return {
        ...state,
        blocked_profile_ids: new_blocked,
      };
    case "ADD_PROFILE_ID_TO_BLOCKED":
      blocked_ids = [];
      blocked_ids = state.blocked_profile_ids;
      blocked_ids.push(actions.payload);
      return {
        ...state,
        blocked_profile_ids: blocked_ids,
      };
    case "ADD_ID_TO_REPORTED":
      reported_ids = [];
      reported_ids = state.reported_ids;
      reported_ids.push(actions.payload);

      return {
        ...state,
        reported_ids: reported_ids,
      };

    default:
      return state;
  }
};

export default filterReducer;

import initialaccData from "../reducers/init_acc_data.init";

const initialData = {
  authenticated: false,
  accData: initialaccData,
};

const coreReducer = (state = initialData, actions) => {
  switch (actions.type) {
    default:
      return state;
  }
};

export default coreReducer;

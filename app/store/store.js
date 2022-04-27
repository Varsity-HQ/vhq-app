import rootReducer from "./reducers/rootReducer";
import thunkMiddleware from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   compose(
//     applyMiddleware(...middleware, thunkMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__(),
//   ),
// );

const store = createStore(
  rootReducer,
  applyMiddleware(...middleware, thunkMiddleware),
);

export default store;

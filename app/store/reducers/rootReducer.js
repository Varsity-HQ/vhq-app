import { combineReducers } from "redux";
//
import core from "../reducers/coreReducer";
import dataReducer from "../reducers/dataReducer";
import loadersReducer from "../reducers/loadersReducer";

const rootReducer = combineReducers({
  core,
  data: dataReducer,
  loaders: loadersReducer,
});

export default rootReducer;

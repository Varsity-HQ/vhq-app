import { combineReducers } from "redux";
//
import core from "../reducers/coreReducer";
import dataReducer from "../reducers/dataReducer";
import loadersReducer from "../reducers/loadersReducer";
import profile from "../reducers/profile";

const rootReducer = combineReducers({
  core,
  data: dataReducer,
  loaders: loadersReducer,
  profile: profile,
});

export default rootReducer;

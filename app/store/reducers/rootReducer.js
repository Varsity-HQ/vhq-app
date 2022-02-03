import { combineReducers } from "redux";
//
import core from "../reducers/coreReducer";
import dataReducer from "../reducers/dataReducer";
import loadersReducer from "../reducers/loadersReducer";
import profile from "../reducers/profile";
import notificationsReducer from "./notifications";
import postPageReducer from "./postPage";

const rootReducer = combineReducers({
  core,
  data: dataReducer,
  loaders: loadersReducer,
  profile: profile,
  postPage: postPageReducer,
  notifications: notificationsReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
//
import core from "../reducers/coreReducer";
import dataReducer from "../reducers/dataReducer";
import loadersReducer from "../reducers/loadersReducer";
import profile from "../reducers/profile";
import notificationsReducer from "./notifications";
import postPageReducer from "./postPage";
import hashtagPage from "./hashtagPage";
import chatPage from "./chatPage";

const rootReducer = combineReducers({
  core,
  data: dataReducer,
  loaders: loadersReducer,
  postPage: postPageReducer,
  notifications: notificationsReducer,
  profile,
  hashtagPage,
  chatPage,
});

export default rootReducer;

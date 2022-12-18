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
import discoveryPage from "./discoveryPage";
import datingReducer from "./datingReducer";
import filterReducer from "./filterReducer";
import marketplaceReducer from "./marketplaceReducer";
import askviReducer from "./askviPageReducer";

const rootReducer = combineReducers({
  core,
  data: dataReducer,
  loaders: loadersReducer,
  postPage: postPageReducer,
  notifications: notificationsReducer,
  askvi: askviReducer,
  profile,
  hashtagPage,
  chatPage,
  discoveryPage,
  datingReducer,
  filterReducer,
  marketplaceReducer,
});

export default rootReducer;

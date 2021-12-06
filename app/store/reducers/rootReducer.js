import { combineReducers } from "redux";
//
import core from "../reducers/coreReducer";
import dataReducer from "../reducers/dataReducer";

const rootReducer = combineReducers({
  core,
  data: dataReducer,
});

export default rootReducer;

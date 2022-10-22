import React from "react";
import IndexContainer from "./app/index";
import { Provider } from "react-redux";
import store from "./app/store/store";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";

// import "react-native-gesture-handler";

// console.ignoredYellowBox = ['Setting a timer']; 

import { LogBox } from "react-native";
// import _ from "lodash";
LogBox.ignoreLogs(["Setting a timer"]);
// const _console = _.clone(console);
// console.warn = (message) => {
//   if (message.indexOf("Setting a timer") <= -1) {
//     _console.warn(message);
//   }
// };

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <IndexContainer />
      </Provider>
    </SafeAreaProvider>
  );
}

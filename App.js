import React from "react";
import IndexContainer from "./app/index";
import { Provider } from "react-redux";
import store from "./app/store/store";
// import { SafeAreaProvider } from "react-native-safe-area-context";

// import "react-native-gesture-handler";

// import { LogBox } from "react-native";
// import _ from "lodash";
// LogBox.ignoreLogs(["Setting a timer"]);
// const _console = _.clone(console);
// console.warn = (message) => {
//   if (message.indexOf("Setting a timer") <= -1) {
//     _console.warn(message);
//   }
// };

export default function App() {
  return (
    // <SafeAreaProvider>
    <Provider store={store}>
      <IndexContainer />
    </Provider>
    // </SafeAreaProvider>
  );
}

import React from "react";
import IndexContainer from "./app/index";
import { Provider } from "react-redux";
import store from "./app/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <IndexContainer />
    </Provider>
  );
}

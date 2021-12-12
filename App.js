import React from "react";
import IndexContainer from "./app/index";
import { Provider } from "react-redux";
import store from "./app/store/store";

import Welcome from "./app/screens/WelcomeScreen";
import { Text, View } from "react-native";
import Screen from "./app/components/Screen";
import PPP from "./app/components/ProfilePicChanger";
import AddPostPage from "./app/screens/AddPostPage";

export default function App() {
  return (
    // <Screen>
    //   <AddPostPage />
    // </Screen>

    // <Welcome />
    <Provider store={store}>
      <IndexContainer />
    </Provider>
  );
}

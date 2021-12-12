import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppNavigator from "./navigation/AppRoutes";
import AuthRoutes from "./navigation/AuthRoutes";
import vhqTheme from "./navigation/navigationTheme";
import axios from "axios";
import { connect } from "react-redux";
import auth_storage from "./auth/auth_storage";

import AppLoading from "expo-app-loading";
import {
  setAuthState,
  set_user_token,
  set_token,
  set_user,
} from "./store/actions/actions";
// import Screen from "./components/Screen";
import WelcomeScreen from "./screens/WelcomeScreen";

import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "./util/fb_config";

// Editing this file with fast refresh will reinitialize the app on every refresh, let's not do that
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

axios.defaults.baseURL = "http://192.168.8.106:5000";

const mapStateToProps = (state) => {
  return {
    authenticated: state.core.authenticated,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    set_user_token: (state) => dispatch(set_user_token(state)),
    setAuthState: (state) => dispatch(setAuthState(state)),
    set_token: (token) => dispatch(set_token(token)),
    set_user: (user) => dispatch(set_user(user)),
  };
};

function App({ authenticated, set_user, setAuthState, set_token }) {
  const [isReady, setisReady] = useState();
  const restoreToken = async () => {
    const token = await auth_storage.getToken();
    if (token) {
      //   console.log({ oldToken: token });
      set_token(token);
      await axios
        .get("/get/account")
        .then((data) => {
          console.log(data.data);
          set_user(data.data);
          return setAuthState(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAuthState(false);
    }
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreToken}
        onFinish={() => setisReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    // <View>{/* <WelcomeScreen /> */}</View>

    <NavigationContainer theme={vhqTheme}>
      {authenticated ? <AppNavigator /> : <AuthRoutes />}
    </NavigationContainer>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

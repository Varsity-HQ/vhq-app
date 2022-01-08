import React, { useState } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
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

import Toast from "react-native-toast-message";

import Text from "./components/AppText";

import { useFonts } from "expo-font";

import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "./util/fb_config";
import { StatusBar } from "react-native";

import colors from "./config/colors";
import { Image } from "react-native";
import AppToast from "./components/AppToast";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// axios.defaults.baseURL = "http://192.168.8.101:5000";
axios.defaults.baseURL = "https://api.varsityhq.co.za";

const toastConfig = {
  general: ({ text1, text2 }) => <AppToast text1={text1} text2={text2} />,
};
//
const mapStateToProps = (state) => {
  return {
    authenticated: state.core.authenticated,
    userID: state.core.accData?.userID,
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

function App({ authenticated, set_user, setAuthState, set_token, userID }) {
  const [isReady, setisReady] = useState();

  let [fontsLoaded] = useFonts({
    "Lobster-Regular": require("./Fonts/Lobster-Regular.ttf"),
    "Ubuntu-regular": require("./Fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-bold": require("./Fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-italic": require("./Fonts/Ubuntu-Italic.ttf"),
    "Ubuntu-medium": require("./Fonts/Ubuntu-Medium.ttf"),
  });

  const restoreToken = async () => {
    const token = await auth_storage.getToken();
    if (token) {
      //   console.log({ oldToken: token });
      set_token(token);
      await axios
        .get("/get/account")
        .then((data) => {
          // console.log(data.data);
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

  if (!isReady || !fontsLoaded) {
    return (
      <>
        <StatusBar animated={true} hidden={true} />
        <AppLoading
          startAsync={restoreToken}
          onFinish={() => setisReady(true)}
          onError={(e) => console.log(e)}
        />
      </>
    );
  }

  return (
    <>
      <StatusBar
        translucent
        animated={true}
        backgroundColor="transparent"
        barStyle="light-content"
        showHideTransition="fade"
        hidden={false}
      />
      <NavigationContainer theme={vhqTheme}>
        {authenticated && userID ? <AppNavigator /> : <AuthRoutes />}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

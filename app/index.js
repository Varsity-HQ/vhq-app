import React, { useState } from "react";
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
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "./util/fb_config";
import { Image, StatusBar } from "react-native";
import AppToast from "./components/AppToast";
import { FAILED_TO_INITIALIZE } from "./util/toast_messages";
import { Asset } from "expo-asset";

import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  SimpleLineIcons,
} from "@expo/vector-icons";
import RIcon from "react-native-remix-icon";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

axios.defaults.baseURL = "http://192.168.8.102:5000";
// axios.defaults.baseURL = "https://api.varsityhq.co.za";

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

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map((font) => Font.loadAsync(font));
}

function App({ authenticated, set_user, setAuthState, set_token, userID }) {
  const [isReady, setisReady] = useState();
  const [isAssetsCached, setIsAssetsCached] = useState(false);

  let [fontsLoaded] = useFonts({
    "Lobster-Regular": require("./Fonts/Lobster-Regular.ttf"),
    "Ubuntu-regular": require("./Fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-bold": require("./Fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-italic": require("./Fonts/Ubuntu-Italic.ttf"),
    "Ubuntu-medium": require("./Fonts/Ubuntu-Medium.ttf"),
  });

  const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages([
      "https://image.shutterstock.com/image-photo/close-beauty-portrait-young-charming-600w-1931216711.jpg",
      "https://image.shutterstock.com/image-photo/portrait-beautiful-african-american-female-600w-721419679.jpg",
      require("./assets/avatar.png"),
      require("./assets/logo-small.png"),
      require("./assets/login-img-1.jpg"),
      require("./assets/signup-img-1.jpg"),
      require("./assets/signup-img-2.jpg"),
      require("./assets/vhqcat-small.png"),
    ]);

    const fontAssets = cacheFonts([
      FontAwesome.font,
      Ionicons.font,
      MaterialCommunityIcons.font,
      Feather.font,
      SimpleLineIcons.font,
    ]);

    await Promise.all([...imageAssets, ...fontAssets])
      .then(() => {
        setIsAssetsCached(true);
      })
      .catch(() => {
        setIsAssetsCached(true);
      });
  };

  const restoreToken = async () => {
    _loadAssetsAsync();
    const token = await auth_storage.getToken();
    if (token) {
      set_token(token);
      await axios
        .get("/get/account")
        .then((data) => {
          set_user(data.data);
          setAuthState(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setAuthState(false);
    }
  };

  if (!isReady || !fontsLoaded || !isAssetsCached) {
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

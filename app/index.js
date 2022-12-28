import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import AppNavigator from "./navigation/AppRoutes";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import axios from "axios";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { useFonts } from "expo-font";
import { getApps, initializeApp } from "firebase/app";
import { Image, StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import async_storage from "./auth/async_storage";
import auth_storage from "./auth/auth_storage";
import AppToast from "./components/AppToast";
import AuthRoutes from "./navigation/AuthRoutes";
import vhqTheme from "./navigation/navigationTheme";
import { navigationRef } from "./navigation/rootNavigation";
import {
  setAuthState,
  set_token,
  set_user,
  set_user_token,
} from "./store/actions/actions";
import store from "./store/store";
import { firebaseConfig } from "./util/fb_config";
import * as Linking from "expo-linking";
import Text from "./components/AppText";
import Screen from "./components/Screen";
import * as routes from "./navigation/routes";

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

// axios.defaults.baseURL = "http://192.168.8.103:5000";
// axios.defaults.baseURL = "http://192.168.68.129:5000";
// axios.defaults.baseURL = "http://192.168.0.116:5000";
axios.defaults.baseURL = "https://api.varsityhq.co.za";

const prefix = Linking.createURL("vhq://app");
const universal = Linking.createURL("https://web.varsityhq.co.za");
const universal2 = Linking.createURL("https://varsityhq.co.za");

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

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

function App({ authenticated, set_user, setAuthState, set_token, userID }) {
  const [isReady, setisReady] = useState();
  const [isAssetsCached, setIsAssetsCached] = useState(false);
  const [urlData, setLinkData] = useState(null);

  const config = {
    screens: {
      // ScreenB: {
      //   path: "/p/:pid",
      //   parse: {
      //     pid: (pid) => `${pid}`,
      //   },
      // },
      [routes.CHAT_HOME]: "chat",
      [routes.REFER_A_FRIEND]: "refer",
    },
  };

  const linking = {
    prefixes: [universal, universal2],
    config,
  };

  useEffect(() => {
    async function getInitialURL() {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) setLinkData(Linking.parse(initialURL));
    }

    const linkListener = Linking.addEventListener("url", handleDeepLink);

    if (!urlData) {
      getInitialURL();
    }

    return () => {
      linkListener.remove();
      // Linking.removeEventListener("url");
    };
  }, []);

  const handleDeepLink = (event) => {
    let link = event?.url;
    let data = link && Linking.parse(link);
    console.log(data);
    // setData(data);
  };

  let [fontsLoaded] = useFonts({
    "Lobster-Regular": require("./Fonts/Lobster-Regular.ttf"),
    "Ubuntu-regular": require("./Fonts/Ubuntu-Regular.ttf"),
    "Ubuntu-bold": require("./Fonts/Ubuntu-Bold.ttf"),
    "Ubuntu-italic": require("./Fonts/Ubuntu-Italic.ttf"),
    "Ubuntu-medium": require("./Fonts/Ubuntu-Medium.ttf"),
    "SF-Pro-Rounded-Regular": require("./Fonts/FontsFree-Net-SF-Pro-Rounded-Regular.ttf"),
    "SF-Pro-Rounded-Bold": require("./Fonts/FontsFree-Net-SF-Pro-Rounded-Bold.ttf"),
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
      require("./assets/background-pattern.png"),
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
    const user_data = await async_storage.getUserObj();
    if (token) {
      set_token(token);

      let parsedObj = JSON.parse(user_data);
      if (user_data && parsedObj.userID) {
        set_user(parsedObj);
        store.dispatch({
          type: "SET_BLOCKED_USERS",
          payload: parsedObj?.blocked_users,
        });
        setAuthState(true);
        axios
          .get("/get/account?platform=ios")
          .then((data) => {
            console.log("update local object");
            set_user(data.data);
            store.dispatch({
              type: "SET_BLOCKED_USERS",
              payload: data.data?.blocked_users,
            });
            async_storage.storeUserObj(JSON.stringify(data.data));
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        await axios
          .get("/get/account?platform=ios")
          .then((data) => {
            set_user(data.data);
            store.dispatch({
              type: "SET_BLOCKED_USERS",
              payload: data.data?.blocked_users,
            });
            setAuthState(true);
            async_storage.storeUserObj(JSON.stringify(data.data));
          })
          .catch((err) => {
            console.error(err);
          });
      }
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
          onError={(e) => console.error(e)}
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
      <Screen>
        <Text>{urlData && JSON.stringify(urlData)}</Text>
      </Screen>
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        theme={vhqTheme}
      >
        {/* <SafeAreaView style={{ flex: 1 }}> */}
        {authenticated && userID ? <AppNavigator /> : <AuthRoutes />}
        {/* </SafeAreaView> */}
      </NavigationContainer>
      <Toast config={toastConfig} />
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

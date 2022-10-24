import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  StyleSheet,
  Alert,
  Linking,
  Platform,
  NativeModules,
} from "react-native";
import { connect } from "react-redux";

// Screens
import PostPage from "../screens/PostPage";
import SetupUniversity from "../screens/SetupUniversity";
import SetupPersonalInformation from "../screens/SetupPersonalInformation";
import AddPostPage from "../screens/AddPostPage";
import OverlayLoader from "../components/OverlayLoader";
import colors from "../config/colors";
import * as routes from "./routes";

import * as Notifications from "expo-notifications";
import { setExpoPushToken } from "../store/actions/auth_actions";
import ForgotToAddProfilePic from "../screens/ForgotToAddProfilePic";
import CreateEventPage from "../screens/CreateEventPage";
import Profile from "../screens/Profile";
import UpdateUniversityScreen from "../screens/settings/UpdateUniversityScreen";
import AnonymousSettingsScreen from "../screens/settings/AnonymousSettingsScreen";
import TabNavigator from "./TabNavigator";
import ChatPage from "../screens/Chat/ChatPage";
import navigation from "./rootNavigation";
import useOnlinePresence from "../auth/useOnlinePresence";
import ChatPage2 from "../screens/Chat/ChatPage2";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const mapStateToProps = (state) => {
  return {
    core: state.core,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setExpoPushToken: (token) => dispatch(setExpoPushToken(token)),
  };
};

const Stack = createNativeStackNavigator();

function NavigationStack({ core }) {
  if (!core.accData.profilepic) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routes.ADD_PROFILE_PICTURE}
          component={ForgotToAddProfilePic}
        />
      </Stack.Navigator>
    );
  }

  return (
    <>
      <OverlayLoader />
      <Stack.Navigator
        initialRouteName="AppNavigator"
        defaultScreenOptions={{
          animation: "none",
        }}
      >
        <Stack.Screen
          options={{
            headerShown: false,
            animation: "none",
          }}
          name={routes.APP_NAVIGATOR}
          component={TabNavigator}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: "none",
          }}
          name={routes.ADD_POST}
          component={AddPostPage}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            // animation: "slide_from_right",
            animation: "none",
          }}
          name={routes.POST_PAGE}
          component={PostPage}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
          name={routes.PROFILE}
          component={Profile}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
          }}
          name={routes.ANONYMOUS_SETTINGS}
          component={AnonymousSettingsScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
          name={routes.UPDATE_UNIVERSITY}
          component={UpdateUniversityScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
          name={routes.CREATE_EVENT}
          component={CreateEventPage}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
          name={routes.CHAT_PAGE}
          component={ChatPage}
        />
      </Stack.Navigator>
    </>
  );
}

const AppRoutes = ({ core, setExpoPushToken }) => {
  useOnlinePresence();
  useEffect(() => {
    //

    //
    check_user_tnc_agreement();
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token),
    );

    Notifications.addNotificationResponseReceivedListener((notification) => {
      const pageHandler =
        notification?.notification?.request?.content?.data?._page;
      const notification_data =
        notification?.notification?.request?.content?.data;

      if (pageHandler === "chat") {
        if (notification_data.user_id && notification_data.username) {
          navigation.navigate(routes.CHAT_PAGE, {
            uid: notification_data.user_id,
            username: notification_data.username,
            dating: notification_data.isDatingChat,
          });
        }
      }
    });

    // Notifications.addNotificationReceivedListener((notification) => {
    //   console.log({ notificationRECEIVED: notification });
    // });

    return () => {};
  }, []);

  const check_user_tnc_agreement = () => {};

  const handleOpenSettings = () => {
    Linking.openSettings({ notification: true });
  };

  async function registerForPushNotificationsAsync() {
    let token;

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert(
        "Enable Notifications",
        "Your notification settings for this app are not set to active. Please enable notifications in settings to stay updated and never miss out.",
        [
          {
            text: "Open settings",
            onPress: handleOpenSettings,
          },
          {
            text: "I will do it later.",
          },
        ],
      );

      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  if (core.accData.accountStatus === "pending-setup") {
    return <SetupNavigator core={core} />;
  }

  return <NavigationStack core={core} />;
};

const SetupNavigator = ({ core }) => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
        }}
        initialRouteName={
          core.accData.university && core.accData.yearOfStudy
            ? "SetupPersonalInformation"
            : "SetupUniversity"
        }
      >
        {/* <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="WelcomeScreen"
            component={WelcomeScreen}
          /> */}

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routes.SETUP_UNIVERSITY}
          component={SetupUniversity}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routes.SETUP_PERSONAL_INFO}
          component={SetupPersonalInformation}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    borderTopColor: colors.dark,
    padding: 5,
    marginTop: -6,
    height: 1,
    width: "100%",
    backgroundColor: colors.dark,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoutes);

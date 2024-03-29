import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Alert, Linking, Platform, StyleSheet } from "react-native";
import { connect } from "react-redux";

// Screens
import * as Notifications from "expo-notifications";
import useOnlinePresence from "../auth/useOnlinePresence";
import OverlayLoader from "../components/OverlayLoader";
import colors from "../config/colors";
import AddPostPage from "../screens/AddPostPage";
import ChatPage from "../screens/Chat/ChatPage";
import CreateEventPage from "../screens/CreateEventPage";
import ForgotToAddProfilePic from "../screens/ForgotToAddProfilePic";
import PostPage from "../screens/PostPage";
import Profile from "../screens/Profile";
import AnonymousSettingsScreen from "../screens/settings/AnonymousSettingsScreen";
import UpdateUniversityScreen from "../screens/settings/UpdateUniversityScreen";
import SetupPersonalInformation from "../screens/SetupPersonalInformation";
import SetupUniversity from "../screens/SetupUniversity";
import { setExpoPushToken } from "../store/actions/auth_actions";
import navigation from "./rootNavigation";
import * as routes from "./routes";
import TabNavigator from "./TabNavigator";

import * as TaskManager from "expo-task-manager";
import { async } from "@firebase/util";
import ChatHome from "../screens/Chat/ChatHome";
import ReferAFriend from "../screens/ReferAFriend";
const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

Notifications.setBadgeCountAsync(0);
Notifications.dismissAllNotificationsAsync();

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
          name={routes.CHAT_HOME}
          component={ChatHome}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
          name={routes.CHAT_PAGE}
          component={ChatPage}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
          name={routes.REFER_A_FRIEND}
          component={ReferAFriend}
        />
      </Stack.Navigator>
    </>
  );
}

const AppRoutes = ({ core, setExpoPushToken }) => {
  useOnlinePresence();

  TaskManager.defineTask(
    BACKGROUND_NOTIFICATION_TASK,
    ({ data, error, executionInfo }) =>
      handleNewNotification(data.notification),
  );

  const handleNewNotification = async () => {
    try {
      let current_badge_count = await Notifications.getBadgeCountAsync();
      await Notifications.setBadgeCountAsync(current_badge_count + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //

    //
    check_user_tnc_agreement();
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token),
    );
    Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

    Notifications.addNotificationResponseReceivedListener(
      async (notification) => {
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

        if (pageHandler === "post") {
          if (notification_data.p_id) {
            navigation.navigate(routes.POST_PAGE, {
              post_id: notification_data.p_id,
            });
          }
        }
        if (pageHandler === "addpost") {
          navigation.navigate(routes.ADD_POST);
        }
        if (pageHandler === "profile") {
          if (notification_data.uname) {
            navigation.navigate(routes.PROFILE, {
              username: notification_data.uname,
            });
          }
        }

        // post->
        // p_id
      },
    );

    const foregroundReceivedNotificationSubscription =
      Notifications.addNotificationReceivedListener(() => {
        handleNewNotification();
      });

    return () => {
      foregroundReceivedNotificationSubscription.remove();
      Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    };
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

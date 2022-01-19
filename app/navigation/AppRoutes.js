import React, { useEffect, useRef, useState } from "react";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
  Platform,
  NativeModules,
} from "react-native";
import { connect } from "react-redux";
import RIcon from "react-native-remix-icon";

import Constants from "expo-constants";
//Navigators
import FeedNavigator from "./feedNavigator";
import SearchNavigator from "./SearchNavigator";
import DatingNavigator from "./DatingNavigator";

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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
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
const Tab = createBottomTabNavigator();

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
      <Stack.Navigator initialRouteName="AppNavigator">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routes.APP_NAVIGATOR}
          component={AppNavigator}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={routes.ADD_POST}
          component={AddPostPage}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
          name={routes.POST_PAGE}
          component={PostPage}
        />
      </Stack.Navigator>
    </>
  );
}

const TabBar = (props) => {
  return (
    <LinearGradient
      colors={["#1c2b3a", colors.dark]}
      // colors={["red", "white"]}
      start={[1, 0]}
      end={[1, 1]}
    >
      {/* <View style={styles.bottomNav}></View> */}
      <BottomTabBar {...props} style={[{ backgroundColor: "transparent" }]} />
    </LinearGradient>
  );
};

const AppRoutes = ({ core, setExpoPushToken }) => {
  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token),
    );

    return () => {};
  }, []);

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

const AppNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={TabBar}
      defaultScreenOptions={{
        tabBarHideOnKeyboard: true,
      }}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          // marginTop: 0,
          backgroundColor: "transparent",
          borderTopColor: colors.darkish2,
          borderTopWidth: 2,
          paddingBottom: 3,
          paddingTop: 2,

          // shadowColor: colors.black,
          // shadowOpacity: 20,
          // shadowRadius: 5,
        },
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Feed",
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="home-5-line" color={color} size={size} />
          ),
        }}
        name={routes.FEED_NAVIGATOR}
        component={FeedNavigator}
      />

      <Tab.Screen
        options={{
          tabBarLabel: "Explore",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="search-2-line" color={color} size={size} />
          ),
        }}
        name={routes.SEARCH_NAVIGATOR}
        component={SearchNavigator}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Dating",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="hearts-line" color={color} size={size + 3} />
          ),

          tabBarShowLabel: true,
        }}
        name={routes.DATING_NAVIGATOR}
        component={DatingNavigator}
      />
      {/* <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell-o" color={color} size={size} />
          ),
          tabBarShowLabel: false,
        }}
        name="Notifications"
        component={FeedNavigator}
      /> */}
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="store-2-line" color={color} size={size} />
          ),
          tabBarShowLabel: false,
        }}
        name="Marketplace"
        component={FeedNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <RIcon name="chat-3-line" color={color} size={size} />
          ),
          tabBarShowLabel: false,
        }}
        name="Chat"
        component={FeedNavigator}
      />
    </Tab.Navigator>
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

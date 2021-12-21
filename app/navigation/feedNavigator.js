import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import FloatingButton from "../components/FloatingButton";
import { ANONYMOUS_SETTINGS, HOME, PROFILE } from "./routes";
import AnonymousSettingsScreen from "../screens/settings/AnonymousSettingsScreen";
// import PostPage from "../screens/PostPage";

const FeedNavigator = () => (
  <Stack.Navigator
    screenOptions={
      {
        // animation: "none",
      }
    }
  >
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={HOME}
      component={Home}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={PROFILE}
      component={Profile}
    />
    <Stack.Screen
      options={{
        headerShown: false,
        animation: "slide_from_bottom",
      }}
      name={ANONYMOUS_SETTINGS}
      component={AnonymousSettingsScreen}
    />
    {/* <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="PostPage"
      component={PostPage}
    /> */}
  </Stack.Navigator>
);

export default FeedNavigator;

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Home from "../screens/Home";
import Profile from "../screens/Profile";
import FloatingButton from "../components/FloatingButton";
import {
  ANONYMOUS_SETTINGS,
  HOME,
  PROFILE,
  PROFILE_SETTINGS,
  PREFERENCES,
  YEAR_OF_STUDY,
  UPDATE_DEGREE,
} from "./routes";
import AnonymousSettingsScreen from "../screens/settings/AnonymousSettingsScreen";
import ProfileSettingsScreen from "../screens/settings/ProfileSettingsScreen";
import PreferencesScreen from "../screens/settings/PreferencesScreen";
import YearOfStudyScreen from "../screens/settings/YearOfStudyScreen";
import UpdateDegreeScreen from "../screens/settings/UpdateDegreeScreen";

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
    <Stack.Screen
      options={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      name={PROFILE_SETTINGS}
      component={ProfileSettingsScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      name={PREFERENCES}
      component={PreferencesScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      name={YEAR_OF_STUDY}
      component={YearOfStudyScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      name={UPDATE_DEGREE}
      component={UpdateDegreeScreen}
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

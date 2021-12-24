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
  UPDATE_BIRTHDAY,
  UPDATE_GENDER,
  UPDATE_UNIVERSITY,
  UPDATE_RELATIONSHIP_STATUS,
  UPDATE_SO_STATUS,
} from "./routes";
import AnonymousSettingsScreen from "../screens/settings/AnonymousSettingsScreen";
import ProfileSettingsScreen from "../screens/settings/ProfileSettingsScreen";
import PreferencesScreen from "../screens/settings/PreferencesScreen";
import YearOfStudyScreen from "../screens/settings/YearOfStudyScreen";
import UpdateDegreeScreen from "../screens/settings/UpdateDegreeScreen";
import UpdatebirthdayScreen from "../screens/settings/UpdatebirthdayScreen";
import UpdateGenderScreen from "../screens/settings/UpdateGenderScreen";
import UpdateUniversityScreen from "../screens/settings/UpdateUniversityScreen";
import UpdateRelationshipStatusScreen from "../screens/settings/UpdateRelationshipStatusScreen";
import UpdateSexualOrientaionScreen from "../screens/settings/UpdateSexualOrientaionScreen";

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
    <Stack.Screen
      options={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      name={UPDATE_BIRTHDAY}
      component={UpdatebirthdayScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      name={UPDATE_GENDER}
      component={UpdateGenderScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      name={UPDATE_UNIVERSITY}
      component={UpdateUniversityScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      name={UPDATE_RELATIONSHIP_STATUS}
      component={UpdateRelationshipStatusScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      name={UPDATE_SO_STATUS}
      component={UpdateSexualOrientaionScreen}
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

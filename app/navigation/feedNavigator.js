import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

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
  UPDATE_S_TARGET,
  UPDATE_PROFILE_PAGE,
  UPDATE_USERNAME,
  UPDATE_FIRSTNAME,
  UPDATE_SURNAME,
  UPDATE_ABOUT,
  POLL_DETAILS,
  NOTIFICATIONS,
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
import UpdateSexTargetScreen from "../screens/settings/UpdateSexTargetScreen";
import UpdateProfile from "../screens/settings/UpdateProfile";
import UpdateAbout from "../screens/settings/UpdateAbout";
import UpdateUsernameScreen from "../screens/settings/UpdateUsernameScreen";
import UpdateSurnameScreen from "../screens/settings/UpdateSurnameScreen";
import UpdateFirstnameScreen from "../screens/settings/UpdateFirstnameScreen";
import PollDetails from "../screens/PollDetails";
import Notifications from "../screens/Notifications";
import DrawerContent from "./DrawerContent";
import HomeScreen from "../screens/HomeTabs/HomeScreen";
import EventsScreen from "../screens/HomeTabs/EventsScreen";
import colors from "../config/colors";
import Screen from "../components/Screen";
import { ScrollView, View } from "react-native";
import VirtualizedView from "../components/VirtualizedViewBacked";

const Stack = createNativeStackNavigator();
// import PostPage from "../screens/PostPage";

const Drawer = createDrawerNavigator();
const HomeDrawerNavigator = () => {
  // return <Home />;

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeScreen" component={Home} />
    </Drawer.Navigator>
  );
};

const FeedNavigator = () => (
  <>
    <FloatingButton />
    <Stack.Navigator
      defaultScreenOptions={{
        headerShown: false,
        animation: "none",
      }}
      initialRouteName={HOME}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={HOME}
        component={HomeDrawerNavigator}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          animation: "none",
        }}
        name={NOTIFICATIONS}
        component={Notifications}
      />

      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={POLL_DETAILS}
        component={PollDetails}
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
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_S_TARGET}
        component={UpdateSexTargetScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_PROFILE_PAGE}
        component={UpdateProfile}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_USERNAME}
        component={UpdateUsernameScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_FIRSTNAME}
        component={UpdateFirstnameScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_SURNAME}
        component={UpdateSurnameScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        name={UPDATE_ABOUT}
        component={UpdateAbout}
      />
      {/* <Stack.Screen 
      options={{
        headerShown: false,
      }}
      name="PostPage"
      component={PostPage}
    /> */}
    </Stack.Navigator>
  </>
);

export default FeedNavigator;

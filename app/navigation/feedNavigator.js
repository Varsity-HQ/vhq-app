import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Home from "../screens/Home";
import Profile from "../screens/Profile";
// import PostPage from "../screens/PostPage";

const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="Home"
      component={Home}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="Profile"
      component={Profile}
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

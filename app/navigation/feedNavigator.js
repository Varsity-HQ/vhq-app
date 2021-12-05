import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Home from "../screens/Home";
import Profile from "../screens/Profile";

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
  </Stack.Navigator>
);

export default FeedNavigator;

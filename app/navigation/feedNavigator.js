import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Home from "../screens/Home";

const FeedNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="Home"
      component={Home}
    />
  </Stack.Navigator>
);

export default FeedNavigator;

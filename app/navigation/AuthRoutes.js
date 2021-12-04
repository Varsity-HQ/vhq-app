import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "../screens/LandingScreen";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="LandingScreen"
      component={LandingScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="Login"
      component={Login}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="Register"
      component={Signup}
    />
  </Stack.Navigator>
);

export default AuthNavigator;

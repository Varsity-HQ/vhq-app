import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingScreen from "../screens/LandingScreen";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import Signup from "../screens/Signup";
import {
  FORGOT_PASSWORD,
  LOGIN,
  REGISTER,
  LANDING_PAGE,
} from "../navigation/routes";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_right",
    }}
  >
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={LANDING_PAGE}
      component={LandingScreen}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={LOGIN}
      component={Login}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={REGISTER}
      component={Signup}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={FORGOT_PASSWORD}
      component={ForgotPassword}
    />
  </Stack.Navigator>
);

export default AuthNavigator;

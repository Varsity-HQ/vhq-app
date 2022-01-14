import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../screens/Profile";
import DatingIntroScreen from "../screens/DatingIntroScreen";

import * as routes from "./routes";

const Stack = createNativeStackNavigator();
const DatingNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name={routes.DATING_INTRO} component={DatingIntroScreen} />
    <Stack.Screen name={routes.PROFILE} component={Profile} />
  </Stack.Navigator>
);

export default DatingNavigator;

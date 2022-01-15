import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../screens/Profile";
import DatingIntroScreen from "../screens/DatingScreens/DatingIntroScreen";
import DatingEncountersScreen from "../screens/DatingScreens/DatingEncountersScreen";

import * as routes from "./routes";

const Stack = createNativeStackNavigator();
const DatingNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: "slide_from_right",
    }}
  >
    <Stack.Screen name={routes.DATING_INTRO} component={DatingIntroScreen} />
    <Stack.Screen
      name={routes.DATING_ENCOUNTERS}
      component={DatingEncountersScreen}
    />
  </Stack.Navigator>
);

export default DatingNavigator;

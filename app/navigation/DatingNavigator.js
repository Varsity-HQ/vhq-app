import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Profile from "../screens/Profile";
import DatingIntroScreen from "../screens/DatingScreens/DatingIntroScreen";
import DatingEncountersScreen from "../screens/DatingScreens/DatingEncountersScreen";

import * as routes from "./routes";
import CSConfirmGender from "../screens/DatingScreens/CreateShow/CSConfirmGender";
import CSName from "../screens/DatingScreens/CreateShow/CSName";
import CSLookingFor from "../screens/DatingScreens/CreateShow/CSLookingFor";

const Stack = createNativeStackNavigator();

const CreateShowStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_bottom",
      }}
    >
      <Stack.Screen
        name={routes.CS_CONFIRM_GENDER}
        component={CSConfirmGender}
      />
      <Stack.Screen name={routes.CS_NAME} component={CSName} />
      <Stack.Screen name={routes.CS_LOOKING_FOR} component={CSLookingFor} />
    </Stack.Navigator>
  );
};

const DatingNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animation: "slide_from_right",
    }}
  >
    {/* <Stack.Screen name={routes.DATING_INTRO} component={DatingIntroScreen} /> */}
    <Stack.Screen name={routes.CREATE_SHOW} component={CreateShowStack} />
    <Stack.Screen
      name={routes.DATING_ENCOUNTERS}
      component={DatingEncountersScreen}
    />
  </Stack.Navigator>
);

export default DatingNavigator;

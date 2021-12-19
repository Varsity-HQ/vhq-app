import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Profile from "../screens/Profile";
import Search from "../screens/SearchScreen";

import * as routes from "./routes";

const SearchNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={routes.SEARCH}
      component={Search}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name={routes.PROFILE}
      component={Profile}
    />
  </Stack.Navigator>
);

export default SearchNavigator;

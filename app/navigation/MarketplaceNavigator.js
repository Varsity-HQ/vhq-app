import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MARKETPLACE_HOME } from "./routes";
import Home from "../screens/Marketplace/Home";
const Stack = createNativeStackNavigator();

const MarketplaceNavigator = () => (
  <>
    <Stack.Navigator
      defaultScreenOptions={{
        headerShown: false,
        animation: "none",
      }}
      initialRouteName={MARKETPLACE_HOME}
    >
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={MARKETPLACE_HOME}
        component={Home}
      />
    </Stack.Navigator>
  </>
);
export default MarketplaceNavigator;

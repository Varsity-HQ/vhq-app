import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MARKETPLACE_HOME,
  MARKETPLACE_CAT_PAGE,
  MARKETPLACE_ITEM_PAGE,
} from "./routes";
import Home from "../screens/Marketplace/Home";
import CategoryPage from "../screens/Marketplace/CategoryPage";
import ItemPage from "../screens/Marketplace/ItemPage";
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
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={MARKETPLACE_CAT_PAGE}
        component={CategoryPage}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={MARKETPLACE_ITEM_PAGE}
        component={ItemPage}
      />
    </Stack.Navigator>
  </>
);
export default MarketplaceNavigator;

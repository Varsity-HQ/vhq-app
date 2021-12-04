import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppRoutes";
import AuthRoutes from "./app/navigation/AuthRoutes";
import LandingScreen from "./app/screens/LandingScreen";
import vhqTheme from "./app/navigation/navigationTheme";

export default function App() {
  return (
    // <LandingScreen />

    <NavigationContainer theme={vhqTheme}>
      <AuthRoutes />
    </NavigationContainer>
  );
}

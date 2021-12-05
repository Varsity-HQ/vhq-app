import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppNavigator from "./app/navigation/AppRoutes";
import AuthRoutes from "./app/navigation/AuthRoutes";
import LandingScreen from "./app/screens/LandingScreen";
import vhqTheme from "./app/navigation/navigationTheme";
import FloatingButton from "./app/components/FloatingButton";

export default function App() {
  return (
    <>
      <FloatingButton />
      {/* <LandingScreen /> */}
      <NavigationContainer theme={vhqTheme}>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

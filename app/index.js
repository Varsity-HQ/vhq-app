import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import AppNavigator from "./navigation/AppRoutes";
import AuthRoutes from "./navigation/AuthRoutes";
import vhqTheme from "./navigation/navigationTheme";
import axios from "axios";
import { connect } from "react-redux";

axios.defaults.baseURL = "http://172.20.10.4:5000";

const mapStateToProps = (state) => {
  return {
    authenticated: state.core.authenticated,
  };
};

function App({ authenticated }) {
  return (
    <NavigationContainer theme={vhqTheme}>
      {authenticated ? <AppNavigator /> : <AuthRoutes />}
    </NavigationContainer>
  );
}

export default connect(mapStateToProps, null)(App);

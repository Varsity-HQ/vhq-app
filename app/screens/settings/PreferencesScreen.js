import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";

function PreferencesScreen({ navigation }) {
  return (
    <Screen>
      <Header
        backPress={() => navigation.goBack()}
        backIcon
        title="Preferences"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PreferencesScreen;

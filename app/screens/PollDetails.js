import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/headers/header3";
import Screen from "../components/Screen";

function PollDetails({ navigation }) {
  return (
    <Screen style={styles.container}>
      <Header backPress={() => navigation.goBack()} title="Poll details" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default PollDetails;

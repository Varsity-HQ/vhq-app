import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

function SearchResults(props) {
  return (
    <Screen style={styles.container}>
      <AppText>Resilts to be loaded here</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SearchResults;

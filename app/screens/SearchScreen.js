import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import SearchHeader from "../components/Search/SearchHeader";

function SearchScreen(props) {
  return (
    <Screen style={styles.container}>
      <SearchHeader />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SearchScreen;

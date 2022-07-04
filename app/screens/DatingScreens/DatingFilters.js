import React from "react";
import { View, StyleSheet } from "react-native";
import FilterBy from "../../components/Dating/FilterBy";
import FilterByUniversity from "../../components/Dating/FilterByUniversity";
import InterestFilter from "../../components/Dating/InterestFilter";
import LookingFor from "../../components/Dating/LookingFor";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";

function DatingFilters(props) {
  return (
    <Screen style={styles.container}>
      <Header backIcon title="Discover filters" />
      {/* //gender filter */}
      <InterestFilter />
      {/* //filter by online */}
      <FilterBy />
      {/* //filter by purpose */}
      <LookingFor />
      {/* //filter by university */}
      {/* <FilterByUniversity /> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DatingFilters;

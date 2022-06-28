import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../components/AppText";
import colors from "../config/colors";
import { v4 } from "uuid";
import DropDown from "./Forms/DropDown";

const CITIES =
  "Jakarta,Bandung,Sumbawa,Taliwang,Lombok,Bima,Jes,es,esaest,arttrea,ratdt,astrea,estatd,rsae".split(
    ",",
  );

function ScrollOptionPicker(props) {
  const setCity = () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gender</Text>
      <View>
        <DropDown
          key={v4()}
          items={CITIES.map((name) => ({ label: name, value: name }))}
          onChange={({ item }) => setCity(item.label)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
  },
  container: {
    marginBottom: 20,
  },
});

export default ScrollOptionPicker;

import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Header from "../components/headers/header1";
import AppButton from "../components/Button";
import Text from "../components/AppText";
import DropDown from "../components/Forms/DropDown";
import uniList from "../util/UnisAndColleges.json";
import colors from "../config/colors";

let universities = [];

uniList.forEach((x) => {
  universities.push({ value: x.name, label: x.name });
});

function SetupUniversity({ navigation }) {
  return (
    <Screen style={styles.container}>
      <Header backPress={() => navigation.goBack()} title="Set University" />

      <View style={styles.content}>
        <Text>
          Which college or university are you currently doing your studies
        </Text>
        <DropDown
          placeholder="Select your university or college"
          searchable
          items={universities}
          style={{ paddingVertical: 20 }}
        />
        <Text style={{ color: colors.secondary }}>
          <Text style={{ fontWeight: "700", color: colors.secondary }}>
            Note :{" "}
          </Text>
          Your posts and activities will be visible at your university only
        </Text>

        <AppButton style={{ marginTop: 20 }} type={3} title="Save university" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  container: {},
});

export default SetupUniversity;

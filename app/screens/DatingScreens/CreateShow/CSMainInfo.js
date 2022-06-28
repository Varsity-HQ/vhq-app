import React from "react";
import { View, StyleSheet } from "react-native";

import Button from "../../../components/Button";
import Header from "../../../components/headers/header3";
import Text from "../../../components/AppText";
import Screen from "../../../components/Screen";
import VirtualizedViewBacked from "../../../components/VirtualizedViewBacked";
import styles from "./styles";
import ScrollOptionPicker from "../../../components/ScrollOptionPicker";

function CSMainInfo({ saving_nickname = false }) {
  return (
    <Screen>
      <Header
        title="Main Information"
        backIcon
        // buttonText="Save"
        loading={saving_nickname}
      />
      <View style={styles.container}>
        <View>
          <ScrollOptionPicker title="Gender" />
          <ScrollOptionPicker title="Star Sign" />
          <ScrollOptionPicker title="Age" />
          <ScrollOptionPicker title="Sexual Orientation" />
        </View>
      </View>
    </Screen>
  );
}

const other_styles = StyleSheet.create({
  container: {},
});

export default CSMainInfo;

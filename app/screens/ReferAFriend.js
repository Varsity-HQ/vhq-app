import React, { PureComponent } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Header from "../components/ReferAFriend/Header";
import Screen from "../components/Screen";
import AppButton from "../components/Button";

class ReferAFriend extends PureComponent {
  render() {
    return (
      <Screen>
        <FlatList ListHeaderComponent={<Header />} />
        <AppButton title="Test" />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default ReferAFriend;

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AccountCard from "./Profile/AccountCard";

function AccountsSlider(props) {
  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingLeft: 10 }} horizontal>
        <AccountCard />
        <AccountCard />
        <AccountCard />
        <AccountCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default AccountsSlider;

import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AccountCard from "./Profile/AccountCard";
import { v4 } from "uuid";

function AccountsSlider({ data, loading }) {
  if (loading) {
    return (
      <View style={styles.container}>
        <ScrollView style={{ paddingLeft: 10 }} horizontal>
          <AccountCard loading />
          <AccountCard loading />
          <AccountCard loading />
          <AccountCard loading />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingLeft: 10 }} horizontal>
        {data.map((x) => (
          <AccountCard data={x} key={v4()} />
        ))}
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

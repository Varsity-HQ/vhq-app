import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MarketplaceAdCard from "./Marketplace/MarketplaceAdCard";
import AccountCard from "./Profile/AccountCard";
import { v4 } from "uuid";

function AccountsGrid({ data }) {
  return (
    <View style={styles.container}>
      {data.map((x) => (
        <AccountCard key={v4()} data={x} type={2} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default AccountsGrid;

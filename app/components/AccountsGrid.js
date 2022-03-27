import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MarketplaceAdCard from "./Marketplace/MarketplaceAdCard";
import AccountCard from "./Profile/AccountCard";

function AccountsGrid(props) {
  return (
    <View style={styles.container}>
      <AccountCard type={2} />
      <AccountCard type={2} />
      <AccountCard type={2} />
      <AccountCard type={2} />
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

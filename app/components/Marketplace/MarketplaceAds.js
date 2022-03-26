import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import MarketplaceAdCard from "./MarketplaceAdCard";

function MarketplaceAds(props) {
  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingLeft: 10 }} horizontal>
        <MarketplaceAdCard />
        <MarketplaceAdCard />
        <MarketplaceAdCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default MarketplaceAds;

import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";

function MarketplaceTab(props) {
  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: "center", marginTop: 20 }}>
        Under construction
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default MarketplaceTab;

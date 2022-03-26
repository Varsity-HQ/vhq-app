import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

function MarketplaceAdCard(props) {
  return (
    <View style={styles.container}>
      <View style={styles.top_container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.secondary_2,
    width: 200,
    height: 200,
    marginRight: 10,
  },
});

export default MarketplaceAdCard;

import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../components/Screen";
import Text from "../components/AppText";

function MarketplaceComingSoon(props) {
  return (
    <Screen style={styles.container}>
      <View>
        <Text style={[styles.center, styles.bold]}>Coming Soon</Text>
        <Text style={[styles.center]}>
          We are currently builing this page but we will notify you once we
          launch it
        </Text>
        {/* <Text style={[styles.center]}>VarsityHQ @ 2022</Text> */}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: "700",
    fontSize: 30,
    marginBottom: 20,
  },
  center: {
    textAlign: "center",
  },
  container: {
    padding: 30,
  },
});

export default MarketplaceComingSoon;

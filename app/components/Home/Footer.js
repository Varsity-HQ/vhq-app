import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../../config/colors";

function Footer({ loadingMore }) {
  if (!loadingMore) return null;
  return (
    <View
      style={{
        position: "relative",
        paddingVertical: 40,
        marginTop: 10,
        marginBottom: 50,
        borderColor: colors.primary,
      }}
    >
      <ActivityIndicator color={colors.primary} animating size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Footer;

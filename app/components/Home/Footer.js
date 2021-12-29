import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import colors from "../../config/colors";

function Footer({ loadingMore }) {
  if (!loadingMore) return null;
  return (
    <View
      style={{
        position: "relative",
        //  width: width,
        //  height: height,
        paddingVertical: 20,
        borderTopWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        borderColor: colors.primary,
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Footer;

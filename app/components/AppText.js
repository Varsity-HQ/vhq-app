import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import colors from "../config/colors";

function AppText({ children, style, ...props }) {
  return (
    <Text allowFontScaling={false} {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    //|////////////////////////////|
    //|   fontWeight: "500",    |//|
    //|   fontFamily: "arial",  |//|
    //|////////////////////////////|
    color: colors.white,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
});

export default AppText;

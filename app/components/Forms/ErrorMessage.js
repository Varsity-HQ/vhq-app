import React from "react";
import { StyleSheet } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";

function ErrorMessage({ error, style, visible }) {
  if (!visible || !error) return null;

  return <AppText style={[styles.error, style]}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.redish_2,
    marginTop: 5,
    backgroundColor: colors.redish,
    padding: 5,
  },
});

export default ErrorMessage;

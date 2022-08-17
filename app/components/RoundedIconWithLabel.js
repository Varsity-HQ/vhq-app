import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../config/colors";
import Text from "./AppText";

const width = Dimensions.get("window").width;

function RoundedIconWithLabel({ icon, text }) {
  if (!text) return null;
  return (
    <View style={styles.container}>
      <View style={styles.icon_container}>{icon}</View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginRight: 5,
  },
  icon_container: {
    backgroundColor: colors.dark_2,
    // padding: 10,
    borderRadius: 100,
    width: width * 0.08,
    height: width * 0.08,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
  },
  text: {
    fontSize: 14,
  },
});

export default RoundedIconWithLabel;

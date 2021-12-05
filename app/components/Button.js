import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({ title, style, onPress, type = 1 }) {
  if (type === 3) {
    return (
      <TouchableOpacity style={[styles.button_t3, style]} onPress={onPress}>
        <Text style={styles.text_t3}>{title}</Text>
      </TouchableOpacity>
    );
  }
  if (type === 2) {
    return (
      <TouchableOpacity style={[styles.button_t2, style]} onPress={onPress}>
        <Text style={styles.text_t2}>{title}</Text>
      </TouchableOpacity>
    );
  }
  if (type === 1) {
    return (
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  button_t3: {
    position: "relative",
    backgroundColor: colors.darkish3,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    // width: "100%",
    marginVertical: 10,
  },
  button_t2: {
    position: "relative",
    backgroundColor: colors.white,
    borderColor: colors.dark_opacity_2,
    borderWidth: 5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  button: {
    position: "relative",
    backgroundColor: colors.primary,
    borderColor: "#1481b8",
    borderWidth: 5,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text_t3: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
  text_t2: {
    color: colors.primary,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;

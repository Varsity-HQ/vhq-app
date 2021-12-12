import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

function header1({ backPress, title, buttonText }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.left_container}>
          {backPress && (
            <TouchableOpacity onPress={backPress}>
              <Ionicons
                name="arrow-back-sharp"
                color={colors.white}
                size={30}
              />
            </TouchableOpacity>
          )}

          <AppText style={[styles.text, { marginLeft: 10 }]}>{title}</AppText>
        </View>
        <View>
          <TouchableOpacity style={styles.button_right}>
            <AppText style={[styles.text]}>{buttonText}</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grandient: {},
  button_right: {
    backgroundColor: colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 5,
  },
  left_container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontWeight: "700",
    fontSize: 18,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  grandient: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    backgroundColor: colors.dark,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
  },
});

export default header1;

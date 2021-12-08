import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import AppText from "../AppText";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

function header1({ backPress, title, buttonText }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        start={[0, 2]}
        end={[1, 0]}
        colors={[colors.primary, "#1c83f9"]}
        style={styles.grandient}
      />
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
          <AppText style={styles.text}>{buttonText}</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grandient: {},
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
    paddingHorizontal: 0,
    paddingVertical: 20,
  },
  grandient: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    backgroundColor: colors.primary,
    borderBottomWidth: 0,
  },
});

export default header1;

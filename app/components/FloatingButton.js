import React from "react";
import { Text } from "react-native";
import { View, StyleSheet } from "react-native";
import COntants from "expo-constants";
import colors from "../config/colors";
import { LinearGradient } from "expo-linear-gradient";
import Ricons from "react-native-remix-icon";

// import {} from "@expo/vector-icons"

function FloatingButton(props) {
  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["#f50057", colors.primary]}
        // colors={["red", "white"]}
        start={[0, 1]}
        end={[1, 0]}
      />
      <View style={styles.inner_container}>
        <Text style={{ color: colors.white, zIndex: 2 }}>
          <Ricons size={40} color={colors.white} name="quill-pen-fill" />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inner_container: {
    backgroundColor: colors.darkish2,
    width: "90%",
    height: "90%",
    borderRadius: 100,
    borderColor: colors.dark_opacity_2,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    position: "absolute",
    height: "100%",
    // borderRadius: 100,
    width: "100%",
  },
  container: {
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOpacity: 50,
    shadowRadius: 5,
    height: 90,
    width: 90,
    borderRadius: 100,
    position: "absolute",
    bottom: 40,
    right: 20,
    zIndex: 2,
    backgroundColor: colors.darkish2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FloatingButton;

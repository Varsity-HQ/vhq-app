import React from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import colors from "../../../config/colors";
import { AntDesign } from "@expo/vector-icons";

const width = Dimensions.get("window").width;

function MCPhoto({ add }) {
  return (
    <TouchableOpacity style={styles.container}>
      {add && <AntDesign name="plus" size={30} color={colors.secondary} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width / 4,
    height: width / 4,
    borderColor: colors.secondary,
    borderWidth: 0,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: colors.dark_opacity_2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MCPhoto;

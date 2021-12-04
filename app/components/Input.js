import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";

function AppTextInput({ icon, cstyles, width = "100%", ...otherProps }) {
  return (
    <View style={[styles.container, { width: width }, cstyles]}>
      {icon && (
        <FontAwesome
          //   name={icon}
          name={icon}
          size={20}
          color={colors.secondary}
          style={styles.icon}
        />
      )}
      <TextInput
        placeholderTextColor={colors.grayer}
        style={styles.text}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    width: "100%",
    color: colors.white,
  },
  container: {
    backgroundColor: colors.dark_opacity_2,
    borderColor: colors.lighish,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
});

export default AppTextInput;

import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";

function AppTextInput({
  type,
  style,
  icon,
  cstyles,
  onChangeText,
  password,
  passShow,
  show,
  width = "100%",
  ...otherProps
}) {
  if (type === 2) {
    return (
      <TextInput
        onChangeText={onChangeText}
        placeholderTextColor={colors.secondary}
        style={[styles.TextInput, style]}
        {...otherProps}
      />
    );
  }

  return (
    <View style={[styles.container, { width: width }, cstyles]}>
      {icon && (
        <FontAwesome
          //   name={icon}
          name={icon}
          size={16}
          color={colors.secondary}
          style={styles.icon}
        />
      )}
      <TextInput
        onChangeText={onChangeText}
        placeholderTextColor={colors.grayer}
        style={styles.text}
        {...otherProps}
      />
      {password && (
        <TouchableOpacity onPress={passShow}>
          <FontAwesome
            //   name={icon}
            name={show ? "eye-slash" : "eye"}
            size={18}
            color={colors.secondary}
            style={styles.eye_icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderRightWidth: 4,
    borderRightColor: colors.primary,
    borderColor: "#2f6286",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.white,
  },
  text: {
    width: "100%",
    color: colors.white,
    flex: 1,
    // borderColor: "red",
    // borderWidth: 1,
    height: "100%",
  },
  container: {
    backgroundColor: colors.dark_opacity_2,
    borderColor: colors.lighish,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 15,
    height: 45,
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },

  eye_icon: {
    marginRight: 0,
    marginLeft: 5,
    // borderWidth: 1,
    // borderColor: "red",
    padding: 10,

    // height: "100%",
    // alignSelf: "auto",
  },
});

export default AppTextInput;

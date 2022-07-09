import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import Text from "./AppText";
import Button from "./Button";

function IconButton({
  icon,
  text,
  textStyle,
  style,
  disabled,
  buttonStyle,
  onPress,
}) {
  return (
    <View
      style={[
        style,
        {
          flexDirection: "column",
          alignItems: "center",
          opacity: disabled ? 0.3 : 1,
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          onPress={onPress}
          disabled={disabled}
          type={3}
          content={icon}
          style={[
            buttonStyle,
            {
              borderRadius: 100,
            },
          ]}
        />
      </View>
      {text && (
        <View>
          <Text style={textStyle}>{text}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default IconButton;

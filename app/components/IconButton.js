import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import Text from "./AppText";
import Button from "./Button";

function IconButton({ icon, text, textStyle, style }) {
  return (
    <View
      style={[
        style,
        {
          flexDirection: "column",
          alignItems: "center",
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
          type={3}
          content={icon}
          style={{
            borderRadius: 100,
          }}
        />
      </View>
      <View>
        <Text style={textStyle}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default IconButton;

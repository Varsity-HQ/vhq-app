import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Text from "../AppText";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";

const iconSize = 30;

function IconMenuItem({
  title,
  desc,
  icon = "chevron-forward",
  descColor = colors.white,
  onPress,
}) {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={colors.darkish}
      onPress={onPress}
    >
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={styles.heading}>{title}</Text>
          <Text style={[{ color: descColor }]}>{desc}</Text>
        </View>
        <View
          style={{
            width: 30,
          }}
        >
          <Ionicons name={icon} color={colors.white} size={iconSize} />
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 18,
    fontWeight: "700",
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default IconMenuItem;

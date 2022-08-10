import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import Text from "../AppText";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

const iconSize = 30;

function IconMenuItem({
  mMessage,
  required,
  title,
  desc,
  icon = "chevron-forward",
  descColor = colors.white,
  onPress,
  descCapitalize,
  style,
  titleStyle,
}) {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={colors.darkish}
      // style={}
      onPress={onPress}
    >
      <View
        style={[
          styles.container,
          required && !desc && { backgroundColor: colors.redish },
          style,
        ]}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={[styles.heading, titleStyle]}>{title}</Text>

          {required && !desc && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons
                name="alert"
                size={iconSize - 14}
                color={colors.white}
              />
              <Text style={{ color: colors.light }}>&nbsp;{mMessage}</Text>
            </View>
          )}

          {desc ? (
            <Text
              style={[
                { color: descColor },
                descCapitalize && { textTransform: "capitalize" },
              ]}
            >
              {desc}
            </Text>
          ) : null}
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
    fontSize: 17,
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

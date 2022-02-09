import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import colors from "../config/colors";
import EStyleSheet from "react-native-extended-stylesheet";
import { normalizeText } from "../util/responsivePx";
import { RFValue } from "react-native-responsive-fontsize";

const allowFontScaling = false;

function AppText({ children, style, regular = true, ...props }) {
  let font_styles = {};
  if (Array.isArray(style)) {
    style.forEach((x) => {
      font_styles = { ...font_styles, ...x };
    });
  } else {
    font_styles = style;
  }

  if (
    font_styles?.fontWeight === "700" ||
    (font_styles?.fontWeight === "bold" && !font_styles?.fontFamily)
  ) {
    return (
      <Text
        allowFontScaling={allowFontScaling}
        {...props}
        style={[styles.text, font_styles, { fontFamily: "Ubuntu-bold" }]}
      >
        {children}
      </Text>
    );
  }

  if (font_styles?.fontWeight === "600" && !font_styles?.fontFamily) {
    return (
      <Text
        allowFontScaling={allowFontScaling}
        {...props}
        style={[styles.text, font_styles, { fontFamily: "Ubuntu-medium" }]}
      >
        {children}
      </Text>
    );
  }

  if (font_styles?.fontFamily) {
    return (
      <Text
        allowFontScaling={allowFontScaling}
        {...props}
        style={[styles.text, font_styles]}
      >
        {children}
      </Text>
    );
  }

  return (
    <Text
      allowFontScaling={allowFontScaling}
      {...props}
      style={[styles.text, font_styles, { fontFamily: "Ubuntu-regular" }]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: RFValue(13),
    color: colors.white,
    fontFamily: "Ubuntu-regular",
  },
});

export default AppText;

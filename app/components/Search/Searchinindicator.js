import React from "react";
import { ActivityIndicator, View, Dimensions } from "react-native";
import { connectStateResults } from "react-instantsearch-native";
import AppText from "../AppText";
import colors from "../../config/colors";

const { width, height } = Dimensions.get("window");

export default connectStateResults(({ searching, props }) => {
  const left = props.left ? props.left : 0;
  const bottom = props.bottom ? props.bottom : height - 20;

  if (!searching) return null;

  return (
    <View style={{ padding: 10 }}>
      <ActivityIndicator color={colors.secondary} animating={searching} />
    </View>
  );
});

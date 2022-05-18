import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import Text from "./AppText";

function ReportedTemplate({ type = "" }) {
  if (type === "post") {
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            color: colors.secondary_2,
          }}
        >
          This {type} is unavaliable to you
        </Text>
      </View>
    );
  }
  return <View></View>;
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: colors.dark_opacity_2,
    padding: 20,
    borderRadius: 10,
  },
});

export default ReportedTemplate;

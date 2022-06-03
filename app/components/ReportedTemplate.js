import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import Text from "./AppText";

function ReportedTemplate({ type = "" }) {
  if (type === "comment") {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.dark,
            borderColor: colors.secondary_2,
            borderWidth: 1,
            marginBottom: 30,
          },
        ]}
      >
        <Text
          style={{
            textAlign: "center",
            color: colors.secondary_2,
          }}
        >
          Comment not available
        </Text>
      </View>
    );
  }
  if (type === "post") {
    return null;
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            color: colors.secondary_2,
          }}
        >
          Content not available to you
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

import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

function RTextEditor(props) {
  return (
    <View style={styles.container}>
      <Text>RTextEditor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: colors.secondary,
    borderTopWidth: 1,
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
    padding: 10,
  },
});

export default RTextEditor;

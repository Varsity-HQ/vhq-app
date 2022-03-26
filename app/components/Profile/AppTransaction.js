import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import colors from "../../config/colors";

function AppTransaction(props) {
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "75%",
          borderRightColor: colors.white,
          borderRightWidth: 1,
          padding: 10,
        }}
      >
        <Text style={{ fontWeight: "700" }}>Refer rewards</Text>
        <Text style={{ color: colors.secondary }}>Refer rewards</Text>
      </View>
      <View
        style={{
          width: "25%",
          padding: 10,
        }}
      >
        <Text style={{ color: colors.green, fontWeight: "700" }}>+3</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.white,
    borderWidth: 1,
    flexDirection: "row",
  },
});

export default AppTransaction;

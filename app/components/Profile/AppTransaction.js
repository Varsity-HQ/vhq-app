import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import colors from "../../config/colors";
import dayjs from "dayjs";

function AppTransaction({ data }) {
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
        <Text style={{ fontWeight: "700" }}>{data.transaction_name}</Text>
        <Text style={{ color: colors.secondary, marginTop: 5, fontSize: 14 }}>
          {dayjs(data.date_of_trans).format("llll")}
        </Text>
      </View>
      <View
        style={{
          width: "25%",
          padding: 10,
        }}
      >
        {data.type === "in" ? (
          <Text style={{ color: colors.green, fontWeight: "700" }}>
            +{data.credits}
          </Text>
        ) : (
          <Text style={{ color: colors.redish_2, fontWeight: "700" }}>
            -{data.credits}
          </Text>
        )}
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

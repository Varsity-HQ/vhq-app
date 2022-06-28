import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";

function OnlineIndicator({ style, online }) {
  return (
    <View style={[styles.container, style]}>
      <View style={[online ? styles.online : styles.offline]} />
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 14,
          }}
        >
          {online ? "Online" : "Offline"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  online: {
    height: 12,
    width: 12,
    backgroundColor: colors.green,
    borderRadius: 100,
    marginRight: 5,
  },
  offline: {
    height: 12,
    width: 12,
    backgroundColor: colors.v_st_bg_4,
    borderRadius: 100,
    marginRight: 5,
    borderWidth: 1,
    borderColor: colors.white,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default OnlineIndicator;

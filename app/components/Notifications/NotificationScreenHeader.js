import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../components/AppText";
import colors from "../../config/colors";
import { normalizeText } from "../../util/responsivePx";

function NotificationScreenHeader({ loading }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text allowFontScaling={false} style={styles.vhq_title}>
          Notifications
        </Text>
      </View>
      <View style={styles.pContainer}>
        <View
          style={{
            backgroundColor: colors.darkish3,
            padding: 10,
            borderRadius: 10,
            width: "30%",
          }}
        >
          <Text style={{ fontWeight: "700" }}>
            {loading ? "Loading" : "Newer"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pContainer: {
    padding: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: normalizeText(16),
    overflow: "hidden",
    paddingHorizontal: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 3,
  },
  vhq_title: {
    fontSize: normalizeText(33),
    fontWeight: "800",
    color: colors.white,
    fontFamily: "Lobster-Regular",
  },
  container: {},
});

export default NotificationScreenHeader;

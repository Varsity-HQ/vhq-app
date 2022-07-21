import React from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Text from "../components/AppText";
import colors from "../config/colors";

function RoundedWrappedText({ icon, text }) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={[
          styles.rwt,
          {
            backgroundColor: colors.v_st_bg_3,
          },
        ]}
      >
        {icon}
        <Text style={styles.rwt_text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rwt: {
    borderRadius: 100,
    backgroundColor: colors.secondary_2,
    paddingHorizontal: 15,
    paddingVertical: 4,
    marginRight: 5,
    borderWidth: 1,
    borderColor: colors.dark_opacity_2,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rwt_text: {
    fontWeight: "600",
    fontSize: RFValue(12),
    color: colors.lighish2,
  },
});

export default RoundedWrappedText;

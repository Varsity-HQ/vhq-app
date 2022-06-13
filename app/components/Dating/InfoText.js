import React from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import Text from "../AppText";

const InfoTextArea = ({ header, text }) => (
  <View
    style={{
      marginBottom: 12,
    }}
  >
    <Text
      style={{
        fontSize: RFValue(12),
        fontWeight: "700",
        marginBottom: 10,
        color: colors.secondary_2,
      }}
    >
      {header}
    </Text>
    <View style={styles.c_area}>
      <Text style={{ color: colors.secondary }}>{text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  c_area: {
    backgroundColor: colors.dark_opacity_2,
    padding: 15,
    borderRadius: 15,
  },
});

export default InfoTextArea;

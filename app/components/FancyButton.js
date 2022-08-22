import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";
import Text from "./AppText";

function FancyButton({
  icon = <FontAwesome name="star" color={colors.secondary} size={25} />,
  onPress,
  header,
  subText,
  style,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View>
        <View
          style={[
            styles.row,
            {
              paddingBottom: 5,
            },
          ]}
        >
          {icon}
          <Text style={styles.header}>{header}</Text>
        </View>
        <View>
          <Text style={styles.subText}>{subText}</Text>
        </View>
      </View>
      <View>
        <Ionicons name="chevron-forward" size={30} color={colors.secondary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  subText: {
    color: colors.secondary,
  },
  header: {
    fontSize: RFValue(13),
    fontWeight: "700",
    marginBottom: 2,
    marginLeft: 6,
  },
  container: {
    marginBottom: 20,
    backgroundColor: colors.dark_opacity_2,
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default FancyButton;

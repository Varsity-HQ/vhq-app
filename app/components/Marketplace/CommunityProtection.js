import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import Button from "../Button";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../../config/colors";
import { RFValue } from "react-native-responsive-fontsize";

function CommunityProtection(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FontAwesome size={18} name="flag" color={colors.secondary} />
        <Text style={styles.heading}>Help keep the community safer</Text>
      </View>
      <View
        style={{
          marginVertical: 10,
        }}
      >
        <Text style={styles.text}>
          Report any suspicious or fraudulent listings to make sure VarsityHQ
          remains safe
        </Text>
      </View>
      <View>
        <Button type={6} title="REPORT AD" />
        <Button type={5} title="TERMS OF USE" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: colors.secondary,
    marginLeft: 10,
    fontSize: RFValue(14),
    fontWeight: "700",
  },
  container: {
    padding: 10,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CommunityProtection;

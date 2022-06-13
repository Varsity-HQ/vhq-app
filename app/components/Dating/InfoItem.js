import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";

const InfoItem = ({ name, text }) => {
  return (
    <View style={styles.info_item}>
      <View></View>
      <View>
        <Text style={{ color: colors.lighish2 }}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info_item: {
    backgroundColor: colors.secondary_2,
    paddingHorizontal: 12,
    marginRight: 5,
    borderRadius: 30,
    paddingVertical: 8,
    marginBottom: 8,
  },
});

export default InfoItem;

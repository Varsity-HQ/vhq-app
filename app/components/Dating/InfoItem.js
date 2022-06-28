import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";

const InfoItem = ({ name, text }) => {
  return (
    <View style={styles.info_item}>
      <View>
        <ItemIcon
          style={{
            marginRight: 5,
          }}
          name={name}
        />
      </View>
      <View>
        <Text style={{ color: colors.lighish2 }}>{text}</Text>
      </View>
    </View>
  );
};

const ItemIcon = ({ name, style }) => {
  switch (name) {
    case "s_orientation":
      return (
        <FontAwesome
          name="intersex"
          size={16}
          style={style}
          color={colors.secondary}
        />
      );
    case "star_sign":
      return (
        <MaterialCommunityIcons
          name="star-three-points"
          size={18}
          style={style}
          color={colors.secondary}
        />
      );
    case "university":
      return (
        <FontAwesome5
          name="university"
          size={16}
          style={style}
          color={colors.secondary}
        />
      );
    case "age":
      return (
        <FontAwesome
          name="birthday-cake"
          size={16}
          style={style}
          color={colors.secondary}
        />
      );
    case "gender":
      return (
        <MaterialCommunityIcons
          name="gender-male-female"
          size={20}
          style={style}
          color={colors.secondary}
        />
      );
    default:
      return null;
  }
  return null;
};

const styles = StyleSheet.create({
  info_item: {
    backgroundColor: colors.secondary_2,
    paddingHorizontal: 12,
    marginRight: 5,
    borderRadius: 30,
    paddingVertical: 8,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default InfoItem;

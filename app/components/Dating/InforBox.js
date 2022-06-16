import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import InfoItem from "./InfoItem";
import Text from "../AppText";
import { RFValue } from "react-native-responsive-fontsize";
import Button from "../Button";

const InforBox = ({ header, actionButton }) => {
  return (
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
      <View style={[styles.c_area]}>
        <View
          style={[
            styles.c_i_area,
            {
              paddingBottom: actionButton ? 0 : 7,
            },
          ]}
        >
          <InfoItem name="gender" text="Male" />
          <InfoItem name="star_sign" text="Sagittarius" />
          <InfoItem name="age" text="18" />
          <InfoItem name="s_orientation" text="Straight" />
          <InfoItem name="university" text="UJ" />
        </View>
        <View style={{ flexDirection: "row" }}>
          {actionButton && (
            <Button
              onPress={actionButton}
              style={styles.action_button}
              textStyle={{
                color: colors.dark,
              }}
              type={3}
              title="Edit"
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  c_area: {
    backgroundColor: colors.dark_opacity_2,
    padding: 15,
    borderRadius: 15,
  },
  c_i_area: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  action_button: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 8,
  },
});

export default InforBox;

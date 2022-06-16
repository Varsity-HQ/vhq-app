import React from "react";
import { View, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import colors from "../../config/colors";
import Text from "../AppText";
import Button from "../Button";

const InfoTextArea = ({ header, text, actionButton = null }) => (
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
    <View
      style={[
        styles.c_area,
        {
          paddingBottom: actionButton ? 5 : 15,
        },
      ]}
    >
      <Text style={{ color: colors.secondary }}>{text}</Text>
      <View
        style={{
          flexDirection: "row",
        }}
      >
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

const styles = StyleSheet.create({
  c_area: {
    backgroundColor: colors.dark_opacity_2,
    padding: 15,
    borderRadius: 15,
  },
  action_button: {
    backgroundColor: colors.secondary,
    borderRadius: 15,
    paddingHorizontal: 30,
    paddingVertical: 8,
  },
});

export default InfoTextArea;

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import Text from "./AppText";

function ThreeValueSwitcher({
  values = [],
  selectedValue = null,
  handleSelectedValue,
  containerStyle,
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {values.map((x, index) => (
        <Value
          key={index}
          value={x}
          handleSelectedValue={() => handleSelectedValue(x.value)}
          active={selectedValue === x.value ? true : false}
          pos={index + 1}
        />
      ))}
    </View>
  );
}

function Value({ active, pos = 1, value, handleSelectedValue }) {
  return (
    <TouchableOpacity
      onPress={handleSelectedValue}
      style={[
        styles.valueContainer,
        active && styles.active,
        pos === 1 && {
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        },
        pos === 3 && {
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        },
      ]}
    >
      <Text
        style={{
          color: active ? colors.primary : colors.secondary,
          fontWeight: active ? "700" : "500",
        }}
      >
        {value.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  active: {
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 10,
  },
  valueContainer: {
    paddingVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // paddingHorizontal: 20,
  },
  container: {
    borderWidth: 1,
    borderColor: colors.secondary_2,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "",
    width: "100%",
    overflow: "hidden",
  },
});

export default ThreeValueSwitcher;

import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../config/colors";

function BarStepperIndicator({ step = 1, style }) {
  return (
    <View style={[styles.container, style]}>
      <Step activeOn={1} step={step} />
      <Step activeOn={2} step={step} />
      <Step activeOn={3} step={step} />
      <Step activeOn={4} step={step} />
    </View>
  );
}

const Step = ({ activeOn = 0, step }) => {
  return (
    <View
      style={[
        styles.step,
        activeOn <= step && {
          backgroundColor: colors.primary,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  step: {
    width: "25%",
    height: "100%",
    backgroundColor: colors.grayer,
    marginHorizontal: 2,
  },
  container: {
    borderRadius: 100,
    width: "100%",
    borderWidth: 0,
    borderColor: colors.primary,
    height: 10,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
  },
});

export default BarStepperIndicator;

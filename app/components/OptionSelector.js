import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "./Button";
import colors from "../config/colors";
import { RFValue } from "react-native-responsive-fontsize";

function OptionSelector({ active, options = [], onChange }) {
  const handleChange = (i) => {
    if (active === i) return;
    onChange(i);
  };

  return (
    <View style={styles.container}>
      {options.map((x) => (
        <Button
          onPress={() => handleChange(x.value)}
          key={x.value}
          type={active === x.value ? 4 : 3}
          title={x.title}
          style={{
            borderColor: colors.primary,
            borderWidth: 1,
          }}
          textStyle={{
            fontSize: RFValue(16),
            fontWeight: "700",
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default OptionSelector;

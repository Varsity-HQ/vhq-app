import React, { useState } from "react";
import { Text } from "react-native";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { color } from "react-native-elements/dist/helpers";
import colors from "../../config/colors";

function DropDown({ items, value, setValue, style, ...props }) {
  const [open, setOpen] = useState(false);
  //   const [value, setValue] = useState(null);

  return (
    <View style={[styles.container, style]}>
      <DropDownPicker
        {...props}
        open={open}
        value={value}
        dropDownDirection="BOTTOM"
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        // setItems={setItems}
        style={styles.dropdown}
        textStyle={styles.textStyle}
        labelStyle={styles.labelStyle}
        dropDownContainerStyle={styles.dropDownContainerStyle}
        searchTextInputStyle={styles.textStyle}
        searchPlaceholderTextColor={colors.secondary}
        // ={styles.arrowIconStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  arrowIconStyle: {
    color: colors.white,
  },
  tickIconStyle: {
    color: colors.white,
  },
  dropDownContainerStyle: {
    backgroundColor: colors.darkish2,
  },
  textStyle: {
    color: colors.white,
  },
  labelStyle: {
    color: colors.white,
  },
  container: {
    zIndex: 1,
  },
  containerStyle: {
    backgroundColor: colors.dark,
  },
  dropdown: {
    backgroundColor: colors.dark,
    borderColor: "#2f6286",
    borderWidth: 1,
    // display: "none",
    borderLeftColor: colors.primary,
    borderLeftWidth: 4,
    borderRightColor: colors.primary,
    borderRightWidth: 4,
  },
});

export default DropDown;

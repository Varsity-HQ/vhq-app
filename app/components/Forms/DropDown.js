import React, { useState } from "react";
import { Text, Platform } from "react-native";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import colors from "../../config/colors";
import { Picker } from "@react-native-picker/picker";
import ModalPicker from "../ModalPicker";

function DropDown({ items, value, setValue, style, ...props }) {
  const [open, setOpen] = useState(false);
  const [lang, setSelectedLanguage] = useState("false");
  //   const [value, setValue] = useState(null);

  const handleSelection = (selected, type) => {
    if (type === "modal") {
      return setValue(selected);
    }

    if (type === "dropdown") {
      return setValue(selected());
    }

    setOpen(false);
  };

  if (Platform.OS === "android") {
    return (
      <View style={style}>
        <ModalPicker
          onSelectItem={(x) => handleSelection(x, "modal")}
          headerText="Select Universites"
          items={items}
          value={value}
          placeholder={props.placeholder}
          input_style={styles.dropdown}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <DropDownPicker
        {...props}
        open={open}
        value={value}
        dropDownDirection="BOTTOM"
        items={items}
        setOpen={setOpen}
        setValue={(callback) => handleSelection(callback, "dropdown")}
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

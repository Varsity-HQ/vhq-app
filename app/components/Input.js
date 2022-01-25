import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

function AppTextInput({
  type,
  style,
  icon,
  cstyles,
  onChangeText,
  password,
  passShow,
  show,
  width = "100%",
  value,
  ...otherProps
}) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const handleDateConfirm = (e) => {
    setModalVisible(false);
    const date1 = new Date(e);
    setDate(e);
    onChangeText && onChangeText(date1.toISOString());
  };

  if (type === "datetime") {
    return (
      <>
        <DateTimePickerModal
          date={date}
          isVisible={modalVisible}
          mode="datetime"
          onConfirm={handleDateConfirm}
          onCancel={() => setModalVisible(false)}
        />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.inputbox_btn}
        >
          <View style={styles.btn_inner} />
          <TextInput
            value={dayjs(value ? value : date).format("LLL")}
            selectionColor={colors.primary}
            placeholderTextColor={colors.secondary}
            style={[styles.TextInput, style]}
            {...otherProps}
          />
        </TouchableOpacity>
      </>
    );
  }

  if (type === 2) {
    return (
      <TextInput
        value={value}
        selectionColor={colors.primary}
        onChangeText={onChangeText}
        placeholderTextColor={colors.secondary}
        style={[styles.TextInput, style]}
        {...otherProps}
      />
    );
  }

  return (
    <View style={[styles.container, { width: width }, cstyles]}>
      {icon && (
        <FontAwesome
          //   name={icon}
          name={icon}
          size={16}
          color={colors.secondary}
          style={styles.icon}
        />
      )}
      <TextInput
        selectionColor={colors.primary}
        onChangeText={onChangeText}
        placeholderTextColor={colors.grayer}
        style={styles.text}
        value={value}
        {...otherProps}
      />
      {password && (
        <TouchableOpacity onPress={passShow}>
          <FontAwesome
            //   name={icon}
            name={show ? "eye-slash" : "eye"}
            size={18}
            color={colors.secondary}
            style={styles.eye_icon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  btn_inner: {
    backgroundColor: "red",
    zIndex: 1,
    height: "100%",
    width: "100%",
    opacity: 0,
    position: "absolute",
  },
  TextInput: {
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderRightWidth: 4,
    borderRightColor: colors.primary,
    borderColor: "#2f6286",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.white,
  },
  text: {
    width: "100%",
    color: colors.white,
    flex: 1,
    // borderColor: "red",
    // borderWidth: 1,
    height: "100%",
  },
  container: {
    backgroundColor: colors.dark_opacity_2,
    borderColor: colors.lighish,
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 15,
    height: 45,
    alignItems: "center",
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },

  eye_icon: {
    marginRight: 0,
    marginLeft: 5,
    // borderWidth: 1,
    // borderColor: "red",
    padding: 10,

    // height: "100%",
    // alignSelf: "auto",
  },
});

export default AppTextInput;

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Screen from "../components/Screen";
import AppButton from "./Button";
import Text from "./AppText";
import { Colors } from "react-native/Libraries/NewAppScreen";
import colors from "../config/colors";
import Header from "./headers/header3";
import { SafeAreaView } from "react-native-safe-area-context";

function PickerItemComponent({ item, selected, label, onPress }) {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.value)}
      style={styles.picker_item}
    >
      <View style={styles.select_dot}>
        {selected && <View style={styles.selected_dot}></View>}
      </View>
      <Text style={{ flex: 1 }}>{label}</Text>
    </TouchableOpacity>
  );
}

function ModalPicker({
  onSelectItem,
  placeholder,
  items,
  input_style,
  value,
  headerText,
  content,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {content ? (
          content
        ) : (
          <View style={[input_style, styles.fake_modal_textinput]}>
            <Text
              style={{
                color: colors.secondary,
              }}
            >
              {value ? value : placeholder}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      <Modal
        // statusBarTranslucent
        transparent
        visible={modalVisible}
        animationType="slide"
      >
        <Screen style={styles.modal_container}>
          {headerText && (
            <Header
              backPress={() => setModalVisible(false)}
              title={headerText}
            />
          )}
          <FlatList
            initialNumToRender={20}
            style={{ marginTop: 20 }}
            data={items}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                selected={item.value === value}
                onPress={() => {
                  onSelectItem(item.value);
                  setModalVisible(false);
                }}
              />
            )}
          />
          <AppButton
            style={{ marginHorizontal: 20, marginHorizontal: 10 }}
            type={4}
            title="Close"
            onPress={() => setModalVisible(false)}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selected_dot: {
    height: 15,
    width: 15,
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
  select_dot: {
    height: 25,
    width: 25,
    borderColor: colors.secondary_2,
    borderWidth: 2,
    borderRadius: 100,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    zIndex: 1,
  },
  picker_item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modal_container: {
    // padding: 5,
    backgroundColor: colors.dark,
    flex: 1,
    paddingBottom: 20,
  },
  fake_modal_textinput: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 8,
  },
  container: {},
});

export default ModalPicker;

import React, { useState } from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Input from "../../components/Input";
import colors from "../../config/colors";
import { connect } from "react-redux";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const mapStateToProps = (state) => {
  return {
    dob: state.core.accData.dob,
  };
};

function UpdatebirthdayScreen({ loading, dob, navigation }) {
  const [date, setDate] = useState(new Date(dob));
  const [modalVisible, setModalVisible] = useState(true);

  const handleDateConfirm = (e) => {
    setDate(e);
    setModalVisible(false);
  };

  return (
    <>
      <Screen>
        <Header
          loading={loading}
          backPress={() => navigation.goBack()}
          backBtnText="Done"
          buttonText="Save"
          title="Birthday"
          // rightPress={saveYos}
        />
        <View style={styles.container}>
          <Text>When is your birthday</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.inputbox_btn}
          >
            <View style={styles.btn_inner} />
            <Input
              style={{ marginTop: 10 }}
              type={2}
              value={dayjs(date).format("LL")}
              editable={false}
              selectTextOnFocus={false}
              placeholder="Your birthday"
            />
          </TouchableOpacity>

          <DateTimePickerModal
            // textColor={colors.white}
            // backdropStyleIOS={colors.primary}
            date={date}
            isVisible={modalVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setModalVisible(false)}
          />

          <Text style={styles.note_txt}>
            <Text
              style={[
                styles.note_txt,
                {
                  fontWeight: "700",
                },
              ]}
            >
              NOTE
            </Text>{" "}
            : Your date birthday will not be displayed anywhere
          </Text>
        </View>
      </Screen>
    </>
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
  inputbox_btn: {
    // height: 140,
  },
  note_txt: {
    color: colors.secondary,
    marginTop: 20,
  },
  container: {
    padding: 10,
    marginTop: 10,
  },
});

export default connect(mapStateToProps, null)(UpdatebirthdayScreen);

import React, { useState } from "react";
import { View, StyleSheet, Modal, TouchableOpacity } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import ErrorMessage from "../../components/Forms/ErrorMessage";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Input from "../../components/Input";
import colors from "../../config/colors";
import { connect } from "react-redux";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { update_dob } from "../../store/actions/actions";
dayjs.extend(localizedFormat);

const mapStateToProps = (state) => {
  return {
    dob: state.core.accData.dob,
    loading: state.core.saving_dob_settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_dob: (date, age) => dispatch(update_dob(date, age)),
  };
};
//
function UpdatebirthdayScreen({ loading, dob, navigation, update_dob }) {
  //
  const [date, setDate] = useState(new Date(dob));
  const [age, setAge] = useState(0);
  const [ageError, setAgeError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  //
  const getDifferenceInDays = (date1, date2) => {
    const diffInMs = Math.abs(date2 - date1);
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  };
  //
  const handle_save_dob = () => {
    if (age <= 17) return;
    const years = Math.floor(getDifferenceInDays(date, new Date()) / 365);
    const dateAsISOStr = new Date(date).toISOString();
    let d = dateAsISOStr.split("T")[0];
    update_dob(d, years);
  };
  //
  const handleDateConfirm = (e) => {
    setModalVisible(false);
    console.log({ e: new Date(e).toDateString() });

    const date1 = new Date(e);
    const date2 = new Date();
    const years = Math.floor(getDifferenceInDays(date1, date2) / 365);

    if (years <= 17) {
      setAgeError(true);
      setDate(e);
      setAge(years);
    } else {
      setDate(e);
      setAgeError(false);
      setAge(years);
    }
  };
  //
  return (
    <>
      <Screen>
        <Header
          loading={loading}
          backPress={() => navigation.goBack()}
          backBtnText="Done"
          buttonText="Save"
          title="Birthday"
          rightPress={() => handle_save_dob()}
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
            <ErrorMessage
              visible={ageError}
              style={{ marginTop: 10 }}
              error={"Your age can't be less than 17 years old"}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdatebirthdayScreen);

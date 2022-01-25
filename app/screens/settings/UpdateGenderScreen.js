import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../components/AppText";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import DropDown from "../../components/Forms/DropDown";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { update_gender } from "../../store/actions/actions";

const gender_list = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
  {
    value: "Trans/..",
    label: "Trans/..",
  },
  {
    value: "Rather not say",
    label: "Rather not say",
  },
];

const mapStateToProps = (state) => {
  return {
    gender: state.core.accData.gender,
    loading: state.core.saving_gender_settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_gender: (gender) => dispatch(update_gender(gender)),
  };
};

function UpdateGenderScreen({ gender, update_gender, loading, navigation }) {
  const [l_gender, set_gender] = useState(gender);

  const saveGender = () => {
    update_gender(l_gender);
  };

  return (
    <Screen>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backBtnText="Done"
        buttonText="Save"
        title="Gender"
        rightPress={saveGender}
      />
      <View style={styles.container}>
        <Text>What describes your gender</Text>
        <DropDown
          style={styles.dropdown}
          value={l_gender}
          setValue={(e) => set_gender(e)}
          items={gender_list}
          placeholder="Select your gender"
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
          : This information will not be shown anywhere
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  note_txt: {
    color: colors.secondary,
    marginTop: 20,
  },
  dropdown: {
    marginTop: 10,
  },
  container: {
    padding: 10,
    marginTop: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGenderScreen);

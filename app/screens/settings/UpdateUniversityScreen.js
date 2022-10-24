import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../components/AppText";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import DropDown from "../../components/Forms/DropDown";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { update_university } from "../../store/actions/actions";

import UnisAndColleges from "../../util/UnisAndColleges.json";

const universities = [];

UnisAndColleges.forEach((x) => {
  universities.push({
    value: x.name,
    label: x.name,
  });
});

const mapStateToProps = (state) => {
  return {
    university: state.core.accData.university,
    loading: state.core.saving_university_settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_university: (uni) => dispatch(update_university(uni)),
  };
};

function UpdateUniversityScreen({
  university,
  update_university,
  loading,
  navigation,
}) {
  const [l_uni, set_uni] = useState(university);

  const saveUni = () => {
    update_university(l_uni);
    navigation.goBack();
  };

  return (
    <Screen>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backBtnText="Done"
        buttonText="Save"
        title="University"
        rightPress={saveUni}
      />
      <View style={styles.container}>
        <Text>At which university are you currently studying ?</Text>
        <DropDown
          searchable
          searchPlaceholder="Search your university or college.."
          style={styles.dropdown}
          value={l_uni}
          setValue={(e) => set_uni(e)}
          items={universities}
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
          : You can contact support if you can't find your university and it
          will be added
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateUniversityScreen);

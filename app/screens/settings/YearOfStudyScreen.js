import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../components/AppText";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import DropDown from "../../components/Forms/DropDown";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { update_yearofstudy } from "../../store/actions/actions";

const uniYears = [
  {
    value: "1st",
    label: "1st year",
  },
  {
    value: "2nd",
    label: "2nd year",
  },
  {
    value: "3rd",
    label: "3rd year",
  },
  {
    value: "4th",
    label: "4th year",
  },
  {
    value: "postgraduates",
    label: "Postgraduate",
  },
];

const mapStateToProps = (state) => {
  return {
    yearOfStudy: state.core.accData.yearOfStudy,
    loading: state.core.saving_yos_settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_yearofstudy: (yof) => dispatch(update_yearofstudy(yof)),
  };
};

function YearOfStudyScreen({
  yearOfStudy,
  update_yearofstudy,
  loading,
  navigation,
}) {
  const [yof, set_yof] = useState(yearOfStudy);

  const saveYos = () => {
    update_yearofstudy(yof);
  };

  return (
    <Screen>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backBtnText="Done"
        buttonText="Save"
        title="Year of Study"
        rightPress={saveYos}
      />
      <View style={styles.container}>
        <Text>What's your current year of study</Text>
        <DropDown
          yearOfStudy
          style={styles.dropdown}
          value={yof}
          setValue={(e) => set_yof(e)}
          items={uniYears}
          placeholder="Current year of study"
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
          : Your year of study will be displayed on your profile
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

export default connect(mapStateToProps, mapDispatchToProps)(YearOfStudyScreen);

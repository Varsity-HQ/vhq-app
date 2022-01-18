import React, { useState } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Screen from "../components/Screen";
import Header from "../components/headers/header1";
import AppButton from "../components/Button";
import Text from "../components/AppText";
import DropDown from "../components/Forms/DropDown";
import uniList from "../util/UnisAndColleges.json";
import colors from "../config/colors";
import { connect } from "react-redux";

import {
  set_university,
  set_yearofstudy,
  set_overlay_state,
} from "../store/actions/actions";
import axios from "axios";

import ErrorMessage from "../components/Forms/ErrorMessage";

let universities = [];

uniList.forEach((x) => {
  universities.push({ value: x.name, label: x.name });
});

let uniYears = [
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
    university: state.core.accData.university,
    yearOfStudy: state.core.accData.yearOfStudy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_university: (uni) => dispatch(set_university(uni)),
    set_yearofstudy: (yos) => dispatch(set_yearofstudy(yos)),
    set_overlay_state: (state) => dispatch(set_overlay_state(state)),
  };
};

function SetupUniversity({
  navigation,
  university,
  yearOfStudy,
  set_university,
  set_yearofstudy,
  set_overlay_state,
}) {
  const [loading, set_loading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleUpdate = () => {
    set_overlay_state(true);
    if (university === "") {
      set_loading(false);
      return setErrors({
        university: "Please select your university before you continue",
      });
    }

    set_overlay_state(true);
    set_loading(true);
    setErrors({});

    axios
      .post("/account/update/university-n-yearofstudy", {
        university: university,
        yearOfStudy: yearOfStudy,
      })
      .then((data) => {
        console.log(data.data);
        set_overlay_state(false);
        set_loading(false);

        navigation.navigate("SetupPersonalInformation");
      })
      .catch((err) => {
        console.log(err);
        set_overlay_state(false);
        set_loading(false);
        setErrors({ error: "We enountered an error, please try again" });
      });
  };

  return (
    <Screen style={styles.container}>
      <Header title="Education (1/1)" />

      <View style={styles.content}>
        <Text>
          Which university or college are you currently doing your studies
        </Text>

        <ErrorMessage error={errors.university} visible={errors.university} />
        <DropDown
          id="1"
          value={university}
          zIndex={2}
          setValue={(u) => set_university(u)}
          searchPlaceholder="Search University or college"
          placeholder="Select your university or college"
          // searchable

          items={universities}
          style={{ paddingBottom: 20, paddingTop: 10, zIndex: 2 }}
        />

        <Text>Year of current study</Text>
        <DropDown
          id="2"
          setValue={(y) => set_yearofstudy(y)}
          value={yearOfStudy}
          placeholder="Select year of study"
          items={uniYears}
          style={{ paddingBottom: 20, paddingTop: 10 }}
        />
        <Text style={{ color: colors.secondary }}>
          <Text style={{ fontWeight: "700", color: colors.secondary }}>
            Note :{" "}
          </Text>
          Contact support if you can't find your year of study or univesrity
        </Text>

        <AppButton
          loading={loading}
          onPress={handleUpdate}
          type={1}
          style={{ marginTop: 20 }}
          title={loading ? "Loading.." : "Save & conitinue"}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupUniversity);

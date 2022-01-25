import React, { useState } from "react";
import { View, StyleSheet, Switch } from "react-native";
import Text from "../../components/AppText";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import DropDown from "../../components/Forms/DropDown";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { updates_gender_pref } from "../../store/actions/actions";

const so_list = [
  {
    value: "Male",
    label: "Males",
  },
  {
    value: "Female",
    label: "Females",
  },
];

const mapStateToProps = (state) => {
  return {
    s_target: state.core.accData.s_target,
    show_s_target: state.core.accData.show_s_target,
    loading: state.core.saving_s_target_settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updates_gender_pref: (st, show) => dispatch(updates_gender_pref(st, show)),
  };
};

function UpdateSexualOrientationScreen({
  s_target,
  show_s_target,
  updates_gender_pref,
  loading,
  navigation,
}) {
  const [l_st, set_st] = useState(s_target);
  const [isEnabled, setIsEnabled] = useState(show_s_target);

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };

  const save_st = () => {
    updates_gender_pref(l_st, isEnabled);
  };

  return (
    <Screen>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backBtnText="Done"
        buttonText="Save"
        title="interested in"
        rightPress={save_st}
      />
      <View style={styles.container}>
        <Text>I'm intrested in : </Text>
        <DropDown
          style={styles.dropdown}
          value={l_st}
          setValue={(e) => set_st(e)}
          items={so_list}
          placeholder="Sexual orientation"
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
          : This information will be kept private by default
        </Text>
        <View style={styles.divider} />
        <View style={styles.switcher_container}>
          <Text style={{ flex: 1 }}>
            Show this on my profile ({isEnabled ? "Yes" : "No"})
          </Text>
          <Switch
            style={styles.switcher}
            trackColor={{ false: colors.secondary, true: colors.primary }}
            ios_backgroundColor={colors.dark_opacity_2}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  switcher: {
    justifyContent: "flex-end",
  },
  switcher_container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  divider: {
    height: 2,
    width: "100%",
    backgroundColor: colors.darkish2,
    marginVertical: 20,
  },
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
)(UpdateSexualOrientationScreen);

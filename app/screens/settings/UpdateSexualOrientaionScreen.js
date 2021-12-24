import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../components/AppText";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import DropDown from "../../components/Forms/DropDown";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { update_sexual_orientation } from "../../store/actions/actions";

const so_list = [
  {
    value: "Straight",
    label: "Straight",
  },
  {
    value: "Gay",
    label: "Gay",
  },
  {
    value: "Lesbian",
    label: "Lesbian",
  },
  {
    value: "Bisexual",
    label: "Bisexual",
  },
];

const mapStateToProps = (state) => {
  return {
    s_orientation: state.core.accData.s_orientation,
    loading: state.core.saving_so_settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_sexual_orientation: (so) => dispatch(update_sexual_orientation(so)),
  };
};

function UpdateSexualOrientationScreen({
  s_orientation,
  update_sexual_orientation,
  loading,
  navigation,
}) {
  const [l_so, set_so] = useState(s_orientation);

  const save_so = () => {
    update_sexual_orientation(l_so);
  };

  return (
    <Screen>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backBtnText="Done"
        buttonText="Save"
        title="Sexual Orientation"
        rightPress={save_so}
      />
      <View style={styles.container}>
        <Text>What's your sexual orientation ?</Text>
        <DropDown
          style={styles.dropdown}
          value={l_so}
          setValue={(e) => set_so(e())}
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
        <View>
          <Text>Show sexual orientation</Text>
          <View>
            <Check></Check>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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

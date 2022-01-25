import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Text from "../../components/AppText";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import DropDown from "../../components/Forms/DropDown";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { update_relationship_status } from "../../store/actions/actions";

const rs_list = [
  {
    value: "single",
    label: "Single",
  },
  {
    value: "taken",
    label: "Taken",
  },
  {
    value: "searching",
    label: "Searching",
  },
  {
    value: "entanglement",
    label: "Entanglement",
  },
];

const mapStateToProps = (state) => {
  return {
    relationshipStatus: state.core.accData.relationshipStatus,
    loading: state.core.saving_rs_settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update_relationship_status: (rs) =>
      dispatch(update_relationship_status(rs)),
  };
};

function UpdateRelationshipStatusScreen({
  relationshipStatus,
  update_relationship_status,
  loading,
  navigation,
}) {
  const [l_rs, set_rs] = useState(relationshipStatus);

  const save_rs = () => {
    update_relationship_status(l_rs);
  };

  return (
    <Screen>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backBtnText="Done"
        buttonText="Save"
        title="Relationship status"
        rightPress={save_rs}
      />
      <View style={styles.container}>
        <Text>What describes your current relationship status ?</Text>
        <DropDown
          style={styles.dropdown}
          value={l_rs}
          setValue={(e) => set_rs(e)}
          items={rs_list}
          placeholder="Relationship status"
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
          : Accounts with relationship status set to{" "}
          <Text
            style={[
              styles.note_txt,
              {
                fontWeight: "700",
                color: colors.primary,
              },
            ]}
          >
            Searching
          </Text>{" "}
          will be able to discover potential matches on the discover page
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
)(UpdateRelationshipStatusScreen);

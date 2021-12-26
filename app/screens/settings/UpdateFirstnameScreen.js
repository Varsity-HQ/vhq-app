import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import Input from "../../components/Input";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { update_firstname } from "../../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    firstname: state.core.accData.firstname,
    loading: state.core.saving_firstname_settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (d) => dispatch(update_firstname(d)),
  };
};

function UpdateFirstnameScreen({ navigation, update, loading, firstname }) {
  const [value, setValue] = useState(firstname);

  return (
    <Screen>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backIcon
        buttonText="Save"
        title="First name"
        rightPress={() => update(value)}
      />
      <View style={styles.container}>
        <Input
          type={2}
          value={value}
          onChangeText={(e) => setValue(e)}
          style={{ marginTop: 10 }}
          placeholder="First name"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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
)(UpdateFirstnameScreen);

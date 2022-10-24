import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import Input from "../../components/Input";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { update_surname } from "../../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    surname: state.core.accData.surname,
    loading: state.core.saving_surname_settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (d) => dispatch(update_surname(d)),
  };
};

function UpdateSurnameScreen({ navigation, update, loading, surname }) {
  const [value, setValue] = useState(surname);

  return (
    <Screen>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backIcon
        buttonText="Save"
        title="Surname"
        rightPress={() => {
          update(value);
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <Input
          type={2}
          value={value}
          onChangeText={(e) => setValue(e)}
          style={{ marginTop: 10 }}
          placeholder="Surname"
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
)(UpdateSurnameScreen);

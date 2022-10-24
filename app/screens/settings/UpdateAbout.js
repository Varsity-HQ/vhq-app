import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import Input from "../../components/Input";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { update_about } from "../../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    about: state.core.accData.about,
    loading: state.core.saving_about_settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (d) => dispatch(update_about(d)),
  };
};

function UpdateAboutScreen({ navigation, update, loading, about }) {
  const [value, setValue] = useState(about);

  return (
    <Screen>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backIcon
        buttonText="Save"
        title="Bio"
        rightPress={() => {
          update(value);
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <Input
          type={2}
          multiline
          maxLength={150}
          value={value}
          onChangeText={(e) => setValue(e)}
          style={{ marginTop: 10, minHeight: 100 }}
          placeholder="Type your bio or about"
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAboutScreen);

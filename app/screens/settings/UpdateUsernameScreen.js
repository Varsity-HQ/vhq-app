import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import Text from "../../components/AppText";
import Input from "../../components/Input";
import colors from "../../config/colors";
import { connect } from "react-redux";
import { update_username } from "../../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    username: state.core.accData.username,
    loading: state.core.saving_username_settings,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    update: (d) => dispatch(update_username(d)),
  };
};

function UpdateUsernameScreen({ navigation, update, loading, username }) {
  const [value, setValue] = useState(username);

  return (
    <Screen>
      <Header
        loading={loading}
        backPress={() => navigation.goBack()}
        backIcon
        buttonText="Save"
        title="Username"
        rightPress={() => {
          update(value);
          navigation.goBack();
        }}
      />
      <View style={styles.container}>
        <Input
          editable={false}
          focusable={false}
          type={2}
          maxLength={18}
          value={value}
          onChangeText={(e) => setValue(e)}
          style={{ marginTop: 10 }}
          placeholder="Username"
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
)(UpdateUsernameScreen);

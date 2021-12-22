import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import IconMenuItem from "../../components/Settings/IconMenuItem";
import Button from "../../components/Button";
import {
  PREFERENCES,
  UPDATE_DEGREE,
  YEAR_OF_STUDY,
} from "../../navigation/routes";

import Text from "../../components/AppText";
import colors from "../../config/colors";
import { logOutUser } from "../../store/actions/actions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(logOutUser()),
  };
};

function ProfileSettingsScreen({ navigation, logOutUser }) {
  const signout = () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to sign out ?. You will need to sign in again to use this app",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Sign out",
          onPress: logOutUser,
        },
      ],
    );
  };

  return (
    <Screen scroll style={styles.container}>
      <Header backPress={() => navigation.goBack()} backIcon title="Settings" />
      <IconMenuItem
        onPress={() => navigation.navigate(PREFERENCES)}
        title="Preferences"
        desc="Set your basic and member preferences"
      />
      <IconMenuItem
        onPress={() => navigation.navigate(UPDATE_DEGREE)}
        title="My course"
        desc="Set the degree or course that you're currently studying"
      />
      <IconMenuItem
        onPress={() => navigation.navigate(YEAR_OF_STUDY)}
        title="Year of study"
        desc="Change or update your year of study"
      />
      <View>
        <Button
          onPress={signout}
          style={styles.lo_btn}
          type={8}
          title="Sign out"
        />
      </View>
      <View>
        <Text style={styles.vhq_text}>Ⓒ Varsity Headquarters</Text>
        <Text style={styles.vhq_text2}>All rights reserved</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  vhq_text2: {
    alignSelf: "center",
    color: colors.secondary,
    fontSize: 14,
  },
  vhq_text: {
    alignSelf: "center",
    marginTop: 40,
    color: colors.secondary,
  },
  lo_btn: {
    borderRadius: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  container: {},
});

export default connect(null, mapDispatchToProps)(ProfileSettingsScreen);

import React from "react";
import { View, StyleSheet, Alert } from "react-native";
import Header from "../../components/headers/header3";
import Screen from "../../components/Screen";
import IconMenuItem from "../../components/Settings/IconMenuItem";
import Button from "../../components/Button";
import {
  ABOUT_PAGE,
  PREFERENCES,
  UPDATE_DEGREE,
  YEAR_OF_STUDY,
} from "../../navigation/routes";
import * as WebBrowser from "expo-web-browser";
import Text from "../../components/AppText";
import colors from "../../config/colors";
import { logOutUser, deleteUserAccount } from "../../store/actions/actions";
import { connect } from "react-redux";

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUser: () => dispatch(logOutUser()),
    deleteUserAccount: () => dispatch(deleteUserAccount()),
  };
};

function ProfileSettingsScreen({ navigation, logOutUser, deleteUserAccount }) {
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

  const deleteAccount = () => {
    Alert.alert(
      "Delete account ?",
      "Are you sure you want to delete account ?. All your data on VarsityHQ will be lost and forgotten in our servers.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Delete",
          onPress: deleteUserAccount,
        },
      ],
    );
  };

  const handleOpenWebPage = async (link) => {
    try {
      let result = await WebBrowser.openBrowserAsync(link);
      setResult(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen scroll style={styles.container}>
      <Header
        bgActive
        backPress={() => navigation.goBack()}
        backIcon
        title="Settings"
      />
      <View style={{ backgroundColor: colors.darkish }}>
        <IconMenuItem
          icon="settings-outline"
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
      </View>
      <View style={{ backgroundColor: colors.darkish, marginTop: 20 }}>
        <IconMenuItem
          onPress={() => navigation.navigate(ABOUT_PAGE)}
          title="About"
          desc=""
          icon={false}
          titleStyle={styles.titleStyle}
          style={styles.button_style}
        />
        <View style={styles.border} />
        <IconMenuItem
          onPress={() => handleOpenWebPage("https://varsityhq.co.za/contact")}
          title="Support"
          desc=""
          icon={false}
          titleStyle={styles.titleStyle}
          style={styles.button_style}
        />
        <View style={styles.border} />
        <IconMenuItem
          onPress={() =>
            handleOpenWebPage("https://varsityhq.co.za/terms-of-service")
          }
          title="Terms of Service"
          desc=""
          icon={false}
          titleStyle={styles.titleStyle}
          style={styles.button_style}
        />
        <View style={styles.border} />
        <IconMenuItem
          onPress={() =>
            handleOpenWebPage("https://varsityhq.co.za/privacy-policy")
          }
          title="Privacy Policy"
          desc=""
          icon={false}
          titleStyle={styles.titleStyle}
          style={styles.button_style}
        />
      </View>
      <Button
        onPress={signout}
        style={styles.lo_btn}
        type={8}
        title="Sign out"
      />
      <View>
        <Text style={styles.vhq_text}>Ⓒ Varsity Headquarters</Text>
        <Text style={styles.vhq_text2}>All rights reserved</Text>
      </View>
      <View style={styles.vhq_text}>
        <Button
          onPress={deleteAccount}
          type={8}
          textStyle={{
            color: colors.dark_opacity_2,
          }}
          style={{
            borderWidth: 0,
          }}
          title="Delete account"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button_style: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  border: {
    height: 2,
    backgroundColor: colors.dark_opacity_2,
  },
  vhq_text2: {
    alignSelf: "center",
    color: colors.secondary,
    fontSize: 14,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: "600",
    // color: colors.secondary,
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
    marginTop: 20,
  },
  container: {},
});

export default connect(null, mapDispatchToProps)(ProfileSettingsScreen);

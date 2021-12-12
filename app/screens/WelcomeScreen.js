import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";

import Button from "../components/Button";
import { Image } from "react-native";

function WelcomeScreen({ navigation }) {
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-small.png")}
        />
        <AppText style={styles.header_heading}>Welcomexport default </AppText>
        <AppText style={styles.supHeading}>
          Before you continue, we just need to know a bit about you. Please
          press "continue" to proceed with setup
        </AppText>
      </View>
      <View style={styles.content_container}>
        <Button
          onPress={() => navigation.navigate("SetupUniversity")}
          type={3}
          title="Continue"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 120,
    width: 120,
    alignSelf: "center",
    overflow: "visible",
  },
  content_container: {
    padding: 20,
    flex: 1,
    marginTop: 15,
    backgroundColor: colors.dark,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  supHeading: {
    color: colors.secondary,
    textAlign: "center",
  },
  header_heading: {
    fontSize: 45,
    fontWeight: "700",
    alignSelf: "center",
  },
  header: {
    zIndex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "center",
  },
  container: {
    backgroundColor: colors.dark,
  },
});

export default WelcomeScreen;

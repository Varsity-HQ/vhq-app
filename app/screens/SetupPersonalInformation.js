import React from "react";
import { Text } from "react-native";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import Header from "../components/headers/header1";
import Screen from "../components/Screen";
import TextInput from "../components/Input";
import AppText from "../components/AppText";
import AppButton from "../components/Button";
import colors from "../config/colors";
import ProfilePicChanger from "../components/ProfilePicChanger";

function SetupPersonalInformation(props) {
  return (
    <Screen scroll style={styles.container}>
      <KeyboardAvoidingView behavior="position" style={{ flex: 1 }}>
        <Header title="Personal information (1/1)" />

        <View style={styles.content}>
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <ProfilePicChanger />
            <AppText
              style={{
                textAlign: "center",
                fontWeight: "700",
                color: colors.secondary,
              }}
            >
              Set profile picture
            </AppText>
          </View>

          <View style={styles.formgroup}>
            <AppText style={{ fontWeight: "700" }}>First name</AppText>
            <TextInput
              style={{ marginVertical: 10 }}
              type={2}
              placeholder="Firstname"
            />
          </View>
          <View style={styles.formgroup}>
            <AppText style={{ fontWeight: "700" }}>Surname</AppText>
            <TextInput
              style={{ marginVertical: 10 }}
              type={2}
              placeholder="Surname"
            />
          </View>
          <View>
            <AppButton
              type={1}
              // style={{ borderRadius: 12 }}
              title="Finish setup"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  formgroup: {
    marginBottom: 15,
  },
  container: {},
  content: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
});

export default SetupPersonalInformation;

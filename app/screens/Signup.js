import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppButton from "../components/Button";
import Input from "../components/Input";

function Signup({ navigation }) {
  return (
    <ImageBackground
      // blurRadius={4}
      style={styles.background}
      source={require("../assets/signup-img-2.jpg")}
    >
      <Screen>
        <View style={styles.container}>
          <View>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
              <Ionicons
                style={{
                  color: colors.white,
                }}
                size={50}
                name="ios-arrow-back-sharp"
              />
            </TouchableWithoutFeedback>
          </View>
          <View>
            <Text style={styles.heading}>Create an account</Text>
            <Text style={styles.subHeading}>
              Join VarsityHQ and start connecting.
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.text}>Username</Text>
            <Input
              cstyles={{
                marginBottom: 15,
              }}
              icon="user"
              placeholder="Choose your username"
            />

            <View style={{ marginTop: 20 }}>
              <AppButton icon="" type={1} title="Next" />
            </View>
          </View>
          <View
            style={{
              marginTop: 15,
            }}
          >
            <Text style={styles.text}>
              Already have an account ? Login here{" "}
              <Text onPress={() => navigation.navigate("Register")}>
                Click Here
              </Text>
            </Text>
            <Text
              style={[
                styles.text,
                {
                  textAlign: "center",
                  fontSize: 12,
                  paddingHorizontal: 30,
                  color: colors.secondary,
                },
              ]}
            >
              By clicking the signup, you agree to our terms and conditions
            </Text>
          </View>
        </View>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors.white,
    paddingVertical: 8,
  },
  subHeading: {
    fontSize: 19,
    color: colors.white,
  },
  heading: {
    fontSize: 42,
    fontWeight: "700",
    color: colors.white,
    paddingVertical: 10,
  },
  container: {
    padding: 20,
    flex: 1,
    width: "100%",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    // alignItems: "center",
  },
});

export default Signup;

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

function Login({ navigation }) {
  return (
    <ImageBackground
      // blurRadius={4}
      style={styles.background}
      source={require("../assets/signup-img-1.jpg")}
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
            <Text style={styles.heading}>Welcome back</Text>
            <Text style={styles.subHeading}>Login to your account</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Input
              cstyles={{
                marginBottom: 15,
              }}
              icon="user"
              placeholder="Email, Username or Phonenumber"
            />
            <Input secureTextEntry icon="lock" placeholder="Password" />
            <View style={{ marginTop: 20 }}>
              <AppButton icon="" type={1} title="Login" />
            </View>
          </View>
          <View
            style={{
              marginTop: 15,
            }}
          >
            <Text style={styles.text}>
              Forgot password ?{" "}
              <Text onPress={() => navigation.navigate("Register")}>
                Click Here
              </Text>
            </Text>
            <Text style={styles.text}>
              Click here to sign up if you dont have an account
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

export default Login;

import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppButton from "../components/Button";
import Input from "../components/Input";

import Form from "../components/Forms/Form";
import SubmitButton from "../components/Forms/SubmitButton";
import AppFormField from "../components/Forms/FormField";

import * as Yup from "yup";
import axios from "axios";
import ErrorMessage from "../components/Forms/ErrorMessage";
import { connect } from "react-redux";

import { login_user } from "../store/actions/actions";
import { FORGOT_PASSWORD, REGISTER } from "../navigation/routes";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Provide a username, phone number or email"),
  password: Yup.string().required().min(4).label("Password"),
});

const d = Dimensions.get("window");

const mapDispatchToProps = (dispatch) => {
  return {
    login_user: (username, password) =>
      dispatch(login_user(username, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    logging_in_user: state.core.logging_in_user,
    logging_in_error: state.core.logging_in_error,
  };
};

function Login({ navigation, login_user, logging_in_user, logging_in_error }) {
  const handleSubmit = ({ email, password }) => {
    Keyboard.dismiss();
    login_user(email, password);
  };

  return (
    <ImageBackground
      // blurRadius={4}
      style={styles.background}
      resizeMode="cover"
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
            <ErrorMessage
              error={logging_in_error.error}
              visible={logging_in_error.error}
            />
            <ErrorMessage
              error={logging_in_error.password}
              visible={logging_in_error.password}
            />
            <Form
              validationSchema={validationSchema}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={handleSubmit}
            >
              <AppFormField
                cstyles={{
                  marginBottom: 15,
                }}
                autoCapitalize="none"
                name="email"
                icon="user"
                placeholder="Email, Username or Phonenumber"
              />
              <AppFormField
                secureTextEntry
                autoCapitalize="none"
                icon="lock"
                name="password"
                placeholder="Password"
              />

              <View style={{ marginTop: 20 }}>
                <SubmitButton
                  loading={logging_in_user}
                  icon=""
                  type={1}
                  title="Login"
                />
              </View>
            </Form>
          </View>
          <View
            style={{
              marginTop: 15,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.text}>Forgot password ? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate(FORGOT_PASSWORD)}
              >
                <Text style={styles.text}>Click Here</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate(REGISTER)}>
              <Text style={styles.text}>
                Click here to sign up if you dont have an account
              </Text>
            </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

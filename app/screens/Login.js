import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableWithoutFeedback,
  Dimensions,
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

import { set_user_token } from "../store/actions/actions";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Provide a username, phone number or email"),
  password: Yup.string().required().min(4).label("Password"),
});

const d = Dimensions.get("window");

const mapDispatchToProps = (dispatch) => {
  return {
    set_user_token: (token) => dispatch(set_user_token(token)),
  };
};

function Login({ navigation, set_user_token }) {
  const [processing, set_processing] = useState(false);
  const [error, set_error] = useState({});

  const handleSubmit = ({ email, password }) => {
    set_processing(true);
    set_error("");
    axios
      .post("/login", {
        email,
        password,
      })
      .then((data) => {
        console.log(data.data);
        set_processing(false);
        return set_user_token(data.data.token);
      })
      .catch((err) => {
        if (err.response) {
          set_error({ ...err.response.data });
        }
        set_processing(false);
      });
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
            <ErrorMessage error={error.error} visible={error.error} />
            <ErrorMessage error={error.password} visible={error.password} />
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
                name="email"
                icon="user"
                placeholder="Email, Username or Phonenumber"
              />
              <AppFormField
                secureTextEntry
                icon="lock"
                name="password"
                placeholder="Password"
              />

              <View style={{ marginTop: 20 }}>
                <SubmitButton
                  loading={processing}
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

export default connect(null, mapDispatchToProps)(Login);

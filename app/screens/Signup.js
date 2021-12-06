import React, { useState } from "react";
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
import {
  AppForm as Form,
  AppFormField as Field,
  SubmitButton,
  ErrorMessage,
} from "../components/Forms";
import * as Yup from "yup";
import axios from "axios";

const u_name_validationSchema = Yup.object().shape({
  username: Yup.string()
    .min(5)
    .max(14)
    .required()
    // .lowercase()
    .matches(
      /^([a-z])([a-z\d\._]{4,15})$/,
      "Username must not contain spaces, characters or uppercase letters",
    )
    .label("Username"),
});

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  confirm_pass: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

function Signup({ navigation }) {
  const [page, setPage] = useState(0);
  const [processing, set_processing] = useState(false);
  const [errors, set_errors] = useState({});

  const componentSwitcher = () => {
    switch (page) {
      case 1:
        return signupform();
      default:
        return provide_username();
    }
  };

  const handle_signup = ({ email, password }) => {
    console.log({ email, password });
  };

  const signupform = () => {
    return (
      <View>
        <Form
          validationSchema={validationSchema}
          initialValues={{
            email: "",
            password: "",
            confirm_pass: "",
          }}
          onSubmit={handle_signup}
        >
          <Field
            autoCapitalize="none"
            autoCorrect={false}
            icon="envelope"
            keyboardType="email-address"
            textContentType="emailAddress"
            name="email"
            cstyles={{
              marginBottom: 15,
            }}
            placeholder="Enter your email"
          />
          <ErrorMessage error={errors.username} visible={errors.username} />

          <Field
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            textContentType="password"
            name="password"
            cstyles={{
              marginBottom: 15,
            }}
            icon="lock"
            secureTextEntry
            placeholder="Provide a strong password"
          />
          <ErrorMessage error={errors.password} visible={errors.password} />
          <Field
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            textContentType="password"
            name="confirm_pass"
            cstyles={{
              marginBottom: 15,
            }}
            icon="lock"
            secureTextEntry
            placeholder="Confirm your password"
          />
          <ErrorMessage
            error={errors.confirm_pass}
            visible={errors.confirm_pass}
          />
          <View style={{ marginTop: 20 }}>
            <SubmitButton
              loading={processing}
              icon=""
              type={1}
              title="Signup"
            />
          </View>
        </Form>
      </View>
    );
  };

  const check_username = ({ username }) => {
    set_processing(true);
    set_errors({});
    axios
      .get(`/checkusername/${username}`)
      .then((data) => {
        console.log(data.data);
        set_processing(false);
        setPage(1);
      })
      .catch((err) => {
        console.log(err);
        set_processing(false);

        if (err.response.data.error === "user-exists")
          return set_errors({
            ...errors,
            username: "This username is taken, please try another",
          });

        set_errors({
          ...errors,
          username: "Encountered error, please try that again",
        });
      });
  };

  const provide_username = () => {
    return (
      <View>
        <Form
          validationSchema={u_name_validationSchema}
          initialValues={{
            username: "",
          }}
          onSubmit={check_username}
        >
          <Text style={styles.text}>Username</Text>
          <Field
            autoCapitalize="none"
            autoCorrect={false}
            name="username"
            cstyles={{
              marginBottom: 15,
            }}
            icon="user"
            placeholder="Choose your username"
          />
          <ErrorMessage error={errors.username} visible={errors.username} />
          <View style={{ marginTop: 20 }}>
            <SubmitButton loading={processing} icon="" type={1} title="Next" />
          </View>
        </Form>
      </View>
    );
  };

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
          <View style={{ marginTop: 20 }}>{componentSwitcher()}</View>
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

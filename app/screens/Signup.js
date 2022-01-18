import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
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
import { set_token, get_user } from "../store/actions/actions";
import { connect } from "react-redux";
import store from "../store/store";
import { LOGIN } from "../navigation/routes";

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

const mapStateToProps = (state) => {
  return {
    getting_account_data: state.core.getting_account_data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    set_token: (token) => dispatch(set_token(token)),
    get_user: (props) => dispatch(get_user(props)),
  };
};

function Signup({ navigation, set_token, get_user, getting_account_data }) {
  const [page, setPage] = useState(0);
  const [processing, set_processing] = useState(false);
  const [errors, set_errors] = useState({});
  const [username, set_username] = useState("");

  const componentSwitcher = () => {
    switch (page) {
      case 1:
        return signupform();
      default:
        return provide_username();
    }
  };

  const handle_signup = ({ email, password, confirm_pass }) => {
    console.log({ email, password });
    set_processing(true);

    let newUserData = {
      username: username, // must run regex for correct pattern
      email: email,
      password: password,
      rep_password: confirm_pass,
    };

    axios
      .post("/signup", newUserData)
      .then((res) => {
        set_token(res.data.token);
        console.log(res.data);

        store.dispatch(get_user(true));
        // set_processing(false);
      })
      .catch((err) => {
        set_processing(false);

        if (err.response) {
          console.log(err.response.data);
          let errors = err.response.data;
          set_errors({ ...errors });

          if (errors.username) {
            return setPage(0);
          } else {
            return setPage(1);
          }
        }
      });
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
          <ErrorMessage error={errors.error} visible={errors.error} />
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
          <ErrorMessage error={errors.email} visible={errors.email} />

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
              loading={processing || getting_account_data}
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
    set_username("");
    axios
      .get(`/checkusername/${username}`)
      .then((data) => {
        console.log(data.data);
        set_processing(false);
        set_username(username);
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
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.text}>Already have an account ?&nbsp;</Text>
              <TouchableOpacity>
                <Text
                  style={styles.text}
                  onPress={() => navigation.navigate(LOGIN)}
                >
                  Click Here
                </Text>
              </TouchableOpacity>
            </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

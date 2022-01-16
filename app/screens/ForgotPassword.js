import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Screen from "../components/Screen";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

import Form from "../components/Forms/Form";
import SubmitButton from "../components/Forms/SubmitButton";
import AppFormField from "../components/Forms/FormField";

import Text from "../components/AppText";

import * as Yup from "yup";
import ErrorMessage from "../components/Forms/ErrorMessage";
import { connect } from "react-redux";

import { request_password_reset } from "../store/actions/auth_actions";
import { normalizeText } from "../util/responsivePx";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Provide a valid email to reset password")
    .email("You must provide a valid email"),
});

const d = Dimensions.get("window");

const mapDispatchToProps = (dispatch) => {
  return {
    request_password_reset: (username, password) =>
      dispatch(request_password_reset(username, password)),
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.core.reset_pass.loading,
    requested: state.core.reset_pass.requested,
    errors: state.core.reset_pass.errors,
  };
};

function ForgotPassword({
  navigation,
  loading,
  errors,
  request_password_reset,
  requested,
}) {
  const handleSubmit = ({ email }) => {
    request_password_reset(email);
  };

  console.log(errors);

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
            <Text style={styles.heading}>Reset</Text>
            <Text style={styles.subHeading}>
              Enter your email below and click the reset password
            </Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <ErrorMessage error={errors.error} visible={errors.error} />
            <Form
              validationSchema={validationSchema}
              initialValues={{
                email: "",
              }}
              onSubmit={handleSubmit}
            >
              <AppFormField
                cstyles={{
                  marginBottom: 15,
                }}
                autoCapitalize="none"
                name="email"
                icon="envelope"
                placeholder="Email for your account"
                editable={!requested}
              />

              {!requested ? (
                <View style={{ marginTop: 20 }}>
                  <SubmitButton
                    loading={loading}
                    icon=""
                    type={1}
                    title="Request reset"
                  />
                </View>
              ) : (
                <View style={[{ marginTop: 20 }, styles.requested_container]}>
                  <Text style={{ fontWeight: "700", marginBottom: 10 }}>
                    Check your inbox
                  </Text>
                  <Text
                    style={{
                      color: colors.secondary,
                      fontSize: normalizeText(14),
                    }}
                  >
                    We've sent you a password reset email. Check for an email
                    from Varsity Headquaters and follow the instructions
                  </Text>
                </View>
              )}
            </Form>
          </View>
        </View>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  requested_container: {
    borderColor: colors.secondary,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

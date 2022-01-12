import React, { useState } from "react";
import { Text } from "react-native";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import Header from "../components/headers/header1";
import Screen from "../components/Screen";
import TextInput from "../components/Input";
import AppText from "../components/AppText";
import AppButton from "../components/Button";
import colors from "../config/colors";
import * as Yup from "yup";
import ProfilePicChanger from "../components/ProfilePicChanger";
import Resizer from "react-image-file-resizer";
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from "../components/Forms";
import axios from "axios";

import { save_profileDefaults } from "../store/actions/actions";
import { connect } from "react-redux";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().min(4).label("First name"),
  surname: Yup.string().required().min(4).label("Last name"),
});

const mapDispatchToProps = (dispatch) => {
  return {
    save_profileDefaults: (uObj) => dispatch(save_profileDefaults(uObj)),
  };
};

const mapStateToProps = (state) => {
  return {
    core: state.core.accData,
  };
};

function SetupPersonalInformation({ save_profileDefaults, core }) {
  const [image_selected, set_image] = useState(core.profilepic);
  const [image_error, set_image_error] = useState("");

  const handle_submit = ({ firstname, surname }) => {
    set_image_error("");

    if (!image_selected) {
      return set_image_error("Please set your profile picture");
    }

    save_profileDefaults({
      profilepic: image_selected,
      firstname: firstname,
      surname: surname,
    });
  };

  console.log(image_selected);

  return (
    <Screen scroll style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <Header title="Personal information (1/1)" />

        <View style={styles.content}>
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <ProfilePicChanger
              image={image_selected}
              onImgChange={(uri) => set_image(uri)}
            />
            <AppText
              style={{
                textAlign: "center",
                fontWeight: "700",
                color: colors.secondary,
              }}
            >
              Profile picture
            </AppText>

            <ErrorMessage
              style={{ textAlign: "center" }}
              visible={image_error}
              error={image_error}
            />
          </View>

          <AppForm
            validationSchema={validationSchema}
            onSubmit={handle_submit}
            initialValues={{
              firstname: core.firstname,
              surname: core.surname,
            }}
          >
            <View style={styles.formgroup}>
              <AppText style={{ fontWeight: "700" }}>First name</AppText>
              <AppFormField
                name="firstname"
                style={{ marginVertical: 10 }}
                type={2}
                placeholder="Your first name e.g Llora"
              />
            </View>
            <View style={styles.formgroup}>
              <AppText style={{ fontWeight: "700" }}>Last name</AppText>
              <AppFormField
                name="surname"
                style={{ marginVertical: 10 }}
                type={2}
                placeholder="Your last name e.g Tesa"
              />
            </View>
            <View>
              <SubmitButton
                type={1}
                // style={{ borderRadius: 12 }}
                title="Finish setup"
              />
            </View>
          </AppForm>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  formgroup: {
    marginBottom: 15,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetupPersonalInformation);

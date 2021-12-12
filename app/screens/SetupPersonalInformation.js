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

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().min(4).label("First name"),
  surname: Yup.string().required().min(4).label("Last name"),
});

function SetupPersonalInformation(props) {
  const [image_selected, set_image] = useState(null);
  const [image_error, set_image_error] = useState("");

  class RNBlob extends Blob {
    get [Symbol.toStringTag]() {
      return "Blob";
    }
  }

  const generateUploadUrl = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const blobObj = blob;
    // convert(blob);
    // blob.close();

    return blobObj;
  };

  const handle_submit = async (e) => {
    console.log(e);
    set_image_error("");

    if (!image_selected) {
      return set_image_error("Please set your profile picture");
    }

    let image_blob = await generateUploadUrl(image_selected);

    console.log(image_blob);
    console.log("next");
    console.log(image_blob);

    let formData = new FormData();
    formData.append("file", new RNBlob([image_blob]), "jpeg");

    // formData.append("image", {
    //   uri: image_blob,
    //   name: image_blob.name,
    //   type: "image/jpg",
    // });

    axios
      .post("/account/updatepimage", formData)
      .then((data) => {
        // store.dispatch(overlayLoader(false));
        // changePPLink(ci);
        // setImageSrc(null);
        console.log(data.data);
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              firstname: "",
              surname: "",
            }}
          >
            <View style={styles.formgroup}>
              <AppText style={{ fontWeight: "700" }}>First name</AppText>
              <AppFormField
                name="firstname"
                style={{ marginVertical: 10 }}
                type={2}
                placeholder="Your first name e.g Lerato"
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

export default SetupPersonalInformation;

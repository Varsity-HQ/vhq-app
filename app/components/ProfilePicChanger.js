import React, { useEffect } from "react";
import { Alert, Image, TouchableOpacity } from "react-native";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";

function ProfilePicChanger({ image, onImgChange }) {
  //
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library");
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const process_image = async (uri) => {
    // console.log({ uri });

    const manipResult = await manipulateAsync(
      uri,
      [{ resize: { height: 300, width: 300 } }],
      { compress: 0.4, format: SaveFormat.JPEG },
    );
    onImgChange(manipResult.uri);

    // console.log({ manipResult });
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
        aspect: [1, 1],
        presentationStyle: 0,
        allowsEditing: true,
        // base64: true,
      });
      //
      if (!result.cancelled) {
        process_image(result.uri);

        // console.log({ result });
      } else {
        // console.log(result);
      }
      //
    } catch (error) {
      console.log("Error reading image");
    }
  };

  if (!image) {
    return (
      <TouchableOpacity onPress={selectImage} style={styles.container}>
        <MaterialCommunityIcons
          name="camera"
          size={45}
          style={styles.camera}
          color={colors.secondary}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={selectImage} style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
  camera: {},
  container: {
    borderColor: colors.primary,
    backgroundColor: colors.dark_opacity_2,
    borderWidth: 1,
    borderRadius: 100,
    height: 130,
    width: 130,
    alignSelf: "center",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default ProfilePicChanger;

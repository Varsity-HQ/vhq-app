import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import colors from "../config/colors";
import AddPictureIcon from "../components/AddPost/AddPictureIcon";
import { Image } from "react-native";

function AddImageButton({
  style,
  add_post,
  onImgChange,
  max,
  length,
  disabled,
}) {
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library");
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const process_image = async (uri) => {
    console.log({ uri });

    const manipResult = await manipulateAsync(uri, [], {
      compress: 0.7,
      format: SaveFormat.JPEG,
    });
    onImgChange(manipResult.uri);
  };

  const selectImage = async () => {
    if (max <= length) {
      return Alert.alert(
        "Limit reached",
        `You can only post up to ${max} images`,
      );
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        // aspect: [1, 1],
        presentationStyle: 0,
        allowsEditing: true,
      });

      if (!result.cancelled) {
        process_image(result.uri);
      } else {
      }
    } catch (error) {
      console.log("Error reading image");
    }
  };

  if (add_post) {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={selectImage}
        style={[style]}
      >
        <AddPictureIcon name="image-plus" color={colors.secondary} size={32} />
      </TouchableOpacity>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {},
});

export default AddImageButton;

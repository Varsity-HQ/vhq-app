import React, { useEffect } from "react";
import { Alert, Image, TouchableOpacity } from "react-native";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

function ProfilePicChanger({ image, onChangeImage }) {
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library");
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const handlePress = () => {
    if (!image) selectImage();
    else {
      Alert.alert(
        "Delete Image",
        "Are you sure you want to delete this image",
        [{ text: "Yes", onPress: () => onChangeImage(null) }, { text: "No" }],
      );
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      //
      if (!result.cancelled) {
        onChangeImage(result.uri);
      } else {
        console.log(result);
      }
      //
    } catch (error) {
      console.log("Error reading image");
    }
  };

  if (!image) {
    return (
      <TouchableOpacity onPress={handlePress} style={styles.container}>
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
    <View style={styles.container}>
      <Image source="" />
    </View>
  );
}

const styles = StyleSheet.create({
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

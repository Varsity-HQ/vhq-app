import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import colors from "../../../config/colors";
import { AntDesign } from "@expo/vector-icons";
import Image from "../../Image";

const width = Dimensions.get("window").width;

function MCPhoto({ add, image, onImgChange, max, length, removePress }) {
  const process_image = async (uri) => {
    const manipResult = await manipulateAsync(uri, [], {
      compress: 0.7,
      format: SaveFormat.JPEG,
    });
    onImgChange(manipResult.uri);
  };

  const selectImage = async () => {
    if (!add) return;
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (granted) {
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
          // aspect: [1.91, 1],
          presentationStyle: 0,
          allowsEditing: true,
        });

        if (!result.cancelled) {
          process_image(result.uri);
        } else {
        }
      } catch (error) {
        console.error("Error reading image");
      }
    } else {
      Alert.alert(
        "Warning",
        "You need to enable permission to access the library in settings",
      );
    }
  };

  return (
    <TouchableOpacity onPress={selectImage} style={styles.container}>
      {!add && (
        <TouchableOpacity
          onPress={removePress}
          style={styles.close_btn_container}
        >
          <AntDesign size={14} color={colors.white} name="close" />
        </TouchableOpacity>
      )}
      {!add && <Image local uri={{ uri: image }} style={styles.image} />}
      {add && <AntDesign name="plus" size={30} color={colors.secondary} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  close_btn_container: {
    backgroundColor: colors.dark,
    position: "absolute",
    zIndex: 1,
    top: 5,
    right: 5,
    padding: 10,
    borderRadius: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  container: {
    width: width / 4,
    height: width / 4,
    borderColor: colors.secondary,
    borderWidth: 0,
    padding: 0,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: colors.dark_opacity_2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default MCPhoto;

import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import colors from "../config/colors";
import AddPictureIcon from "../components/AddPost/AddPictureIcon";
import Text from "../components/AppText";
import Image from "./Image";

const height = Dimensions.get("window").height;

function AddImageButton({
  style,
  add_post,
  onImgChange,
  max,
  length,
  disabled,
  event_picture,
  image,
}) {
  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) alert("You need to enable permission to access the library");
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const process_image = async (uri) => {
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
        // aspect: [1.91, 1],
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
        <AddPictureIcon name="image-plus" color={colors.secondary} size={24} />
      </TouchableOpacity>
    );
  }

  if (event_picture) {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={selectImage}
        style={[style, styles.event_button]}
      >
        {image ? (
          <Image uri={image} local style={styles.image} />
        ) : (
          <View style={styles.container_inner}>
            <View style={styles.center}>
              <AddPictureIcon
                name="image-plus"
                color={colors.secondary}
                size={44}
              />
            </View>
            <Text style={[styles.title, styles.center]}>Cover Photo</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
  center: {
    alignSelf: "center",
  },
  container_inner: {
    flexDirection: "column",
    alignSelf: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },
  title: {
    fontWeight: "700",
    marginTop: 10,
  },
  event_button: {
    borderWidth: 1,
    borderColor: colors.white,
    height: height * 0.31,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default AddImageButton;

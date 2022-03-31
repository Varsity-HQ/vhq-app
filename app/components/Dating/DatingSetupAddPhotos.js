import React from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import Image from "../Image";
import Button from "../Button";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

function DatingSetupAddPhotos(props) {
  return (
    <ScrollView horizontal style={styles.container}>
      <ImageComp />
      <ImageComp />
    </ScrollView>
  );
}

const ImageComp = () => {
  return (
    <View style={styles.image_container}>
      <Button
        type={3}
        content={<Ionicons name="close" size={20} color={colors.white} />}
        style={styles.button}
      />
      <Image style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: "100%",
    width: "100%",
  },
  button: {
    borderRadius: 100,
    position: "absolute",
    zIndex: 2,
    top: 0,
    right: "6%",
    borderColor: colors.primary,
    borderWidth: 2,
    padding: 5,
    backgroundColor: colors.dark,
  },

  image_container: {
    height: height * 0.4,
    // width: width * 0.4,
    aspectRatio: 9 / 16,
    marginRight: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  container: {},
});

export default DatingSetupAddPhotos;

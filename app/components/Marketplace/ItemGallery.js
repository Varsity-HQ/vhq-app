import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import Image from "../Image";

const width = Dimensions.get("window").width;

function ItemGallery({ images }) {
  return (
    <View>
      <Image uri={images[0]} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: width,
  },
});

export default ItemGallery;

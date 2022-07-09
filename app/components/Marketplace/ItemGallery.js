import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";
import Text from "../AppText";
import { FontAwesome } from "@expo/vector-icons";
import IconButton from "../IconButton";

const width = Dimensions.get("window").width;

function ItemGallery({ images }) {
  return (
    <View
      style={{
        zIndex: 1,
        // padding: 10,
      }}
    >
      <Image uri={images[0]} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width - 0,
    height: width - 0,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
});

export default ItemGallery;

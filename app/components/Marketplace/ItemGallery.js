import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";
import Image from "../Image";

const width = Dimensions.get("window").width;

function ItemGallery(props) {
  return (
    <View>
      <Image
        uri="https://firebasestorage.googleapis.com/v0/b/varsityhq-bd225.appspot.com/o/vhq_img202125144722.jpeg?alt=media"
        style={styles.image}
      />
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

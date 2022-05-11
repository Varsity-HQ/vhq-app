import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import colors from "../../config/colors";
import Image from "../Image";

const width = Dimensions.get("window").width;

function DatingCard(props) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: width / 3,
    borderRadius: 1000,
    // aspectRatio: 9 / 3,
  },
  container: {
    width: width / 3,
    padding: 6,
    borderRadius: 100,
    borderColor: colors.primary,
    overflow: "hidden",
  },
});

export default DatingCard;

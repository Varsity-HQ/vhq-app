import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Image from "../Image";

const width = Dimensions.get("window").width;

function FullWidth(props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.ad_image}
        uri="https://d3gl63zej4sooi.cloudfront.net/uploads/merchant/main/main_image/461/Banner1.png"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ad_image: {
    height: width,
    width: width,
  },
  container: {},
});

export default FullWidth;

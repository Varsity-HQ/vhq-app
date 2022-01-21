import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Image from "../Image";

const height = Dimensions.get("window").height;

function HeaderUserProfile(props) {
  console.log(props);
  return (
    <View style={styles.container}>
      <Image style={styles.user_avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  user_avatar: {
    height: height * 0.045,
    width: height * 0.045,
    borderRadius: 100,
  },
  container: {},
});

export default HeaderUserProfile;

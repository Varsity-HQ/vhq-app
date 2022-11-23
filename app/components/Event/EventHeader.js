import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Image from "../Image";
import PostCard from "../PostCard";

const width = Dimensions.get("window").width;

function EventHeader({ data }) {
  console.log({ data });

  return (
    <View style={styles.container}>
      {/* <Image uri={data.attachments[0]} style={styles.image} /> */}
      <PostCard eventPage data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width - 24,
    height: width,
    borderRadius: 10,
    margin: 12,
  },
  container: {},
});

export default EventHeader;

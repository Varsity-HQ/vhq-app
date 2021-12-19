import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import colors from "../../config/colors";
import { Image } from "react-native-expo-image-cache";

function TopPost(props) {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.image}
          uri="https://firebasestorage.googleapis.com/v0/b/varsityhq-bd225.appspot.com/o/vhq_img202156726730.jpeg?alt=media"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>Harmony Chikari</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
          This is the post that will apear first to show the othrs
        </Text>
        <View style={styles.date_container}>
          <Text style={styles.date}>2 November 2021</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date_container: {
    marginTop: 5,
    borderTopColor: colors.dark_opacity_2,
    borderTopWidth: 1,
    paddingTop: 5,
  },
  date: {
    color: colors.skblue,
    fontSize: 14,
  },
  text: {
    color: colors.secondary,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
  },
  content: {
    marginLeft: 10,
    // overflow: "hidden",
    width: 195,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 5,
  },
  container: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: colors.darkish2,
    marginVertical: 20,
    borderRadius: 10,
    height: 110,
    width: 300,
    flexDirection: "row",
    // overflow: "hidden",
  },
});

export default TopPost;

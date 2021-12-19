import React from "react";
import { View, StyleSheet, Image as ImageLocal } from "react-native";
import Text from "../AppText";
import colors from "../../config/colors";
import { Image } from "react-native-expo-image-cache";

function TopPost({ x }) {
  const returnPicture = () => {
    if (!x.profilepic)
      return (
        <ImageLocal
          style={styles.image}
          source={{ uri: require("../../assets/avatar.png") }}
        />
      );

    if (x.attachments.length > 0)
      return <Image style={styles.image} uri={x.attachments[0]} />;
    return <Image style={styles.image} uri={x.profilepic} />;
  };

  return (
    <View style={styles.container}>
      <View>{returnPicture()}</View>
      <View style={styles.content}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
          {x.firstname}&nbsp;{x.surname}
        </Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
          {x.postText}
        </Text>
        <View style={styles.date_container}>
          <Text style={styles.date}>
            {x.likes_count} Likes | {x.comments_count} Comments
          </Text>
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
    height: 50,
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
    height: 115,
    width: 300,
    flexDirection: "row",
    overflow: "hidden",
  },
});

export default TopPost;

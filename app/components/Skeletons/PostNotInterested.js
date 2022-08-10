import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";

function PostNotInterested({ type = "Post" }) {
  return (
    <View style={styles.container}>
      <View style={styles.container_inner}>
        <Text
          style={{
            color: colors.secondary,
            fontSize: 14,
            textAlign: "center",
          }}
        >
          {type} removed. We will not show this post again
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_inner: {
    backgroundColor: colors.dark_opacity_2,
    padding: 20,
    // paddingHorizontal: 20,
    borderRadius: 10,
  },
  container: {
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
    padding: 10,
  },
});

export default PostNotInterested;

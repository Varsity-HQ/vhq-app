import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";

import SkeletonComponent from "../Skeletons/SkeletonComponent";

function CommentSkeleton(props) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: colors.dark_opacity_2,
          paddingTop: 13,
          paddingBottom: 15,
        }}
      >
        <SkeletonComponent duration={3000} style={styles.p_avatar} />
        <View style={{ marginLeft: 10 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SkeletonComponent duration={3000} style={styles.text} />
            <SkeletonComponent duration={3000} style={styles.text_2} />
          </View>
          <View style={{ paddingVertical: 5 }}>
            <SkeletonComponent duration={3000} style={styles.text_3} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  date_posted: {
    fontSize: 14,
    color: colors.secondary,
  },
  text: {
    height: 15,
    width: 78,
  },
  text_2: {
    height: 15,
    width: 50,
    marginLeft: 10,
  },
  text_3: {
    height: 15,
    width: 240,
  },
  p_avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  container: {
    paddingHorizontal: 10,
  },
});

export default CommentSkeleton;

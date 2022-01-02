import React from "react";
import { Image } from "react-native";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { FontAwesome } from "@expo/vector-icons";

function PostPageComment({ skeleton = false }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: colors.dark_opacity_2,
          paddingTop: 13,
          paddingBottom: 5,
        }}
      >
        <Image
          style={styles.p_avatar}
          source={{
            uri: "https://varsityhq.imgix.net/vhq_img202156726730.jpeg",
          }}
        />
        <View style={{ marginLeft: 10 }}>
          <AppText style={styles.u_name}>
            Paballo M
            <AppText style={styles.date_posted}>
              &nbsp;•&nbsp;14 days ago
            </AppText>
          </AppText>
          <View style={{ paddingVertical: 5 }}>
            <AppText>Lol finally</AppText>
          </View>
          <View
            style={{
              paddingVertical: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <FontAwesome name="heart" size={18} color={colors.white} />
            <AppText style={{ marginHorizontal: 12 }}>Reply</AppText>
            <AppText>Report</AppText>
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
  u_name: {
    fontSize: 15,
    fontWeight: "700",
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

export default PostPageComment;

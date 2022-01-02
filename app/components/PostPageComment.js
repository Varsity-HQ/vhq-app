import React from "react";
import { Image } from "react-native";
import { View, StyleSheet } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { FontAwesome } from "@expo/vector-icons";
import CommentSkeleton from "./Skeletons/CommentSkeleton";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function PostPageComment({ data, returnProfilePicture, skeleton = false }) {
  if (skeleton) return <CommentSkeleton />;

  console.log({ data });

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
        {returnProfilePicture(data.commenter_profilepic, styles.p_avatar)}
        <View style={{ marginLeft: 10, flex: 1 }}>
          <AppText style={styles.u_name}>
            {data.commenter_username}
            <AppText style={styles.date_posted}>
              &nbsp;•&nbsp;{dayjs(data.date_created).fromNow()}
            </AppText>
          </AppText>
          <View
            style={{
              paddingVertical: 5,
              marginRight: 0,
            }}
          >
            <AppText>{data.comment_text}</AppText>
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

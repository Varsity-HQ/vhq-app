import React, { useRef } from "react";
import { Image } from "react-native";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import { FontAwesome } from "@expo/vector-icons";
import CommentSkeleton from "./Skeletons/CommentSkeleton";
import Swipeable from "react-native-gesture-handler/Swipeable";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import DeleteComment from "./Comment/DeleteComment";
import { RectButton } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { replyToComment } from "../store/actions/postPage";
dayjs.extend(relativeTime);

const mapDispatchToProps = (dispatch) => {
  return {
    replyToComment: (comment) => dispatch(replyToComment(comment)),
  };
};

function PostPageComment({
  data,
  returnProfilePicture,
  skeleton = false,
  replyToComment,
}) {
  const updateRef = useRef();
  if (skeleton) return <CommentSkeleton />;

  // console.log({ data });

  const handleReplyToComment = () => {
    replyToComment(data);
  };

  const renderRightActions = () => {
    return (
      <>
        <DeleteComment onPress={() => console.log("delete pressed")} />
        <DeleteComment onPress={() => console.log("delete pressed")} />
      </>
    );
  };

  return (
    <Swipeable ref={updateRef} renderRightActions={renderRightActions}>
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
              <FontAwesome name="heart" size={18} color={colors.secondary} />
              <TouchableOpacity onPress={handleReplyToComment}>
                <AppText
                  style={{ marginHorizontal: 15, color: colors.secondary }}
                >
                  Reply{" "}
                  {data.comment_comments > 0 || data.comment_comments !== "0"
                    ? `${data.comment_comments}`
                    : ""}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
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
    backgroundColor: colors.darkish3,
  },

  container: {
    paddingHorizontal: 10,
    backgroundColor: colors.dark,
  },
});

export default connect(null, mapDispatchToProps)(PostPageComment);

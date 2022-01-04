import React from "react";
import { TouchableOpacity } from "react-native";
import { View, StyleSheet, TextInput } from "react-native";
import { connect } from "react-redux";
import colors from "../../config/colors";
import Text from "../AppText";
import { Ionicons } from "@expo/vector-icons";

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
    post_page: state.data.post_page,
    post: state.data.post_page?.post?.post,
  };
};

function CommentTextInput({
  returnProfilePicture,
  profilepic,
  post_page,
  post,
}) {
  if (!post_page.post) return null;

  const returnPostOwner = () => {
    let poster = post_page.post.account.firstname;
    if (post.anonymous_post) {
      poster = post.anonymous_name;
    }
    return poster;
  };

  return (
    <>
      {/* <View style={styles.reply_box_container}>
        <View style={styles.reply_top_header}>
          <Text style={[styles.reply_text, { marginBottom: 3 }]}>
            Replying to @pabie
          </Text>
          <TouchableOpacity>
            <Ionicons name="close" size={25} color={colors.white} />
          </TouchableOpacity>
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.reply_text_2}
        >
          Tot tot you see them post but dololo yours aiii... That's why people
          block people aii
        </Text>
      </View> */}
      <View style={[styles.comment_box_container]}>
        {returnProfilePicture(profilepic, styles.profilepic)}
        <TextInput
          placeholderTextColor={colors.secondary_2}
          style={styles.comment_input}
          placeholder={`Respond to ${returnPostOwner()}`}
        />
        <TouchableOpacity style={styles.send_btn}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  reply_top_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reply_text: {
    fontWeight: "700",
  },
  reply_text_2: {
    color: colors.secondary,
  },
  reply_box_container: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: colors.primary,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: colors.darkish2,
  },
  comment_input: {
    borderColor: "red",
    borderWidth: 0,
    height: "100%",
    flex: 1,
    marginHorizontal: 7,
    color: colors.white,
  },
  profilepic: {
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: colors.darkish3,
  },
  comment_box_container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    borderColor: colors.skblue,
    borderWidth: 2,
    paddingHorizontal: 7,
    paddingVertical: 7,
    // height: "100%",
    // left: 0,
    // position: "absolute",
    // top: 0,
    // width: "100%",
  },
  container: {},
  send_btn: {
    borderLeftColor: "#dee2e6",
    borderLeftWidth: 2,
    paddingHorizontal: 12,
    height: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  sendBtnText: {
    fontSize: 16,
    color: "#dee2e6",
    fontWeight: "700",
  },
});

export default connect(mapStateToProps, null)(CommentTextInput);

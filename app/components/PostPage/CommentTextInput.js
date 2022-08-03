import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { connect } from "react-redux";
import colors from "../../config/colors";
import Text from "../AppText";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PROFILE } from "../../navigation/routes";
import emojis from "../../util/emojis";
import Image from "../../components/Image";
import {
  cancel_reply_comment,
  send_post_comment,
} from "../../store/actions/postPage";

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
    account: state.core.accData,
    username: state.core.accData.username,
    post_page: state.postPage,
    post: state.postPage?.post.post,
    replyTo: state.postPage.replyTo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendPostComment: (txt) => dispatch(send_post_comment(txt)),
    cancelReplyComment: () => dispatch(cancel_reply_comment()),
  };
};

function CommentTextInput({
  returnProfilePicture,
  profilepic,
  post_page,
  post,
  username,
  account,
  sendPostComment,
  cancelReplyComment,
  replyTo,
}) {
  const navigation = useNavigation();
  const [commentText, setCommentText] = useState("");

  if (!post_page.post) return null;

  const handleSendBtn = () => {
    if (commentText) {
      sendPostComment(commentText);
      setCommentText("");
      Keyboard.dismiss();
      return;
    }
  };

  const returnPostOwner = () => {
    let poster = post_page.post.account.firstname;
    if (post.anonymous_post) {
      poster = post.anonymous_name;
    }
    return poster;
  };

  const commentToReply = post_page.replyTo;

  return (
    <>
      {post_page.replyTo || post_page?.parentCommentId ? (
        <View style={styles.reply_box_container}>
          <View style={styles.reply_top_header}>
            <Text style={[styles.reply_text, { marginBottom: 3 }]}>
              Replying to @{commentToReply.username}
            </Text>
            <TouchableOpacity onPress={cancelReplyComment}>
              <Ionicons name="close" size={25} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.reply_text_2}
          >
            {commentToReply.commentText}
          </Text>
        </View>
      ) : null}

      <View style={[styles.comment_box_container]}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(PROFILE, {
              username: username,
            })
          }
        >
          {account.anonymous_profile ? (
            <Image
              style={styles.profilepic}
              local
              uri={{ uri: emojis[account.anonymous_emoji_index] }}
            />
          ) : (
            <Image style={styles.profilepic} uri={profilepic} />
          )}

          {/* {returnProfilePicture(profilepic, styles.profilepic)} */}
          {/* {returnProfilePicture(emojis[2])} */}
        </TouchableOpacity>
        <TextInput
          value={commentText}
          onChangeText={(text) => setCommentText(text)}
          selectionColor={colors.primary}
          placeholderTextColor={colors.secondary_2}
          style={styles.comment_input}
          placeholder={`Respond to ${
            replyTo ? replyTo.username : returnPostOwner()
          } ${account.anonymous_profile ? "anonymously" : ""}`}
        />
        {/* Turned off after comments show their being posted */}
        {/* {post_page.commenting ? (
          <View style={styles.loading_overlay}>
            <Text style={{ color: colors.lighish2 }}>Commenting..</Text>
          </View>
        ) : null} */}

        <TouchableOpacity onPress={handleSendBtn} style={styles.send_btn}>
          <Text
            style={[
              styles.sendBtnText,
              commentText !== "" && {
                color: colors.white,
              },
            ]}
          >
            Send
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loading_overlay: {
    position: "absolute",
    top: 7,
    bottom: 0,
    left: 7,
    right: 0,
    width: "100%",
    height: "100%",
    backgroundColor: colors.dark_opacity_2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    borderRadius: 1000,
  },
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
    color: colors.gray,
    fontWeight: "700",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentTextInput);

import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
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
import { replyToComment, get_comment_replies } from "../store/actions/postPage";
import Image from "./Image";
dayjs.extend(relativeTime);

const mapDispatchToProps = (dispatch) => {
  return {
    replyToComment: (comment) => dispatch(replyToComment(comment)),
    handleOpenResponses: (id) => dispatch(get_comment_replies(id)),
  };
};

function PostPageComment({
  data,
  returnProfilePicture,
  skeleton = false,
  replyToComment,
  handleOpenResponses,
}) {
  const updateRef = useRef();
  if (skeleton) return <CommentSkeleton />;

  // console.log({ data });

  const handleReplyToComment = () => {
    // replyToComment(data);
    Alert.alert(
      "Coming soon",
      "This feature will be activated in the next release",
    );
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
    // <Swipeable ref={updateRef} renderRightActions={renderRightActions}>
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          flex: 1,

          // paddingTop: 10,
          // paddingBottom: 5,
        }}
      >
        <Image style={styles.p_avatar} uri={data.commenter_profilepic} />
        {/* {returnProfilePicture(data.commenter_profilepic, styles.p_avatar)} */}
        {/* <View style={styles.comment_line} /> */}
        <View
          style={{
            flex: 1,
          }}
        >
          <View>
            <View
              style={{
                display: "flex",
                position: "relative",
                flexWrap: "wrap",

                flex: 1,
                paddingBottom: 0,
              }}
            >
              <View style={[styles.commentContainer, { marginLeft: 10 }]}>
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
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
              }}
            >
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
              <View style={{ marginBottom: 10, marginTop: 5 }}>
                {data.comment_comments > 0 || data.comment_comments !== "0" ? (
                  <TouchableOpacity
                    onPress={() => handleOpenResponses(data.comment_id)}
                  >
                    <AppText style={styles.responses_text}>
                      {data.comments_loading
                        ? "-loading responses-"
                        : "See responses"}
                    </AppText>
                  </TouchableOpacity>
                ) : null}

                <View>
                  {data.comments_replies?.map((x) => (
                    <View key={x.comment_id}>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 10,
                          // paddingBottom: 5,
                        }}
                      >
                        <Image
                          uri={x.commenter_profilepic}
                          style={styles.p_avatar}
                        />
                        <View
                          style={{
                            flex: 1,
                          }}
                        >
                          <View
                            style={[
                              styles.commentContainer,
                              {
                                marginLeft: 10,
                                flex: 1,
                                paddingBottom: 5,
                                marginBottom: 0,
                              },
                            ]}
                          >
                            <AppText style={styles.u_name}>
                              {x.commenter_username}
                              <AppText style={styles.date_posted}>
                                &nbsp;•&nbsp;
                                {dayjs(x.date_created).fromNow()}
                              </AppText>
                            </AppText>
                            <View
                              style={{
                                paddingVertical: 5,
                                marginRight: 0,
                              }}
                            >
                              <AppText>{x.comment_text}</AppText>
                            </View>
                          </View>
                          <View
                            style={{
                              paddingVertical: 5,
                              flexDirection: "row",
                              alignItems: "center",
                              paddingHorizontal: 10,
                            }}
                          >
                            <FontAwesome
                              name="heart"
                              size={18}
                              color={colors.secondary}
                            />
                            <TouchableOpacity onPress={handleReplyToComment}>
                              <AppText
                                style={{
                                  marginHorizontal: 15,
                                  color: colors.secondary,
                                }}
                              >
                                Reply{" "}
                                {data.comment_comments > 0 ||
                                data.comment_comments !== "0"
                                  ? `${data.comment_comments}`
                                  : ""}
                              </AppText>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
    // </Swipeable>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: colors.dark_2,
    padding: 12,
    paddingBottom: 0,
    marginBottom: 5,
    borderRadius: 25,
    // width: "100%",
  },
  comment_line: {
    // width: 2,
    // height: "100%",
    // backgroundColor: "white",
    // alignSelf: "center",
    // flex: 1,
  },
  responses_text: {
    fontWeight: "700",
    color: colors.secondary,
  },
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
    // flex : 1
  },

  container: {
    paddingHorizontal: 10,
    flex: 1,
    // backgroundColor: colors.dark_2,
  },
});

export default connect(null, mapDispatchToProps)(PostPageComment);

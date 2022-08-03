import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
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
import {
  replyToComment,
  get_comment_replies,
  close_comment_replies,
  like_main_comment,
  unlike_main_comment,
} from "../store/actions/postPage";
import Image from "./Image";
import CommentMenu from "./Post/CommentMenu";
import { check_comment_liked, check_post_reported } from "../util/postUtil";
import ReportMenu from "./ReportMenus/ReportMenu";
import SkeletonComponent from "./Skeletons/SkeletonComponent";
import ReportedTemplate from "./ReportedTemplate";
import emojis from "../util/emojis";
dayjs.extend(relativeTime);

const mapDispatchToProps = (dispatch) => {
  return {
    replyToComment: (data) => dispatch(replyToComment(data)),
    handleOpenResponses: (id) => dispatch(get_comment_replies(id)),
    handleCloseResponses: (id) => dispatch(close_comment_replies(id)),
    like_main_comment: (id) => dispatch(like_main_comment(id)),
    unlike_main_comment: (id) => dispatch(unlike_main_comment(id)),
  };
};

function PostPageComment({
  data,
  skeleton = false,
  replyToComment,
  handleOpenResponses,
  handleCloseResponses,
  like_main_comment,
  unlike_main_comment,
}) {
  const updateRef = useRef();

  const [commentReported, setCommentReported] = useState(false);

  const [isCommentModalVisible, setIsCommentModalVisible] =
    React.useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [commentLiked, setCommentLiked] = useState(false);

  const [isReportModalVisible, setIsReportModalVisible] = React.useState(false);
  const handleReportModal = () =>
    setIsReportModalVisible(() => !isReportModalVisible);

  useEffect(() => {
    if (!data) return;
    setCommentLiked(check_comment_liked(data.comment_id));
    setCommentReported(check_post_reported(data.comment_id));
  }, []);

  const handleCommentModal = (data) => {
    // if (!isCommentModalVisible) {
    // }
    setSelectedComment(data);
    setIsCommentModalVisible(!isCommentModalVisible);
  };

  if (skeleton) return <CommentSkeleton />;
  const handleLikeComment = () => {
    if (commentLiked) {
      setCommentLiked(!commentLiked);
      unlike_main_comment(data.comment_id);
    } else {
      setCommentLiked(!commentLiked);
      like_main_comment(data.comment_id);
    }
  };

  const handleReplyToReply = () => {
    Alert.alert(
      "Coming soon",
      "This feature will be activated in the next release",
    );
  };

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

  const handleeCommentLongPress = (data) => {
    handleCommentModal(data);
  };

  if (commentReported) {
    return <ReportedTemplate type="comment" />;
  }

  return (
    // <Swipeable ref={updateRef} renderRightActions={renderRightActions}>

    <>
      <ReportMenu
        key={"report-modal"}
        type="comment"
        node_id={data.comment_id}
        onReportSubmitted={() => setCommentReported(true)}
        isReportModalVisible={isReportModalVisible}
        handleReportModal={handleReportModal}
      />

      <TouchableWithoutFeedback
        disabled={data.is_sending}
        onLongPress={() => {
          handleeCommentLongPress(data);
        }}
      >
        <View style={styles.container}>
          <CommentMenu
            handleReply={() => {
              handleReplyToComment();
              handleCommentModal();
            }}
            isCommentModalVisible={isCommentModalVisible}
            handleCommentModal={handleCommentModal}
            data={selectedComment}
          />
          <View
            style={{
              flexDirection: "row",
              flex: 1,

              // paddingTop: 10,
              // paddingBottom: 5,
            }}
          >
            <Image
              style={styles.p_avatar}
              local={data.anonymous_comment}
              uri={
                data.anonymous_comment
                  ? { uri: emojis[data.commenter_profilepic] }
                  : data.commenter_profilepic
              }
            />
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
                        &nbsp;•&nbsp;
                        {data.is_sending
                          ? "posting..."
                          : dayjs(data.date_created).fromNow()}
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
                      opacity: data.is_sending ? 0.3 : 1,
                    }}
                  >
                    <TouchableOpacity
                      disabled={data.is_sending}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                      onPress={handleLikeComment}
                    >
                      <FontAwesome
                        name="heart"
                        size={18}
                        color={
                          commentLiked ? colors.redish_2 : colors.secondary
                        }
                      />
                      <AppText
                        style={{
                          color: colors.secondary,
                        }}
                      >
                        {" "}
                        {data.comment_likes > 0 || data.comment_likes !== "0"
                          ? `${data.comment_likes}`
                          : ""}
                      </AppText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      disabled={data.is_sending}
                      onPress={handleReplyToComment}
                    >
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
                    <TouchableOpacity
                      disabled={data.is_sending}
                      onPress={handleReportModal}
                    >
                      <AppText
                        style={{
                          // margin: 15,
                          color: colors.secondary,
                        }}
                      >
                        Report
                      </AppText>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginBottom: 10, marginTop: 5 }}>
                    {data.comment_comments > 0 ||
                    data.comment_comments !== "0" ? (
                      data?.replies_isOpen ? (
                        <TouchableOpacity
                          onPress={() => handleCloseResponses(data.comment_id)}
                        >
                          <AppText style={styles.responses_text}>
                            Hide replies
                          </AppText>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => handleOpenResponses(data.comment_id)}
                        >
                          <AppText style={styles.responses_text}>
                            {data.comments_loading
                              ? "-loading responses-"
                              : "See responses"}
                          </AppText>
                        </TouchableOpacity>
                      )
                    ) : null}

                    <View>
                      {data?.replies_isOpen &&
                        data.comments_replies?.map((x) => (
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
                                    {x.replyingTo && (
                                      <AppText style={styles.date_posted}>
                                        &nbsp;&#x27A4;&nbsp;
                                        {x.replyingTo ? x.replyingTo : ""}
                                      </AppText>
                                    )}
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
                                  {/* <FontAwesome
                                    name="heart"
                                    size={18}
                                    color={colors.secondary}
                                  /> */}

                                  <AppText
                                    style={[
                                      styles.u_name,
                                      {
                                        color: colors.secondary,
                                        fontWeight: "500",
                                      },
                                    ]}
                                  >
                                    {dayjs(x.date_created).format("LT")}
                                  </AppText>

                                  <TouchableOpacity
                                    onPress={() => handleReplyToReply(x)}
                                  >
                                    <AppText
                                      style={{
                                        marginHorizontal: 15,
                                        color: colors.secondary,
                                      }}
                                    >
                                      Reply{" "}
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
      </TouchableWithoutFeedback>
    </>
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

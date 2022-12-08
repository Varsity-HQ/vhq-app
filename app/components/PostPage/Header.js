import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import colors from "../../config/colors";
import { TouchableWithoutFeedback, Image } from "react-native";
import Text from "../AppText";
import { connect } from "react-redux";
import Content from "../Post/content";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import emojis from "../../util/emojis";
import { PROFILE } from "../../navigation/routes";
import PostMenu from "../Post/PostMenu";
import PostPictures from "../Post/PostPictures";
import PollSection from "../Post/PollSection";
import { check_post_bookmarked, check_post_liked } from "../../util/postUtil";
import {
  bookmark_post,
  like_post,
  remove_bookmark,
  unlike_post,
} from "../../store/actions/actions";
import { BOOKMARKED_POST, REMOVE_BOOKMARK } from "../../util/toast_messages";
import Toast from "react-native-toast-message";
import Loader from "../Loaders/HomeUploading";
import MeetYourHost from "../Event/MeetYourHost";
import EventHeader from "../Event/EventHeader";

dayjs.extend(localizedFormat);

const mapStateToProps = (state) => {
  return {
    post_page: state.postPage,
    post: state.postPage.post?.post,
    account: state.postPage.post?.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    unlike_post: (pid) => dispatch(unlike_post(pid)),
    like_post: (pid) => dispatch(like_post(pid)),
    remove_bookmark: (pid) => dispatch(remove_bookmark(pid)),
    bookmark_post: (pid) => dispatch(bookmark_post(pid)),
  };
};

function HeaderPostContent({
  returnProfilePicture,
  post_page,
  loading = post_page.post_loading,
  post,
  account,
  unlike_post,
  like_post,
  remove_bookmark,
  bookmark_post,
}) {
  const navigation = useNavigation();
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!post) return;
    setIsLiked(check_post_liked(post.id));
    setIsBookMarked(check_post_bookmarked(post.id));
  }, [post_page]);

  const handleBookMark = () => {
    if (isBookMarked) {
      remove_bookmark(post.id);
      Toast.show({
        type: "general",
        autoHide: true,
        ...REMOVE_BOOKMARK,
      });
    } else {
      bookmark_post(post.id);
      Toast.show({
        type: "general",
        autoHide: true,
        ...BOOKMARKED_POST,
      });
    }

    setIsBookMarked(!isBookMarked);
  };

  const handleLikePost = () => {
    if (isLiked) {
      unlike_post(post.id);
    } else {
      like_post(post.id);
    }
    setIsLiked(!isLiked);
  };

  if (post?.postType === "event_post") {
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.h_left_sec}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back-outline"
                color={colors.white}
                size={30}
              />
            </TouchableOpacity>
            {loading ? (
              <Text
                style={[
                  styles.h_username,
                  {
                    color: colors.secondary_2,
                  },
                ]}
              >
                loading ...
              </Text>
            ) : (
              <Text style={styles.h_username}>Leave event</Text>
            )}
          </View>
          <View>
            {!loading ? (
              <PostMenu post_page data={{ ...post, ...account }} />
            ) : null}

            {/* <Ionicons
            name="ellipsis-horizontal-outline"
            color={colors.white}
            size={35}
          /> */}
          </View>
        </View>
        <EventHeader data={{ ...post, ...account }} />
        <View style={{ paddingVertical: 5 }}>
          <View
            style={{
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={[
                styles.u_name,
                {
                  color: colors.secondary,
                },
              ]}
            >
              About event
            </Text>
            <Content html={post.postHtmlText} />
          </View>
        </View>
        <MeetYourHost data={account} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.h_left_sec}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="arrow-back-outline"
              color={colors.white}
              size={30}
            />
          </TouchableOpacity>
          {loading ? (
            <Text
              style={[
                styles.h_username,
                {
                  color: colors.secondary_2,
                },
              ]}
            >
              loading ...
            </Text>
          ) : (
            <Text style={styles.h_username}>
              {post.anonymous_post ? (
                "Posted by anonymous"
              ) : (
                <>Posted by {account.username}</>
              )}
            </Text>
          )}
        </View>
        <View>
          {!loading ? (
            <PostMenu post_page data={{ ...post, ...account }} />
          ) : null}

          {/* <Ionicons
            name="ellipsis-horizontal-outline"
            color={colors.white}
            size={35}
          /> */}
        </View>
      </View>
      {loading ? (
        <View
          style={[
            styles.header,
            {
              justifyContent: "center",
              paddingVertical: 50,
              borderBottomWidth: 0,
            },
          ]}
        >
          <Loader color={colors.primary} animating size="large" />
        </View>
      ) : (
        <View>
          <View
            style={{
              paddingHorizontal: 0,
              marginTop: 15,
              borderBottomColor: colors.lighish,
              borderBottomWidth: 1,
            }}
          >
            <TouchableWithoutFeedback
              onPress={
                !post.anonymous_post
                  ? () => {
                      if (account.username === "account") return;
                      navigation.push(PROFILE, {
                        username: account.username,
                      });
                    }
                  : null
              }
            >
              <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
                {post.anonymous_post ? (
                  <>
                    <Image
                      source={{ uri: emojis[post.anonymous_emoji_index] }}
                      style={styles.p_avatar}
                    />
                  </>
                ) : (
                  <>
                    {returnProfilePicture(account.profilepic, styles.p_avatar)}
                  </>
                )}

                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.u_name}>
                    {post.anonymous_post
                      ? post.anonymous_name
                      : account.firstname + " " + account.surname}
                  </Text>
                  <Text style={styles.username}>
                    {post.anonymous_post ? (
                      <Text
                        style={[styles.username, { color: colors.secondary_2 }]}
                      >
                        anonymous account
                      </Text>
                    ) : (
                      <>@{account.username}</>
                    )}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ paddingVertical: 5 }}>
              {post.postType === "poll_post" && (
                <PollSection
                  // update_total_votes={update_total_votes}
                  created={post.created_at}
                  poll_id={post.id}
                  choices={post.poll_fields}
                  created_by={account.userID}
                  data={post}
                />
              )}

              <PostPictures images={post.attachments} />
              <View
                style={{
                  paddingHorizontal: 10,
                }}
              >
                <Content html={post.postHtmlText} />
              </View>
            </View>
            <View
              style={{
                paddingBottom: 10,
                marginHorizontal: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.lighish,
              }}
            >
              <Text style={styles.post_meta}>
                {dayjs(post.created_at).format("LT")} ~ by{" "}
                <Text style={[{ color: colors.secondary }, styles.post_meta]}>
                  VarsityHQ &nbsp;{post.application}
                </Text>
              </Text>
              <View style={styles.postUnisec}>
                <FontAwesome
                  style={styles.post_meta}
                  name="university"
                  size={10}
                />
                <Text style={styles.post_meta}>
                  &nbsp;{post.fromUniversity}
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 10,
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                  onPress={handleLikePost}
                >
                  {isLiked ? (
                    <Ionicons name="heart" size={25} color={colors.redish_2} />
                  ) : (
                    <Ionicons
                      name="heart-outline"
                      size={25}
                      color={colors.white}
                    />
                  )}

                  <Text style={{ fontSize: 15 }}>
                    &nbsp;{post.likes_count} Likes
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    marginLeft: 10,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ fontSize: 15 }}>
                    &nbsp;{post.comments_count} Comment
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleBookMark}>
                <View
                  style={{
                    marginLeft: 10,
                    marginRight: 10,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <FontAwesome
                    color={colors.white}
                    name={!isBookMarked ? "bookmark-o" : "bookmark"}
                    size={25}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  postUnisec: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  p_avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
    overflow: "hidden",
    backgroundColor: colors.darkish3,
  },
  post_meta: {
    color: colors.secondary,
    fontSize: 14,
  },
  u_name: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.white,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
  },
  username: {
    fontSize: 17,
    color: colors.secondary,
  },
  container: {
    paddingBottom: 15,
  },
  h_username: {
    fontSize: 17,
    color: colors.white,
    marginLeft: 5,
    fontWeight: "700",
  },
  h_left_sec: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
  },
  header: {
    paddingBottom: 10,
    borderBottomColor: colors.lighish,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPostContent);

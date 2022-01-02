import React from "react";
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
dayjs.extend(localizedFormat);

const mapStateToProps = (state) => {
  return {
    post_page: state.data.post_page,
    post: state.data.post_page.post?.post,
  };
};

function HeaderPostContent({
  returnProfilePicture,
  post_page,
  loading = post_page.post_loading,
  post,
}) {
  const navigation = useNavigation();
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
            <Text style={styles.h_username}>Loading post...</Text>
          ) : (
            <Text style={styles.h_username}>Posted by {post.username}</Text>
          )}
        </View>
        <View>
          <Ionicons
            name="ellipsis-horizontal-outline"
            color={colors.white}
            size={35}
          />
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
          <ActivityIndicator color={colors.primary} animating size="large" />
        </View>
      ) : (
        <View>
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 15,
              borderBottomColor: colors.lighish,
              borderBottomWidth: 1,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Profile")}
            >
              <View style={{ flexDirection: "row" }}>
                {post.anonymous_post ? (
                  <>
                    <Image
                      source={{ uri: emojis[post.anonymous_emoji_index] }}
                      style={styles.p_avatar}
                    />
                  </>
                ) : (
                  <>{returnProfilePicture(post.profilepic, styles.p_avatar)}</>
                )}

                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.u_name}>
                    {post.anonymous_post
                      ? post.anonymous_name
                      : post.firstname + " " + post.surname}
                  </Text>
                  <Text style={styles.username}>
                    {post.anonymous_post ? (
                      <Text
                        style={[styles.username, { color: colors.secondary_2 }]}
                      >
                        anonymous account
                      </Text>
                    ) : (
                      <>@{post.username}</>
                    )}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <View style={{ paddingVertical: 5 }}>
              <Content html={post.postHtmlText} />
            </View>
            <View
              style={{
                paddingBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.lighish,
              }}
            >
              <Text style={styles.post_meta}>
                {dayjs(post.created_at).format("LLL")} ~ by{" "}
                <Text style={{ color: colors.secondary }}>
                  VasityHQ &nbsp;{post.application}
                </Text>
              </Text>
              <Text style={[styles.post_meta, { marginTop: 5 }]}>
                <FontAwesome
                  style={{ marginRight: 10 }}
                  name="university"
                  size={12}
                />
                &nbsp;{post.university}
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 10,
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
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <FontAwesome color={colors.white} name="heart-o" size={20} />
                  <Text style={{ fontSize: 15 }}>
                    &nbsp;{post.likes_count} Likes
                  </Text>
                </View>
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
              <View
                style={{
                  marginLeft: 10,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <FontAwesome color={colors.white} name="bookmark-o" size={25} />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  p_avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
    overflow: "hidden",
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
  container: {},
  h_username: {
    fontSize: 17,
    color: colors.white,
    marginLeft: 5,
    fontWeight: "700",
  },
  h_left_sec: {
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    padding: 10,
    borderBottomColor: colors.lighish,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default connect(mapStateToProps, null)(HeaderPostContent);

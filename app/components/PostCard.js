import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image as ImageLocal,
  Platform,
} from "react-native";
import colors from "../config/colors";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SkeletonComponent from "./Skeletons/SkeletonComponent";
import SkeletonPost from "./Skeletons/Post";
import dayjs from "dayjs";
import Localize from "dayjs/plugin/relativeTime";
import Content from "./Post/content";
import PostMenu from "./Post/PostMenu";
import { Image } from "react-native-expo-image-cache";
import ParsedText from "react-native-parsed-text";

import * as routes from "../navigation/routes";

dayjs.extend(Localize);

function PostCard({ data }) {
  useEffect(() => {
    return;
  }, []);

  const navigation = useNavigation();

  const profilepic = (uri) => {
    let image_uri = "";

    if (uri) {
      image_uri = data.profilepic;
    } else {
      image_uri = require("../assets/avatar.png");
    }

    return image_uri;
  };

  if (!data) return <SkeletonPost />;

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.push(routes.PROFILE, { username: data.username })
            }
          >
            <View style={{ flexDirection: "row" }}>
              {data.profilepic ? (
                <Image
                  style={styles.p_avatar}
                  uri={profilepic(data.profilepic)}
                  transitionDuration={300}
                />
              ) : (
                <ImageLocal
                  style={styles.p_avatar}
                  uri={profilepic(data.profilepic)}
                  source={require("../assets/avatar.png")}
                />
              )}

              <View style={{ marginLeft: 10 }}>
                <View style={styles.post_header}>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    lineBreakMode="tail"
                    style={styles.u_name}
                  >
                    {data.firstname}&nbsp;{data.surname.charAt(0)}
                  </Text>
                  <Text style={styles.date_posted}>
                    {dayjs(data.created_at).fromNow()}
                  </Text>
                </View>
                <Text style={styles.username}>
                  @{data.username} - <FontAwesome name="university" size={12} />
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ marginRight: 10 }}>
            <PostMenu />
          </View>
        </View>
        <View style={styles.content_container}>
          <TouchableWithoutFeedback onPress={() => console.log("clicked")}>
            <Content html={data.postHtmlText} />
          </TouchableWithoutFeedback>

          {/* <Text
          onPress={() => nav.navigate("PostPage")}
          style={{ fontSize: 16, color: colors.light }}
        >
          {JSON.stringify(data.caption)}
        </Text> */}
        </View>
        <View
          style={{
            // marginTop: 15,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 14, color: colors.secondary }}>
            {parseInt(data.likes_count) + parseInt(data.comments_count)}{" "}
            interactions
          </Text>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ImageLocal
                style={{
                  height: 18,
                  width: 18,
                  marginRight: 5,
                }}
                source={require("../assets/vhqcat-small.png")}
              />
              <Text style={{ fontSize: 13, color: "#4f708a" }}>
                {/* {data.application} */}
                VarsityHQ ~{""}
                {Platform.OS === "ios" && " iPhone"}
                {Platform.OS === "android" && " Android"}
                {Platform.OS === "web" && " Web"}
                {Platform.OS === "macos" && " Mac"}
                {Platform.OS === "windows" && " Windows"}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View style={styles.button}>
              <Ionicons name="heart" size={26} color={colors.white} />
              <Text style={styles.button_text}>{data.likes_count}</Text>
            </View>
            <View style={styles.button}>
              <Ionicons
                name="ios-chatbubbles-outline"
                size={25}
                color={colors.white}
              />
              <Text style={styles.button_text}>{data.comments_count}</Text>
            </View>
            <View style={styles.button}>
              <Ionicons
                name="ios-chatbox-ellipses-outline"
                size={26}
                color={colors.white}
              />
            </View>
          </View>
          <View style={styles.button}>
            <Feather name="bookmark" size={26} color={colors.white} />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  post_header: {
    flexDirection: "row",
    alignItems: "center",
  },
  button_text: {
    color: colors.white,
    fontSize: 16,
    paddingLeft: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  content_container: {
    // paddingTop: 20,
  },
  date_posted: {
    paddingLeft: 10,
    fontSize: 12,
    fontWeight: "500",
    color: colors.secondary,
    alignSelf: "center",
    position: "relative",
  },
  username: {
    fontSize: 17,
    color: colors.secondary,
  },
  u_name: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.white,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
  },
  p_avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  container: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 10,
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
  },
});

export default PostCard;

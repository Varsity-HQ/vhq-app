import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import colors from "../config/colors";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SkeletonComponent from "./Skeletons/SkeletonComponent";
import SkeletonPost from "./Skeletons/Post";
import dayjs from "dayjs";
import Localize from "dayjs/plugin/relativeTime";

// import { Image } from "react-native-expo-image-cache";

dayjs.extend(Localize);

function PostCard({ data }) {
  const nav = useNavigation();
  console.log(data);

  const profilepic = (uri) => {
    if (uri) return { uri: data.profilepic };

    return require("../assets/avatar.png");
  };

  if (!data) return <SkeletonPost />;

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableWithoutFeedback onPress={() => nav.push("Profile")}>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.p_avatar}
              source={profilepic(data.profilepic)}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.u_name}>
                {data.firstname}&nbsp;{data.surname.charAt(0)}
                <Text style={styles.date_posted}>
                  &nbsp;{dayjs(data.created_at).fromNow()}
                </Text>
              </Text>
              <Text style={styles.username}>
                @{data.username} - <FontAwesome name="university" size={12} />
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ marginRight: 10 }}>
          <Ionicons
            color={colors.white}
            name="ios-ellipsis-horizontal-outline"
            size={30}
          />
        </View>
      </View>
      <View style={styles.content_container}>
        <Text
          onPress={() => nav.navigate("PostPage")}
          style={{ fontSize: 16, color: colors.light }}
        >
          {JSON.stringify(data.caption)}
        </Text>
      </View>
      <View
        style={{
          marginTop: 15,
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
            <Image
              style={{
                height: 18,
                width: 18,
                marginRight: 5,
              }}
              source={require("../assets/vhqcat-small.png")}
            />
            <Text style={{ fontSize: 13, color: "#4f708a" }}>
              {data.application}
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
  );
}

const styles = StyleSheet.create({
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
    paddingTop: 20,
  },
  date_posted: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.secondary,
    alignSelf: "center",
    marginBottom: 2,
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
    padding: 10,
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
  },
});

export default PostCard;

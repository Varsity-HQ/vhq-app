import React, { useEffect, useRef, useState } from "react";
import { Animated, TouchableOpacity } from "react-native";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Image } from "react-native-expo-image-cache";
import { connect } from "react-redux";
import colors from "../../config/colors";
import Text from "../AppText";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import db from "../../util/fb_admin";
const {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} = require("firebase/firestore");

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
    username: state.core.accData.username,
  };
};

function PostCardFooter({ profilepic, data, username }) {
  const [showExplicitly, setShowExplicitly] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [posting_comment, setPostingComment] = useState(false);

  if (data.comments_count > 0 || data.comments_count > "0") {
    //
    async function comments_query() {
      const _collection = collection(db, "comments");

      const _query = query(
        _collection,
        where("post_id", "==", data.id),
        orderBy("date_created", "desc"),
        limit(2),
      );

      const Snapshot = await getDocs(_query);
      const list = Snapshot.docs.map((doc) => doc.data());
      return list;
    }

    // const query = db
    //   .collection("comments")
    //   .where("post_id", "==", post_id)
    //   .orderBy("date_created", "desc")
    //   .limit(2);

    const handle_get_comments = async () => {
      await comments_query()
        .then((data) => {
          setComments(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    useEffect(() => {
      // console.log("ran");

      handle_get_comments();

      // query.get().then((data) => {
      //   let __com = [];
      //   data.forEach((x) => {
      //     __com.push(x.data());
      //   });
      //   setComments(__com);
      //   hasLoaded();
      // });
    }, [data.id]);
  }

  const handleSubmit = () => {
    setPostingComment(true);
    axios
      .post(`/post/comment/${data.id}`, {
        post_id: data.id,
        comment: comment,
      })
      .then(() => {
        setShowExplicitly(true);
        let c_comments = comments;
        c_comments.push({
          comment_text: comment,
          commenter_username: username,
        });
        setComments(c_comments);
        setPostingComment(false);
        setComment("");
      })
      .catch((err) => {
        console.log(err);
        setPostingComment(false);
      });
  };

  // console.log({ comment: data.id });
  return (
    <>
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 10,
          ...styles.def_padding,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <View style={styles.button}>
            <Ionicons name="heart-outline" size={26} color={colors.white} />
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
          <TouchableOpacity style={styles.button}>
            <Ionicons
              name="ios-chatbox-ellipses-outline"
              size={26}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <Feather name="bookmark" size={26} color={colors.white} />
        </View>
      </View>

      {showExplicitly && (
        <Animatable.View duration={2000} animation="fadeIn">
          <View style={styles.container}>
            <View
              style={
                comments.length > 0 && {
                  marginTop: 10,
                }
              }
            >
              {comments.map((x, index) => (
                <View
                  key={x.comment_id ? x.comment_id : "c_" + index}
                  style={{
                    flexDirection: "row",
                    marginBottom: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.c_username}>
                    - {x.commenter_username}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.c_comment}
                  >
                    {x.comment_text}
                  </Text>
                </View>
              ))}
            </View>

            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center",
                position: "relative",
              }}
            >
              {posting_comment && (
                <Animatable.View
                  animation="fadeIn"
                  style={styles.posting_overlay}
                >
                  <Text style={styles.posting_overlay_text}>Posting...</Text>
                </Animatable.View>
              )}

              <Image style={styles.profilepic} uri={profilepic} />
              <TextInput
                onChangeText={(e) => setComment(e)}
                placeholderTextColor={colors.secondary_2}
                placeholder="Write your comment"
                style={styles.input}
                value={comment}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  marginRight: 10,
                }}
              >
                <Ionicons name="send" size={23} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  posting_overlay_text: {
    fontSize: 14,
    color: colors.light,
    fontStyle: "italic",
  },
  posting_overlay: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.dark_opacity_2,
    borderRadius: 100,
    zIndex: 1,
    height: "100%",
    width: "100%",
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
  def_padding: {
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderColor: "red",
    borderWidth: 0,
    height: 28,
    color: colors.white,
    marginHorizontal: 10,
  },
  profilepic: {
    height: 28,
    width: 28,
    borderRadius: 100,
  },
  c_comment: {
    color: colors.secondary_2,
    flex: 1,
  },
  c_username: {
    fontWeight: "700",
    marginRight: 5,
  },
  container: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    // paddingTop: 10,
  },
});

export default connect(mapStateToProps, null)(PostCardFooter);

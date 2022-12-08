import React, { PureComponent, useEffect, useRef, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { PROFILE } from "../../navigation/routes";
import PostCardButtons from "./PostCardButtons";
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

function CommentComponent({ x }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: 5,
        alignItems: "center",
      }}
    >
      <Text
        onPress={() =>
          navigation.push(PROFILE, {
            username: x.commenter_username,
          })
        }
        style={styles.c_username}
      >
        - {x.commenter_username}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.c_comment}>
        {x.comment_text}
      </Text>
    </View>
  );
}

class PostCardFooter extends PureComponent {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  state = {
    showExplicitly: true,
    comment: "",
    comments: [],
    posting_comment: false,
  };

  // componentDidMount() {
  //   const data = this.props.data;
  //   this._isMounted = true;

  //   if (
  //     data.comments_count > 0 ||
  //     (data.comments_count > "0" && this._isMounted)
  //   ) {
  //     // this.handle_get_comments();
  //   }
  // }

  componentWillUnmount() {
    this._isMounted = false;
  }

  comments_query = async () => {
    const _collection = collection(db, "comments");
    const _query = query(
      _collection,
      where("post_id", "==", this.props.data.id),
      orderBy("date_created", "desc"),
      limit(2),
    );
    const Snapshot = await getDocs(_query);
    const list = Snapshot.docs.map((doc) => doc.data());
    return list;
  };

  handle_get_comments = () => {
    this.comments_query()
      .then((data) => {
        this._isMounted &&
          this.setState({
            comments: data,
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleSubmit = () => {
    const comment = this.state.comment;
    this.setState({
      posting_comment: true,
    });

    axios
      .post(`/post/comment/${this.props.data.id}`, {
        post_id: this.props.data.id,
        comment: comment,
      })
      .then(() => {
        let c_comments = this.state.comments;

        c_comments.push({
          comment_text: comment,
          commenter_username: this.props.username,
        });

        this.setState({
          posting_comment: false,
          comment: "",
          comments: c_comments,
          showExplicitly: true,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          posting_comment: false,
        });
      });
  };
  render() {
    return (
      <>
        {this.state.showExplicitly && (
          <Animatable.View duration={2000} animation="fadeIn">
            <View style={styles.container}>
              {/* <View
                style={
                  this.state.comments.length > 0 && {
                    marginTop: 10,
                  }
                }
              >
                {this.state.comments.map((x, index) => (
                  <CommentComponent
                    key={x.comment_id ? x.comment_id : "c_" + index}
                    x={x}
                  />
                ))}
              </View> */}

              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {this.state.posting_comment && (
                  <Animatable.View
                    animation="fadeIn"
                    style={styles.posting_overlay}
                  >
                    <Text style={styles.posting_overlay_text}>Posting...</Text>
                  </Animatable.View>
                )}

                <Image style={styles.profilepic} uri={this.props.profilepic} />
                <TextInput
                  onChangeText={(e) => this.setState({ comment: e })}
                  placeholderTextColor={colors.secondary_2}
                  placeholder="Write your comment"
                  style={styles.input}
                  value={this.state.comment}
                />
                <TouchableOpacity
                  onPress={this.handleSubmit}
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

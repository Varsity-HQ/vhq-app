import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import { Ionicons, Feather } from "@expo/vector-icons";
import Text from "../AppText";
import { check_post_bookmarked, check_post_liked } from "../../util/postUtil";
import { connect } from "react-redux";
import {
  like_post,
  unlike_post,
  bookmark_post,
  remove_bookmark,
  follow_account,
} from "../../store/actions/actions";
import Toast from "react-native-toast-message";
import Commenticon from "./commentIcon";
import {
  BOOKMARKED_POST,
  COPY_POST_URL,
  COPY_URL_IN_POST,
  REMOVE_BOOKMARK,
} from "../../util/toast_messages";
import * as Clipboard from "expo-clipboard";
import check_if_followed from "../../util/check_if_followed";
import { normalizeText } from "../../util/responsivePx";

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    like_post: (pid) => dispatch(like_post(pid)),
    unlike_post: (pid) => dispatch(unlike_post(pid)),
    remove_bookmark: (pid) => dispatch(remove_bookmark(pid)),
    bookmark_post: (pid) => dispatch(bookmark_post(pid)),
    follow_account: (uid) => dispatch(follow_account(uid)),
  };
};

class PostCardButtons extends PureComponent {
  state = {
    bookmarked: false,
    post_liked: false,
    myPost: false,
    following_poster: false,
  };

  componentDidMount = () => {
    this.setState({
      post_liked: check_post_liked(this.props.data.id),
      bookmarked: check_post_bookmarked(this.props.data.id),
      following_poster: check_if_followed(this.props.data.posted_by),
    });
  };

  handleFollowPoster = () => {
    if (!check_if_followed(this.props.data.posted_by)) {
      this.props.follow_account(this.props.data.posted_by);
      this.setState({
        following_poster: true,
      });
    }
  };

  handleCopyPost = () => {
    Clipboard.setString(`https://varsityhq.co.za/p/${this.props.data.id}`);
    Toast.show({
      type: "general",
      autoHide: true,
      ...COPY_POST_URL,
    });
  };

  handleLikePost = () => {
    if (this.state.post_liked) {
      this.props.unlike_post(this.props.data.id);
    } else {
      this.props.like_post(this.props.data.id);
    }

    this.setState({
      post_liked: !this.state.post_liked,
    });
  };

  handleBookmarkPress = () => {
    if (this.state.bookmarked) {
      this.props.remove_bookmark(this.props.data.id);
      Toast.show({
        type: "general",
        autoHide: true,
        ...REMOVE_BOOKMARK,
      });
    } else {
      this.props.bookmark_post(this.props.data.id);
      Toast.show({
        type: "general",
        autoHide: true,
        ...BOOKMARKED_POST,
      });
    }

    this.setState({
      bookmarked: !this.state.bookmarked,
    });
  };

  render() {
    const data = this.props.data;
    return (
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
          <TouchableOpacity onPress={this.handleLikePost} style={styles.button}>
            {this.state.post_liked ? (
              <Ionicons
                name="heart"
                size={normalizeText(24)}
                color={colors.redish_2}
              />
            ) : (
              <Ionicons
                name="heart-outline"
                size={normalizeText(24)}
                color={colors.white}
              />
            )}

            <Text style={styles.button_text}>{data.likes_count}</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <Commenticon fill={colors.white} size={normalizeText(23)} />
            <Text style={styles.button_text}>{data.comments_count}</Text>
          </View>
          <TouchableOpacity onPress={this.handleCopyPost} style={styles.button}>
            <Ionicons
              name="copy-outline"
              size={normalizeText(23)}
              color={colors.white}
            />
          </TouchableOpacity>
          {!this.state.following_poster && !data.anonymous_post && (
            <TouchableOpacity
              onPress={this.handleFollowPoster}
              style={styles.button_f}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.button_text_2}
              >
                <Feather
                  name="user-plus"
                  size={normalizeText(11)}
                  color={colors.secondary}
                />
                &nbsp;Follow @{data.username}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={this.handleBookmarkPress}
          style={styles.button}
        >
          {this.state.bookmarked ? (
            <Ionicons
              name="bookmark"
              size={normalizeText(22)}
              color={colors.white}
            />
          ) : (
            <Ionicons
              name="bookmark-outline"
              size={normalizeText(22)}
              color={colors.white}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button_text: {
    color: colors.white,
    fontSize: normalizeText(15),
    paddingLeft: 5,
  },
  button_text_2: {
    color: colors.secondary,
    fontSize: normalizeText(12),
    // paddingLeft: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    // backgroundColor: colors.dark,
  },
  button_f: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    backgroundColor: colors.darkish,
    paddingHorizontal: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.secondary_2,
  },
  container: {},
  def_padding: {
    paddingHorizontal: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCardButtons);

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
} from "../../store/actions/actions";
import Toast from "react-native-toast-message";
import Commenticon from "./commentIcon";
import { BOOKMARKED_POST, REMOVE_BOOKMARK } from "../../util/toast_messages";

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
  };
};

class PostCardButtons extends PureComponent {
  state = {
    bookmarked: false,
    post_liked: false,
    myPost: false,
  };

  componentDidMount = () => {
    this.setState({
      post_liked: check_post_liked(this.props.data.id),
      bookmarked: check_post_bookmarked(this.props.data.id),
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
              <Ionicons name="heart" size={26} color={colors.redish_2} />
            ) : (
              <Ionicons name="heart-outline" size={26} color={colors.white} />
            )}

            <Text style={styles.button_text}>{data.likes_count}</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <Commenticon fill={colors.white} size={25} />
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
        <TouchableOpacity
          onPress={this.handleBookmarkPress}
          style={styles.button}
        >
          {this.state.bookmarked ? (
            <Ionicons name="bookmark" size={26} color={colors.white} />
          ) : (
            <Ionicons name="bookmark-outline" size={26} color={colors.white} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
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
  container: {},
  def_padding: {
    paddingHorizontal: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostCardButtons);

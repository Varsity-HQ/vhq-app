import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { RFValue } from "react-native-responsive-fontsize";
import { POST_PAGE } from "../../navigation/routes";
import { save_local_post } from "../../store/actions/postPage";

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
    save_local_post: (post) => dispatch(save_local_post(post)),
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
    Clipboard.setString(`https://web.varsityhq.co.za/p/${this.props.data.id}`);
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
    const hideFollowBtn = this.props.hideFollowBtn;
    const askvi = this.props.askvi;
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
          <TouchableOpacity
            onPress={this.handleLikePost}
            style={[
              styles.button,
              {
                marginRight: askvi ? 10 : 15,
              },
            ]}
          >
            {askvi ? (
              <MaterialCommunityIcons
                name="arrow-up-bold-outline"
                size={RFValue(22)}
                color={this.state.post_liked ? colors.redish_2 : colors.white}
              />
            ) : (
              <>
                {this.state.post_liked ? (
                  <Ionicons
                    name="heart"
                    size={RFValue(24)}
                    color={colors.redish_2}
                  />
                ) : (
                  <Ionicons
                    name="heart-outline"
                    size={RFValue(24)}
                    color={colors.white}
                  />
                )}
              </>
            )}

            <Text style={styles.button_text}>{data.likes_count}</Text>
          </TouchableOpacity>
          {askvi && (
            <TouchableOpacity
              onPress={this.handleLikePost}
              style={styles.button}
            >
              <MaterialCommunityIcons
                name="arrow-down-bold-outline"
                size={RFValue(22)}
                color={colors.white}
              />
            </TouchableOpacity>
          )}

          <View style={styles.button}>
            <Commenticon fill={colors.white} size={RFValue(22)} />
            <Text style={styles.button_text}>
              {data.comments_count} {askvi ? "answers" : null}
            </Text>
          </View>
          {!askvi && (
            <TouchableOpacity
              onPress={this.handleCopyPost}
              style={styles.button}
            >
              <Ionicons
                name="copy-outline"
                size={RFValue(21)}
                color={colors.white}
              />
            </TouchableOpacity>
          )}
          {!this.state.following_poster &&
            !data.anonymous_post &&
            !hideFollowBtn && (
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
                    size={RFValue(11)}
                    color={colors.secondary}
                  />
                  &nbsp;Follow @{data.username.substring(0, 9)}..
                </Text>
              </TouchableOpacity>
            )}
        </View>
        {askvi ? (
          <TouchableOpacity
            onPress={() => {
              this.props.save_local_post(data);
              this.props.navigation.navigate(POST_PAGE, {
                post_id: data.id,
              });
            }}
            style={styles.button_askvi}
          >
            <Text>Answer this</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={this.handleBookmarkPress}
            style={styles.button}
          >
            {this.state.bookmarked ? (
              <Ionicons
                name="bookmark"
                size={RFValue(22)}
                color={colors.white}
              />
            ) : (
              <Ionicons
                name="bookmark-outline"
                size={RFValue(22)}
                color={colors.white}
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button_text: {
    color: colors.white,
    fontSize: RFValue(14),
    paddingLeft: 5,
  },
  button_text_2: {
    color: colors.secondary,
    fontSize: RFValue(11),
    // paddingLeft: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    // flex: 1,
    // backgroundColor: colors.dark,
  },
  button_askvi: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 100,
    paddingVertical: 8,
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

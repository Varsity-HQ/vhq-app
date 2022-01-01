import React, { PureComponent } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import { Ionicons, Feather } from "@expo/vector-icons";
import Text from "../AppText";
import { post_bookmarked, post_liked } from "../../util/postUtil";
import { connect } from "react-redux";
import { like_post, unlike_post } from "../../store/actions/actions";

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    like_post: (pid) => dispatch(like_post(pid)),
    unlike_post: (pid) => dispatch(unlike_post(pid)),
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
      post_liked: post_liked(this.props.data.id),
      bookmarked: post_bookmarked(this.props.data.id),
    });
  };

  handleLikePost = () => {
    this.setState({
      post_liked: !this.state.post_liked,
    });

    if (this.state.post_liked) {
      this.props.unlike_post(this.props.data.id);
    } else {
      this.props.like_post(this.props.data.id);
    }
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
            {post_liked ? (
              <Ionicons name="heart" size={26} color={colors.redish} />
            ) : (
              <Ionicons name="heart-outline" size={26} color={colors.white} />
            )}

            <Text style={styles.button_text}>{data.likes_count}</Text>
          </TouchableOpacity>
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

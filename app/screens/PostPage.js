import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image as ImageLocal,
  LayoutAnimation,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import PostPageComment from "../components/PostPageComment";
import { Image } from "react-native-expo-image-cache";
// import KeyboardShift from "../components/KeyboardShift";
import KeyboardEventListener from "../components/KeyboardEventListener";
import { connect } from "react-redux";
import CommentTextInput from "../components/PostPage/CommentTextInput";
import HeaderPostContent from "../components/PostPage/Header";
import InputAccessoryView from "../components/InputAccessoryView";
import { get_post_page, clear_post_page } from "../store/actions/postPage";

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
    post_page: state.postPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    get_post_page: (pid) => dispatch(get_post_page(pid)),
    clear_post_page: () => dispatch(clear_post_page()),
  };
};

class PostPage extends React.PureComponent {
  _isMounted = false;
  state = {
    post_id: "",
  };

  returnProfilePicture = (profilepic, style) => {
    if (profilepic) {
      return <Image uri={profilepic} style={style} />;
    } else {
      return (
        <ImageLocal source={require("../assets/avatar.png")} style={style} />
      );
    }
  };

  componentWillUnmount = () => {
    this.props.clear_post_page();
  };

  componentDidMount = () => {
    this._isMounted = true;

    const { post_id } = this.props.route.params;

    this.setState({
      post_id,
    });

    console.log("post page loaded");

    this.props.get_post_page(post_id);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  renderComments = ({ item }) => (
    <PostPageComment
      returnProfilePicture={this.returnProfilePicture}
      data={item}
    />
  );

  render() {
    return (
      <>
        <Screen style={styles.container}>
          <FlatList
            ListHeaderComponent={
              <HeaderPostContent
                returnProfilePicture={this.returnProfilePicture}
              />
            }
            data={
              this.props.post_page.comments_loading
                ? []
                : this.props.post_page.comments
            }
            renderItem={this.renderComments}
            keyExtractor={(item) => item.comment_id}
            ListFooterComponent={() => (
              <View>
                {this.props.post_page.comments_loading ? (
                  <>
                    <PostPageComment skeleton />
                    <PostPageComment skeleton />
                    <PostPageComment skeleton />
                  </>
                ) : (
                  <View
                    style={{
                      marginBottom: 200,
                    }}
                  />
                )}
              </View>
            )}
          />
        </Screen>
        {/* <KeyboardShift> */}

        <InputAccessoryView>
          {!this.props.post_page.comments_loading && (
            <View
              style={[
                styles.comment_box_container,
                // Platform.OS === "android" && {
                //   bottom: this.state.keyboardHeight,
                // },
              ]}
            >
              <CommentTextInput
                returnProfilePicture={this.returnProfilePicture}
              />
            </View>
          )}
        </InputAccessoryView>
        {/* </KeyboardShift> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  comment_box_container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopColor: colors.black,
    borderTopWidth: 2,
    backgroundColor: colors.dark,
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.68,
    elevation: 12,
  },

  p_avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
    backgroundColor: colors.darkish3,
  },

  container: {
    // paddingBottom: 30,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);

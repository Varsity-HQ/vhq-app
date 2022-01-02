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
  InputAccessoryView,
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

const mapStateToProps = (state) => {
  return {
    account: state.core.accData,
  };
};

class PostPage extends React.PureComponent {
  state = {
    keyboardHeight: 0,
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

  componentDidMount = () => {
    KeyboardEventListener.subscribe(
      ({ keyboardHeight, layoutAnimationConfig }) => {
        LayoutAnimation.configureNext(layoutAnimationConfig);
        this.setState({ keyboardHeight });
      },
    );
  };

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
            data={[]}
            ListFooterComponent={() => (
              <View>
                <PostPageComment skeleton />
                <PostPageComment skeleton />
                <PostPageComment skeleton />
              </View>
            )}
          />
        </Screen>
        {/* <KeyboardShift> */}

        <InputAccessoryView backgroundColor="#000">
          <View
            style={[
              styles.comment_box_container,
              Platform.OS === "android" && {
                bottom: this.state.keyboardHeight,
              },
            ]}
          >
            <CommentTextInput
              returnProfilePicture={this.returnProfilePicture}
            />
          </View>
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
    // borderTopColor: colors.black,
    // borderTopWidth: 2,
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
  },

  container: {},
});

export default connect(mapStateToProps, null)(PostPage);

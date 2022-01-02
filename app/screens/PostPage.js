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
} from "react-native";

import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import PostPageComment from "../components/PostPageComment";
import { Image } from "react-native-expo-image-cache";
// import KeyboardShift from "../components/KeyboardShift";
import KeyboardEventListener from "../components/KeyboardEventListener";
import { connect } from "react-redux";
import Header from "../components/PostPage/Header";

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
              <Header returnProfilePicture={this.returnProfilePicture} />
            }
            data={[]}
            ListFooterComponent={() => (
              <View>
                <PostPageComment />
                <PostPageComment />
                <PostPageComment />
              </View>
            )}
            style={{ borderColor: "red", borderWidth: 1 }}
          />
        </Screen>
        {/* <KeyboardShift> */}

        <View
          style={[
            styles.comment_box_container,
            { bottom: this.state.keyboardHeight },
          ]}
        >
          <View style={[styles.repy_container]}>
            {this.returnProfilePicture(
              this.props.account.profilepic,
              styles.profilepic,
            )}
            <TextInput
              placeholderTextColor={colors.secondary_2}
              style={styles.comment_input}
              placeholder="Write comment"
            />
            <TouchableOpacity style={styles.send_btn}>
              <Text style={styles.sendBtnText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </KeyboardShift> */}
      </>
    );
  }
}

const styles = StyleSheet.create({
  send_btn: {
    borderLeftColor: "#dee2e6",
    borderLeftWidth: 2,
    paddingHorizontal: 12,
    height: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  sendBtnText: {
    fontSize: 16,
    color: "#dee2e6",
    fontWeight: "700",
  },
  profilepic: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  comment_input: {
    borderColor: "red",
    borderWidth: 0,
    height: "100%",
    flex: 1,
    marginHorizontal: 7,
    color: colors.white,
  },
  comment_box_container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopColor: colors.black,
    borderTopWidth: 2,
    backgroundColor: colors.dark,
    bottom: 0,
  },
  repy_container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    borderColor: colors.skblue,
    borderWidth: 2,
    paddingHorizontal: 7,
    paddingVertical: 7,
    // height: "100%",
    // left: 0,
    // position: "absolute",
    // top: 0,
    // width: "100%",
  },
  p_avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },

  container: {},
});

export default connect(mapStateToProps, null)(PostPage);

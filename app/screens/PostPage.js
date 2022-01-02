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
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppText from "../components/AppText";
import PostPageComment from "../components/PostPageComment";
import { Image } from "react-native-expo-image-cache";
// import KeyboardShift from "../components/KeyboardShift";
import KeyboardEventListener from "../components/KeyboardEventListener";
import { connect } from "react-redux";

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
          <View style={styles.header}>
            <View style={styles.h_left_sec}>
              <Ionicons
                name="arrow-back-outline"
                color={colors.white}
                size={30}
              />
              <Text style={styles.h_username}>Posted by chikx_12</Text>
            </View>
            <View>
              <Ionicons
                name="ellipsis-horizontal-outline"
                color={colors.white}
                size={35}
              />
            </View>
          </View>

          <View>
            <View
              style={{
                paddingHorizontal: 10,
                marginTop: 15,
                borderBottomColor: colors.lighish,
                borderBottomWidth: 1,
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                <View style={{ flexDirection: "row" }}>
                  {this.returnProfilePicture(
                    "https://varsityhq.imgix.net/vhq_img202122286166.jpeg",
                    styles.p_avatar,
                  )}
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.u_name}>Paballo M </Text>
                    <Text style={styles.username}>@pabie</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={{ paddingVertical: 20 }}>
                <AppText>Ole left the group</AppText>
              </View>
              <View
                style={{
                  paddingBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.lighish,
                }}
              >
                <AppText style={styles.post_meta}>
                  November 21, 2021 3:09PM ~ VasityHQ Iphone
                </AppText>
                <AppText style={styles.post_meta}>
                  <FontAwesome
                    style={{ marginRight: 10 }}
                    name="university"
                    size={12}
                  />
                  &nbsp;University of Johannesburg
                </AppText>
              </View>
              <View
                style={{
                  paddingVertical: 10,
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <FontAwesome
                      color={colors.white}
                      name="heart-o"
                      size={20}
                    />
                    <AppText style={{ fontSize: 15 }}>&nbsp;2 Likes</AppText>
                  </View>
                  <View
                    style={{
                      marginLeft: 10,
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <AppText style={{ fontSize: 15 }}>&nbsp;1 Comment</AppText>
                  </View>
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <FontAwesome
                    color={colors.white}
                    name="bookmark-o"
                    size={25}
                  />
                </View>
              </View>
            </View>
            <View>
              <PostPageComment />
              <PostPageComment />
              <PostPageComment />
            </View>
          </View>
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
  post_meta: {
    color: colors.secondary,
    fontSize: 14,
  },
  u_name: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.white,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
  },
  username: {
    fontSize: 17,
    color: colors.secondary,
  },
  p_avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
  },
  h_username: {
    fontSize: 17,
    color: colors.white,
    marginLeft: 5,
    fontWeight: "700",
  },
  h_left_sec: {
    alignItems: "center",
    flexDirection: "row",
  },
  container: {},
  header: {
    padding: 10,
    borderBottomColor: colors.lighish,
    borderBottomWidth: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default connect(mapStateToProps, null)(PostPage);

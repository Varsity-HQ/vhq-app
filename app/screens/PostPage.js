import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { Image } from "react-native";
import AppText from "../components/AppText";
import { color } from "react-native-elements/dist/helpers";
import { ScrollView } from "react-native";
import PostPageComment from "../components/PostPageComment";
import AppTextInput from "../components/Input";
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";

function PostPage({ navigation }) {
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const onKeyboardShow = (event) =>
    setKeyboardOffset(event.endCoordinates.height);
  const onKeyboardHide = () => setKeyboardOffset(0);
  const keyboardDidShowListener = useRef();
  const keyboardDidHideListener = useRef();

  useEffect(() => {
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardWillShow",
      onKeyboardShow,
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardWillHide",
      onKeyboardHide,
    );

    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);

  console.log({ keyboardOffset });
  const keyboardVerticalOffset = Platform.OS === "ios" ? 20 : 0;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      //   behavior={Platform.OS === "ios" ? "padding" : "height"}
      behavior="height"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <Screen style={styles.container}>
        <View style={styles.header}>
          <View style={styles.h_left_sec}>
            <Ionicons
              name="arrow-back-outline"
              color={colors.white}
              size={40}
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

        <ScrollView>
          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 15,
              borderBottomColor: colors.lighish,
              borderBottomWidth: 1,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Profile")}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={styles.p_avatar}
                  source={{
                    uri: "https://varsityhq.imgix.net/vhq_img202122286166.jpeg",
                  }}
                />
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
                  <FontAwesome color={colors.white} name="heart-o" size={20} />
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
                <FontAwesome color={colors.white} name="bookmark-o" size={25} />
              </View>
            </View>
          </View>
          <View>
            <PostPageComment />
            <PostPageComment />
            <PostPageComment />
          </View>
        </ScrollView>
      </Screen>
      <View style={[styles.repy_container]}>
        <View>
          <AppTextInput />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  repy_container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderTopColor: colors.black,
    borderTopWidth: 2,
    backgroundColor: colors.dark,
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

export default PostPage;

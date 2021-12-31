import React, { useRef, useState } from "react";
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

const mapStateToProps = (state) => {
  return {
    profilepic: state.core.accData.profilepic,
  };
};

function PostCardFooter({ profilepic, data }) {
  const [showExplicitly, setShowExplicitly] = useState(true);
  return (
    <>
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
          <View style={styles.button}>
            <Ionicons name="heart-outline" size={26} color={colors.white} />
            <Text style={styles.button_text}>{data.likes_count}</Text>
          </View>
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

      {showExplicitly && (
        <Animatable.View duration={2000} animation="fadeIn">
          <View style={styles.container}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text style={styles.c_username}>~ pabie</Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.c_comment}
                >
                  Tot tot eoijsoesoe oeisoijes oesieis oeijsoes eosijeos eoisjes
                  you
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image style={styles.profilepic} uri={profilepic} />
              <TextInput
                placeholderTextColor={colors.secondary_2}
                placeholder="Write your comment"
                style={styles.input}
              />
              <TouchableOpacity
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
    paddingTop: 10,
  },
});

export default connect(mapStateToProps, null)(PostCardFooter);

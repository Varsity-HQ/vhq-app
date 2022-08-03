import React from "react";
import { View, TouchableOpacity } from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import dayjs from "dayjs";
import Image from "./Image";
import styles from "./PostPage/styles";
import emojis from "../util/emojis";

function PostPageReplyComment({ data, handleReplyToReply }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 10,
        }}
      >
        <Image
          local={data.anonymous_comment}
          uri={
            data.anonymous_comment
              ? { uri: emojis[data.commenter_profilepic] }
              : data.commenter_profilepic
          }
          style={styles.p_avatar}
        />
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={[
              styles.commentContainer,
              {
                marginLeft: 10,
                flex: 1,
                paddingBottom: 5,
                marginBottom: 0,
              },
            ]}
          >
            <AppText style={styles.u_name}>
              {data.commenter_username}
              {data.replyingTo && (
                <AppText style={styles.date_posted}>
                  &nbsp;&#x27A4;&nbsp;
                  {data.replyingTo ? data.replyingTo : ""}
                </AppText>
              )}
            </AppText>
            <View
              style={{
                paddingVertical: 5,
                marginRight: 0,
              }}
            >
              <AppText>{data.comment_text}</AppText>
            </View>
          </View>
          <View
            style={{
              paddingVertical: 5,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <AppText
              style={[
                styles.u_name,
                {
                  color: colors.secondary,
                  fontWeight: "500",
                },
              ]}
            >
              {data.is_sending
                ? "Posting..."
                : dayjs(data.date_created).format("LT")}
            </AppText>

            <TouchableOpacity
              disabled={data.is_sending}
              onPress={() => handleReplyToReply(data)}
            >
              <AppText
                style={{
                  marginHorizontal: 15,
                  color: colors.secondary,
                  opacity: data.is_sending ? 0.3 : 1,
                }}
              >
                Reply{" "}
              </AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PostPageReplyComment;

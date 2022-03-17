import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../config/colors";
import Text from "../AppText";
import Image from "../Image";

function ChatBubble({ data }) {
  const [isMe, setIsMe] = useState(true);

  useEffect(() => {
    let which = Math.round(Math.random() * 2);

    if (which === 1) {
      setIsMe(true);
    } else {
      setIsMe(false);
    }
  });

  return (
    <View
      style={[
        styles.container,

        {
          flexDirection: isMe ? "row-reverse" : "row",
        },
      ]}
    >
      <View
        style={[
          isMe ? styles.right_bubble_container : styles.left_bubble_container,
        ]}
      >
        {/* <Image style={styles.profilepic} /> */}
        <Text style={{ color: isMe ? colors.white : colors.black }}>
          {data}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profilepic: {
    height: 30,
    width: 30,
    borderRadius: 100,
    alignSelf: "flex-end",
  },
  left_bubble_container: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 20,
    maxWidth: "80%",
    borderBottomRightRadius: 0,
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  right_bubble_container: {
    backgroundColor: "#0b93f6",
    padding: 10,
    borderRadius: 20,
    maxWidth: "80%",
    borderBottomLeftRadius: 0,
    marginRight: 5,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  container: {
    // backgroundColor: colors.secondary,
    padding: 10,
    paddingBottom: 0,
    flexDirection: "row",
    width: "100%",
    alignItems: "baseline",
  },
});

export default ChatBubble;

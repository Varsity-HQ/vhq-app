import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import Button from "../Button";
import styles from "./styles";

function ChatRoomFooter({ accounts }) {
  if (accounts) {
    return (
      <View style={styles.footer_container}>
        <View style={styles.footer_text_container}>
          <Text style={[styles.t_center, styles.header3]}>
            No accounts to show
          </Text>
          <Text style={[styles.t_center, styles.subText]}>
            Follow some accounts first then come back
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.footer_container}>
      <View style={styles.footer_text_container}>
        <Text style={[styles.t_center, styles.header3]}>No chats to show</Text>
        <Text style={[styles.t_center, styles.subText]}>
          Go on accounts to start a chat
        </Text>
        <Button
          type={3}
          style={[styles.s_c_button, { marginTop: 10 }]}
          title="Start conversation"
        />
      </View>
    </View>
  );
}

export default ChatRoomFooter;

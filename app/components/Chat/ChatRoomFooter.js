import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../AppText";
import Button from "../Button";
import styles from "./styles";

function ChatRoomFooter({ tab, data = [] }) {
  if (tab === 0) {
    if (data.length === 0) {
      return (
        <View style={styles.footer_container}>
          <View style={styles.footer_text_container}>
            <Text style={[styles.t_center, styles.header3]}>
              Not chats to show
            </Text>
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
  }
  return null;
}

export default ChatRoomFooter;

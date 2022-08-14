import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import Screen from "../../components/Screen";
import ChatBubble from "../../components/Chat/ChatBubble";
import MsgInputContainer from "../../components/Chat/MsgInputContainer";

const messages = ["iejsoes", "es", "eses", "esese"];

function ChatPage2(props) {
  const [messageReplyTo, setMessageReplyTo] = useState("");

  return (
    <Screen>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <ChatBubble
            data={item}
            setAsMessageReply={() => setMessageReplyTo(item)}
          />
        )}
        inverted
      />
      <MsgInputContainer
        messageReplyTo={messageReplyTo}
        removeMessageReplyTo={() => setMessageReplyTo(null)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatPage2;

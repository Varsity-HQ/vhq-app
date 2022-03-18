import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Header from "../../components/Chat/ChatPageHeader";
import Screen from "../../components/Screen";
import InputAccessoryView from "../../components/InputAccessoryView";
import MsgInputContainer from "../../components/Chat/MsgInputContainer";
import ChatBubble from "../../components/Chat/ChatBubble";
import colors from "../../config/colors";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Composer,
} from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Image from "../../components/Image";
import Text from "../../components/AppText";
import LoadingChat from "../../components/Chat/LoadingChat";

function ChatPage(props) {
  const [messages, setMessages] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Good morning",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar:
            "https://varsityhq.imgix.net/vhq_e08dbdf1-d0f1-4bfd-9881-331a10d34402.jpeg",
        },
        system: true,
        received: true,
        // pending: true,
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderItem = ({ item }) => {
    return <ChatBubble data={item} />;
  };

  const renderSend = (props) => {
    return (
      <>
        <Send
          {...props}
          textStyle={{
            color: colors.secondary,
          }}
        ></Send>
      </>
    );
  };

  const renderInputToolbar = (props) => {
    return (
      <>
        <InputToolbar
          {...props}
          containerStyle={{
            backgroundColor: colors.darkish,
            marginHorizontal: 0,
            borderRadius: 0,
            borderTopWidth: 0,
            borderTopColor: colors.secondary,
            borderColor: colors.secondary,
            borderWidth: 0,
          }}
          textInputProps={{
            style: {
              fontSize: 15,
              color: "#fff",
              flex: 1,
              alignItems: "center",
              alignSelf: "center",
              paddingHorizontal: 15,
              paddingVertical: 5,
              //   borderWidth: 1,
              borderColor: "red",
            },
            // multiline: true,
            // onSubmitEditing: () => {
            //   if (props.text && props.onSend) {
            //     let text = props.text;
            //     props.onSend({ text: text.trim() }, true);
            //   }
            // },
          }}
        />
        {/* <Image style={styles.profilepic} /> */}
      </>
    );
  };

  console.log(messages);

  //   return <LoadingChat username="chikx_12" />;

  return (
    <Screen style={styles.container}>
      <Header />
      <GiftedChat
        // isTyping
        bottomOffset={insets.bottom}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        alwaysShowSend={true}
        // messages={this.state.messages}
        // renderBubble={this.renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        // onSend={messages => this.onSend(messages)}
        // user={{
        //   _id: this.state.userId,
        //   name: this.state.userName,
        //   avatar: this.state.userPhoto,
        // }}
      />
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </Screen>
  );
}

const styles = StyleSheet.create({
  profilepic: {
    height: 30,
    width: 30,
    borderRadius: 100,
    margin: 10,
  },
  inner_container: {
    backgroundColor: colors.dark_opacity,
    flex: 1,
  },
  container: {
    // flexDirection: "column",
  },
});

export default ChatPage;

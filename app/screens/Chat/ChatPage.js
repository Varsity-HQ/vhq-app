import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../../components/Chat/ChatPageHeader";
import Screen from "../../components/Screen";
import InputAccessoryView from "../../components/InputAccessoryView";
import MsgInputContainer from "../../components/Chat/MsgInputContainer";
import ChatBubble from "../../components/Chat/ChatBubble";
import colors from "../../config/colors";
import { FlatList } from "react-native-gesture-handler";

function ChatPage(props) {
  const renderItem = ({ item }) => {
    return <ChatBubble data={item} />;
  };
  return (
    <Screen style={styles.container}>
      <Header />
      <FlatList
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        inverted
        data={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ]}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        style={styles.inner_container}
      />
      <InputAccessoryView>
        <MsgInputContainer />
      </InputAccessoryView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  inner_container: {
    backgroundColor: colors.dark_opacity,
    flex: 1,
  },
  container: {
    flexDirection: "column",
  },
});

export default ChatPage;

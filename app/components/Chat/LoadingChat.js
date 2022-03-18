import React from "react";
import { View, StyleSheet } from "react-native";
import Screen from "../Screen";
import ChatPageHeader from "./ChatPageHeader";
import Loading from "../Loaders/HomeUploading";
import Text from "../AppText";
import colors from "../../config/colors";

function LoadingChat({ username }) {
  return (
    <Screen style={styles.container}>
      <ChatPageHeader username={username ? username : "Loading"} loading />
      <View style={styles.inner_container}>
        <Loading speed={5} />
      </View>
      <Text
        style={{ alignSelf: "center", color: colors.secondary, marginTop: 30 }}
      >
        Just a sec..
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  inner_container: {
    marginTop: "30%",
    // flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    // alignItems: "center",
  },
});

export default LoadingChat;

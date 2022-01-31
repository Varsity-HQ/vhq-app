import React from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { View, StyleSheet } from "react-native";
import Text from "../../components/AppText";
import Screen from "../../components/Screen";
import db from "../../util/fb_admin";

function ChatHome(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <Text>Chat</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default ChatHome;

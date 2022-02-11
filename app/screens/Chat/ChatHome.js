import React from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { View, StyleSheet, FlatList } from "react-native";
import Text from "../../components/AppText";
import Screen from "../../components/Screen";
import db from "../../util/fb_admin";
import ChatHeader from "../../components/Chat/ChatHeader";
import styles from "../../components/Chat/styles";

function ChatHome(props) {
  return (
    <Screen>
      <FlatList ListHeaderComponent={<ChatHeader />} />
    </Screen>
  );
}

export default ChatHome;
